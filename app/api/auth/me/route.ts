import { NextRequest } from "next/server";
import { prisma } from "@/lib/prisma";
import { successResponse, errorResponse } from "@/lib/response";
import { getCorrelationId } from "@/lib/correlation";
import { getSession } from "@/lib/session";

export async function GET(request: NextRequest) {
  const correlationId = getCorrelationId(request);

  try {
    const session = await getSession();

    if (!session) {
      return errorResponse("Unauthorized", 401, correlationId);
    }

    const user = await prisma.user.findUnique({
      where: { id: session.sub, isActive: true },
      select: {
        id: true,
        email: true,
        name: true,
        role: true,
        phoneNumber: true,
        createdAt: true,
      },
    });

    if (!user) {
      return errorResponse("User not found", 404, correlationId);
    }

    const response = successResponse(user, 200, correlationId);
    response.headers.set("x-correlation-id", correlationId);
    return response;

  } catch (error) {
    console.error("Me error:", error);
    return errorResponse("Internal server error", 500, correlationId);
  }
}