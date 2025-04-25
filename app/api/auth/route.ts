import { NextResponse } from 'next/server'
import { deleteSession, verifySession } from "@/lib/session"

export async function GET() {
  try {
    const user = await verifySession()
     
    if (!user) {
      return NextResponse.json({ error: "Unauthorized" }, { status: 401 })
    }

    return NextResponse.json({ user })
  } catch (error) {
    console.log("~ GET ~ error:", error)
    return NextResponse.json({ error: "Internal Server Error" }, { status: 500 })
  }
}

export async function DELETE() {
    try {
      const user = await verifySession()
      
      if (!user) {
        return NextResponse.json({ error: "Unauthorized" }, { status: 401 })
      }
  
      await deleteSession()
  
      return NextResponse.json({ message: "Session deleted successfully" },{status:200})
    } catch (error) {
      console.log("~ DELETE ~ error:", error)
      return NextResponse.json({ error: "Internal Server Error" }, { status: 500 })
    }
  }
