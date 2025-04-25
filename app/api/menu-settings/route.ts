import { prisma } from "@/lib/prisma"
import { NextResponse, NextRequest } from "next/server"
import { protectApiRoute } from "@/lib/api-auth"

async function GETHandler() {
  try {
    const menuSettings = await prisma.menuSettings.findFirst()
    return NextResponse.json(menuSettings, { status: 200 })
  } catch (error) {
    console.error("Error fetching menu settings:", error)
    return NextResponse.json({ error: "Failed to fetch settings" }, { status: 500 })
  }
}

async function POSTHandler(req: NextRequest) {
  try {
    const { showPrice, showDescription } = await req.json()

    const menuSettings = await prisma.menuSettings.findFirst()
    
    const updatedSettings = await prisma.menuSettings.update({
      where: { id: menuSettings?.id },  
      data: { showPrice, showDescription },
       
    })

    return NextResponse.json(updatedSettings, { status: 200 })
  } catch (error) {
    console.error("Error updating settings:", error)
    return NextResponse.json({ error: "Failed to update settings" }, { status: 500 })
  }
}

export const GET = protectApiRoute(GETHandler)
export const POST = protectApiRoute(POSTHandler)
