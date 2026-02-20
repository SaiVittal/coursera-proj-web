import { NextResponse } from "next/server";
import type { NextRequest } from "next/server";
import { jwtVerify } from "jose";

const authSecret = process.env.AUTH_SECRET;
if (!authSecret) {
    throw new Error("AUTH_SECRET environment variable is required");
}
const secret = new TextEncoder().encode(authSecret);

export async function proxy(request: NextRequest) {
    const { pathname } = request.nextUrl;
    const sessionCookie = request.cookies.get("session");

    // 1. Define protected routes
    const protectedRoutes = ["/dashboard", "/profile"];
    const isProtectedRoute = protectedRoutes.some((route) =>
        pathname.startsWith(route)
    );

    // If there is no session at all, just handle protected routes
    if (!sessionCookie?.value) {
        if (isProtectedRoute) {
            return NextResponse.redirect(new URL("/", request.url));
        }
        return NextResponse.next();
    }

    try {
        // Verify JWT
        const { payload } = await jwtVerify(sessionCookie.value, secret);

        // Check expiry
        const now = Math.floor(Date.now() / 1000);
        if (payload.exp && payload.exp < now) {
            if (isProtectedRoute || pathname === "/") {
                const response = NextResponse.redirect(new URL("/?session=expired", request.url));
                response.cookies.delete("session");
                return response;
            }
        }

        // VALID session - If user is on landing page, redirect to dashboard
        if (pathname === "/") {
            return NextResponse.redirect(new URL("/dashboard", request.url));
        }

        return NextResponse.next();
    } catch {
        // INVALID or Corrupted token
        if (isProtectedRoute) {
            const response = NextResponse.redirect(new URL("/?session=invalid", request.url));
            response.cookies.delete("session");
            return response;
        }

        return NextResponse.next();
    }
}

export const config = {
    matcher: [
        /*
         * Match all request paths except for the ones starting with:
         * - api (API routes, though we might want to protect some of them separately)
         * - _next/static (static files)
         * - _next/image (image optimization files)
         * - favicon.ico (favicon file)
         */
        "/((?!api|_next/static|_next/image|favicon.ico).*)",
    ],
};
