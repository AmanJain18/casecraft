import { NextResponse } from 'next/server';
import type { NextRequest } from 'next/server';
import { getKindeServerSession } from '@kinde-oss/kinde-auth-nextjs/server';

export async function middleware(request: NextRequest) {
    // List of protected routes
    const protectedRoutes = ['/dashboard', '/orders', '/configurations'];

    // Check if the current path is protected
    if (protectedRoutes.includes(request.nextUrl.pathname)) {
        // Get user session from Kinde
        const { getUser } = getKindeServerSession();
        const user = await getUser();

        // Redirect to homepage if user is not authenticated
        if (!user) {
            return NextResponse.redirect(new URL('/', request.url));
        }
    }

    return NextResponse.next();
}

// Apply the middleware to these routes
export const config = {
    matcher: ['/dashboard', '/orders', '/configurations'],
};
