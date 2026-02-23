import { redirect } from "next/navigation";
import { getSessionUser } from "@/lib/session";
import { AppSidebar } from "@/components/app-sidebar";
import { Input } from "@/components/ui/input";
import { Search } from "lucide-react";
import { ThemeToggle } from "@/components/theme-toggle";
import { UserNav } from "@/components/user-nav";

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
                <header className="flex h-16 items-center justify-between border-b border-border bg-background px-8 shadow-sm">
                    <div className="relative w-full max-w-md">
                        <Search className="absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-muted-foreground" />
                        <Input
                            placeholder="Search courses..."
                            className="w-full bg-muted/20 pl-10 focus-visible:ring-1 focus-visible:ring-blue-500"
                        />
                    </div>
                    <div className="flex items-center gap-3">
                        <ThemeToggle />
                        <UserNav user={{
                            email: user.email,
                            name: user.name,
                            role: user.role,
                        }} />
                    </div>
                </header>
                <div className="flex-1 overflow-y-auto bg-muted/5">
                    <div className="container h-full max-w-7xl py-10 lg:py-12 mx-auto">
                        {children}
                    </div>
                </div>
            </main>
        </div>
    );
}
