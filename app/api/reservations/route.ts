import { NextRequest, NextResponse } from 'next/server';
import { prisma } from '@/lib/prisma';
import { z } from 'zod';
import { protectApiRoute } from '@/lib/api-auth';
import { sendEmail } from '@/lib/sendEmail';  
import { Prisma } from '@prisma/client';

// Define validation schema
const reservationSchema = z.object({
  name: z.string().min(1, 'First Name is required'),
  email: z.string().trim().email('Email is required.'),
  phoneNumber: z.string().min(10, 'Phone Number is required'),
  numberOfGuests: z.number().min(1, 'At least 1 guest is required'),
  date: z.string().min(1, 'Date is required'),
  time: z.string().min(1, 'Time is required'),
  message: z.string().optional(),
});

// POST Handler
async function POSTHandler(req: NextRequest) {
  try {
    const body = await req.json();
    const validatedData = reservationSchema.parse(body);

    // Save the reservation to the database
    const newReservation = await prisma.reservation.create({
      data: {
        name: validatedData.name,
        email: validatedData.email,
        phoneNumber: validatedData.phoneNumber,
        numberOfGuests: validatedData.numberOfGuests,
        date: new Date(validatedData.date),
        time: validatedData.time,
        message: validatedData.message,
      },
    });

    // 📧 Send an email notification to the admin
    const emailContent = `
      A new reservation has been made:
      - Name: ${validatedData.name}
      - Email: ${validatedData.email}
      - Phone: ${validatedData.phoneNumber}
      - Guests: ${validatedData.numberOfGuests}
      - Date: ${validatedData.date}
      - Time: ${validatedData.time}
      - Message: ${validatedData.message || 'No additional message'}
    `;
    await sendEmail('cnebiyu@gmail.com', 'New Table Reservation', emailContent);

    return NextResponse.json(newReservation, { status: 201 });
  } catch (error) {
    console.error('Error creating reservation:', error);

    if (error instanceof z.ZodError) {
      return NextResponse.json(
        { error: 'Validation failed', details: error.errors },
        { status: 400 }
      );
    }

    return NextResponse.json(
      { error: 'Failed to create reservation' },
      { status: 500 }
    );
  }
}

// GET Handler
async function GETHandler(req: NextRequest) {
  try {
    const { searchParams } = new URL(req.url);
    const page = Number(searchParams.get('page')) || 1;
    const pageSize = Number(searchParams.get('pageSize')) || 10;
    const startDate = searchParams.get('startDate');
    const endDate = searchParams.get('endDate');

    const whereClause: Prisma.ReservationWhereInput = {}; // Corrected type

    if (startDate && endDate) {
      whereClause.date = {
        gte: new Date(startDate),
        lte: new Date(endDate),
      };
    } else if (startDate) {
      whereClause.date = {
        gte: new Date(startDate),
      };
    } else if (endDate) {
      whereClause.date = {
        lte: new Date(endDate),
      };
    }

    const reservations = await prisma.reservation.findMany({
      where: whereClause,
      skip: (page - 1) * pageSize,
      take: pageSize,
      orderBy: {
        createdAt: 'desc',
      },
    });

    const totalReservations = await prisma.reservation.count({ where: whereClause });

    if (reservations.length === 0) {
      return new NextResponse('No Reservation Found', { status: 404 });
    }

    return NextResponse.json({
      data: reservations,
      total: totalReservations,
      page,
      pageSize,
    });
  } catch (error) {
    console.error('Error fetching reservations:', error);
    return NextResponse.json(
      { error: 'Failed to fetch reservations' },
      { status: 500 }
    );
  }
}

// Apply protection and export
export const POST = protectApiRoute(POSTHandler);
export const GET = protectApiRoute(GETHandler);
