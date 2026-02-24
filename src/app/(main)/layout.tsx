import { redirect } from "next/navigation";
import { getSessionUser } from "@/lib/session";
import { AppSidebar } from "@/components/app-sidebar";
import { Input } from "@/components/ui/input";
import { Search } from "lucide-react";
import { ThemeToggle } from "@/components/theme-toggle";
import { UserNav } from "@/components/user-nav";

import { GlobalSearch } from "@/components/global-search";

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
            <main className="flex-1 flex flex-col overflow-y-auto">
                <header className="flex h-16 items-center justify-between border-b border-border bg-background px-8">
                    <GlobalSearch />
                    <div className="flex items-center gap-4">
                        <ThemeToggle />
                        <UserNav user={{
                            email: user.email,
                            name: user.name,
                            role: user.role,
                        }} />
                    </div>
                </header>
                <div className="flex-1 overflow-y-auto bg-muted/20">
                    <div className="container h-full max-w-7xl py-8 mx-auto px-8">
                        {children}
                    </div>
                </div>
            </main>
        </div>
    );
}
