"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { LayoutDashboard, User, LogOut } from "lucide-react";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Button } from "@/components/ui/button";
import {
    DropdownMenu,
    DropdownMenuContent,
    DropdownMenuItem,
    DropdownMenuSeparator,
    DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { Separator } from "@/components/ui/separator";
import { PERSONA_LABELS } from "@/constants/personas";
import { NavButton } from "@/components/ui/nav-button";
import type { Role } from "@prisma/client";

type UserInfo = {
    email: string;
    name: string | null;
    role: Role;
};

const navItems = [
    { href: "/dashboard", label: "Dashboard", icon: LayoutDashboard },
    { href: "/profile", label: "Profile", icon: User },
];

export function AppSidebar({ user }: { user: UserInfo }) {
    const pathname = usePathname();

    const initials = user.name
        ? user.name.split(" ").map((n) => n[0]).join("").slice(0, 2).toUpperCase()
        : user.email.slice(0, 2).toUpperCase();

    return (
        <aside className="flex h-screen w-64 flex-col border-r border-border bg-card text-card-foreground">
            <div className="flex flex-1 flex-col p-4">
                <div className="mb-6 flex h-10 items-center px-2 text-xl font-bold tracking-tight">
                    Template App
                </div>

                <nav className="flex flex-1 flex-col gap-1">
                    {navItems.map((item) => {
                        const isActive = pathname === item.href;
                        const Icon = item.icon;
                        return (
                            <Link
                                key={item.href}
                                href={item.href}
                                className={`flex items-center gap-3 rounded-md px-3 py-2 text-sm font-medium transition-colors ${isActive
                                    ? "bg-primary/10 text-primary"
                                    : "text-muted-foreground hover:bg-muted hover:text-foreground"
                                    }`}
                            >
                                <Icon className="h-4 w-4 shrink-0" />
                                {item.label}
                            </Link>
                        );
                    })}
                </nav>

                <Separator className="my-4" />

                <div className="mt-auto">
                    <DropdownMenu>
                        <DropdownMenuTrigger asChild>
                            <Button
                                variant="ghost"
                                className="flex w-full items-center justify-start gap-3 rounded-md px-2 py-6 hover:bg-muted"
                            >
                                <Avatar className="h-8 w-8">
                                    <AvatarImage src={undefined} alt={user.email} />
                                    <AvatarFallback className="bg-primary/10 text-primary font-medium">
                                        {initials}
                                    </AvatarFallback>
                                </Avatar>
                                <div className="flex flex-1 flex-col items-start overflow-hidden text-left">
                                    <span className="truncate text-sm font-medium leading-none">
                                        {user.name || "User"}
                                    </span>
                                    <span className="truncate text-xs text-muted-foreground mt-1">
                                        {user.email}
                                    </span>
                                </div>
                            </Button>
                        </DropdownMenuTrigger>
                        <DropdownMenuContent align="start" className="w-56" side="right">
                            <div className="px-2 py-1.5 text-sm">
                                <p className="font-medium">{user.name || "User"}</p>
                                <p className="text-xs text-muted-foreground truncate">{user.email}</p>
                                <div className="mt-2 flex items-center gap-2">
                                    <span className="inline-flex items-center rounded-full border px-2 py-0.5 text-xs font-semibold transition-colors focus:outline-none focus:ring-2 focus:ring-ring focus:ring-offset-2 border-transparent bg-primary text-primary-foreground hover:bg-primary/80">
                                        {PERSONA_LABELS[user.role]}
                                    </span>
                                </div>
                            </div>
                            <DropdownMenuSeparator />
                            <DropdownMenuItem asChild>
                                <Link href="/profile" className="cursor-pointer">
                                    <User className="mr-2 h-4 w-4" />
                                    <span>Profile</span>
                                </Link>
                            </DropdownMenuItem>
                            <DropdownMenuItem asChild>
                                <div className="p-0">
                                    <NavButton
                                        href="/api/auth/logout"
                                        variant="ghost"
                                        className="w-full justify-start text-destructive hover:text-destructive hover:bg-destructive/10 cursor-pointer"
                                    >
                                        <LogOut className="mr-2 h-4 w-4" />
                                        <span>Log out</span>
                                    </NavButton>
                                </div>
                            </DropdownMenuItem>
                        </DropdownMenuContent>
                    </DropdownMenu>
                </div>
            </div>
        </aside>
    );
}
