import { db } from "@/db/handler";
import { getSession, isSessionExpired } from "./auth";

/**
 * Get the current session user from database.
 * Returns null if session is invalid, expired, or user doesn't exist.
 */
export async function getSessionUser() {
    const session = await getSession();

    if (!session || isSessionExpired(session)) {
        return null;
    }

    try {
        const user = await db.user.findByEmail(session.email);
        return user;
    } catch (error) {
        console.error("Error fetching session user:", error);
        return null;
    }
}
