import { NextRequest } from "next/server";
import { prisma } from "@/lib/prisma";
import { successResponse, errorResponse } from "@/lib/response";
import { getCorrelationId } from "@/lib/correlation";
import { getSession } from "@/lib/session";

export async function POST(request: NextRequest) {
  const correlationId = getCorrelationId(request);

  try {
    const session = await getSession();

    if (session) {
      await prisma.refreshToken.updateMany({
        where: { userId: session.sub, revokedAt: null },
        data: { revokedAt: new Date() },
      });
    }

    const response = successResponse(
      { message: "Logged out successfully" },
      200,
      correlationId
    );

    response.cookies.set("access_token", "", {
      httpOnly: true,
      secure: process.env.NODE_ENV === "production",
      sameSite: "strict",
      maxAge: 0,
      path: "/",
    });

    response.cookies.set("refresh_token", "", {
      httpOnly: true,
      secure: process.env.NODE_ENV === "production",
      sameSite: "strict",
      maxAge: 0,
      path: "/",
    });

    response.headers.set("x-correlation-id", correlationId);
    return response;

  } catch (error) {
    console.error("Logout error:", error);
    return errorResponse("Internal server error", 500, correlationId);
  }
}