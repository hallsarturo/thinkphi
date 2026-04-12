import { useTranslations } from 'next-intl';
import { Suspense } from 'react';
import { getCourses } from '@/server/actions/courses/getCourses';
import CoursesList from '@/components/courses/CoursesList';

// const t = useTranslations('CoursesPage');

export default async function CoursesPage() {
    // courses data
    const courses = await getCourses();

    return (
        <div className="min-h-screen overflow-hidden bg-white py-12 sm:py-6 dark:bg-gray-900">
            <div className="flex flex-col mx-auto max-w-2xl px-6 lg:max-w-7xl lg:px-8 gap-8">
                <div className="border-b border-gray-200 pb-5 dark:border-white/10">
                    <h3 className="text-base font-semibold text-gray-900 dark:text-white">
                        {/* {t('title')} */} Courses
                    </h3>
                </div>
                <Suspense fallback={<div>Loading...</div>}>
                    <CoursesList courses={courses} />
                </Suspense>
            </div>
        </div>
    );
}
