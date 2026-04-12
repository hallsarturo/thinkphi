import { Difficulty } from '../../lib/generated/prisma/client';

export const courses = [
    {
        title: 'Pseudo-Science Demarcation 1',
        slug: 'pseudo-science-demarcation-1',
        description:
            'Why astrology, chiropraxy, are not praised by science? Does science have the truth of everything? Why are we certain of scientific laws?',
        difficulty: Difficulty.BEGINNER,
        lessons: [
            {
                title: 'What is Pseudo-Science?',
                slug: 'what-is-pseudo-science',
                content:
                    'Introduction to pseudo-science and its characteristics.',
                order: 1,
            },
            {
                title: 'Demarcation Problem',
                slug: 'demarcation-problem',
                content:
                    'Exploring the boundary between science and non-science.',
                order: 2,
            },
            {
                title: 'Case Study: Astrology',
                slug: 'case-study-astrology',
                content: 'Why astrology is not considered scientific.',
                order: 3,
            },
            {
                title: 'Science and Certainty',
                slug: 'science-and-certainty',
                content: 'How certain can we be about scientific laws?',
                order: 4,
            },
        ],
    },
    {
        title: 'Bayesian Reasoning 1',
        slug: 'bayesian-reasoning-1',
        description: 'course description',
        difficulty: Difficulty.BEGINNER,
        lessons: [
            {
                title: 'Introduction to Bayesian Thinking',
                slug: 'intro-to-bayesian-thinking',
                content: 'Basics of Bayesian probability.',
                order: 1,
            },
            {
                title: 'Bayes’ Theorem Explained',
                slug: 'bayes-theorem-explained',
                content: 'Understanding Bayes’ theorem with examples.',
                order: 2,
            },
            {
                title: 'Applications in Everyday Life',
                slug: 'applications-in-everyday-life',
                content: 'How Bayesian reasoning is used in real life.',
                order: 3,
            },
            {
                title: 'Common Misconceptions',
                slug: 'common-misconceptions',
                content: 'Clearing up misunderstandings about Bayesian logic.',
                order: 4,
            },
        ],
    },
    {
        title: 'Philosophy of Religion',
        slug: 'philosophy-of-religion-1',
        description: 'course description',
        difficulty: Difficulty.BEGINNER,
        lessons: [
            {
                title: 'Arguments for God’s Existence',
                slug: 'arguments-for-god-existence',
                content: 'Overview of classical arguments for God.',
                order: 1,
            },
            {
                title: 'The Problem of Evil',
                slug: 'problem-of-evil',
                content: 'How philosophers address the problem of evil.',
                order: 2,
            },
            {
                title: 'Faith and Reason',
                slug: 'faith-and-reason',
                content: 'Exploring the relationship between faith and reason.',
                order: 3,
            },
            {
                title: 'Religious Experience',
                slug: 'religious-experience',
                content: 'Philosophical analysis of religious experiences.',
                order: 4,
            },
        ],
    },
];
