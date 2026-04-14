import { auth } from '@/lib/auth';
import { headers } from 'next/headers';
import { Suspense } from 'react';
import Parallax from '@/components/courses/landing/Parallax';
import { getLessonsByCourseSlug } from '@/server/actions/courses/getCourses';
import { redirect, RedirectType } from 'next/navigation';

export default async function CourseLandingPage({
    params,
}: {
    params: Promise<{ locale: string; courseSlug: string }>;
}) {
    const resolvedParams = await params;
    const slug = resolvedParams.courseSlug;
    // session
    const session = await auth.api.getSession({
        headers: await headers(),
    });

    if (!session) {
        redirect('/sign-in', RedirectType.push);
    }

    // Fetch in parallel
    const courseData = await getLessonsByCourseSlug(session.user.id, slug);

    return (
        <Suspense>
            <Parallax courseData={courseData} />
        </Suspense>
    );
}
