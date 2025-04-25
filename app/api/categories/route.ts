import { prisma } from "@/lib/prisma"
import { NextResponse, NextRequest } from "next/server"
import { protectApiRoute } from "@/lib/api-auth"

// Define handlers separately
async function GETHandler() {
  try {
    const categories = await prisma.category.findMany()

    if (!categories || categories.length === 0) {
      return new NextResponse("No Categories Found", { status: 404 })
    }

    return NextResponse.json(categories)
  } catch (error) {
    console.error("Error fetching categories:", error)
    return new NextResponse("Internal Server Error", { status: 500 })
  }
}

async function POSTHandler(req: NextRequest) {
  try {
    const body = await req.json()
    const { name } = body

    // Check if category already exists
    const existingCategory = await prisma.category.findFirst({
      where: {
        name: name,
      },
    })

    if (existingCategory) {
      return new NextResponse("Category already exists", { status: 400 })
    }

    const newCategory = await prisma.category.create({
      data: {
        name: name,
      },
    })

    return NextResponse.json(newCategory)
  } catch (error) {
    console.error("Error adding category:", error)
    return new NextResponse("Internal Server Error", { status: 500 })
  }
}

// Apply protection
export const GET = GETHandler
export const POST = protectApiRoute(POSTHandler)