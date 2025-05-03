import { prisma } from "@/lib/prisma";
import { NextResponse, NextRequest } from "next/server";
import { ItemType } from "@/prisma/generated/client";
import { protectApiRoute } from "@/lib/api-auth";
import { z } from "zod";

// Define validation schema
const menuItemSchema = z.object({
  name: z.string().min(1, "Name is required"),
  description: z.string().min(1, "Description is required"),
  price: z.number().min(0, "Price must be a positive number"),
  categoryId: z.string().min(1, "Category is required"),
  isSpecial: z.boolean().default(false),
  isMainMenu: z.boolean().default(false),
  imageUrl: z.string().url("Invalid image URL").min(1, "Image URL is required"),
  itemType: z.nativeEnum(ItemType),
});

// POST handler - Create new menu item (protected)
async function POSTHandler(req: NextRequest) {
  try {
    const body = await req.json();
    const validatedData = menuItemSchema.parse(body);

    const newMenuItem = await prisma.menuItem.create({
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
    });

    return NextResponse.json(newMenuItem, { status: 201 });
  } catch (error) {
    console.error("Error adding menu item:", error);

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
      );
    }

    return NextResponse.json(
      { error: "Failed to add menu item" },
      { status: 500 }
    );
  }
}

// GET handler - Get all menu items (public)
async function GETHandler(req: NextRequest) {
  try {
    // Check if the request is from the admin panel
    const { searchParams } = new URL(req.url);
    const isAdmin = searchParams.get("admin") === "true";

    // Fetch menu settings (assume only one row exists)
    const menuSettings = await prisma.menuSettings.findFirst();

    // Fetch menu items
    const menuItems = await prisma.menuItem.findMany({
      include: {
        category: true,
      },
    });

    // If the request is from the admin panel, return all data
    if (isAdmin) {
      return NextResponse.json(menuItems, { status: 200 });
    }

    // Modify menu items based on settings for the frontend
    const filteredMenuItems = menuItems.map((item) => ({
      ...item,
      price: menuSettings?.showPrice ? item.price : null,
      description: menuSettings?.showDescription ? item.description : null,
    }));

    return NextResponse.json(filteredMenuItems, { status: 200 });
  } catch (error) {
    console.error("Error fetching menu items:", error);
    return NextResponse.json(
      { error: "Failed to fetch menu items" },
      { status: 500 }
    );
  }
}

// Apply protection to POST handler
const protectedPOST = protectApiRoute(POSTHandler);

// Export handlers
export { 
  GETHandler as GET,
  protectedPOST as POST 
};