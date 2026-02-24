import { getSessionUser } from "@/lib/session";
import { redirect } from "next/navigation";
import { PERSONA_LABELS } from "@/constants/personas";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import { cn } from "@/lib/utils";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import Link from "next/link";
import LogoutButton from "@/components/logout-button";

export default async function ProfilePage() {
    const user = await getSessionUser();

    if (!user) {
        redirect("/");
    }

    return (
        <div className="max-w-2xl mx-auto space-y-6">
            <div className="flex flex-col gap-2">
                <h1 className="text-4xl font-black tracking-tight text-foreground uppercase tracking-widest">Profile</h1>
                <p className="text-[11px] font-bold text-muted-foreground uppercase tracking-[0.2em]">
                    Member Account Settings
                </p>
            </div>

            <Card className="border-border/50 bg-card shadow-lg overflow-hidden">
                <CardHeader className="bg-muted/10 border-b border-border/50">
                    <CardTitle className="text-sm font-bold uppercase tracking-[0.3em]">Personal Information</CardTitle>
                    <CardDescription className="text-[10px] font-bold uppercase tracking-widest text-muted-foreground/60">
                        Identity & Access Management Details
                    </CardDescription>
                </CardHeader>
                <div className="space-y-4">
                    <div className="space-y-2">
                        <Label htmlFor="name" className="text-[10px] font-bold uppercase tracking-[0.2em] text-muted-foreground/60">Full Name</Label>
                        <Input id="name" value={user.name || ""} disabled readOnly className="h-12 bg-muted/10 border-border/50 font-bold" />
                    </div>
                    <div className="space-y-2">
                        <Label htmlFor="email" className="text-[10px] font-bold uppercase tracking-[0.2em] text-muted-foreground/60">Email Address</Label>
                        <Input id="email" value={user.email} disabled readOnly className="h-12 bg-muted/10 border-border/50 font-bold" />
                    </div>
                    <div className="space-y-2">
                        <Label htmlFor="role" className="text-[10px] font-bold uppercase tracking-[0.2em] text-muted-foreground/60">System Designation</Label>
                        <div className="flex items-center space-x-2">
                            <Badge className="bg-blue-600/10 text-blue-600 hover:bg-blue-600/20 text-[10px] px-3 py-1 border-none uppercase font-bold tracking-widest">
                                {PERSONA_LABELS[user.role]}
                            </Badge>
                        </div>
                    </div>
                </div>
                <CardFooter className="flex justify-between">
                    <Button variant="outline" disabled>Edit Profile (Managed by Firebase)</Button>
                    <LogoutButton />
                </CardFooter>
            </Card>
        </div>
    );
}
