"use client";

import * as React from "react";
import { useParams, useRouter } from "next/navigation";
import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import {
    ChevronRight,
    LayoutDashboard,
    ArrowLeft,
    Download,
    ChevronLeft,
    Clock,
    Calendar,
    CheckCircle2
} from "lucide-react";
import Link from "next/link";
import { AGENT_REPORTS_DATA, AgentId } from "@/constants/report-data";
import { cn } from "@/lib/utils";
import { toast } from "sonner";

export default function ReportDetailsPage() {
    const params = useParams();
    const router = useRouter();
    const slug = params.slug as string;
    const agentId = params.agentId as AgentId;

    const report = AGENT_REPORTS_DATA[agentId] || AGENT_REPORTS_DATA.lo;
    const agentIds = Object.keys(AGENT_REPORTS_DATA) as AgentId[];
    const currentIndex = agentIds.indexOf(agentId);

    const prevAgentId = currentIndex > 0 ? agentIds[currentIndex - 1] : null;
    const nextAgentId = currentIndex < agentIds.length - 1 ? agentIds[currentIndex + 1] : null;

    // Derived title from slug
    const title = slug.split("-").map(word => word.charAt(0).toUpperCase() + word.slice(1)).join(" ");

    const handleExport = () => {
        toast.promise(
            new Promise((resolve) => setTimeout(resolve, 1500)),
            {
                loading: 'Generating PDF export...',
                success: 'Report exported successfully!',
                error: 'Failed to export report.',
            }
        );
    };

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
                <Link href={`/courses/${slug}/agent-reports`} className="hover:text-foreground transition-colors">
                    Agent Reports
                </Link>
                <ChevronRight className="h-3 w-3" />
                <span className="text-foreground">Report Details</span>
            </nav>

            <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
                <Button
                    variant="ghost"
                    size="sm"
                    className="h-8 text-[10px] font-bold uppercase tracking-widest text-muted-foreground hover:text-foreground p-0 self-start"
                    onClick={() => router.push(`/courses/${slug}/agent-reports?agent=${agentId}`)}
                >
                    <ArrowLeft className="mr-2 h-3.5 w-3.5" />
                    Back to Reports
                </Button>

                <div className="flex items-center gap-2">
                    <Button
                        className="bg-blue-600 hover:bg-blue-700 text-white font-bold text-[10px] uppercase tracking-widest h-9 px-4 shadow-lg shadow-blue-600/20"
                        onClick={handleExport}
                    >
                        <Download className="mr-2 h-3.5 w-3.5" />
                        Export Report
                    </Button>
                    <div className="flex items-center bg-muted/30 rounded-md p-1 border border-border/50">
                        <Button
                            variant="ghost"
                            size="icon"
                            className="h-7 w-7 text-muted-foreground"
                            disabled={!prevAgentId}
                            onClick={() => router.push(`/courses/${slug}/agent-reports/${prevAgentId}`)}
                        >
                            <ChevronLeft className="h-4 w-4" />
                        </Button>
                        <span className="text-[10px] font-bold uppercase tracking-widest px-2 text-muted-foreground/40">
                            {currentIndex + 1} / {agentIds.length}
                        </span>
                        <Button
                            variant="ghost"
                            size="icon"
                            className="h-7 w-7 text-muted-foreground"
                            disabled={!nextAgentId}
                            onClick={() => router.push(`/courses/${slug}/agent-reports/${nextAgentId}`)}
                        >
                            <ChevronRight className="h-4 w-4" />
                        </Button>
                    </div>
                </div>
            </div>

            {/* Summary Board */}
            <Card className="border-border/50 bg-card/50 backdrop-blur-md shadow-xl relative overflow-hidden">
                <div className="absolute top-0 right-0 p-4">
                    <div className="h-10 w-10 rounded-full border border-blue-500/20 flex items-center justify-center bg-blue-500/5">
                        <div className="h-1 w-1 rounded-full bg-blue-500 animate-ping" />
                    </div>
                </div>
                <CardContent className="p-8 flex items-center gap-6">
                    <div className="h-14 w-14 rounded-xl bg-gradient-to-br from-blue-500 to-indigo-600 flex items-center justify-center p-3">
                        <div className="h-full w-full rounded-full border-2 border-white/20 flex items-center justify-center">
                            <div className="h-2 w-2 rounded-full border border-white/10" />
                        </div>
                    </div>
                    <div>
                        <p className="text-[10px] font-bold text-muted-foreground/40 uppercase tracking-[0.2em] mb-1">Viewing report for</p>
                        <h1 className="text-xl font-black tracking-tight text-foreground">{title}</h1>
                        <p className="text-xs font-bold text-muted-foreground">John Smith</p>
                    </div>
                </CardContent>
            </Card>

            {/* Main Report Content */}
            <Card className="border-border/50 bg-card shadow-lg overflow-hidden min-h-[600px]">
                <div className="p-8 border-b border-border/50 bg-muted/5">
                    <h2 className="text-3xl font-black tracking-tight text-foreground">{report.title}</h2>
                    <div className="flex items-center gap-6 mt-4">
                        <span className="flex items-center gap-2 text-xs font-bold text-muted-foreground uppercase tracking-widest">
                            <Clock className="h-4 w-4 text-blue-500" />
                            Duration: {report.duration}
                        </span>
                        <span className="flex items-center gap-2 text-xs font-bold text-muted-foreground uppercase tracking-widest">
                            <Calendar className="h-4 w-4 text-blue-500" />
                            {report.date}
                        </span>
                    </div>
                </div>

                <div className="p-8 space-y-12">
                    {report.sections.map((section, idx) => (
                        <div key={idx} className="space-y-6 animate-in fade-in slide-in-from-bottom-4 duration-500" style={{ animationDelay: `${idx * 100}ms` }}>
                            <h3 className="text-sm font-bold text-blue-500 uppercase tracking-[0.3em] flex items-center gap-3">
                                <div className="h-1.5 w-1.5 rounded-full bg-blue-500" />
                                {section.label}
                            </h3>

                            {section.type === "metrics" && section.metrics && (
                                <div className="grid grid-cols-2 md:grid-cols-4 gap-6">
                                    {Object.entries(section.metrics).map(([key, value]) => (
                                        <div key={key} className="p-6 rounded-2xl bg-card border border-border/50 space-y-2 shadow-sm">
                                            <p className="text-[10px] font-bold text-muted-foreground uppercase tracking-widest">{key.replace(/_/g, " ")}</p>
                                            <p className="text-3xl font-black text-foreground">{value}</p>
                                        </div>
                                    ))}
                                </div>
                            )}

                            {section.type === "list" && (
                                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
                                    {section.content.map((item, i) => (
                                        <div key={i} className="flex items-start gap-3 p-4 rounded-xl bg-muted/20 border border-border/50 group hover:border-blue-500/30 transition-all">
                                            <CheckCircle2 className="h-5 w-5 text-blue-500/40 mt-0.5 group-hover:text-blue-500 transition-colors" />
                                            <span className="text-sm font-bold text-foreground/80">{item}</span>
                                        </div>
                                    ))}
                                </div>
                            )}

                            {section.type === "text" && (
                                <div className="p-6 rounded-2xl bg-muted/20 border border-border/50">
                                    <p className="text-sm font-bold text-foreground/80 leading-relaxed">
                                        {section.content[0]}
                                    </p>
                                </div>
                            )}
                        </div>
                    ))}
                </div>
            </Card>
        </div>
    );
}
