import 'dotenv/config';
import { Pool } from 'pg';
import { PrismaPg } from '@prisma/adapter-pg';
import { PrismaClient } from '../../lib/generated/prisma/client';
import { courses } from './courses';

const connectionString = `${process.env.DIRECT_DATABASE_URL}`;
const pool = new Pool({ connectionString });
const adapter = new PrismaPg(pool);
const prisma = new PrismaClient({ adapter });

async function main() {
    for (const course of courses) {
        const created = await prisma.course.create({
            data: {
                ...course,
                lessons: {
                    create: course.lessons,
                },
            },
            include: {
                lessons: {
                    orderBy: { order: 'asc' },
                },
            },
        });
        for (let i = 1; i < created.lessons.length; i++) {
            await prisma.lesson.update({
                where: { id: created.lessons[i].id },
                data: {
                    prerequisites: {
                        connect: { id: created.lessons[i - 1].id },
                    },
                },
            });
        }
    }
}
main()
    .then(async () => {
        await prisma.$disconnect();
        await pool.end();
    })
    .catch(async (e) => {
        console.error(e);
        await prisma.$disconnect();
        await pool.end();
        process.exit(1);
    });
