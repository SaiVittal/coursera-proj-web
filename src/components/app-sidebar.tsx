"use client";

import * as React from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { LayoutDashboard, User, LogOut, BarChart3, ShieldCheck } from "lucide-react";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Button } from "@/components/ui/button";
import { signOut } from "firebase/auth";
import { firebaseAuth } from "@/lib/firebase-client";
import {
    DropdownMenu,
    DropdownMenuContent,
    DropdownMenuItem,
    DropdownMenuSeparator,
    DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { cn } from "@/lib/utils";
import { Separator } from "@/components/ui/separator";
import { LoadingOverlay } from "@/components/ui/loading-overlay";
import type { Role } from "@prisma/client";
import { PERSONA_LABELS, PERSONA_ACCESS } from "@/constants/personas";

type UserInfo = {
    email: string;
    name: string | null;
    role: Role;
};

const navItems = [
    { href: "/dashboard", label: "My Courses", icon: LayoutDashboard, id: "dashboard" },
    { href: "/reports", label: "Reports", icon: BarChart3, id: "reports" },
    { href: "/admin", label: "Admin", icon: ShieldCheck, id: "admin" },
];

export function AppSidebar({ user }: { user: UserInfo }) {
    const pathname = usePathname();
    const [isLoggingOut, setIsLoggingOut] = React.useState(false);

    const filteredNavItems = navItems.filter(item => {
        const allowedRoles = PERSONA_ACCESS[item.id];
        if (!allowedRoles) return true;
        return allowedRoles.some(role => role.toUpperCase() === user.role?.toUpperCase());
    });

    const initials = user.name
        ? user.name.split(" ").map((n: string) => n[0]).join("").slice(0, 2).toUpperCase()
        : user.email.slice(0, 2).toUpperCase();

    return (
        <>
            {isLoggingOut && <LoadingOverlay message="Logging out safely..." />}
            <aside className="flex h-screen w-64 flex-col border-r border-border bg-card text-card-foreground">
                <div className="flex flex-1 flex-col p-4">
                    <div className="mb-8 flex flex-col px-2">
                        <span className="text-2xl font-bold tracking-tight text-foreground/90 leading-none">Coursera</span>
                        <span className="text-[10px] mt-1 font-bold text-muted-foreground uppercase tracking-[0.2em]">Analysis Dashboard</span>
                    </div>

                    <nav className="flex flex-1 flex-col gap-1">
                        {filteredNavItems.map((item) => {
                            const isActive = pathname === item.href;
                            const Icon = item.icon;
                            return (
                                <Link
                                    key={item.href}
                                    href={item.href}
                                    className={`flex items-center gap-3 rounded-md px-3 py-3 text-sm font-semibold transition-all duration-200 ${isActive
                                        ? "bg-[#2563eb] text-white shadow-lg shadow-blue-500/20"
                                        : "text-muted-foreground hover:bg-muted/50 hover:text-foreground"
                                        }`}
                                >
                                    <Icon className={cn("h-4 w-4 shrink-0 transition-colors", isActive ? "text-white" : "text-muted-foreground")} />
                                    {item.label}
                                </Link>
                            );
                        })}
                    </nav>

                    <Separator className="my-4" />
                </div>
            </aside>
        </>
    );
}
