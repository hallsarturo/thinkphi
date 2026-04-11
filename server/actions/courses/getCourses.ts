'use server';

import prisma from '@/lib/prisma';

export async function getCourses() {
    try {
        const result = prisma.course.findMany({
            include: {
                lessons: true,
            },
        });
        console.log(result);

        return result;
    } catch (err) {
        console.error('getCourses error: ', err);
        throw new Error('Failed to fetch courses');
    }
}
