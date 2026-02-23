import { getSessionUser } from "@/lib/session";
import { redirect } from "next/navigation";
import { PERSONA_LABELS } from "@/constants/personas";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
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
                <h1 className="text-3xl font-bold tracking-tight">Profile</h1>
                <p className="text-muted-foreground">
                    Manage your personal information and preferences.
                </p>
            </div>

            <Card>
                <CardHeader>
                    <CardTitle>Personal Information</CardTitle>
                    <CardDescription>
                        Your profile details from Firebase and our local database.
                    </CardDescription>
                </CardHeader>
                <CardContent className="space-y-4">
                    <div className="space-y-2">
                        <Label htmlFor="name">Full Name</Label>
                        <Input id="name" value={user.name || ""} disabled readOnly />
                    </div>
                    <div className="space-y-2">
                        <Label htmlFor="email">Email</Label>
                        <Input id="email" value={user.email} disabled readOnly />
                    </div>
                    <div className="space-y-2">
                        <Label htmlFor="role">Role</Label>
                        <div className="flex items-center space-x-2">
                            <span className="inline-flex items-center rounded-md border px-2.5 py-0.5 text-xs font-semibold transition-colors focus:outline-none focus:ring-2 focus:ring-ring focus:ring-offset-2 border-transparent bg-primary text-primary-foreground hover:bg-primary/80">
                                {PERSONA_LABELS[user.role]}
                            </span>
                        </div>
                    </div>
                </CardContent>
                <CardFooter className="flex justify-between">
                    <Button variant="outline" disabled>Edit Profile (Managed by Firebase)</Button>
                    <LogoutButton />
                </CardFooter>
            </Card>
        </div>
    );
}
