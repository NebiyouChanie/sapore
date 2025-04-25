// lib/categories.ts
import { prisma } from "@/lib/prisma"; // adjust path if needed
import type { Category } from "@/types"; // adjust import if needed

export async function fetchCategories(): Promise<Category[]> {
  const categories = await prisma.category.findMany();
  return categories;
}
