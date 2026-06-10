import { NextRequest } from "next/server";
import { prisma } from "@/lib/prisma";
import { successResponse, errorResponse } from "@/lib/response";
import { getCorrelationId } from "@/lib/correlation";
import { getSession } from "@/lib/session";

export async function GET(
  request: NextRequest,
  { params }: { params: Promise<{ id: string }> }
) {
  const correlationId = getCorrelationId(request);

  try {
    const session = await getSession();
    if (!session) return errorResponse("Unauthorized", 401, correlationId);

    const { id } = await params;
    const order = await prisma.order.findUnique({
      where: { id: parseInt(id), userId: session.sub },
      include: { items: true },
    });

    if (!order) return errorResponse("Order not found", 404, correlationId);

    const response = successResponse(order, 200, correlationId);
    response.headers.set("x-correlation-id", correlationId);
    return response;

  } catch (error) {
    console.error("Order GET error:", error);
    return errorResponse("Internal server error", 500, correlationId);
  }
}