import { NextResponse } from 'next/server';
import type { NextRequest } from 'next/server';
import { getKindeServerSession } from '@kinde-oss/kinde-auth-nextjs/server';

export async function middleware(request: NextRequest) {
    // List of protected routes
    const protectedRoutes = ['/orders', '/configurations'];

    // Check if the current path is protected
    if (protectedRoutes.includes(request.nextUrl.pathname)) {
        // Get user session from Kinde
        try {
            const { getUser } = getKindeServerSession();
            const user = await getUser();

            if (!user) {
                return NextResponse.redirect(new URL('/', request.url));
            }
        } catch (error) {
            console.error('Error fetching user session:', error);
            return NextResponse.redirect(new URL('/', request.url));
        }
    }

    const response = NextResponse.next();
    response.headers.set('Cache-Control', 'no-store, max-age=0');
    return response;
}

// Apply the middleware to these routes
export const config = {
    matcher: ['/orders', '/configurations'],
};
