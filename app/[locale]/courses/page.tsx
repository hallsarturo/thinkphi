import { auth } from '@/lib/auth';
import { headers } from 'next/headers';
import { getTranslations } from 'next-intl/server';
import { Suspense } from 'react';
import CoursesList from '@/components/courses/CoursesList';

export default async function CoursesPage() {
    const t = await getTranslations('CoursesPage');
    const session = await auth.api.getSession({ headers: await headers() });

    return (
        <div className="min-h-screen overflow-hidden bg-white py-12 sm:py-6 dark:bg-gray-900">
            <div className="flex flex-col mx-auto max-w-2xl px-6 lg:max-w-7xl lg:px-8 gap-8">
                <div className="border-b border-gray-200 pb-5 dark:border-white/10">
                    <h3 className="text-base font-semibold text-gray-900 dark:text-white">
                        {t('title')}
                    </h3>
                </div>
                <Suspense fallback={<div>Loading...</div>}>
                    <CoursesList userId={session?.user?.id} />
                </Suspense>
            </div>
        </div>
    );
}
