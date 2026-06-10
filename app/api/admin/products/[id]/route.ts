import { NextRequest } from "next/server";
import { z } from "zod";
import { prisma } from "@/lib/prisma";
import { successResponse, errorResponse } from "@/lib/response";
import { getCorrelationId } from "@/lib/correlation";
import { requireAdmin } from "@/lib/session";

const updateProductSchema = z.object({
  name: z.string().min(2).optional(),
  description: z.string().optional(),
  price: z.number().positive().optional(),
  stock: z.number().int().min(0).optional(),
  isActive: z.boolean().optional(),
});

export async function PATCH(
  request: NextRequest,
  { params }: { params: Promise<{ id: string }> }
) {
  const correlationId = getCorrelationId(request);

  try {
    await requireAdmin();

    const { id } = await params;
    const body = await request.json();
    const validation = updateProductSchema.safeParse(body);

    if (!validation.success) {
      return errorResponse(validation.error.issues[0].message, 400, correlationId);
    }

    const product = await prisma.product.update({
      where: { id: parseInt(id) },
      data: validation.data,
    });

    const response = successResponse(product, 200, correlationId);
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

export async function DELETE(
  request: NextRequest,
  { params }: { params: Promise<{ id: string }> }
) {
  const correlationId = getCorrelationId(request);

  try {
    await requireAdmin();

    const { id } = await params;
    await prisma.product.update({
      where: { id: parseInt(id) },
      data: { isActive: false },
    });

    const response = successResponse(
      { message: "Product deleted" },
      200,
      correlationId
    );
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