'use client';

import { motion, useScroll, useTransform } from 'motion/react';
import { getImageProps } from 'next/image';
import type { CourseRecord } from '@/types/courses';

type ParallaxProps = {
    courseData: CourseRecord;
};

export default function Parallax({ courseData }: ParallaxProps) {
    function getBackgroundImage(srcSet = '') {
        const imageSet = srcSet
            .split(', ')
            .map((str) => {
                const [url, dpi] = str.split(' ');
                return `url("${url}") ${dpi}`;
            })
            .join(', ');
        return `image-set(${imageSet})`;
    }
    // setting image
    const {
        props: { srcSet },
    } = getImageProps({
        src: `/courses/landing/${courseData?.imageUrl}`,
        width: 3456,
        height: 4320,
        alt: 'background picture',
    });
    const backgroundImage = getBackgroundImage(srcSet);
    const style = {
        height: '70vw',
        width: '60vw',
        backgroundImage,
    };

    // parallax

    const { scrollY } = useScroll();
    const backgroundY = useTransform(scrollY, [0, 1000], [0, -200]); // slowest
    const textY = useTransform(scrollY, [0, 1000], [0, -1600]); // medium
    const dummyMapY = useTransform(scrollY, [0, 1000], [0, -2400]); // fastest

    return (
        <div className="min-h-screen bg-white py-6 sm:py-8 dark:bg-gray-900">
            <div id="bg-image" className="mx-auto max-w-7xl px-6 lg:px-8 bg-[]">
                <motion.div
                    id="bg-image"
                    style={{ ...style, y: backgroundY }}
                    className="bg-scroll bg-no-repeat"
                >
                    <div className="flex flex-col w-full justify-center px-16 py-16">
                        <motion.div
                            className="mx-auto max-w-4xl px-16 py-8 lg:mx-0 backdrop-blur-xl rounded-xl"
                            style={{ y: textY }}
                        >
                            <h2 className="text-5xl font-semibold tracking-tight text-gray-400 sm:text-7xl dark:text-white">
                                {courseData?.title}
                            </h2>
                            <p className="mt-8 text-lg font-medium text-pretty text-gray-500 sm:text-xl/8 dark:text-gray-400">
                                {courseData?.description}
                            </p>
                        </motion.div>
                        <motion.div style={{ y: dummyMapY }}>
                            <div className="pt-10">
                                {courseData?.lessons.map((lesson) => (
                                    <div
                                        key={lesson.id}
                                        className="flex flex-col w-screen items-center my-20 gap-20"
                                    >
                                        <div className="min-w-md divide-y divide-gray-200 overflow-hidden rounded-lg bg-white shadow-sm dark:divide-white/10 dark:bg-gray-800/50 dark:shadow-none dark:outline dark:-outline-offset-1 dark:outline-white/10">
                                            <div className="px-4 py-5 sm:px-6 font-bold">
                                                {/* Content goes here */}
                                                {lesson.title}
                                            </div>
                                            <div className="px-4 py-5 sm:p-6">
                                                {/* Content goes here */}
                                                progress
                                            </div>
                                        </div>
                                    </div>
                                ))}
                            </div>
                        </motion.div>
                    </div>
                </motion.div>
            </div>
        </div>
    );
}
