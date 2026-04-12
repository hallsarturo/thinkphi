'use client';
import { authClient } from '@/lib/auth-client';
import { LockClosedIcon } from '@heroicons/react/24/outline';
import type { CourseWithLessons } from './CoursesList';

type LessonButtonProps = {
    lesson: CourseWithLessons['lessons'][number];
};

export default function LessonButton({ lesson }: LessonButtonProps) {
    // better-auth session
    const { data: session } = authClient.useSession();
    return (
        <a
            href={lesson.href}
            className="hidden rounded-md bg-white px-2.5 py-1.5 text-sm font-semibold text-gray-900 shadow-xs inset-ring inset-ring-gray-300 hover:bg-gray-50 sm:block cursor-pointer"
        >
            {/* TODO: implement course status in backend */}
            {!session?.user ? <LockClosedIcon className="size-4" /> : 'go'}
            <span className="sr-only">, {lesson.title}</span>
        </a>
    );
}
