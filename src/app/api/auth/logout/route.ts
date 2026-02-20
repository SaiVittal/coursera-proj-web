import { NextRequest, NextResponse } from "next/server";
import { deleteSession, SESSION_COOKIE_NAME } from "@/lib/auth";

/**
 * Production-grade logout handler:
 * 1. Clears all session cookies
 * 2. Redirects with proper cache headers
 * 3. Ensures no auto-login after logout
 */
export async function GET(req: NextRequest) {
    try {
        // Clear all session data (server-side context)
        await deleteSession();

        // Create redirect response with security headers
        const redirectUrl = new URL("/", req.url);
        redirectUrl.searchParams.set("logout", "success");

        const response = NextResponse.redirect(redirectUrl);

        // Add security headers to prevent caching
        response.headers.set("Cache-Control", "no-store, no-cache, must-revalidate, max-age=0");
        response.headers.set("Pragma", "no-cache");
        response.headers.set("Expires", "0");

        // Clear any remaining cookies explicitly on the response object
        // This ensures the Set-Cookie header is sent to the client
        response.cookies.delete(SESSION_COOKIE_NAME);
        // Also try to expire it manually just in case
        response.cookies.set(SESSION_COOKIE_NAME, "", { maxAge: 0, path: "/" });


        return response;
    } catch (error) {
        console.error("Logout error:", error);
        // Even if there's an error, try to redirect
        return NextResponse.redirect(new URL("/", req.url));
    }
}
