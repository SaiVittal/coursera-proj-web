"use client";

import * as React from "react";
import { useParams, useRouter, useSearchParams } from "next/navigation";
import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import {
    ChevronRight,
    LayoutDashboard,
    ArrowLeft,
    Clock,
    Calendar,
    ChevronRightSquare,
    CheckCircle2
} from "lucide-react";
import Link from "next/link";
import { cn } from "@/lib/utils";
import { AGENT_REPORTS_DATA, AgentId } from "@/constants/report-data";

const AGENTS = [
    { id: "lo", name: "LO & Pre-requisites", duration: "120s" },
    { id: "learner", name: "Learner expectation & Outcome Alignment", duration: "240s" },
    { id: "instruction", name: "Instruction Material Quality", duration: "300s" },
    { id: "content", name: "Course Content", duration: "450s" },
    { id: "assessment", name: "Assessments", duration: "180s" },
    { id: "technical", name: "Technical & Usability Issues", duration: "200s" },
    { id: "suggestions", name: "Suggestions of Improvement", duration: "150s" },
];

export default function AgentReportsPage() {
    const params = useParams();
    const router = useRouter();
    const searchParams = useSearchParams();
    const slug = params.slug as string;
    const initialAgent = (searchParams.get("agent") || "lo") as AgentId;

    const [selectedAgentId, setSelectedAgentId] = React.useState<AgentId>(initialAgent);

    // Derived title from slug
    const title = slug.split("-").map(word => word.charAt(0).toUpperCase() + word.slice(1)).join(" ");
    const currentAgent = AGENTS.find(a => a.id === selectedAgentId) || AGENTS[0];
    const currentReport = AGENT_REPORTS_DATA[selectedAgentId] || AGENT_REPORTS_DATA.lo;

    return (
        <div className="space-y-8 pb-20">
            {/* Breadcrumbs */}
            <nav className="flex items-center gap-2 text-[10px] font-bold uppercase tracking-widest text-muted-foreground/60">
                <Link href="/dashboard" className="hover:text-foreground transition-colors flex items-center gap-1">
                    <LayoutDashboard className="h-3 w-3" />
                    Dashboard
                </Link>
                <ChevronRight className="h-3 w-3" />
                <Link href={`/courses/${slug}`} className="hover:text-foreground transition-colors">
                    {title}
                </Link>
                <ChevronRight className="h-3 w-3" />
                <span className="text-foreground">Agent Reports</span>
            </nav>

            <Button
                variant="ghost"
                size="sm"
                className="h-8 text-[10px] font-bold uppercase tracking-widest text-muted-foreground hover:text-foreground p-0"
                onClick={() => router.push(`/courses/${slug}`)}
            >
                <ArrowLeft className="mr-2 h-3.5 w-3.5" />
                Back to Course
            </Button>

            {/* Course Header Card */}
            <Card className="border-border/50 bg-card/50 backdrop-blur-md shadow-xl">
                <CardContent className="p-8 flex items-center gap-6">
                    <div className="h-16 w-16 rounded-xl bg-gradient-to-br from-blue-500 to-indigo-600 flex items-center justify-center p-3 animate-pulse-slow">
                        <div className="h-full w-full rounded-full border-2 border-white/40 flex items-center justify-center">
                            <div className="h-3 w-3 rounded-full border border-white/20" />
                        </div>
                    </div>
                    <div>
                        <h1 className="text-2xl font-black tracking-tight text-foreground">{title}</h1>
                        <p className="text-sm font-bold text-muted-foreground">John Smith</p>
                    </div>
                    <div className="ml-auto text-right hidden md:block">
                        <p className="text-[10px] font-bold text-muted-foreground/40 uppercase tracking-[0.2em] mb-1">Status</p>
                        <p className="text-xs font-bold text-blue-500 uppercase tracking-widest bg-blue-500/10 px-3 py-1 rounded-full">Report Ready</p>
                    </div>
                </CardContent>
            </Card>

            <div className="grid grid-cols-1 lg:grid-cols-12 gap-8">
                {/* Sidebar */}
                <div className="lg:col-span-4 space-y-4">
                    <h2 className="text-lg font-black tracking-tight text-foreground/90">Processing Results</h2>
                    <div className="space-y-2">
                        {AGENTS.map((agent) => (
                            <div
                                key={agent.id}
                                className={cn(
                                    "flex items-center justify-between p-4 rounded-xl border transition-all duration-300 cursor-pointer group",
                                    selectedAgentId === agent.id
                                        ? "border-blue-500/50 bg-blue-500/10 shadow-[0_0_20px_rgba(59,130,246,0.1)]"
                                        : "border-border/50 bg-muted/20 hover:bg-muted/40"
                                )}
                                onClick={() => setSelectedAgentId(agent.id as AgentId)}
                            >
                                <div className="space-y-1">
                                    <h3 className={cn(
                                        "text-xs font-bold tracking-tight transition-colors",
                                        selectedAgentId === agent.id ? "text-foreground" : "text-foreground/70"
                                    )}>
                                        {agent.name}
                                    </h3>
                                    <div className="flex items-center gap-2 text-[10px] font-bold text-muted-foreground/60 uppercase tracking-widest">
                                        <Clock className="h-3 w-3" />
                                        {agent.duration}
                                    </div>
                                </div>
                                <div className={cn(
                                    "h-5 w-5 rounded-full border flex items-center justify-center transition-colors",
                                    selectedAgentId === agent.id
                                        ? "border-blue-500 bg-blue-500 text-white"
                                        : "border-border/60 text-muted-foreground/30"
                                )}>
                                    <CheckCircle2 className="h-3 w-3" />
                                </div>
                            </div>
                        ))}
                    </div>
                </div>

                {/* Main Content Preview */}
                <div className="lg:col-span-8">
                    <Card className="border-border/50 bg-card shadow-lg min-h-[500px] overflow-hidden">
                        <div className="p-8 border-b border-border/50 flex items-center justify-between bg-muted/5">
                            <div>
                                <h2 className="text-2xl font-black tracking-tight text-foreground">{currentAgent.name}</h2>
                                <div className="flex items-center gap-4 mt-2">
                                    <span className="flex items-center gap-1.5 text-xs font-bold text-muted-foreground/60 uppercase tracking-widest">
                                        <Clock className="h-3.5 w-3.5 text-blue-500" />
                                        {currentAgent.duration}
                                    </span>
                                    <span className="flex items-center gap-1.5 text-xs font-bold text-muted-foreground/60 uppercase tracking-widest">
                                        <Calendar className="h-3.5 w-3.5 text-blue-500" />
                                        23/02/2026
                                    </span>
                                </div>
                            </div>
                            <Button
                                className="bg-primary/5 hover:bg-primary/10 text-foreground border border-border/50 font-bold text-xs uppercase tracking-widest h-10 px-6 group transition-all"
                                onClick={() => router.push(`/courses/${slug}/agent-reports/${selectedAgentId}`)}
                            >
                                View Full Report
                                <ChevronRightSquare className="ml-2 h-4 w-4 transition-transform group-hover:translate-x-1" />
                            </Button>
                        </div>

                        <div className="p-8 space-y-10 animate-in fade-in slide-in-from-bottom-2 duration-500">
                            <div>
                                <h3 className="text-sm font-bold text-blue-500 uppercase tracking-[0.2em] mb-4">Course Overview</h3>
                                <p className="text-base text-muted-foreground leading-relaxed font-medium">
                                    Our AI agents have analyzed the {title.toLowerCase()} course modules.
                                    The {currentAgent.name} report focus on alignment and structural integrity.
                                    This automated review ensures that all learning units meet the high standards expected for this specialization.
                                </p>
                            </div>

                            <div className="grid grid-cols-1 md:grid-cols-2 gap-10">
                                <div className="space-y-4">
                                    <h3 className="text-sm font-bold text-blue-500 uppercase tracking-[0.2em]">Key Learning Points</h3>
                                    <ul className="space-y-4">
                                        {[
                                            "Master core architectural patterns",
                                            "Understand design tokens and theme systems",
                                            "Build accessible and performant interfaces"
                                        ].map((point, i) => (
                                            <li key={i} className="flex items-center gap-3 text-sm font-bold text-foreground/80">
                                                <div className="h-5 w-5 rounded-full bg-blue-500/10 border border-blue-500/20 flex items-center justify-center shrink-0">
                                                    <div className="h-1.5 w-1.5 rounded-full bg-blue-500" />
                                                </div>
                                                {point}
                                            </li>
                                        ))}
                                    </ul>
                                </div>

                                <div className="space-y-4">
                                    <h3 className="text-sm font-bold text-blue-500 uppercase tracking-[0.2em]">Difficulty Assessment</h3>
                                    <div className="space-y-6">
                                        <div className="flex items-center gap-3">
                                            <span className="text-xs font-bold uppercase tracking-widest text-muted-foreground">Level:</span>
                                            <span className="px-3 py-1 rounded-full bg-indigo-500/10 text-indigo-400 text-[10px] font-black uppercase tracking-widest border border-indigo-500/20">Intermediate</span>
                                        </div>
                                        <div className="space-y-2">
                                            <div className="flex justify-between text-xs font-bold uppercase tracking-widest text-muted-foreground">
                                                <span>Estimated Effort</span>
                                                <span className="text-foreground italic">40 Hours</span>
                                            </div>
                                            <div className="h-1.5 w-full bg-muted/30 rounded-full overflow-hidden">
                                                <div className="h-full bg-gradient-to-r from-blue-500 to-indigo-500 w-[65%]" />
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </Card>
                </div>
            </div>
        </div>
    );
}
