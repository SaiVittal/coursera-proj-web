"use client";

import * as React from "react";
import { Button, type ButtonProps } from "@/components/ui/button";

interface NavButtonProps extends ButtonProps {
    href: string;
    children: React.ReactNode;
}

export function NavButton({ href, children, ...props }: NavButtonProps) {
    const [loading, setLoading] = React.useState(false);

    const handleClick = () => {
        setLoading(true);
        // We don't prevent default because we want the navigation to happen,
        // but we might want to manually navigate to ensure the loading state stays visible
        // Actually for /api/auth/* routes, they are external to the React app state mostly
        // so letting it perform the native navigation is fine. 
        // The loading state will stay until the page starts unloading.
    };

    return (
        <Button
            {...props}
            loading={loading}
            onClick={handleClick}
            asChild
        >
            <a href={href}>{children}</a>
        </Button>
    );
}
