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
            <div className="flex flex-col gap-1">
                <h1 className="text-3xl font-bold tracking-tight text-foreground">Reports</h1>
                <p className="text-base text-muted-foreground font-medium">
                    Select a course and agent to view and download analysis reports
                </p>
            </div>

            <Card className="border-border/50 bg-background shadow-sm">
                <CardContent className="p-8 space-y-6">
                    <div className="space-y-6">
                        <div className="space-y-2">
                            <label className="text-xs font-bold text-slate-500 uppercase tracking-wider">Select Course</label>
                            <Select value={selectedCourse} onValueChange={(val) => {
                                setSelectedCourse(val);
                                setSelectedAgent("");
                            }}>
                                <SelectTrigger className="h-11 border-border/50 bg-muted/20 text-sm">
                                    <SelectValue placeholder="React Fundamentals" />
                                </SelectTrigger>
                                <SelectContent>
                                    {COURSES.map(course => (
                                        <SelectItem key={course} value={course}>{course}</SelectItem>
                                    ))}
                                </SelectContent>
                            </Select>
                        </div>
                        <div className="space-y-2">
                            <label className="text-xs font-bold text-slate-500 uppercase tracking-wider">Select Agent Report</label>
                            <Select
                                value={selectedAgent}
                                onValueChange={(val) => {
                                    setSelectedAgent(val);
                                }}
                                disabled={!selectedCourse}
                            >
                                <SelectTrigger className="h-11 border-border/50 bg-muted/20 text-sm disabled:opacity-50">
                                    <SelectValue placeholder="Learner expectation & Outcome Alignment" />
                                </SelectTrigger>
                                <SelectContent>
                                    {AGENTS.map(agent => (
                                        <SelectItem key={agent.id} value={agent.id}>{agent.name}</SelectItem>
                                    ))}
                                </SelectContent>
                            </Select>
                        </div>
                    </div>

                    <div className="flex gap-3 pt-2">
                        <Button
                            variant="secondary"
                            onClick={handleViewPDF}
                            className="h-10 px-6 bg-[#2563eb] text-white hover:bg-[#1d4ed8] font-bold text-xs"
                        >
                            <Eye className="mr-2 h-4 w-4" />
                            View Report
                        </Button>
                        <Button
                            variant="secondary"
                            onClick={handleDownload}
                            className="h-10 px-6 bg-[#2563eb] text-white hover:bg-[#1d4ed8] font-bold text-xs"
                        >
                            <Download className="mr-2 h-4 w-4" />
                            Download Report
                        </Button>
                    </div>
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
                    <div className="flex flex-col gap-1">
                        <h2 className="text-2xl font-bold tracking-tight text-foreground">
                            {currentAgent?.name}
                        </h2>
                    </div>

                    <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                        <div className="p-6 bg-muted/50 rounded-lg space-y-2">
                            <p className="text-xs font-bold text-muted-foreground uppercase tracking-widest leading-none">Report Type</p>
                            <p className="text-base font-bold text-foreground">summary</p>
                        </div>
                        <div className="p-6 bg-muted/50 rounded-lg space-y-2">
                            <p className="text-xs font-bold text-muted-foreground uppercase tracking-widest leading-none">Duration</p>
                            <p className="text-base font-bold text-foreground">45s</p>
                        </div>
                        <div className="p-6 bg-muted/50 rounded-lg space-y-2">
                            <p className="text-xs font-bold text-muted-foreground uppercase tracking-widest leading-none">Status</p>
                            <p className="text-sm font-bold text-foreground uppercase">Completed</p>
                        </div>
                    </div>

                    <Tabs defaultValue="results" className="w-full">
                        <TabsList className="w-full justify-start h-12 bg-muted/20 rounded-lg border border-border p-1 mb-6">
                            <TabsTrigger value="results" className="flex-1 py-2 font-bold text-muted-foreground text-xs tracking-tight data-[state=active]:bg-background data-[state=active]:text-foreground data-[state=active]:shadow-sm">
                                Analysis Results
                            </TabsTrigger>
                            <TabsTrigger value="overview" className="flex-1 py-2 font-bold text-muted-foreground text-xs tracking-tight data-[state=active]:bg-background data-[state=active]:text-foreground data-[state=active]:shadow-sm">
                                Course Overview
                            </TabsTrigger>
                            <TabsTrigger value="points" className="flex-1 py-2 font-bold text-muted-foreground text-xs tracking-tight data-[state=active]:bg-background data-[state=active]:text-foreground data-[state=active]:shadow-sm">
                                Key Learning Points
                            </TabsTrigger>
                            <TabsTrigger value="difficulty" className="flex-1 py-2 font-bold text-muted-foreground text-xs tracking-tight data-[state=active]:bg-background data-[state=active]:text-foreground data-[state=active]:shadow-sm">
                                Difficulty Assessment
                            </TabsTrigger>
                        </TabsList>

                        <TabsContent value="results" className="space-y-6">
                            <Card className="border border-border bg-card shadow-none">
                                <CardContent className="p-8 space-y-6">
                                    <div className="space-y-2">
                                        <p className="text-xs font-bold text-muted-foreground uppercase tracking-widest">Alignment Score</p>
                                        <p className="text-3xl font-bold text-foreground">92%</p>
                                    </div>

                                    <div className="grid md:grid-cols-2 gap-6 pt-4">
                                        <div className="space-y-3">
                                            <h4 className="text-xs font-bold text-muted-foreground uppercase tracking-widest flex items-center">
                                                <div className="w-1 h-3 bg-blue-600 mr-2" />
                                                Agent Identified Strengths
                                            </h4>
                                            <ul className="space-y-3 list-none text-sm text-foreground/80 font-medium">
                                                {["Comprehensive coverage of core concepts", "Highly interactive learning modules", "Clear and concise documentation"].map((item, i) => (
                                                    <li key={i} className="flex items-start gap-2">
                                                        <div className="mt-1 w-1.5 h-1.5 rounded-full bg-blue-500 shrink-0" />
                                                        {item}
                                                    </li>
                                                ))}
                                            </ul>
                                        </div>

                                        <div className="space-y-3">
                                            <h4 className="text-xs font-bold text-muted-foreground/60 uppercase tracking-widest flex items-center">
                                                <div className="w-1 h-3 bg-muted mr-2" />
                                                Areas for Improvement
                                            </h4>
                                            <ul className="space-y-3 list-none text-sm text-muted-foreground font-medium">
                                                {["Minor technical glitches in mobile view", "Some advanced topics could use more depth"].map((item, i) => (
                                                    <li key={i} className="flex items-start gap-2">
                                                        <div className="mt-1 w-1.5 h-1.5 rounded-full bg-slate-200 shrink-0" />
                                                        {item}
                                                    </li>
                                                ))}
                                            </ul>
                                        </div>
                                    </div>

                                    <div className="grid grid-cols-2 md:grid-cols-4 gap-4 pt-6 border-t border-border">
                                        {[
                                            { label: "Instructional Quality", score: "9/10" },
                                            { label: "Visual Presentation", score: "8/10" },
                                            { label: "Content Accuracy", score: "9/10" },
                                            { label: "Engagement Level", score: "7/10" }
                                        ].map(metric => (
                                            <div key={metric.label}>
                                                <h4 className="text-[10px] font-bold text-muted-foreground uppercase tracking-widest mb-1">{metric.label}</h4>
                                                <p className="text-base font-bold text-foreground">{metric.score}</p>
                                            </div>
                                        ))}
                                    </div>
                                </CardContent>
                            </Card>
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
