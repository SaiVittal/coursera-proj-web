import { getSessionUser } from "@/lib/session";
import { redirect } from "next/navigation";
import { PERSONA_LABELS } from "@/constants/personas";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import { cn } from "@/lib/utils";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Shield, User, Mail, Settings, ShieldCheck, ChevronRight } from "lucide-react";
import LogoutButton from "@/components/logout-button";

export default async function ProfilePage() {
    const user = await getSessionUser();

    if (!user) {
        redirect("/");
    }

    const initials = user.name
        ?.split(" ")
        .map((n) => n[0])
        .join("")
        .toUpperCase() || "??";

    return (
        <div className="max-w-4xl mx-auto space-y-12 pb-20">
            {/* Header / Hero Section */}
            <div className="relative group">
                <div className="absolute -inset-1 bg-gradient-to-r from-blue-600 to-indigo-600 rounded-2xl blur opacity-10 group-hover:opacity-20 transition duration-1000 group-hover:duration-200"></div>
                <div className="relative flex items-center gap-8 p-8 rounded-2xl bg-card border border-border/50 shadow-sm">
                    <div className="relative">
                        <div className="absolute -inset-2 bg-blue-500/20 rounded-full blur-xl animate-pulse"></div>
                        <Avatar className="h-24 w-24 border-4 border-background shadow-2xl relative">
                            <AvatarImage src="" />
                            <AvatarFallback className="bg-gradient-to-br from-blue-500 to-indigo-600 text-white text-3xl font-black">
                                {initials}
                            </AvatarFallback>
                        </Avatar>
                        <div className="absolute bottom-1 right-1 h-6 w-6 rounded-full bg-green-500 border-4 border-background animate-pulse"></div>
                    </div>

                    <div className="flex-1 space-y-2">
                        <div className="flex items-center gap-3">
                            <h1 className="text-3xl font-black tracking-tight text-foreground">{user.name}</h1>
                            <Badge variant="secondary" className="bg-blue-500/10 text-blue-600 border-blue-500/20 px-3 py-1 font-bold">
                                {PERSONA_LABELS[user.role]}
                            </Badge>
                        </div>
                        <p className="text-muted-foreground font-medium flex items-center gap-2">
                            <Mail className="h-4 w-4 opacity-50" />
                            {user.email}
                        </p>
                        <div className="flex items-center gap-4 pt-2">
                            <div className="flex items-center gap-1.5 text-xs text-muted-foreground bg-muted/30 px-2 py-1 rounded-md border border-border/50">
                                <ShieldCheck className="h-3.5 w-3.5 text-blue-500" />
                                <span>Verified Identity</span>
                            </div>
                            <div className="flex items-center gap-1.5 text-xs text-muted-foreground bg-muted/30 px-2 py-1 rounded-md border border-border/50">
                                <Settings className="h-3.5 w-3.5 text-slate-500" />
                                <span>External Auth</span>
                            </div>
                        </div>
                    </div>

                    <LogoutButton />
                </div>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
                {/* Left Column: Essential Info */}
                <div className="md:col-span-2 space-y-8">
                    <Card className="border-border/50 bg-card overflow-hidden">
                        <CardHeader className="border-b border-border/50 px-8 py-6">
                            <CardTitle className="text-lg font-bold flex items-center gap-2">
                                <User className="h-5 w-5 text-blue-500" />
                                Personal Details
                            </CardTitle>
                            <CardDescription className="text-sm font-medium">Your platform identity and contact information</CardDescription>
                        </CardHeader>
                        <CardContent className="p-8 space-y-6">
                            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                                <div className="space-y-2">
                                    <Label className="text-xs font-bold text-muted-foreground/60 px-1">Full Name</Label>
                                    <Input value={user.name || ""} disabled readOnly className="h-11 bg-muted/20 border-border/50 font-medium" />
                                </div>
                                <div className="space-y-2">
                                    <Label className="text-xs font-bold text-muted-foreground/60 px-1">Email Address</Label>
                                    <Input value={user.email} disabled readOnly className="h-11 bg-muted/20 border-border/50 font-medium" />
                                </div>
                                <div className="space-y-2">
                                    <Label className="text-xs font-bold text-muted-foreground/60 px-1">Account Role</Label>
                                    <div className="h-11 px-3 flex items-center rounded-md border border-border/50 bg-muted/20 text-sm font-bold text-blue-600">
                                        {PERSONA_LABELS[user.role]}
                                    </div>
                                </div>
                                <div className="space-y-2">
                                    <Label className="text-xs font-bold text-muted-foreground/60 px-1">Language</Label>
                                    <div className="h-11 px-3 flex items-center rounded-md border border-border/50 bg-muted/20 text-sm font-medium">
                                        English (US)
                                    </div>
                                </div>
                            </div>
                        </CardContent>
                        <CardFooter className="bg-muted/10 border-t border-border/50 px-8 py-4">
                            <p className="text-xs text-muted-foreground font-medium flex items-center gap-2">
                                <Info className="h-3.5 w-3.5" />
                                Account details are managed by your organization's identity provider.
                            </p>
                        </CardFooter>
                    </Card>

                    <Card className="border-border/50 bg-card">
                        <CardHeader className="px-8 py-6">
                            <CardTitle className="text-lg font-bold flex items-center gap-2">
                                <Shield className="h-5 w-5 text-slate-500" />
                                Access & Security
                            </CardTitle>
                        </CardHeader>
                        <CardContent className="px-8 pb-8 space-y-4">
                            <div className="flex items-center justify-between p-4 rounded-xl border border-border/50 bg-muted/10 hover:bg-muted/20 transition-colors group cursor-pointer">
                                <div className="flex items-center gap-4">
                                    <div className="h-10 w-10 rounded-lg bg-blue-500/10 flex items-center justify-center text-blue-600">
                                        <ShieldCheck className="h-5 w-5" />
                                    </div>
                                    <div>
                                        <p className="text-sm font-bold">Two-Factor Authentication</p>
                                        <p className="text-xs text-muted-foreground">Managed via SSO provider</p>
                                    </div>
                                </div>
                                <ChevronRight className="h-4 w-4 text-muted-foreground/30 group-hover:translate-x-1 transition-transform" />
                            </div>
                            <div className="flex items-center justify-between p-4 rounded-xl border border-border/50 bg-muted/10 hover:bg-muted/20 transition-colors group cursor-pointer">
                                <div className="flex items-center gap-4">
                                    <div className="h-10 w-10 rounded-lg bg-slate-500/10 flex items-center justify-center text-slate-600">
                                        <History className="h-5 w-5" />
                                    </div>
                                    <div>
                                        <p className="text-sm font-bold">Login History</p>
                                        <p className="text-xs text-muted-foreground">View your recent session activity</p>
                                    </div>
                                </div>
                                <ChevronRight className="h-4 w-4 text-muted-foreground/30 group-hover:translate-x-1 transition-transform" />
                            </div>
                        </CardContent>
                    </Card>
                </div>

                {/* Right Column: Metadata */}
                <div>
                    <Card className="border-border/50 bg-gradient-to-b from-card to-muted/20 h-full">
                        <CardHeader>
                            <CardTitle className="text-sm font-bold uppercase tracking-widest text-muted-foreground/60">System Statistics</CardTitle>
                        </CardHeader>
                        <CardContent className="space-y-6">
                            <div className="p-4 rounded-xl bg-background/50 border border-border/50 space-y-1">
                                <p className="text-[10px] font-black text-muted-foreground uppercase tracking-wider">Member Since</p>
                                <p className="text-sm font-bold">January 2026</p>
                            </div>
                            <div className="p-4 rounded-xl bg-background/50 border border-border/50 space-y-1">
                                <p className="text-[10px] font-black text-muted-foreground uppercase tracking-wider">Storage Usage</p>
                                <div className="space-y-2 pt-1">
                                    <div className="flex justify-between text-[10px] font-bold">
                                        <span>2.4 GB of 10 GB</span>
                                        <span>24%</span>
                                    </div>
                                    <div className="h-1.5 w-full bg-muted rounded-full overflow-hidden">
                                        <div className="h-full bg-blue-500 w-[24%]" />
                                    </div>
                                </div>
                            </div>
                            <div className="p-4 rounded-xl bg-background/50 border border-border/50 space-y-1">
                                <p className="text-[10px] font-black text-muted-foreground uppercase tracking-wider">Course Progress</p>
                                <p className="text-xl font-black text-foreground">12 <span className="text-xs font-bold text-muted-foreground">Completed</span></p>
                            </div>
                        </CardContent>
                        <CardFooter className="pt-10">
                            <Button className="w-full bg-foreground text-background hover:bg-foreground/90 font-bold h-11 transition-all active:scale-95">
                                Upgrade Profile
                            </Button>
                        </CardFooter>
                    </Card>
                </div>
            </div>
        </div>
    );
}

const Info = ({ className }: { className?: string }) => (
    <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className={className}><circle cx="12" cy="12" r="10" /><path d="M12 16v-4" /><path d="M12 8h.01" /></svg>
)

const History = ({ className }: { className?: string }) => (
    <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className={className}><path d="M3 12a9 9 0 1 0 9-9 9.75 9.75 0 0 0-6.74 2.74L3 8" /><path d="M3 3v5h5" /><path d="M12 7v5l4 2" /></svg>
)
