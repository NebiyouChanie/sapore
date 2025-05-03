import { NextResponse, NextRequest } from "next/server";
import { PrismaClient } from "@/prisma/generated/client";

const prisma = new PrismaClient();

// Type-safe PUT handler
export async function PUT( request: NextRequest,{ params }:{params : Promise<{ editingId: string }> }) {

  try {
    const { editingId } = await params  
    
    const body = await request.json();
    const { name } = body;

    // Validation
    if (!name) return NextResponse.json({ error: "Name is required" }, { status: 400 });
    if (!editingId) return NextResponse.json({ error: "Invalid category ID" }, { status: 400 });

    // Database operations
    const category = await prisma.category.findUnique({ where: { id: editingId } });
    if (!category) return NextResponse.json({ error: "Category not found" }, { status: 404 });

    const updatedCategory = await prisma.category.update({
      where: { id: editingId },
      data: { name },
    });

    return NextResponse.json(updatedCategory);
  } catch (error) {
    console.error("[CATEGORY_PUT]", error);
    return NextResponse.json(
      { error: "Internal Server Error" }, 
      { status: 500 }
    );
  }
}
 
// Type-safe DELETE handler
export async function DELETE( request: NextRequest,{ params }:{params : Promise<{ editingId: string }> }) {
  try {
    const { editingId } = await params  

    // Validation
    if (!editingId) return NextResponse.json({ error: "Invalid category ID" }, { status: 400 });

    // Database operations
    const category = await prisma.category.findUnique({ where: { id: editingId } });
    if (!category) return NextResponse.json({ error: "Category not found" }, { status: 404 });

    const referencedItems = await prisma.menuItem.findMany({
      where: { categoryId: editingId },
    });

    if (referencedItems.length > 0) {
      return NextResponse.json(
        { 
          error: "Cannot delete category",
          message: `This category is used by ${referencedItems.length} menu item(s)`
        },
        { status: 400 }
      );
    }

    const deletedCategory = await prisma.category.delete({ where: { id: editingId } });
    return NextResponse.json(deletedCategory);
  } catch (error) {
    console.error("[CATEGORY_DELETE]", error);
    return NextResponse.json(
      { error: "Internal Server Error" },
      { status: 500 }
    );
  }
}