import { NextRequest, NextResponse } from "next/server"
import { prisma } from "@/lib/prisma"
import { z } from "zod"
import { ItemType } from "@/prisma/generated/client"

// Define validation schema matching your form
const menuItemSchema = z.object({
  name: z.string().min(1, "Name is required"),
  description: z.string().min(1, "Description is required"),
  price: z.number().min(0, "Price must be a positive number"),
  categoryId: z.string().min(1, "Category is required"),
  isSpecial: z.boolean().default(false),
  isMainMenu: z.boolean().default(false),
  imageUrl: z.string().url("Invalid image URL").min(1, "Image URL is required"),
  itemType: z.nativeEnum(ItemType),
})

// Get Menu item
export const GET = async (request: NextRequest, { params }: { params: Promise<{ id: string }> }) => {
  try {
    // Await params before using it
    const { id } = await params 

    const menuItem = await prisma.menuItem.findUnique({
      where: { id },
      include: { category: true }
    })

    if (!menuItem) {
      return NextResponse.json({ error: "Menu item not found" }, { status: 404 })
    }

    return NextResponse.json({
      ...menuItem,
      categoryId: menuItem.category.id  
    }, { status: 200 })
  } catch (error) {
    console.error("Error fetching menu item:", error)
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 })   
  }
}

// Update Menu item
export const PUT = async (request: NextRequest, { params }: { params: Promise<{ id: string }> }) => {
  try {
    // Await params before using it
    const { id } = await params 
    const body = await request.json()
    const validatedData = menuItemSchema.parse(body)

    const updatedItem = await prisma.menuItem.update({
      where: { id },
      data: {
        name: validatedData.name,
        description: validatedData.description,
        price: validatedData.price,
        categoryId: validatedData.categoryId,
        isSpecial: validatedData.isSpecial,
        isMainMenu: validatedData.isMainMenu,
        imageUrl: validatedData.imageUrl,
        itemType: validatedData.itemType,
      },
      include: { category: true }
    })

    return NextResponse.json(updatedItem, { status: 200 })
  } catch (error) {
    console.error("Error updating menu item:", error)

    if (error instanceof z.ZodError) {
      return NextResponse.json(
        { 
          error: "Validation failed", 
          details: error.errors.map(e => ({
            field: e.path[0],
            message: e.message
          }))
        },
        { status: 400 }
      )
    }

    return NextResponse.json({ error: "Unauthorized" }, { status: 401 })   
  }
}

// Delete Menu item
export const DELETE = async (request: NextRequest, { params }: { params: Promise<{ id: string }> }) => {
  try {
    // Await params before using it
    const { id } = await params  

    await prisma.menuItem.delete({
      where: { id },
    })

    return NextResponse.json({ message: "Menu item deleted successfully" }, { status: 200 })
  } catch (error) {
    console.error("Error deleting menu item:", error)
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 })   
  }
}
