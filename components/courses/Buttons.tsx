'use client';
import { authClient } from '@/lib/auth-client';
import { LockClosedIcon } from '@heroicons/react/24/outline';
import type { CourseWithLessons } from './CoursesList';
import Link from 'next/link';

type LessonButtonProps = {
    courseSlug: string;
    lesson: CourseWithLessons['lessons'][number];
};

type CourseButtonProps = {
    courseSlug: string;
};

export function PreviewCourse({ courseSlug }: CourseButtonProps) {
    return (
        <Link
            href={`/courses/${courseSlug}`}
            type="button"
            className="rounded-full bg-white px-4 py-2.5 text-sm font-semibold text-gray-900 shadow-xs inset-ring inset-ring-gray-300 hover:bg-gray-50 dark:bg-white/10 dark:text-white dark:shadow-none dark:inset-ring-white/5 dark:hover:bg-white/20 cursor-pointer"
        >
            Start course
        </Link>
    );
}

export function CourseButton({ courseSlug }: CourseButtonProps) {
    return (
        <Link
            href={`/courses/${courseSlug}`}
            type="button"
            className="rounded-full bg-indigo-600 px-3.5 py-2 text-sm font-semibold text-white shadow-xs hover:bg-indigo-500 focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600 cursor-pointer"
        >
            Start course
        </Link>
    );
}
export function LessonButton({ lesson, courseSlug }: LessonButtonProps) {
    // better-auth session
    const { data: session } = authClient.useSession();
    // locked status:
    function isLessonDone(lesson) {
        return lesson.completitions && lesson.completitions.length > 0;
    }

    functin isLessonUnlocked(lesson, lessonsById) {
        if(!lesson.prerequisites || lesson.prerequisites.length === 0) {
            
        }
    }

    return (
        <Link
            href={`courses/${courseSlug}/${lesson.slug}`}
            className="hidden rounded-md bg-white px-2.5 py-1.5 text-sm font-semibold text-gray-900 shadow-xs inset-ring inset-ring-gray-300 hover:bg-gray-50 sm:block cursor-pointer"
        >
            {!session?.user ? <LockClosedIcon className="size-4" /> : 'go'}
            <span className="sr-only">, {lesson.title}</span>
        </Link>
    );
}
