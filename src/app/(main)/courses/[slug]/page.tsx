"use client";

import * as React from "react";
import { useParams, useRouter } from "next/navigation";
import { Card, CardContent } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Checkbox } from "@/components/ui/checkbox";
import { Progress } from "@/components/ui/progress";
import {
    ChevronRight,
    Play,
    Clock,
    FileText,
    CheckCircle2,
    Circle,
    MoreHorizontal,
    LayoutDashboard,
    Lightbulb,
    History
} from "lucide-react";
import Link from "next/link";
import { cn } from "@/lib/utils";

const AGENTS = [
    { id: "lo", name: "LO & Pre-requisites" },
    { id: "learner", name: "Learner expectation & Outcome Alignment" },
    { id: "instruction", name: "Instruction Material Quality" },
    { id: "content", name: "Course Content" },
    { id: "assessment", name: "Assessments" },
    { id: "technical", name: "Technical & Usability issues" },
];

const ACTIVITY_LOG = [
    { id: 1, agent: "LO & Pre-requisites", status: "COMPLETED", time: "2m 14s", date: "Jan 21, 2024" },
    { id: 2, agent: "Learner expectation & Outcome Alignment", status: "COMPLETED", time: "1m 45s", date: "Jan 21, 2024" },
    { id: 3, agent: "Instruction Material Quality", status: "COMPLETED", time: "3m 12s", date: "Jan 21, 2024" },
    { id: 4, agent: "Course Content", status: "RUNNING", progress: 65, date: "Running now" },
    { id: 5, agent: "Assessments", status: "WAITING", date: "In queue" },
    { id: 6, agent: "Technical & Usability issues", status: "WAITING", date: "In queue" },
];

const PREVIOUS_ACTIONS = [
    { title: "Revision 2", detail: "Agent Run: Internal review of video content", date: "22/01/2024", status: "Completed" },
    { title: "Revision 1", detail: "Update Core: Restructure assessment modules", date: "15/01/2024", status: "Completed" },
];

export default function CourseDetailPage() {
    const params = useParams();
    const router = useRouter();
    const slug = params.slug as string;

    // Derived title from slug
    const title = slug.split("-").map(word => word.charAt(0).toUpperCase() + word.slice(1)).join(" ");

    const [selectedAgents, setSelectedAgents] = React.useState<string[]>(["lo", "learner", "instruction", "content"]);

    const toggleAgent = (id: string) => {
        setSelectedAgents(prev =>
            prev.includes(id) ? prev.filter(a => a !== id) : [...prev, id]
        );
    };

    return (
        <div className="space-y-8 pb-20">
            {/* Breadcrumbs */}
            <nav className="flex items-center gap-2 text-sm font-bold uppercase tracking-widest text-muted-foreground/60">
                <Link href="/dashboard" className="hover:text-foreground transition-colors flex items-center gap-1">
                    <LayoutDashboard className="h-3 w-3" />
                    Dashboard
                </Link>
                <ChevronRight className="h-3 w-3" />
                <span className="text-foreground">{title}</span>
            </nav>

            {/* Course Header Card */}
            <Card className="border-border/50 overflow-hidden bg-background shadow-lg">
                <div className="flex flex-col md:flex-row">
                    <div className="w-full md:w-72 h-48 md:h-auto bg-gradient-to-br from-blue-500 to-indigo-700 flex items-center justify-center relative">
                        <div className="z-10 bg-white/10 backdrop-blur-md rounded-full p-6 border border-white/20">
                            <div className="h-12 w-12 rounded-full border-2 border-white/60 flex items-center justify-center">
                                <div className="h-6 w-6 rounded-full border border-white/40" />
                            </div>
                        </div>
                    </div>
                    <div className="flex-1 p-8 space-y-6">
                        <div className="space-y-2">
                            <h1 className="text-3xl font-black tracking-tight text-foreground">{title}</h1>
                            <p className="text-muted-foreground font-bold">John Smith</p>
                        </div>

                        <p className="text-sm text-muted-foreground leading-relaxed max-w-2xl font-medium">
                            Learn the basics of React, including components, hooks, and state management. Perfect for beginners who want to get started with modern web development.
                        </p>

                        <div className="grid grid-cols-2 lg:grid-cols-4 gap-8 pt-4 border-t border-border/50">
                            <div className="space-y-1">
                                <p className="text-xs font-bold text-muted-foreground uppercase tracking-widest leading-none">Author</p>
                                <p className="text-base font-bold">John Smith</p>
                            </div>
                            <div className="space-y-1">
                                <p className="text-xs font-bold text-muted-foreground uppercase tracking-widest leading-none">Duration</p>
                                <p className="text-base font-bold">12 hours</p>
                            </div>
                            <div className="space-y-1">
                                <p className="text-xs font-bold text-muted-foreground uppercase tracking-widest leading-none">Status</p>
                                <Badge className="bg-blue-600/10 text-blue-600 hover:bg-blue-600/10 text-xs px-2 py-0.5 border-none uppercase font-bold tracking-widest">In Progress</Badge>
                            </div>
                            <div className="space-y-1">
                                <p className="text-xs font-bold text-muted-foreground uppercase tracking-widest leading-none">Course Progress</p>
                                <p className="text-base font-bold text-blue-600">55%</p>
                            </div>
                        </div>

                        <div className="pt-4 flex items-center gap-2 text-xs font-bold text-muted-foreground/60 uppercase tracking-widest">
                            <Clock className="h-3 w-3" />
                            Last Updated: 21/01/2024
                        </div>
                    </div>
                </div>
            </Card>

            {/* Select Agents to Run */}
            <div className="space-y-4">
                <div className="flex items-center justify-between">
                    <h2 className="text-xl font-bold tracking-tight text-foreground flex items-center gap-2">
                        Select Agents to Run
                    </h2>
                    <Button variant="outline" size="sm" className="h-8 text-xs font-bold uppercase tracking-widest" onClick={() => setSelectedAgents(AGENTS.map(a => a.id))}>
                        Deselect All
                    </Button>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    {AGENTS.map((agent) => (
                        <div
                            key={agent.id}
                            className={cn(
                                "flex items-center justify-between p-4 rounded-xl border transition-all duration-200 cursor-pointer group",
                                selectedAgents.includes(agent.id)
                                    ? "border-blue-500/50 bg-blue-50/50 dark:bg-blue-900/20"
                                    : "border-border/50 bg-muted/30 hover:bg-muted/40"
                            )}
                            onClick={() => toggleAgent(agent.id)}
                        >
                            <div className="flex items-center gap-3">
                                <Checkbox
                                    checked={selectedAgents.includes(agent.id)}
                                    onCheckedChange={() => toggleAgent(agent.id)}
                                />
                                <span className="text-sm font-bold text-foreground/80 group-hover:text-foreground">{agent.name}</span>
                            </div>
                            <div className="h-5 w-5 rounded-full border border-border/60 flex items-center justify-center text-muted-foreground/40 group-hover:text-blue-500 transition-colors">
                                <MoreHorizontal className="h-3 w-3" />
                            </div>
                        </div>
                    ))}
                </div>

                <div className="pt-6">
                    <Button className="w-full h-14 bg-indigo-600 hover:bg-indigo-700 text-white font-bold text-base uppercase tracking-widest shadow-xl shadow-indigo-600/20 group">
                        <Lightbulb className="mr-2 h-5 w-5 group-hover:animate-pulse" />
                        Suggestions of Improvement
                    </Button>
                    <p className="text-xs text-center mt-3 text-muted-foreground font-bold uppercase tracking-widest">
                        Run and collect reports of all selected agents to provide overall suggestions
                    </p>
                </div>
            </div>

            {/* Agent Activity Log */}
            <Card className="border-border/50 bg-background shadow-sm overflow-hidden">
                <div className="p-6 border-b border-border/50 bg-muted/10 flex items-center justify-between">
                    <h2 className="font-bold text-base uppercase tracking-widest flex items-center gap-2">
                        <div className="w-1.5 h-4 bg-blue-600 rounded-full" />
                        Agent Activity Log
                    </h2>
                    <Button variant="ghost" size="sm" className="h-8 text-xs font-bold uppercase tracking-widest text-blue-600">
                        View All
                    </Button>
                </div>
                <div className="divide-y divide-border/50">
                    {ACTIVITY_LOG.map((log) => (
                        <div key={log.id} className="p-5 flex flex-col md:flex-row md:items-center gap-6 group hover:bg-muted/10 transition-colors">
                            <div className="flex-1 space-y-1">
                                <div className="flex items-center gap-2">
                                    <h4 className="text-sm font-bold text-foreground">Agent #{log.id}: {log.agent}</h4>
                                    <Badge className={cn(
                                        "text-[11px] uppercase font-bold px-1.5 py-0.5 border-none tracking-widest",
                                        log.status === "COMPLETED" ? "bg-green-100 text-green-700 dark:bg-green-900/30 dark:text-green-400" :
                                            log.status === "RUNNING" ? "bg-blue-100 text-blue-700 dark:bg-blue-900/30 dark:text-blue-400" :
                                                "bg-muted text-muted-foreground"
                                    )}>
                                        {log.status}
                                    </Badge>
                                </div>
                                <div className="flex items-center gap-3 text-xs font-bold text-muted-foreground/60 uppercase tracking-widest">
                                    <span className="flex items-center gap-1"><Clock className="h-3 w-3" /> {log.date}</span>
                                    {log.time && <span>• {log.time}</span>}
                                    {!log.progress && log.status === "COMPLETED" && (
                                        <button className="text-blue-600 hover:text-blue-700 underline decoration-2 underline-offset-2 ml-auto text-xs">Download file</button>
                                    )}
                                </div>
                            </div>

                            <div className="w-full md:w-64 space-y-2">
                                {log.status === "RUNNING" ? (
                                    <>
                                        <div className="flex justify-between text-xs font-bold text-blue-600 uppercase tracking-widest">
                                            <span>Progress</span>
                                            <span>{log.progress}%</span>
                                        </div>
                                        <Progress value={log.progress} className="h-2 bg-blue-600/10" />
                                    </>
                                ) : log.status === "COMPLETED" ? (
                                    <Button
                                        size="sm"
                                        className="w-full h-9 bg-white dark:bg-muted border border-border text-foreground hover:bg-muted font-bold text-xs uppercase tracking-widest"
                                        onClick={() => router.push(`/courses/${slug}/agent-reports?agent=${AGENTS.find(a => a.name === log.agent)?.id || "lo"}`)}
                                    >
                                        View Report
                                    </Button>
                                ) : (
                                    <div className="h-9 w-full rounded-md border border-dashed border-border/60 bg-muted/5 flex items-center justify-center">
                                        <span className="text-xs font-bold text-muted-foreground/30 uppercase tracking-widest">Queued</span>
                                    </div>
                                )}
                            </div>
                        </div>
                    ))}
                </div>
            </Card>

            {/* Previous Actions */}
            <div className="space-y-4">
                <h2 className="font-bold text-sm uppercase tracking-widest flex items-center gap-2">
                    <History className="h-4 w-4 text-blue-600" />
                    Previous Actions
                </h2>
                <div className="space-y-3">
                    {PREVIOUS_ACTIONS.map((action, i) => (
                        <div key={i} className="flex items-center justify-between p-4 rounded-xl border border-border/50 bg-muted/10 group hover:bg-muted/20 transition-all">
                            <div className="space-y-1">
                                <h4 className="text-sm font-bold text-foreground">{action.title}</h4>
                                <p className="text-xs font-medium text-muted-foreground">{action.detail}</p>
                                <p className="text-[11px] font-bold text-muted-foreground/40 uppercase tracking-widest">{action.date}</p>
                            </div>
                            <div className="flex items-center gap-3">
                                <Badge className="bg-green-100 text-green-700 dark:bg-green-900/30 dark:text-green-400 text-[11px] uppercase font-bold border-none tracking-widest">
                                    {action.status}
                                </Badge>
                                <Button variant="ghost" size="icon" className="h-8 w-8 text-muted-foreground hover:text-foreground">
                                    <FileText className="h-4 w-4" />
                                </Button>
                                <Button
                                    size="sm"
                                    className="h-8 bg-white dark:bg-muted border border-border text-foreground hover:bg-muted font-bold text-[11px] uppercase tracking-widest"
                                    onClick={() => router.push(`/courses/${slug}/agent-reports?agent=lo`)}
                                >
                                    View Report
                                </Button>
                            </div>
                        </div>
                    ))}
                </div>
            </div>
        </div>
    );
}
