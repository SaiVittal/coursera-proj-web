import { db } from "@/db/handler";
import { createSession, getSession } from "@/lib/auth";
import { api } from "@/lib/api-handler";
import { getFirebaseAdminAuth } from "@/lib/firebase-admin";

type LoginBody = {
    idToken?: string;
};

export async function POST(req: Request) {
    const existingSession = await getSession();
    if (existingSession) {
        return api.ok({ authenticated: true });
    }

    let body: LoginBody;
    try {
        body = (await req.json()) as LoginBody;
    } catch {
        return api.badRequest("Invalid request body");
    }

    if (!body.idToken) {
        return api.badRequest("Missing idToken");
    }

    try {
        const firebaseAdminAuth = getFirebaseAdminAuth();
        const decodedToken = await firebaseAdminAuth.verifyIdToken(body.idToken, true);
        const email = decodedToken.email;

        if (!email) {
            return api.badRequest("Authenticated Firebase user has no email");
        }

        const name = typeof decodedToken.name === "string" ? decodedToken.name : null;

        const user = await db.user.upsert({
            email,
            name,
        });

        await createSession(user.email);

        return api.ok({
            authenticated: true,
            user: {
                email: user.email,
                name: user.name,
            },
        });
    } catch (error) {
        console.error("Firebase login verification failed:", error);
        return api.unauthorized("Invalid Firebase token");
    }
}
