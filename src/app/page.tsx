import { redirect } from "next/navigation";
import { getSessionUser } from "@/lib/session";
import { GoogleSignInButton } from "@/components/google-sign-in-button";
import { ShieldCheck, Zap, BarChart3, GraduationCap } from "lucide-react";
import { Badge } from "@/components/ui/badge";

export default async function Home({
    searchParams,
}: {
    searchParams: Promise<{ error?: string; logout?: string; session?: string }>;
}) {
    // If user is already logged in, redirect to dashboard
    const user = await getSessionUser();
    if (user) {
        redirect("/dashboard");
    }

    const params = await searchParams;
    const error = params.error;
    const sessionExpired = params.session === "expired";
    const logoutSuccess = params.logout === "success";

    return (
        <div className="min-h-screen bg-slate-50 dark:bg-slate-950 flex flex-col font-sans">
            {/* Top Navigation Bar (Static/Simple) */}
            <nav className="border-b border-border/50 bg-background/50 backdrop-blur-md sticky top-0 z-50">
                <div className="max-w-7xl mx-auto px-6 h-16 flex items-center justify-between">
                    <div className="flex items-center gap-2">
                        <div className="w-8 h-8 bg-blue-600 rounded-lg flex items-center justify-center">
                            <GraduationCap className="w-5 h-5 text-white" />
                        </div>
                        <span className="text-lg font-black tracking-tighter text-blue-600">COURSERA <span className="text-foreground">EVALUATOR</span></span>
                    </div>
                </div>
            </nav>

            <main className="flex-1 flex flex-col items-center justify-center p-6 text-center">
                <div className="max-w-4xl space-y-10">
                    {/* Hero Header */}
                    <div className="space-y-4 animate-in fade-in slide-in-from-top-4 duration-1000">
                        <Badge className="bg-blue-600/10 text-blue-600 border-none px-4 py-1.5 rounded-full font-black text-[10px] uppercase tracking-[0.2em] mb-4">
                            Next-Generation AI QA
                        </Badge>
                        <h1 className="text-5xl md:text-7xl font-black tracking-tight text-foreground leading-[0.95] md:leading-[0.9]">
                            Analyze and Optimize <br />
                            <span className="text-transparent bg-clip-text bg-gradient-to-r from-blue-600 to-indigo-600">Learning Content</span>
                        </h1>
                        <p className="text-lg md:text-xl text-muted-foreground font-medium max-w-2xl mx-auto leading-relaxed">
                            A precision course analysis platform powered by specialized AI agents.
                            Deconstruct learning objectives, instructional quality, and content alignment in seconds.
                        </p>
                    </div>

                    {/* Features Grid */}
                    <div className="grid grid-cols-1 md:grid-cols-3 gap-6 pt-4 animate-in fade-in slide-in-from-bottom-8 duration-1000 delay-200">
                        {[
                            { icon: Zap, title: "7 Specialist Agents", desc: "Covers LO, Content, Usability and more." },
                            { icon: BarChart3, title: "Precision Metrics", desc: "Data-driven scores for every course unit." },
                            { icon: ShieldCheck, title: "Enterprise Ready", desc: "Secure SSO and detailed audit logs." }
                        ].map((f, i) => (
                            <div key={i} className="p-6 rounded-2xl bg-card border border-border/50 shadow-sm text-left space-y-3 group hover:border-blue-500/50 transition-colors">
                                <div className="w-10 h-10 rounded-xl bg-blue-500/10 flex items-center justify-center text-blue-600 group-hover:scale-110 transition-transform">
                                    <f.icon className="w-5 h-5" />
                                </div>
                                <h3 className="font-black text-foreground">{f.title}</h3>
                                <p className="text-sm text-muted-foreground font-medium">{f.desc}</p>
                            </div>
                        ))}
                    </div>

                    {/* Authentication Section */}
                    <div className="pt-10 flex flex-col items-center gap-6 animate-in fade-in zoom-in duration-1000 delay-500">
                        <GoogleSignInButton />

                        <div className="flex flex-col gap-3">
                            {logoutSuccess && (
                                <p className="text-sm font-bold text-green-600">Successfully signed out</p>
                            )}
                            {sessionExpired && (
                                <p className="text-sm font-bold text-amber-600">Session expired. Please sign in again.</p>
                            )}
                            {error && (
                                <p className="text-sm font-bold text-red-600">Failed to sign in. Please try again.</p>
                            )}
                        </div>
                    </div>
                </div>
            </main>

            {/* Simple Footer */}
            <footer className="p-8 border-t border-border/50 bg-background/50">
                <div className="max-w-7xl mx-auto flex flex-col md:flex-row items-center justify-between gap-4">
                    <p className="text-xs font-bold text-muted-foreground uppercase tracking-widest leading-none">
                        © 2026 Coursera Evaluator Enterprise. All rights reserved.
                    </p>
                </div>
            </footer>
        </div>
    );
}


