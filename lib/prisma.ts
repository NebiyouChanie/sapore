import { PrismaClient } from '../prisma/generated/client';

const globalForPrisma = global as unknown as { prisma?: PrismaClient };

// Ensure a single instance of PrismaClient
export const prisma = globalForPrisma.prisma ?? new PrismaClient();

if (process.env.NODE_ENV !== 'production') globalForPrisma.prisma = prisma;
