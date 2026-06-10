"use server";

import { prisma } from "@/lib/prisma";
import { getSession } from "@/lib/session";
import { revalidatePath } from "next/cache";
import { redirect } from "next/navigation";
import { z } from "zod";

const createOrderSchema = z.object({
  shippingAddress: z.string().min(5),
  paymentMethod: z.string().min(2),
});

export async function createOrderAction(formData: FormData) {
  const session = await getSession();
  if (!session) return { error: "Unauthorized" };

  const validation = createOrderSchema.safeParse({
    shippingAddress: formData.get("shippingAddress"),
    paymentMethod: formData.get("paymentMethod"),
  });

  if (!validation.success) {
    return { error: validation.error.issues[0].message };
  }

  const { shippingAddress, paymentMethod } = validation.data;

  const cart = await prisma.cart.findUnique({
    where: { userId: session.sub },
    include: { items: { include: { product: true } } },
  });

  if (!cart || cart.items.length === 0) {
    return { error: "Cart is empty" };
  }

  const totalAmount = cart.items.reduce(
    (sum, item) => sum + Number(item.priceAtAdd) * item.quantity,
    0
  );

  const orderNumber = `ORD-${Date.now()}-${session.sub}`;

  await prisma.order.create({
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
  });

  await prisma.cartItem.deleteMany({ where: { cartId: cart.id } });

  revalidatePath("/orders");
  redirect("/orders");
}