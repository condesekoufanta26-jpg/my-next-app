import { NextRequest } from "next/server";
import { prisma } from "@/lib/prisma";
import { verifyRefreshToken, signAccessToken, signRefreshToken } from "@/lib/auth";
import { successResponse, errorResponse } from "@/lib/response";
import { getCorrelationId } from "@/lib/correlation";
import crypto from "crypto";

export async function POST(request: NextRequest) {
  const correlationId = getCorrelationId(request);

  try {
    const refreshToken =
      request.cookies.get("refresh_token")?.value ||
      (await request.json().catch(() => ({})))?.refreshToken;

    if (!refreshToken) {
      return errorResponse("Refresh token missing", 401, correlationId);
    }

    const payload = verifyRefreshToken(refreshToken);

    const tokenHash = crypto
      .createHash("sha256")
      .update(refreshToken)
      .digest("hex");

    const stored = await prisma.refreshToken.findFirst({
      where: {
        userId: payload.sub,
        tokenHash,
        revokedAt: null,
        expiresAt: { gt: new Date() },
      },
    });

    if (!stored) {
      return errorResponse("Invalid or expired refresh token", 401, correlationId);
    }

    const user = await prisma.user.findUnique({
      where: { id: payload.sub, isActive: true },
    });

    if (!user) {
      return errorResponse("User not found", 401, correlationId);
    }

    // Révoquer l'ancien token
    await prisma.refreshToken.update({
      where: { id: stored.id },
      data: { revokedAt: new Date() },
    });

    const newPayload = { sub: user.id, email: user.email, role: user.role };
    const newAccessToken = signAccessToken(newPayload);
    const newRefreshToken = signRefreshToken(newPayload);

    const newTokenHash = crypto
      .createHash("sha256")
      .update(newRefreshToken)
      .digest("hex");

    const expiresAt = new Date();
    expiresAt.setDate(expiresAt.getDate() + 7);

    await prisma.refreshToken.create({
      data: { userId: user.id, tokenHash: newTokenHash, expiresAt },
    });

    const response = successResponse(
      { accessToken: newAccessToken, refreshToken: newRefreshToken, expiresIn: 900 },
      200,
      correlationId
    );

    response.cookies.set("access_token", newAccessToken, {
      httpOnly: true,
      secure: process.env.NODE_ENV === "production",
      sameSite: "strict",
      maxAge: 900,
      path: "/",
    });

    response.cookies.set("refresh_token", newRefreshToken, {
      httpOnly: true,
      secure: process.env.NODE_ENV === "production",
      sameSite: "strict",
      maxAge: 60 * 60 * 24 * 7,
      path: "/",
    });

    response.headers.set("x-correlation-id", correlationId);
    return response;

  } catch (error) {
    console.error("Refresh error:", error);
    return errorResponse("Invalid refresh token", 401, correlationId);
  }
}