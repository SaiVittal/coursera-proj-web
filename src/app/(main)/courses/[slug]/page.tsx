"use client";

import * as React from "react";
import { useParams, useRouter } from "next/navigation";
import { getCourseData, Module, LO, Item, Severity } from "@/constants/course-data";
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
    History,
    AlertTriangle,
    Info,
    TrendingUp,
    Target,
    BookOpen,
    Video,
    MessageSquare,
    AlertCircle,
    ArrowLeft
} from "lucide-react";
import Link from "next/link";
import { cn } from "@/lib/utils";
import { Progress } from "@/components/ui/progress";
import { Card, CardContent } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Tooltip, TooltipContent, TooltipProvider, TooltipTrigger } from "@/components/ui/tooltip";

export default function CourseDetailPage() {
    const params = useParams();
    const router = useRouter();
    const slug = params.slug as string;

    const [data, setData] = React.useState(() => getCourseData(slug));
    const [selectedModule, setSelectedModule] = React.useState<Module | null>(null);

    React.useEffect(() => {
        const newData = getCourseData(slug);
        setData(newData);
        setSelectedModule(newData.ModuleLevel[0]);
    }, [slug]);

    // Simple helper to get color for severity
    const getSeverityColor = (severity: Severity) => {
        return severity === "Must Do" ? "bg-red-500 text-white" : "bg-blue-600 text-white";
    };

    return (
        <div className="space-y-8 pb-20 max-w-7xl mx-auto">
            {/* Breadcrumbs */}
            <nav className="flex items-center gap-2 text-[10px] font-bold uppercase tracking-widest text-muted-foreground/60 px-1">
                <Link href="/dashboard" className="hover:text-foreground transition-colors flex items-center gap-1.5">
                    <LayoutDashboard className="h-3.5 w-3.5" />
                    Dashboard
                </Link>
                <ChevronRight className="h-3.5 w-3.5" />
                <span className="text-foreground">{data.CourseName}</span>
            </nav>

            {/* Header / Score Board */}
            <div className="grid grid-cols-1 md:grid-cols-12 gap-6">
                <Card className="md:col-span-8 border-border/50 bg-card shadow-xl overflow-hidden group">
                    <div className="flex flex-col md:flex-row h-full">
                        <div className="w-full md:w-48 bg-blue-600 flex flex-col items-center justify-center p-6 text-white shrink-0">
                            <p className="text-[10px] font-black uppercase tracking-[0.2em] mb-2 opacity-80 text-center">Final AI Score</p>
                            <span className="text-6xl font-black">{data.AgentScore}</span>
                            <div className="mt-4 flex flex-col items-center">
                                <TrendingUp className="h-5 w-5 mb-1" />
                                <span className="text-[10px] font-bold uppercase tracking-widest">Premium Analysis</span>
                            </div>
                        </div>
                        <div className="flex-1 p-8 flex flex-col justify-between">
                            <div className="space-y-4">
                                <div className="space-y-1">
                                    <h1 className="text-3xl font-extrabold tracking-tight text-foreground">{data.CourseName}</h1>
                                    <p className="text-muted-foreground font-medium flex items-center gap-2">
                                        <BookOpen className="h-4 w-4" />
                                        Advanced Leadership Specialization
                                    </p>
                                </div>
                                <div className="flex flex-wrap gap-2">
                                    {Object.keys(data.Glossary).map(key => (
                                        <TooltipProvider key={key}>
                                            <Tooltip>
                                                <TooltipTrigger asChild>
                                                    <Badge variant="outline" className="cursor-help bg-muted/20 border-border/50 py-1 px-3 text-[10px] uppercase font-bold tracking-widest">
                                                        {key}
                                                        <Info className="ml-1.5 h-3 w-3 opacity-40" />
                                                    </Badge>
                                                </TooltipTrigger>
                                                <TooltipContent className="max-w-[250px] bg-popover border-border/50 shadow-2xl p-3">
                                                    <p className="text-xs font-bold uppercase tracking-widest mb-1">{key}</p>
                                                    <p className="text-[11px] leading-relaxed text-muted-foreground">{data.Glossary[key]}</p>
                                                </TooltipContent>
                                            </Tooltip>
                                        </TooltipProvider>
                                    ))}
                                </div>
                            </div>
                            <div className="pt-6 grid grid-cols-3 gap-8">
                                {data.CourseTaskScores.map(score => (
                                    <div key={score.TaskName} className="space-y-2">
                                        <div className="flex justify-between items-end">
                                            <p className="text-[9px] font-black uppercase tracking-widest text-muted-foreground max-w-[80px] leading-tight">{score.TaskName}</p>
                                            <span className="text-base font-black text-foreground">{score.CourseScore}</span>
                                        </div>
                                        <div className="h-1.5 w-full bg-muted/30 rounded-full overflow-hidden">
                                            <div
                                                className="h-full bg-blue-600 rounded-full"
                                                style={{ width: `${(score.CourseScore / 5) * 100}%` }}
                                            />
                                        </div>
                                    </div>
                                ))}
                            </div>
                        </div>
                    </div>
                </Card>

                {/* Quick Actions / Summary Card */}
                <Card className="md:col-span-4 border-border/50 bg-card shadow-lg p-6 flex flex-col justify-between">
                    <div className="space-y-4">
                        <h2 className="text-sm font-black uppercase tracking-widest flex items-center gap-2">
                            <Target className="h-4 w-4 text-blue-600" />
                            Highlights
                        </h2>
                        <div className="space-y-3">
                            {data.TasksAndHighlights[1].Highlights.map((text, i) => (
                                <div key={i} className="flex gap-3 text-[11px] font-medium leading-relaxed text-muted-foreground">
                                    <div className="h-4 w-4 rounded-full bg-green-500/10 flex items-center justify-center shrink-0 mt-0.5">
                                        <CheckCircle2 className="h-2.5 w-2.5 text-green-500" />
                                    </div>
                                    <p>{text}</p>
                                </div>
                            ))}
                        </div>
                    </div>
                    <Button className="w-full mt-6 bg-blue-600 hover:bg-blue-700 text-white font-bold h-11 uppercase tracking-widest text-[11px]">
                        <FileText className="mr-2 h-4 w-4" />
                        Download Full Audit
                    </Button>
                </Card>
            </div>

            {/* Analysis Sections */}
            <div className="grid grid-cols-1 lg:grid-cols-12 gap-8">
                {/* Module Navigator */}
                <div className="lg:col-span-4 space-y-4">
                    <h2 className="text-lg font-black tracking-tight text-foreground/90 px-1">Module Analysis</h2>
                    <div className="space-y-2">
                        {data.ModuleLevel.map((mod, index) => {
                            const modScore = data.ModuleTaskScores[1].Modules[index]?.ModuleScore || 0;
                            return (
                                <div
                                    key={mod.ModuleName}
                                    className={cn(
                                        "p-4 rounded-xl border transition-all duration-300 cursor-pointer group flex items-center justify-between",
                                        selectedModule?.ModuleName === mod.ModuleName
                                            ? "border-blue-500/50 bg-blue-500/5 shadow-[0_0_20px_rgba(59,130,246,0.05)]"
                                            : "border-border/50 bg-card hover:bg-muted/30"
                                    )}
                                    onClick={() => setSelectedModule(mod)}
                                >
                                    <div className="space-y-1">
                                        <h3 className={cn(
                                            "text-sm font-bold tracking-tight",
                                            selectedModule?.ModuleName === mod.ModuleName ? "text-blue-600" : "text-foreground"
                                        )}>{mod.ModuleName}</h3>
                                        <div className="flex items-center gap-2">
                                            <Badge variant="secondary" className="text-[9px] px-1.5 py-0 font-black uppercase bg-muted/50 border-none">
                                                {mod.LOLevel?.length || 0} LOs
                                            </Badge>
                                            <Badge variant="secondary" className="text-[9px] px-1.5 py-0 font-black uppercase bg-muted/50 border-none">
                                                {mod.ItemLevel?.length || 0} Items
                                            </Badge>
                                        </div>
                                    </div>
                                    <div className="flex flex-col items-end">
                                        <span className="text-xl font-black text-foreground">{modScore || "—"}</span>
                                        <span className="text-[9px] font-bold uppercase tracking-widest text-muted-foreground/60">Module Score</span>
                                    </div>
                                </div>
                            );
                        })}
                    </div>
                </div>

                {/* Drill-down Detail */}
                <div className="lg:col-span-8 space-y-8">
                    {selectedModule ? (
                        <div className="animate-in fade-in slide-in-from-bottom-4 duration-500 space-y-8">
                            {/* Module Overview & High-level Recommendations */}
                            <Card className="border-border/50 bg-card shadow-lg p-8 space-y-8">
                                <div className="flex items-center justify-between border-b border-border/50 pb-6">
                                    <div className="space-y-1">
                                        <p className="text-[10px] font-black text-blue-600 uppercase tracking-[0.3em]">Analysis For</p>
                                        <h2 className="text-3xl font-black tracking-tight">{selectedModule.ModuleName}</h2>
                                    </div>
                                    <div className="h-16 w-16 rounded-2xl bg-muted/20 border border-border/50 flex flex-col items-center justify-center">
                                        <span className="text-2xl font-black">
                                            {data.ModuleTaskScores[1].Modules[data.ModuleLevel.indexOf(selectedModule)]?.ModuleScore}
                                        </span>
                                        <span className="text-[8px] font-bold uppercase tracking-widest text-muted-foreground">Rating</span>
                                    </div>
                                </div>

                                <div className="space-y-6">
                                    <h3 className="text-xs font-black uppercase tracking-[0.2em] flex items-center gap-2">
                                        <AlertCircle className="h-4 w-4 text-blue-600" />
                                        Primary Recommendations
                                    </h3>
                                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                                        {selectedModule.ModuleRecommendations.map((rec, i) => (
                                            <div key={i} className="p-5 rounded-2xl bg-muted/10 border border-border/50 space-y-4">
                                                <div className="flex items-center justify-between">
                                                    <Badge className={cn("text-[8px] uppercase font-black px-2 py-0.5", getSeverityColor(rec.Severity))}>
                                                        {rec.Severity}
                                                    </Badge>
                                                    <span className="text-[10px] font-bold uppercase tracking-widest text-muted-foreground">{rec.TaskName}</span>
                                                </div>
                                                <ul className="space-y-3">
                                                    {rec.Recommendations.map((r, ri) => (
                                                        <li key={ri} className="flex gap-2.5 text-[11px] font-medium leading-relaxed text-foreground/80">
                                                            <div className="h-4 w-4 rounded-full bg-blue-500/10 flex items-center justify-center shrink-0 mt-0.5">
                                                                <div className="h-1 w-1 rounded-full bg-blue-500" />
                                                            </div>
                                                            {r}
                                                        </li>
                                                    ))}
                                                </ul>
                                            </div>
                                        ))}
                                    </div>
                                </div>
                            </Card>

                            {/* Learning Objectives Deep Dive */}
                            {selectedModule.LOLevel && selectedModule.LOLevel.length > 0 && (
                                <div className="space-y-4">
                                    <h3 className="text-xs font-black uppercase tracking-[0.3em] px-1 flex items-center gap-2">
                                        <Target className="h-4 w-4 text-blue-600" />
                                        Learning Objectives Validation
                                    </h3>
                                    <div className="grid grid-cols-1 gap-4">
                                        {selectedModule.LOLevel.map((lo, i) => (
                                            <Card key={i} className="border-border/50 bg-card overflow-hidden hover:border-blue-500/30 transition-all border-l-4 border-l-blue-600">
                                                <CardContent className="p-0">
                                                    <div className="p-5 flex flex-col md:flex-row gap-6">
                                                        <div className="flex-1 space-y-3">
                                                            <div className="flex items-center gap-2">
                                                                <Badge className="bg-blue-600/10 text-blue-600 border-none text-[10px] font-black uppercase tracking-tighter">LO #{i + 1}</Badge>
                                                                <h4 className="text-sm font-bold leading-snug">{lo.LOName}</h4>
                                                            </div>
                                                            <div className="pl-0 space-y-3">
                                                                {lo.LORecommendations.map((rec, ri) => (
                                                                    <div key={ri} className="p-4 rounded-xl bg-muted/10 border border-border/50 space-y-3">
                                                                        <div className="flex items-center justify-between">
                                                                            <Badge className={cn("text-[8px] uppercase font-black px-2 py-0.5", getSeverityColor(rec.Severity))}>
                                                                                {rec.Severity}
                                                                            </Badge>
                                                                        </div>
                                                                        <ul className="space-y-2">
                                                                            {rec.Recommendations.map((r, rj) => (
                                                                                <li key={rj} className="text-[11px] font-medium leading-relaxed italic text-muted-foreground">
                                                                                    “{r}”
                                                                                </li>
                                                                            ))}
                                                                        </ul>
                                                                    </div>
                                                                ))}
                                                            </div>
                                                        </div>
                                                        <div className="w-full md:w-32 bg-muted/10 flex flex-col items-center justify-center p-4 shrink-0 rounded-xl">
                                                            <span className="text-3xl font-black text-foreground">{lo.LOScore}</span>
                                                            <span className="text-[9px] font-bold uppercase tracking-widest text-muted-foreground text-center mt-1">Accuracy Score</span>
                                                        </div>
                                                    </div>
                                                </CardContent>
                                            </Card>
                                        ))}
                                    </div>
                                </div>
                            )}

                            {/* Item Level Analysis */}
                            {selectedModule.ItemLevel && selectedModule.ItemLevel.length > 0 && (
                                <div className="space-y-4">
                                    <h3 className="text-xs font-black uppercase tracking-[0.3em] px-1 flex items-center gap-2">
                                        <BookOpen className="h-4 w-4 text-blue-600" />
                                        Content Matching Analysis
                                    </h3>
                                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                                        {selectedModule.ItemLevel.map((item, i) => (
                                            <Card key={i} className="border-border/50 bg-card hover:bg-muted/5 transition-all">
                                                <CardContent className="p-6 space-y-4">
                                                    <div className="flex items-start justify-between">
                                                        <div className="flex items-center gap-3">
                                                            <div className="h-10 w-10 rounded-xl bg-muted/20 flex items-center justify-center">
                                                                {item.ItemType === "Video" ? <Video className="h-5 w-5 text-blue-600" /> : <FileText className="h-5 w-5 text-indigo-600" />}
                                                            </div>
                                                            <div className="space-y-0.5">
                                                                <h4 className="text-xs font-black tracking-tight">{item.ItemName}</h4>
                                                                <p className="text-[10px] font-bold uppercase tracking-widest text-muted-foreground">{item.ItemType}</p>
                                                            </div>
                                                        </div>
                                                        <span className="text-lg font-black">{item.ItemScore}</span>
                                                    </div>
                                                    <div className="space-y-3">
                                                        {item.ItemRecommendations.map((rec, ri) => (
                                                            <div key={ri} className="space-y-2">
                                                                {rec.Recommendations.map((r, rj) => (
                                                                    <div key={rj} className="flex gap-2 text-[10px] font-medium leading-tight text-muted-foreground bg-muted/10 p-2 rounded-lg border border-border/10">
                                                                        <div className="h-3 w-3 rounded-full bg-blue-600/10 flex items-center justify-center shrink-0 mt-0.5">
                                                                            <CheckCircle2 className="h-2 w-2 text-blue-600" />
                                                                        </div>
                                                                        {r}
                                                                    </div>
                                                                ))}
                                                            </div>
                                                        ))}
                                                    </div>
                                                </CardContent>
                                            </Card>
                                        ))}
                                    </div>
                                </div>
                            )}
                        </div>
                    ) : (
                        <div className="h-full flex flex-col items-center justify-center text-center p-20 border-2 border-dashed border-border/50 rounded-3xl bg-muted/5">
                            <Lightbulb className="h-12 w-12 text-blue-600/20 mb-4" />
                            <h3 className="text-xl font-bold">Select a module for detailed analysis</h3>
                            <p className="text-muted-foreground max-w-xs mt-2">Drill down into learning objectives and item-level recommendations</p>
                        </div>
                    )}
                </div>
            </div>
        </div>
    );
}
