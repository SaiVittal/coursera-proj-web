import { getSessionUser } from "@/lib/session";
import { redirect } from "next/navigation";

export default async function DashboardPage() {
    const user = await getSessionUser();

    if (!user) {
        redirect("/");
    }

    return (
        <div className="space-y-6">
            <div className="flex flex-col gap-2">
                <h1 className="text-3xl font-bold tracking-tight">Dashboard</h1>
                <p className="text-muted-foreground">
                    Welcome back, {user.name || user.email}. Here&apos;s an overview of your account.
                </p>
            </div>
        </div>
    );
}
