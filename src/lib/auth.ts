import { SignJWT, jwtVerify } from "jose";
import { cookies } from "next/headers";

const authSecret = process.env.AUTH_SECRET;
if (!authSecret) {
    throw new Error("AUTH_SECRET environment variable is required");
}
const secret = new TextEncoder().encode(authSecret);

export const SESSION_COOKIE_NAME = "session";

// Session expires in 1 hour
const SESSION_EXPIRY_MS = 1 * 60 * 60 * 1000;

export interface SessionPayload {
    email: string;
    iat: number;
    exp: number;
}

export async function createSession(email: string) {
    const expiresAt = new Date(Date.now() + SESSION_EXPIRY_MS);
    const iat = Math.floor(Date.now() / 1000);
    const exp = Math.floor(expiresAt.getTime() / 1000);

    const session = await new SignJWT({ email, iat, exp })
        .setProtectedHeader({ alg: "HS256" })
        .setIssuedAt(iat)
        .setExpirationTime(exp)
        .sign(secret);

    const cookieStore = await cookies();

    // Set session cookie
    cookieStore.set(SESSION_COOKIE_NAME, session, {
        httpOnly: true,
        secure: process.env.NODE_ENV === "production",
        sameSite: "lax",
        expires: expiresAt,
        path: "/",
        // Prevent client-side access
        maxAge: Math.floor(SESSION_EXPIRY_MS / 1000),
    });

    return session;
}

export async function getSession(): Promise<SessionPayload | null> {
    const cookieStore = await cookies();
    const sessionCookie = cookieStore.get(SESSION_COOKIE_NAME);

    if (!sessionCookie?.value) {
        return null;
    }

    try {
        const { payload } = await jwtVerify(sessionCookie.value, secret);

        return {
            email: payload.email as string,
            iat: payload.iat as number,
            exp: payload.exp as number,
        };
    } catch {
        // Invalid or expired token
        return null;
    }

}

export async function getSessionFromRequest(cookieValue: string | undefined): Promise<SessionPayload | null> {
    if (!cookieValue) {
        return null;
    }

    try {
        const { payload } = await jwtVerify(cookieValue, secret);

        // Check expiry
        const now = Math.floor(Date.now() / 1000);
        if (payload.exp && payload.exp < now) {
            return null;
        }

        return {
            email: payload.email as string,
            iat: payload.iat as number,
            exp: payload.exp as number,
        };
    } catch {
        return null;
    }
}

export async function deleteSession() {
    const cookieStore = await cookies();

    // Delete session cookie
    cookieStore.delete(SESSION_COOKIE_NAME);
}

export function isSessionExpired(session: SessionPayload | null): boolean {
    if (!session) return true;
    const now = Math.floor(Date.now() / 1000);
    return session.exp < now;
}
