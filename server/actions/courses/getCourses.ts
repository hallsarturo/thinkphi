'use server';

import prisma from '@/lib/prisma';

export async function getCourses(userId?: string) {
    try {
        const result = prisma.course.findMany({
            include: {
                lessons: {
                    include: {
                        completions: userId ? { where: { userId } } : false,
                    },
                    orderBy: { order: 'asc' },
                },
                enrollments: userId ? { where: { userId } } : false,
            },
        });
        return result;
    } catch (err) {
        console.error('getCourses error: ', err);
        throw new Error('Failed to fetch courses');
    }
}

export async function getLessonsByCourseId(courseId: string) {}
