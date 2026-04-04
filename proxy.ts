import { NextRequest, NextResponse } from 'next/server';
import createMiddleware from 'next-intl/middleware';
import { routing } from './i18n/routing';

// Localization routing Next-Intl
const intlMiddleware = createMiddleware(routing);

export default function middleware(request: NextRequest) {
    // Run Next-Intl middleware
    const response = intlMiddleware(request);

    // Optimistic secure proxing (better-auth, next.js)

    // Protected paths
    const protectedPaths = ['/payment'];
    const { pathname } = request.nextUrl;

    if (protectedPaths.some((path) => pathname.startsWith(path))) {
        // Check for the session cookie
        const session = request.cookies.get('better-auth.session_token');
        if (!session) {
            return NextResponse.redirect(new URL('/sign-up', request.url));
        }
    }

    // Continue
    return response;
}

export const config = {
    // Match all pathnames except for
    // - … if they start with `/api`, `/trpc`, `/_next` or `/_vercel`
    // - … the ones containing a dot (e.g. `favicon.ico`)
    matcher: '/((?!api|trpc|_next|_vercel|.*\\..*).*)',
};
