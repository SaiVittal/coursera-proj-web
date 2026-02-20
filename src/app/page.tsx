import { redirect } from "next/navigation";
import { getSessionUser } from "@/lib/session";
import { GoogleSignInButton } from "@/components/google-sign-in-button";

export default async function Home({
    searchParams,
}: {
    searchParams: Promise<{ error?: string; logout?: string; session?: string }>;
}) {
    // If user is already logged in, redirect to dashboard
    const user = await getSessionUser();
    if (user) {
        redirect("/dashboard");
    }

    const params = await searchParams;
    const error = params.error;
    const sessionExpired = params.session === "expired";

    return (
        <div className="flex h-screen items-center justify-center bg-background">
            <div className="text-center space-y-6 max-w-lg mx-auto px-4">
                <h1 className="text-4xl font-extrabold tracking-tight lg:text-5xl text-foreground">
                    Next.js + Firebase{" "}
                    <span className="text-primary">Enterprise Template</span>
                </h1>
                <p className="text-muted-foreground">
                    Production-ready skeleton with Postgres, Prisma, RBAC, and Custom
                    Session Management.
                </p>

                {/* Success/Error Messages */}
                {/* {logoutSuccess && (
                    <div className="rounded-lg border border-green-500/50 bg-green-500/10 p-4 text-green-600 dark:text-green-400">
                        <p className="font-medium">Successfully logged out</p>
                        <p className="text-sm mt-1">Your session has been cleared.</p>
                    </div>
                )} */}

                {sessionExpired && (
                    <div className="rounded-lg border border-yellow-500/50 bg-yellow-500/10 p-4 text-yellow-600 dark:text-yellow-400">
                        <p className="font-medium">Session expired</p>
                        <p className="text-sm mt-1">
                            Please log in again to continue.
                        </p>
                    </div>
                )}

                {error && (
                    <div className="rounded-lg border border-red-500/50 bg-red-500/10 p-4 text-red-600 dark:text-red-400">
                        <p className="font-medium">Authentication Error</p>
                        <p className="text-sm mt-1">
                            {error === "invalid_state"
                                ? "Invalid authentication request. Please try again."
                                : error === "authentication_failed"
                                    ? "Authentication failed. Please try again."
                                    : "An error occurred during authentication. Please try again."}
                        </p>
                    </div>
                )}

                <div className="pt-4">
                    <GoogleSignInButton />
                </div>

                <div className="mt-8 text-sm text-muted-foreground">
                    <p>Ensure .env is configured and Docker DB is running.</p>
                </div>
            </div>
        </div>
    );
}
