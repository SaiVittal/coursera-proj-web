import { redirect } from "next/navigation";
import { getSessionUser } from "@/lib/session";
import { AppSidebar } from "@/components/app-sidebar";

export default async function AuthenticatedLayout({
    children,
}: {
    children: React.ReactNode;
}) {
    const user = await getSessionUser();

    if (!user) {
        redirect("/");
    }

    return (
        <div className="flex h-screen overflow-hidden bg-background">
            <div className="hidden md:block">
                <AppSidebar
                    user={{
                        email: user.email,
                        name: user.name,
                        role: user.role,
                    }}
                />
            </div>
            <main className="flex-1 overflow-y-auto bg-muted/10">
                <div className="container h-full max-w-6xl py-6 lg:py-8">
                    {children}
                </div>
            </main>
        </div>
    );
}
