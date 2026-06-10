import { NextRequest } from "next/server";
import { prisma } from "@/lib/prisma";
import { successResponse, errorResponse } from "@/lib/response";
import { getCorrelationId } from "@/lib/correlation";

export async function GET(
  request: NextRequest,
  { params }: { params: Promise<{ id: string }> }
) {
  const correlationId = getCorrelationId(request);

  try {
    const { id } = await params;
    const product = await prisma.product.findUnique({
      where: { id: parseInt(id), isActive: true },
    });

    if (!product) {
      return errorResponse("Product not found", 404, correlationId);
    }

    const response = successResponse(product, 200, correlationId);
    response.headers.set("x-correlation-id", correlationId);
    return response;

  } catch (error) {
    console.error("Product error:", error);
    return errorResponse("Internal server error", 500, correlationId);
  }
}