'use client';
import { authClient } from '@/lib/auth-client';
import { LockClosedIcon } from '@heroicons/react/24/outline';
import type { CourseWithLessons } from '@/types/courses';
import Link from 'next/link';

type LessonButtonProps = {
    courseSlug: string;
    lesson: CourseWithLessons['lessons'][number];
    done?: boolean;
    unlocked?: boolean;
};

type CourseButtonProps = {
    courseSlug: string;
    size?: 'sm' | 'md';
};

export function PreviewCourseButton({
    courseSlug,
    size = 'md',
}: CourseButtonProps) {
    const sizeClasses =
        size === 'sm' ? 'px-2 py-0.5 text-xs h-7' : 'px-2.5 py-1 text-sm';

    return (
        <Link
            href={`/course/${courseSlug}`}
            type="button"
            className={`flex items-center justify-center rounded-full bg-white font-semibold text-gray-900 shadow-xs inset-ring inset-ring-gray-300 hover:bg-gray-50 dark:bg-white/10 dark:text-white dark:shadow-none dark:inset-ring-white/5 dark:hover:bg-white/20 cursor-pointer ${sizeClasses}`}
        >
            Preview
        </Link>
    );
}

export function CourseButton({ courseSlug, size = 'md' }: CourseButtonProps) {
    const sizeClasses =
        size === 'sm'
            ? 'px-3 py-1 text-xs h-7 min-w-[90px]'
            : 'px-3.5 py-2 text-sm';

    return (
        <Link
            href={`/course/${courseSlug}`}
            type="button"
            className={`flex items-center justify-center whitespace-nowrap rounded-full bg-indigo-600 font-semibold text-white shadow-xs hover:bg-indigo-500 focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600 cursor-pointer ${sizeClasses}`}
        >
            Start course
        </Link>
    );
}
export function LessonButton({
    lesson,
    courseSlug,
    done,
    unlocked,
}: LessonButtonProps) {
    // better-auth session
    const { data: session } = authClient.useSession();
    // locked status:

    return (
        <>
            {!session?.user ? (
                <LockClosedIcon className="size-4" />
            ) : (
                <>
                    {done && (
                        <Link
                            href={`course/${courseSlug}/${lesson.slug}`}
                            className="rounded-md bg-white px-2.5 py-1.5 text-sm font-semibold text-gray-900 shadow-xs inset-ring inset-ring-gray-300 hover:bg-gray-50  cursor-pointer"
                        >
                            re-do
                        </Link>
                    )}
                    {unlocked && (
                        <Link
                            href={`course/${courseSlug}/${lesson.slug}`}
                            className=" rounded-md bg-white px-2.5 py-1.5 text-sm font-semibold text-gray-900 shadow-xs inset-ring inset-ring-gray-300 hover:bg-gray-50  cursor-pointer"
                        >
                            go
                        </Link>
                    )}
                    {!unlocked && <LockClosedIcon className="size-4" />}
                </>
            )}
        </>
    );
}
