"use server";

import { prisma } from "@/lib/prisma";
import { getSession } from "@/lib/session";
import { revalidatePath } from "next/cache";

export async function addToCartAction(productId: number, quantity: number = 1) {
  const session = await getSession();
  if (!session) return { error: "Unauthorized" };

  const product = await prisma.product.findUnique({
    where: { id: productId, isActive: true },
  });

  if (!product) return { error: "Product not found" };
  if (product.stock < quantity) return { error: "Insufficient stock" };

  let cart = await prisma.cart.findUnique({ where: { userId: session.sub } });
  if (!cart) {
    cart = await prisma.cart.create({ data: { userId: session.sub } });
  }

  const existing = await prisma.cartItem.findUnique({
    where: { cartId_productId: { cartId: cart.id, productId } },
  });

  if (existing) {
    await prisma.cartItem.update({
      where: { id: existing.id },
      data: { quantity: existing.quantity + quantity },
    });
  } else {
    await prisma.cartItem.create({
      data: { cartId: cart.id, productId, quantity, priceAtAdd: product.price },
    });
  }

  revalidatePath("/cart");
  return { success: true };
}

export async function removeFromCartAction(itemId: number) {
  const session = await getSession();
  if (!session) return { error: "Unauthorized" };

  await prisma.cartItem.delete({ where: { id: itemId } });
  revalidatePath("/cart");
  return { success: true };
}

export async function clearCartAction() {
  const session = await getSession();
  if (!session) return { error: "Unauthorized" };

  const cart = await prisma.cart.findUnique({ where: { userId: session.sub } });
  if (cart) {
    await prisma.cartItem.deleteMany({ where: { cartId: cart.id } });
  }

  revalidatePath("/cart");
  return { success: true };
}