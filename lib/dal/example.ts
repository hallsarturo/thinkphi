// Data Access Layer

import { auth } from '@/lib/auth';
import { headers } from 'next/headers';
import { cache } from 'react';

// use React cache to prevent redundant DB calls within a single request
export const getSession = cache(async () => {
    return await auth.api.getSession({
        headers: await headers(),
    });
});

export async function verifySession() {
    const session = await getSession();
    if (!session) return { isAuth: false, user: null };
    return { isAuth: true, user: session.user };
}
