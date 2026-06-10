import { NextRequest } from "next/server";
import { z } from "zod";
import { prisma } from "@/lib/prisma";
import { successResponse, errorResponse } from "@/lib/response";
import { getCorrelationId } from "@/lib/correlation";
import { getSession } from "@/lib/session";

const addToCartSchema = z.object({
  productId: z.number().int().positive(),
  quantity: z.number().int().positive().default(1),
});

export async function GET(request: NextRequest) {
  const correlationId = getCorrelationId(request);

  try {
    const session = await getSession();
    if (!session) return errorResponse("Unauthorized", 401, correlationId);

    const cart = await prisma.cart.findUnique({
      where: { userId: session.sub },
      include: {
        items: {
          include: { product: true },
        },
      },
    });

    const response = successResponse(cart || { items: [] }, 200, correlationId);
    response.headers.set("x-correlation-id", correlationId);
    return response;

  } catch (error) {
    console.error("Cart GET error:", error);
    return errorResponse("Internal server error", 500, correlationId);
  }
}

export async function POST(request: NextRequest) {
  const correlationId = getCorrelationId(request);

  try {
    const session = await getSession();
    if (!session) return errorResponse("Unauthorized", 401, correlationId);

    const body = await request.json();
    const validation = addToCartSchema.safeParse(body);

    if (!validation.success) {
      return errorResponse(validation.error.issues[0].message, 400, correlationId);
    }

    const { productId, quantity } = validation.data;

    const product = await prisma.product.findUnique({
      where: { id: productId, isActive: true },
    });

    if (!product) return errorResponse("Product not found", 404, correlationId);
    if (product.stock < quantity) {
      return errorResponse("Insufficient stock", 400, correlationId);
    }

    let cart = await prisma.cart.findUnique({ where: { userId: session.sub } });
    if (!cart) {
      cart = await prisma.cart.create({ data: { userId: session.sub } });
    }

    const existingItem = await prisma.cartItem.findUnique({
      where: { cartId_productId: { cartId: cart.id, productId } },
    });

    if (existingItem) {
      await prisma.cartItem.update({
        where: { id: existingItem.id },
        data: { quantity: existingItem.quantity + quantity },
      });
    } else {
      await prisma.cartItem.create({
        data: {
          cartId: cart.id,
          productId,
          quantity,
          priceAtAdd: product.price,
        },
      });
    }

    const updatedCart = await prisma.cart.findUnique({
      where: { id: cart.id },
      include: { items: { include: { product: true } } },
    });

    const response = successResponse(updatedCart, 201, correlationId);
    response.headers.set("x-correlation-id", correlationId);
    return response;

  } catch (error) {
    console.error("Cart POST error:", error);
    return errorResponse("Internal server error", 500, correlationId);
  }
}