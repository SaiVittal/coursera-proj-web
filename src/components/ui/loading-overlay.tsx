"use client";

import * as React from "react";
import { Loader2 } from "lucide-react";
import { cn } from "@/lib/utils";

interface LoadingOverlayProps {
    message?: string;
    className?: string;
}

export function LoadingOverlay({ message = "Loading...", className }: LoadingOverlayProps) {
    return (
        <div className={cn(
            "fixed inset-0 z-[100] flex flex-col items-center justify-center bg-background/80 backdrop-blur-sm animate-in fade-in duration-300",
            className
        )}>
            <div className="flex flex-col items-center gap-4 p-6 rounded-xl bg-card border shadow-2xl animate-in zoom-in duration-300">
                <Loader2 className="h-10 w-10 animate-spin text-primary" />
                <p className="text-lg font-medium text-foreground tracking-tight">
                    {message}
                </p>
            </div>
        </div>
    );
}
