"use client";

import * as React from "react";
import Link from "next/link";
import { User, LogOut } from "lucide-react";
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
import { PERSONA_LABELS } from "@/constants/personas";
import { LoadingOverlay } from "@/components/ui/loading-overlay";
import type { Role } from "@prisma/client";

type UserNavProps = {
    user: {
        email: string;
        name: string | null;
        role: Role;
    };
};

export function UserNav({ user }: UserNavProps) {
    const [isLoggingOut, setIsLoggingOut] = React.useState(false);

    const initials = user.name
        ? user.name.split(" ").map((n) => n[0]).join("").slice(0, 2).toUpperCase()
        : user.email.slice(0, 2).toUpperCase();

    return (
        <>
            {isLoggingOut && <LoadingOverlay message="Logging out safely..." />}
            <DropdownMenu>
                <DropdownMenuTrigger asChild>
                    <Button variant="ghost" className="relative h-9 w-9 rounded-full border border-border/50">
                        <Avatar className="h-8 w-8">
                            <AvatarImage src={undefined} alt={user.email} />
                            <AvatarFallback className="bg-blue-600/10 text-blue-600 font-bold text-xs">
                                {initials}
                            </AvatarFallback>
                        </Avatar>
                    </Button>
                </DropdownMenuTrigger>
                <DropdownMenuContent className="w-56" align="end" forceMount>
                    <div className="flex items-center justify-start gap-2 p-2">
                        <div className="flex flex-col space-y-1">
                            <p className="text-sm font-bold leading-none">{user.name || "User"}</p>
                            <p className="text-xs leading-none text-muted-foreground truncate max-w-[180px]">
                                {user.email}
                            </p>
                            <div className="mt-1">
                                <span className="inline-flex items-center rounded-full bg-blue-600/10 px-2 py-0.5 text-[10px] font-bold text-blue-600 uppercase">
                                    {PERSONA_LABELS[user.role]}
                                </span>
                            </div>
                        </div>
                    </div>
                    <DropdownMenuSeparator />
                    <DropdownMenuItem asChild>
                        <Link href="/profile" className="cursor-pointer flex items-center">
                            <User className="mr-2 h-4 w-4" />
                            <span className="font-medium">Profile</span>
                        </Link>
                    </DropdownMenuItem>
                    <DropdownMenuItem
                        className="text-destructive focus:text-destructive cursor-pointer"
                        onClick={async () => {
                            setIsLoggingOut(true);
                            try {
                                await new Promise(resolve => setTimeout(resolve, 1000));
                                await signOut(firebaseAuth);
                            } catch (err) {
                                console.warn("Firebase client signOut failed:", err);
                            }
                            window.location.assign("/api/auth/logout");
                        }}
                    >
                        <LogOut className="mr-2 h-4 w-4" />
                        <span className="font-medium">Log out</span>
                    </DropdownMenuItem>
                </DropdownMenuContent>
            </DropdownMenu>
        </>
    );
}
