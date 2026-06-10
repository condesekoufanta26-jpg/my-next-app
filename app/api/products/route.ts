import { NextRequest } from "next/server";
import { prisma } from "@/lib/prisma";
import { successResponse, errorResponse } from "@/lib/response";
import { getCorrelationId } from "@/lib/correlation";

export async function GET(request: NextRequest) {
  const correlationId = getCorrelationId(request);

  try {
    const { searchParams } = new URL(request.url);
    const page = parseInt(searchParams.get("page") || "1", 10);
    const limit = parseInt(searchParams.get("limit") || "20", 10);
    const skip = (page - 1) * limit;

    const [products, total] = await Promise.all([
      prisma.product.findMany({
        where: { isActive: true },
        skip,
        take: limit,
        orderBy: { createdAt: "desc" },
      }),
      prisma.product.count({ where: { isActive: true } }),
    ]);

    const response = successResponse(
      { data: products, total, page, limit },
      200,
      correlationId
    );
    response.headers.set("x-correlation-id", correlationId);
    return response;

  } catch (error) {
    console.error("Products error:", error);
    return errorResponse("Internal server error", 500, correlationId);
  }
}