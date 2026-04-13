'use client';

import React, { useState, useRef } from 'react';
import { motion, useScroll, useTransform } from 'motion/react';
import { getImageProps } from 'next/image';

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

function DummyMap() {
    return (
        <div className="flex flex-col w-screen items-center mt-20 gap-20">
            <div className="w-70 h-25 m-2 inline-block rounded-lg bg-red-400"></div>
            <div className="w-70 h-25 m-2 inline-block rounded-lg bg-blue-400"></div>
            <div className="w-70 h-25 m-2 inline-block rounded-lg bg-green-400"></div>
        </div>
    );
}

export default function Parallax() {
    // setting image
    const {
        props: { srcSet },
    } = getImageProps({
        src: '/courses/landing/pexels-marcus-lenk-3854713-11119786.jpg',
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
    const textY = useTransform(scrollY, [0, 1000], [0, -400]); // medium
    const dummyMapY = useTransform(scrollY, [0, 1000], [0, -600]); // fastest

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
                            <h2 className="text-5xl font-semibold tracking-tight text-gray-900 sm:text-7xl dark:text-white">
                                Ps
                                <span className="text-white">
                                    eudo-Science{' '}
                                </span>
                                de
                                <span className="text-white">marcation 1</span>
                            </h2>
                            <p className="mt-8 text-lg font-medium text-pretty text-gray-500 sm:text-xl/8 dark:text-gray-400">
                                Anim aute id magna aliqua ad ad non deserunt
                                sunt. Qui irure qui lorem cupidatat commodo.
                                Elit sunt amet fugiat veniam occaecat fugiat.
                            </p>
                        </motion.div>
                        <motion.div style={{ y: dummyMapY }}>
                            <DummyMap />
                        </motion.div>
                    </div>
                </motion.div>
            </div>
        </div>
    );
}
