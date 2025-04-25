import { prisma } from "@/lib/prisma";
import { sendEmail } from "@/lib/sendEmail"; // Import your email function
import { NextRequest, NextResponse } from "next/server";

// GET Reservation Handler
export const GET = async (request: NextRequest, { params }: { params: Promise<{ id: string }> }) => {
  try {
    // Await params before using it
    const { id } = await params;

    const reservation = await prisma.reservation.findUnique({
      where: { id }
    });

    if (!reservation) {
      return NextResponse.json(
        { error: "Reservation not found." }, 
        { status: 404 }
      );
    }

    return NextResponse.json(reservation);
  } catch (error) {
    console.error("[RESERVATION_GET]", error);
    return NextResponse.json(
      { error: "Failed to fetch reservation" }, 
      { status: 500 }
    );
  }
}

// Update Reservation Handler
export const PUT = async (request: NextRequest, { params }: { params: Promise<{ id: string }> }) => {
  try {
    const { id } = await params;
    const body = await request.json();

    // Optionally, validate the body here (if needed)

    const updatedReservation = await prisma.reservation.update({
      where: { id },
      data: body,
    });

    return NextResponse.json(updatedReservation);
  } catch (error) {
    console.error("[RESERVATION_PUT]", error);
    return NextResponse.json(
      { error: "Failed to update reservation" }, 
      { status: 500 }
    );
  }
}

// Delete Reservation Handler
export const DELETE = async (request: NextRequest, { params }: { params: Promise<{ id: string }> }) => {
  try {
    const { id } = await params;
    await prisma.reservation.delete({ where: { id } });

    return NextResponse.json(
      { message: "Reservation deleted successfully" }
    );
  } catch (error) {
    console.error("[RESERVATION_DELETE]", error);
    return NextResponse.json(
      { error: "Failed to delete reservation" }, 
      { status: 500 }
    );
  }
}

// Update Status Handler
export const PATCH = async (request: NextRequest, { params }: { params: Promise<{ id: string }> }) => {
  try {
    const { id } = await params;

    const { status } = await request.json();

    // Validate status
    if (!["Confirmed", "Cancelled", "Pending"].includes(status)) {
      return NextResponse.json({ error: "Invalid status value" }, { status: 400 });
    }

    const updatedReservation = await prisma.reservation.update({
      where: { id },
      data: { status },
    });

    // Send an email notification to the user
    if (!updatedReservation?.email) {
      console.error("Email not found for the reservation");
      return NextResponse.json({ error: "Reservation email missing" }, { status: 400 });
    }

    const emailSubject = status === "Confirmed" ? "Your Reservation is Confirmed" : "Your Reservation is Canceled";
    const emailContent =
      status === "Confirmed"
        ? `Hello ${updatedReservation.name},\n\nYour reservation for ${updatedReservation.date} at ${updatedReservation.time} has been confirmed. We look forward to serving you!`
        : `Hello ${updatedReservation.name},\n\nUnfortunately, your reservation for ${updatedReservation.date} at ${updatedReservation.time} has been canceled. Please contact us for more details.`;

    await sendEmail(updatedReservation.email, emailSubject, emailContent);
    
    return NextResponse.json(updatedReservation);
  } catch (error) {
    console.error("[RESERVATION_PATCH]", error);
    return NextResponse.json({ error: "Failed to update reservation status" }, { status: 500 });
  }
}
