"use server";

import { prisma } from "@/lib/prisma";
import { requireAdmin } from "@/lib/session";
import { revalidatePath } from "next/cache";
import { z } from "zod";

const productSchema = z.object({
  name: z.string().min(2),
  description: z.string().optional(),
  price: z.coerce.number().positive(),
  stock: z.coerce.number().int().min(0),
  imageUrl: z.string().optional(),
  imagePublicId: z.string().optional(),
});

export async function createProductAction(formData: FormData) {
  await requireAdmin();

  const validation = productSchema.safeParse({
    name: formData.get("name"),
    description: formData.get("description"),
    price: formData.get("price"),
    stock: formData.get("stock"),
    imageUrl: formData.get("imageUrl"),
    imagePublicId: formData.get("imagePublicId"),
  });

  if (!validation.success) {
    return { error: validation.error.issues[0].message };
  }

  const product = await prisma.product.create({ data: validation.data });
  revalidatePath("/admin/products");
  return { success: true, product };
}

export async function updateProductAction(id: number, formData: FormData) {
  await requireAdmin();

  const validation = productSchema.partial().safeParse({
    name: formData.get("name"),
    description: formData.get("description"),
    price: formData.get("price"),
    stock: formData.get("stock"),
    imageUrl: formData.get("imageUrl"),
    imagePublicId: formData.get("imagePublicId"),
  });

  if (!validation.success) {
    return { error: validation.error.issues[0].message };
  }

  const product = await prisma.product.update({
    where: { id },
    data: validation.data,
  });

  revalidatePath("/admin/products");
  return { success: true, product };
}

export async function deleteProductAction(id: number) {
  await requireAdmin();
  await prisma.product.update({
    where: { id },
    data: { isActive: false },
  });
  revalidatePath("/admin/products");
  return { success: true };
}