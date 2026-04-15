import { Menu, MenuButton, MenuItem, MenuItems } from '@headlessui/react';
import { EllipsisVerticalIcon } from '@heroicons/react/20/solid';
import { getCourses } from '@/server/actions/courses/getCourses';
import type { CourseWithLessons } from '@/types/courses';
import {
    LessonButton,
    CourseButton,
    PreviewCourseButton,
} from '@/components/courses/Buttons';

export default async function CoursesList({ userId }: { userId?: string }) {
    const courses: CourseWithLessons[] = await getCourses(userId);

    const difficultyStyles: Record<string, string> = {
        beginner:
            'bg-green-50 text-green-700 inset-ring inset-ring-green-600/20',
        medium: 'bg-yellow-50 text-yellow-800 inset-ring inset-ring-yellow-600/20',
        hard: 'bg-red-50 text-red-700 inset-ring inset-ring-red-600/20',
    };

    const lessonsById: Record<string, CourseWithLessons['lessons'][number]> =
        {};
    courses.forEach((course) => {
        course.lessons.forEach((lesson) => {
            lessonsById[lesson.id] = lesson;
        });
    });

    function isLessonDone(lesson: CourseWithLessons['lessons'][number]) {
        return lesson.completions && lesson.completions.length > 0;
    }

    function isLessonUnlocked(
        lesson: CourseWithLessons['lessons'][number],
        lessonsById: Record<string, CourseWithLessons['lessons'][number]>
    ) {
        if (!lesson.prerequisites || lesson.prerequisites.length === 0)
            return true;
        return lesson.prerequisites.every(
            (prereq) => lessonsById[prereq.id]?.completions?.length > 0
        );
    }

    return (
        <>
            {courses.map((course) => (
                <div
                    key={course.id}
                    className="divide-y divide-gray-200 overflow-hidden rounded-lg bg-white shadow-sm dark:divide-white/10 dark:bg-gray-800/50 dark:shadow-none dark:outline dark:-outline-offset-1 dark:outline-white/10"
                >
                    {/* Card Titles */}
                    <div className="flex flex-col sm:flex-row justify-between align-middle font-semibold px-4 py-5 sm:px-6 gap-2">
                        {/* Left group: title, difficulty, xp */}
                        <div className="flex flex-col sm:flex-row sm:items-center gap-1 sm:gap-4">
                            <span className="text-base sm:text-lg">
                                {course.title}
                            </span>
                            <div className="flex flex-col sm:flex-row sm:items-center gap-1 sm:gap-2">
                                <p
                                    className={`self-start rounded-md px-1 py-0.5 text-[10px] sm:text-xs ${difficultyStyles[course.difficulty.toLowerCase()] || 'bg-gray-100 text-gray-800'}`}
                                >
                                    {course.difficulty}
                                </p>
                                <p className="text-[10px] sm:text-xs">
                                    {course.xpReward} xp
                                </p>
                            </div>
                        </div>
                        {/* Right group: Preview and Course buttons */}
                        <div className="flex flex-row justify-end sm:flex-row items-end sm:items-center gap-2 sm:gap-4">
                            <PreviewCourseButton
                                courseSlug={course.slug}
                                size="sm"
                            />
                            <CourseButton courseSlug={course.slug} size="sm" />
                        </div>
                    </div>
                    {/* Card Content */}
                    <div className="px-4 py-5 sm:p-6">
                        <ul role="list" className="divide-y divide-gray-100">
                            {course.lessons.map((lesson) => (
                                <li
                                    key={lesson.id}
                                    className="flex items-center justify-between gap-x-6 py-5"
                                >
                                    <div className="min-w-0">
                                        <div className="flex items-start gap-x-3">
                                            <p className="text-sm/6 font-semibold text-gray-900">
                                                {lesson.title}
                                            </p>
                                        </div>
                                        <div className="mt-1 flex items-center gap-x-2 text-xs/5 text-gray-500">
                                            <p className="whitespace-nowrap">
                                                description
                                            </p>
                                        </div>
                                    </div>
                                    <div className="flex flex-none items-center gap-x-4">
                                        {/* {lesson.status === 'In progress' ? (
                                            <p className="mt-0.5 rounded-md bg-gray-50 px-1.5 py-0.5 text-xs font-medium text-gray-600 inset-ring inset-ring-gray-500/10">
                                                {lesson.status}
                                            </p>
                                        ) : null}
                                        {lesson.status === 'Complete' ? (
                                            <p className="mt-0.5 rounded-md bg-green-50 px-1.5 py-0.5 text-xs font-medium text-green-700 inset-ring inset-ring-green-600/20">
                                                {lesson.status}
                                            </p>
                                        ) : null}
                                        {lesson.status === 'Archived' ? (
                                            <p className="mt-0.5 rounded-md bg-yellow-50 px-1.5 py-0.5 text-xs font-medium text-yellow-800 inset-ring inset-ring-yellow-600/20">
                                                {lesson.status}
                                            </p>
                                        ) : null} */}

                                        <LessonButton
                                            courseSlug={course.slug}
                                            lesson={lesson}
                                            done={isLessonDone(lesson)}
                                            unlocked={isLessonUnlocked(
                                                lesson,
                                                lessonsById
                                            )}
                                        />

                                        <Menu
                                            as="div"
                                            className="relative flex-none"
                                        >
                                            <MenuButton className="relative block text-gray-500 hover:text-gray-900">
                                                <span className="absolute -inset-2.5" />
                                                <span className="sr-only">
                                                    Open options
                                                </span>
                                                <EllipsisVerticalIcon
                                                    aria-hidden="true"
                                                    className="size-5"
                                                />
                                            </MenuButton>
                                            <MenuItems
                                                transition
                                                className="absolute right-0 z-10 mt-2 w-32 origin-top-right rounded-md bg-white py-2 shadow-lg outline-1 outline-gray-900/5 transition data-closed:scale-95 data-closed:transform data-closed:opacity-0 data-enter:duration-100 data-enter:ease-out data-leave:duration-75 data-leave:ease-in"
                                            >
                                                <MenuItem>
                                                    <a
                                                        href="#"
                                                        className="block px-3 py-1 text-sm/6 text-gray-900 data-focus:bg-gray-50 data-focus:outline-hidden"
                                                    >
                                                        Edit
                                                        <span className="sr-only">
                                                            , {lesson.title}
                                                        </span>
                                                    </a>
                                                </MenuItem>
                                                <MenuItem>
                                                    <a
                                                        href="#"
                                                        className="block px-3 py-1 text-sm/6 text-gray-900 data-focus:bg-gray-50 data-focus:outline-hidden"
                                                    >
                                                        Move
                                                        <span className="sr-only">
                                                            , {lesson.title}
                                                        </span>
                                                    </a>
                                                </MenuItem>
                                                <MenuItem>
                                                    <a
                                                        href="#"
                                                        className="block px-3 py-1 text-sm/6 text-gray-900 data-focus:bg-gray-50 data-focus:outline-hidden"
                                                    >
                                                        Delete
                                                        <span className="sr-only">
                                                            , {lesson.title}
                                                        </span>
                                                    </a>
                                                </MenuItem>
                                            </MenuItems>
                                        </Menu>
                                    </div>
                                </li>
                            ))}
                        </ul>
                    </div>
                </div>
            ))}
        </>
    );
}
