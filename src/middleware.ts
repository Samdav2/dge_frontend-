import { NextResponse } from 'next/server';
import { securityHeaders, getCspHeader } from './lib/security/headers';
import { auth } from './auth';

export default auth((request) => {
    const isLoggedIn = !!request.auth;
    const { pathname } = request.nextUrl;

    const isProtectedRoute = pathname.startsWith('/dashboard') || pathname.startsWith('/admin');
    const isAuthPage = pathname === '/login' || pathname === '/register' || pathname === '/team-login';

    if (isProtectedRoute && !isLoggedIn) {
        return NextResponse.redirect(new URL('/login', request.url));
    }

    if (isAuthPage && isLoggedIn) {
        return NextResponse.redirect(new URL('/dashboard', request.url));
    }

    const nonce = Buffer.from(crypto.randomUUID()).toString('base64');
    const cspHeader = getCspHeader(nonce);

    const requestHeaders = new Headers(request.headers);
    requestHeaders.set('x-nonce', nonce);
    requestHeaders.set(cspHeader.key, cspHeader.value);

    const response = NextResponse.next({
        request: {
            headers: requestHeaders,
        },
    });

    // Set security headers
    securityHeaders.forEach(({ key, value }) => {
        response.headers.set(key, value);
    });

    // Set CSP header
    response.headers.set(cspHeader.key, cspHeader.value);

    return response;
});

export const config = {
    matcher: [
        /*
         * Match all request paths except for the ones starting with:
         * - api (API routes)
         * - _next/static (static files)
         * - _next/image (image optimization files)
         * - favicon.ico (favicon file)
         */
        '/((?!api|_next/static|_next/image|favicon.ico).*)',
    ],
};
