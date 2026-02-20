"use client";

import { useState } from "react";
import { signInWithPopup } from "firebase/auth";
import { firebaseAuth, googleProvider } from "@/lib/firebase-client";
import { Button } from "@/components/ui/button";

export function GoogleSignInButton() {
    const [loading, setLoading] = useState(false);

    const onSignIn = async () => {
        setLoading(true);
        try {
            const credential = await signInWithPopup(firebaseAuth, googleProvider);
            const idToken = await credential.user.getIdToken();

            const response = await fetch("/api/auth/login", {
                method: "POST",
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify({ idToken }),
            });

            if (!response.ok) {
                window.location.assign("/?error=authentication_failed");
                return;
            }

            window.location.assign("/dashboard");
        } catch (error) {
            console.error("Google sign-in failed", error);
            window.location.assign("/?error=authentication_failed");
        } finally {
            setLoading(false);
        }
    };

    return (
        <Button
            type="button"
            onClick={onSignIn}
            size="lg"
            className="px-8 py-6 text-lg shadow-xl"
            loading={loading}
        >
            Continue with Google
        </Button>
    );
}
