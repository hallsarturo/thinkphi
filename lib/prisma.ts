import 'dotenv/config';
import { PrismaClient } from '@/lib/generated/prisma/client';
import { PrismaPg } from '@prisma/adapter-pg';

//TODO: change to a connection pooler for production

const connectionString = `${process.env.DATABASE_URL!}`;

const adapter = new PrismaPg({ connectionString });

const globalForPrisma = global as unknown as {
    prisma: PrismaClient;
};
const prisma = globalForPrisma.prisma || new PrismaClient({ adapter });


if (process.env.NODE_ENV !== 'production') globalForPrisma.prisma = prisma;

export default prisma;
