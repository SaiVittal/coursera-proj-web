"use client";

import { Button } from "@/components/ui/button";
import { signOut } from "firebase/auth";
import { firebaseAuth } from "@/lib/firebase-client";
import { LoadingOverlay } from "@/components/ui/loading-overlay";
import React from "react";

export default function LogoutButton({ className }: { className?: string }) {
    const [isLoggingOut, setIsLoggingOut] = React.useState(false);

    return (
        <>
            {isLoggingOut && <LoadingOverlay message="Logging out safely..." />}
            <Button
                variant="destructive"
                className={className}
                loading={isLoggingOut}
                onClick={async () => {
                    setIsLoggingOut(true);
                    try {
                        // Artificial delay to smooth the transition for consistency
                        await new Promise(resolve => setTimeout(resolve, 1000));
                        await signOut(firebaseAuth);
                    } catch (err) {
                        console.warn("Firebase client signOut failed:", err);
                    }

                    window.location.assign("/api/auth/logout");
                }}
            >
                Sign Out
            </Button>
        </>
    );
}
