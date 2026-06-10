import { NextRequest } from "next/server";
import { z } from "zod";
import { prisma } from "@/lib/prisma";
import { successResponse, errorResponse } from "@/lib/response";
import { getCorrelationId } from "@/lib/correlation";
import { requireAdmin } from "@/lib/session";

const createProductSchema = z.object({
  name: z.string().min(2),
  description: z.string().optional(),
  price: z.number().positive(),
  stock: z.number().int().min(0),
  imageUrl: z.string().optional(),
  imagePublicId: z.string().optional(),
});

export async function GET(request: NextRequest) {
  const correlationId = getCorrelationId(request);

  try {
    await requireAdmin();

    const products = await prisma.product.findMany({
      orderBy: { createdAt: "desc" },
    });

    const response = successResponse(products, 200, correlationId);
    response.headers.set("x-correlation-id", correlationId);
    return response;

  } catch (error: unknown) {
    if (error instanceof Error && error.message === "Forbidden") {
      return errorResponse("Forbidden", 403, correlationId);
    }
    if (error instanceof Error && error.message === "Unauthorized") {
      return errorResponse("Unauthorized", 401, correlationId);
    }
    return errorResponse("Internal server error", 500, correlationId);
  }
}

export async function POST(request: NextRequest) {
  const correlationId = getCorrelationId(request);

  try {
    await requireAdmin();

    const body = await request.json();
    const validation = createProductSchema.safeParse(body);

    if (!validation.success) {
      return errorResponse(validation.error.issues[0].message, 400, correlationId);
    }

    const product = await prisma.product.create({ data: validation.data });

    const response = successResponse(product, 201, correlationId);
    response.headers.set("x-correlation-id", correlationId);
    return response;

  } catch (error: unknown) {
    if (error instanceof Error && error.message === "Forbidden") {
      return errorResponse("Forbidden", 403, correlationId);
    }
    if (error instanceof Error && error.message === "Unauthorized") {
      return errorResponse("Unauthorized", 401, correlationId);
    }
    return errorResponse("Internal server error", 500, correlationId);
  }
}