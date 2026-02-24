"use client";

import * as React from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { FileText, Info, Lightbulb, AlertTriangle, Download, Eye } from "lucide-react";

import { cn } from "@/lib/utils";

const COURSES = [
    "React Fundamentals",
    "Advanced Next.js Patterns",
    "TypeScript Mastery",
    "Advanced CSS & Design Systems",
];

const AGENTS = [
    { id: "lo", name: "LO & Pre-requisites" },
    { id: "learner", name: "Learner expectation & Outcome Alignment" },
    { id: "instruction", name: "Instruction Material Quality" },
    { id: "content", name: "Course Content" },
    { id: "assessment", name: "Assessments" },
    { id: "technical", name: "Technical & Usability issues" },
    { id: "suggestions", name: "Suggestions of Improvement" },
];

import { ReportsSkeleton } from "@/components/reports-skeleton";
import { toast } from "sonner";
import { APP_CONFIG } from "@/constants/app-config";

export default function ReportsPage() {
    const [selectedCourse, setSelectedCourse] = React.useState<string>("");
    const [selectedAgent, setSelectedAgent] = React.useState<string>("");
    const [isGenerating, setIsGenerating] = React.useState(false);
    const [isLoading, setIsLoading] = React.useState(true);

    React.useEffect(() => {
        const timer = setTimeout(() => {
            setIsLoading(false);
        }, APP_CONFIG.DEFAULT_LOAD_DELAY);
        return () => clearTimeout(timer);
    }, []);

    const currentAgent = AGENTS.find(a => a.id === selectedAgent);

    if (isLoading) {
        return <ReportsSkeleton />;
    }

    const handleViewPDF = () => {
        toast.info("Opening PDF report viewer...");
    };

    const handleDownload = () => {
        setIsGenerating(true);
        toast.promise(
            new Promise((resolve) => setTimeout(resolve, 2000)),
            {
                loading: 'Preparing your analysis report...',
                success: 'Report downloaded successfully!',
                error: (err: any) => `Failed to download: ${err.message}`,
                finally: () => setIsGenerating(false)
            }
        );
    };

    return (
        <div className="space-y-8">
            <div className="flex flex-col gap-2">
                <h1 className="text-4xl font-black tracking-tight text-foreground uppercase tracking-widest">Analytics</h1>
                <p className="text-[11px] font-bold text-muted-foreground uppercase tracking-[0.2em]">
                    Deep-Dive Analysis Reports
                </p>
            </div>

            <Card className="border-border/50 bg-background shadow-sm">
                <CardContent className="p-6 space-y-6">
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                        <div className="space-y-2">
                            <label className="text-sm font-bold uppercase tracking-wider text-muted-foreground">1. Select Course</label>
                            <Select value={selectedCourse} onValueChange={(val) => {
                                setSelectedCourse(val);
                                setSelectedAgent("");
                                toast.success(`Course selected: ${val}`);
                            }}>
                                <SelectTrigger className="h-12 border-border/50 bg-muted/20">
                                    <SelectValue placeholder="Choose a processed course..." />
                                </SelectTrigger>
                                <SelectContent>
                                    {COURSES.map(course => (
                                        <SelectItem key={course} value={course}>{course}</SelectItem>
                                    ))}
                                </SelectContent>
                            </Select>
                        </div>
                        <div className="space-y-2">
                            <label className={cn(
                                "text-sm font-bold uppercase tracking-wider transition-colors",
                                !selectedCourse ? "text-muted-foreground/30" : "text-muted-foreground"
                            )}>
                                2. Select Agent Report
                            </label>
                            <Select
                                value={selectedAgent}
                                onValueChange={(val) => {
                                    setSelectedAgent(val);
                                    const agentName = AGENTS.find(a => a.id === val)?.name;
                                    toast.success(`Agent report loaded: ${agentName}`);
                                }}
                                disabled={!selectedCourse}
                            >
                                <SelectTrigger className={cn(
                                    "h-12 border-border/50 transition-all",
                                    !selectedCourse ? "bg-muted/10 opacity-50" : "bg-muted/20"
                                )}>
                                    <SelectValue placeholder={selectedCourse ? "Choose an agent report..." : "Select a course first"} />
                                </SelectTrigger>
                                <SelectContent>
                                    {AGENTS.map(agent => (
                                        <SelectItem key={agent.id} value={agent.id}>{agent.name}</SelectItem>
                                    ))}
                                </SelectContent>
                            </Select>
                        </div>
                    </div>

                    {selectedCourse && selectedAgent && (
                        <div className="flex gap-3 animate-in fade-in slide-in-from-top-2 duration-300">
                            <Button
                                onClick={handleViewPDF}
                                className="h-10 bg-white dark:bg-muted border border-border text-foreground hover:bg-muted font-bold text-xs uppercase tracking-widest"
                            >
                                <Eye className="mr-2 h-4 w-4" />
                                View Full PDF
                            </Button>
                            <Button
                                onClick={handleDownload}
                                disabled={isGenerating}
                                className="h-10 bg-blue-600 text-white hover:bg-blue-700 font-bold text-xs uppercase tracking-[0.2em] shadow-xl shadow-blue-500/20"
                            >
                                <Download className="mr-2 h-4 w-4" />
                                {isGenerating ? "Generating..." : "Download Analysis"}
                            </Button>
                        </div>
                    )}
                </CardContent>
            </Card>

            {!selectedCourse || !selectedAgent ? (
                <div className="flex flex-col items-center justify-center py-20 px-4 text-center border-2 border-dashed border-border/50 rounded-2xl bg-muted/5">
                    <div className="w-16 h-16 rounded-full bg-muted/50 flex items-center justify-center mb-4">
                        <FileText className="h-8 w-8 text-muted-foreground/50" />
                    </div>
                    <h2 className="text-xl font-bold tracking-tight text-foreground/70">No Report Selected</h2>
                    <p className="text-sm text-muted-foreground max-w-xs mt-2 font-medium">
                        {!selectedCourse
                            ? "Please select a course from the list above to begin."
                            : "Excellent! Now select a specialized AI agent to view its analysis."}
                    </p>
                </div>
            ) : (
                <div className="space-y-6 animate-in fade-in slide-in-from-bottom-4 duration-500">
                    <div className="flex items-center justify-between">
                        <h2 className="text-2xl font-bold tracking-tight text-blue-600">
                            {currentAgent?.name}
                        </h2>
                        <Badge variant="outline" className="h-7 bg-blue-600/10 text-blue-600 border-none font-bold uppercase tracking-widest text-xs">
                            {selectedCourse}
                        </Badge>
                    </div>

                    <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                        <Card className="bg-muted/30 border-none shadow-none">
                            <CardContent className="p-4 space-y-1">
                                <p className="text-xs font-bold text-muted-foreground uppercase tracking-widest">Analysis Type</p>
                                <p className="text-sm font-bold uppercase">Qualitative Analysis</p>
                            </CardContent>
                        </Card>
                        <Card className="bg-muted/30 border-none shadow-none">
                            <CardContent className="p-4 space-y-1">
                                <p className="text-xs font-bold text-muted-foreground uppercase tracking-widest">Processing Time</p>
                                <p className="text-sm font-bold">1m 12s</p>
                            </CardContent>
                        </Card>
                        <Card className="bg-muted/30 border-none shadow-none">
                            <CardContent className="p-4 space-y-1">
                                <p className="text-xs font-bold text-muted-foreground uppercase tracking-widest">Reliability Status</p>
                                <Badge className="bg-green-600 text-white border-none text-[11px] uppercase font-extrabold px-2 py-0">Verified</Badge>
                            </CardContent>
                        </Card>
                    </div>

                    <Tabs defaultValue="results" className="w-full">
                        <TabsList className="w-full justify-start h-12 bg-muted/20 border border-border/50 p-1 mb-6">
                            <TabsTrigger value="results" className="flex-1 py-3 font-bold uppercase text-[10px] tracking-widest transition-all">
                                <FileText className="mr-2 h-3 w-3" />
                                Analysis Results
                            </TabsTrigger>
                            <TabsTrigger value="overview" className="flex-1 py-2 font-bold uppercase text-xs tracking-widest transition-all">
                                <Info className="mr-2 h-3 w-3" />
                                Course Overview
                            </TabsTrigger>
                            <TabsTrigger value="points" className="flex-1 py-2 font-bold uppercase text-xs tracking-widest transition-all">
                                <Lightbulb className="mr-2 h-3 w-3" />
                                Key Learning Points
                            </TabsTrigger>
                            <TabsTrigger value="difficulty" className="flex-1 py-3 font-bold uppercase text-[10px] tracking-widest transition-all">
                                <AlertTriangle className="mr-2 h-3 w-3" />
                                Difficulty
                            </TabsTrigger>
                        </TabsList>

                        <TabsContent value="results" className="space-y-6">
                            <div className="grid grid-cols-1 gap-6">
                                <div className="space-y-6">
                                    <div className="flex items-center gap-4 p-4 bg-muted/10 rounded-xl border border-border/50 shadow-sm transition-all hover:bg-muted/15">
                                        <div className="w-16 h-16 rounded-full border-4 border-blue-600 border-t-transparent flex items-center justify-center">
                                            <span className="text-lg font-black text-blue-600">8.9</span>
                                        </div>
                                        <div>
                                            <h4 className="text-xs font-bold text-muted-foreground uppercase tracking-widest">Aggregate Quality Score</h4>
                                            <p className="text-sm font-bold">Outstanding alignment with {currentAgent?.name} standards.</p>
                                        </div>
                                    </div>

                                    <div className="grid md:grid-cols-2 gap-6">
                                        <div className="space-y-3">
                                            <h4 className="text-xs font-bold text-blue-600 uppercase tracking-widest flex items-center">
                                                <div className="w-1 h-3 bg-blue-600 mr-2" />
                                                Agent Identified Strengths
                                            </h4>
                                            <ul className="space-y-3 list-none text-sm text-foreground/80 font-medium">
                                                {["Comprehensive coverage of core concepts", "Highly interactive learning modules", "Clear and concise documentation"].map((item, i) => (
                                                    <li key={i} className="flex items-start gap-2">
                                                        <div className="mt-1 w-1.5 h-1.5 rounded-full bg-green-500 shrink-0" />
                                                        {item}
                                                    </li>
                                                ))}
                                            </ul>
                                        </div>

                                        <div className="space-y-3">
                                            <h4 className="text-xs font-bold text-red-500 uppercase tracking-widest flex items-center">
                                                <div className="w-1 h-3 bg-red-500 mr-2" />
                                                Areas for Improvement
                                            </h4>
                                            <ul className="space-y-3 list-none text-sm text-foreground/80 font-medium opacity-60">
                                                {["Minor technical glitches in mobile view", "Some advanced topics could use more depth"].map((item, i) => (
                                                    <li key={i} className="flex items-start gap-2">
                                                        <div className="mt-1 w-1.5 h-1.5 rounded-full bg-yellow-500 shrink-0" />
                                                        {item}
                                                    </li>
                                                ))}
                                            </ul>
                                        </div>
                                    </div>

                                    <div className="grid grid-cols-2 md:grid-cols-4 gap-4 pt-4 border-t border-border/50">
                                        {[
                                            { label: "Instructional Quality", score: "9/10" },
                                            { label: "Visual Presentation", score: "8/10" },
                                            { label: "Content Accuracy", score: "9/10" },
                                            { label: "Engagement Level", score: "7/10" }
                                        ].map(metric => (
                                            <div key={metric.label}>
                                                <h4 className="text-xs font-bold text-muted-foreground uppercase tracking-widest mb-1">{metric.label}</h4>
                                                <p className="text-lg font-extrabold text-foreground">{metric.score}</p>
                                            </div>
                                        ))}
                                    </div>
                                </div>
                            </div>
                        </TabsContent>

                        <TabsContent value="overview">
                            <Card className="border-border/40 shadow-sm bg-muted/5">
                                <CardContent className="p-8">
                                    <div className="flex flex-col items-center text-center max-w-lg mx-auto space-y-4">
                                        <Info className="h-10 w-10 text-blue-600/40" />
                                        <h3 className="text-lg font-bold">Course Structural Overview</h3>
                                        <p className="text-sm text-muted-foreground font-medium">
                                            Our AI agent <strong>{currentAgent?.name}</strong> has analyzed the architecture of <strong>{selectedCourse}</strong>.
                                            The course follows a modular structure with 12 sections and 48 individual learning units.
                                        </p>
                                    </div>
                                </CardContent>
                            </Card>
                        </TabsContent>
                    </Tabs>
                </div>
            )}
        </div>
    );
}
