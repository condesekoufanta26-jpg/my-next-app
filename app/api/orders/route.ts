import { NextRequest } from "next/server";
import { z } from "zod";
import { prisma } from "@/lib/prisma";
import { successResponse, errorResponse } from "@/lib/response";
import { getCorrelationId } from "@/lib/correlation";
import { getSession } from "@/lib/session";

const createOrderSchema = z.object({
  shippingAddress: z.string().min(5),
  paymentMethod: z.string().min(2),
});

export async function GET(request: NextRequest) {
  const correlationId = getCorrelationId(request);

  try {
    const session = await getSession();
    if (!session) return errorResponse("Unauthorized", 401, correlationId);

    const orders = await prisma.order.findMany({
      where: { userId: session.sub },
      include: { items: true },
      orderBy: { createdAt: "desc" },
    });

    const response = successResponse(orders, 200, correlationId);
    response.headers.set("x-correlation-id", correlationId);
    return response;

  } catch (error) {
    console.error("Orders GET error:", error);
    return errorResponse("Internal server error", 500, correlationId);
  }
}

export async function POST(request: NextRequest) {
  const correlationId = getCorrelationId(request);

  try {
    const session = await getSession();
    if (!session) return errorResponse("Unauthorized", 401, correlationId);

    const body = await request.json();
    const validation = createOrderSchema.safeParse(body);

    if (!validation.success) {
      return errorResponse(validation.error.issues[0].message, 400, correlationId);
    }

    const { shippingAddress, paymentMethod } = validation.data;

    const cart = await prisma.cart.findUnique({
      where: { userId: session.sub },
      include: { items: { include: { product: true } } },
    });

    if (!cart || cart.items.length === 0) {
      return errorResponse("Cart is empty", 400, correlationId);
    }

    const totalAmount = cart.items.reduce(
      (sum, item) => sum + Number(item.priceAtAdd) * item.quantity,
      0
    );

    const orderNumber = `ORD-${Date.now()}-${session.sub}`;

    const order = await prisma.order.create({
      data: {
        userId: session.sub,
        orderNumber,
        totalAmount,
        shippingAddress,
        paymentMethod,
        items: {
          create: cart.items.map((item) => ({
            productId: item.productId,
            productName: item.product.name,
            quantity: item.quantity,
            unitPrice: item.priceAtAdd,
            totalPrice: Number(item.priceAtAdd) * item.quantity,
          })),
        },
      },
      include: { items: true },
    });

    await prisma.cartItem.deleteMany({ where: { cartId: cart.id } });

    const response = successResponse(order, 201, correlationId);
    response.headers.set("x-correlation-id", correlationId);
    return response;

  } catch (error) {
    console.error("Orders POST error:", error);
    return errorResponse("Internal server error", 500, correlationId);
  }
}