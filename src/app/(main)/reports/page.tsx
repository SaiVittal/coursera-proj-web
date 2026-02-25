"use client";

import * as React from "react";
import { Card, CardContent } from "@/components/ui/card";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Button } from "@/components/ui/button";
import { FileText, Info, Download, Eye, Target, MessageSquare, Lightbulb, BookOpen, CheckCircle2, AlertCircle, TrendingUp, ShieldCheck } from "lucide-react";
import { toast } from "sonner";
import { APP_CONFIG } from "@/constants/app-config";
import { useSearchParams } from "next/navigation";
import { getCourseData, CourseData } from "@/constants/course-data";

const COURSES = [
    { name: "Agile Leader Training", slug: "agile-leader" },
    { name: "React Fundamentals", slug: "react-fundamentals" },
    { name: "Advanced Next.js Patterns", slug: "advanced-nextjs" },
    { name: "TypeScript Mastery", slug: "typescript-mastery" },
];

const AGENTS = [
    { id: "lo", name: "LO & Pre-requisites", icon: Target, taskName: "Learning Objective Validation" },
    { id: "learner", name: "Learner expectation & Outcome Alignment", icon: MessageSquare, taskName: "Content to LO Matching Validation" },
    { id: "instruction", name: "Instruction Material Quality", icon: Lightbulb, taskName: "Course Outline Validation" },
    { id: "content", name: "Course Content", icon: BookOpen, taskName: "Course Outline Validation" },
    { id: "assessment", name: "Assessments", icon: CheckCircle2, taskName: "Learning Objective Validation" },
    { id: "technical", name: "Technical & Usability issues", icon: AlertCircle, taskName: "Content to LO Matching Validation" },
    { id: "suggestions", name: "Suggestions of Improvement", icon: TrendingUp, taskName: "Learning Objective Validation" },
];

import { ReportsSkeleton } from "@/components/reports-skeleton";

function ReportsPageContent() {
    const searchParams = useSearchParams();
    const courseParam = searchParams.get("course");
    const agentParam = searchParams.get("agent");

    const [selectedCourse, setSelectedCourse] = React.useState<string>(courseParam || "");
    const [selectedAgent, setSelectedAgent] = React.useState<string>(agentParam || "");
    const [isGenerating, setIsGenerating] = React.useState(false);
    const [isLoading, setIsLoading] = React.useState(true);
    const [courseData, setCourseData] = React.useState<CourseData | null>(null);

    React.useEffect(() => {
        if (courseParam) setSelectedCourse(courseParam);
        if (agentParam) setSelectedAgent(agentParam);
    }, [courseParam, agentParam]);

    React.useEffect(() => {
        if (selectedCourse) {
            setCourseData(getCourseData(selectedCourse));
        } else {
            setCourseData(null);
        }
    }, [selectedCourse]);

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
                error: (err: Error) => `Failed to download: ${err.message}`,
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
                                        <SelectItem key={course.slug} value={course.slug}>{course.name}</SelectItem>
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
                                        <SelectItem key={agent.id} value={agent.id}>
                                            <div className="flex items-center gap-2">
                                                <agent.icon className="h-3.5 w-3.5 text-blue-600" />
                                                <span>{agent.name}</span>
                                            </div>
                                        </SelectItem>
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
                                Pedagogical Insights
                            </TabsTrigger>
                            <TabsTrigger value="difficulty" className="flex-1 py-2 font-bold text-muted-foreground text-xs tracking-tight data-[state=active]:bg-background data-[state=active]:text-foreground data-[state=active]:shadow-sm">
                                Assessment metrics
                            </TabsTrigger>
                        </TabsList>

                        <TabsContent value="results" className="space-y-6">
                            <Card className="border border-border bg-card shadow-none">
                                <CardContent className="p-8 space-y-6">
                                    <div className="flex items-center justify-between">
                                        <div className="space-y-2">
                                            <p className="text-xs font-bold text-muted-foreground uppercase tracking-widest">Agent Confidence Score</p>
                                            <p className="text-4xl font-black text-blue-600 tracking-tighter">
                                                {courseData?.AgentScore ? (courseData.AgentScore * 20).toFixed(0) : "92"}%
                                            </p>
                                        </div>
                                        <div className="h-12 w-12 rounded-full bg-blue-50 flex items-center justify-center">
                                            {currentAgent && <currentAgent.icon className="h-6 w-6 text-blue-600" />}
                                        </div>
                                    </div>

                                    <div className="grid md:grid-cols-2 gap-8 pt-4">
                                        <div className="space-y-4">
                                            <h4 className="text-xs font-bold text-slate-800 uppercase tracking-widest flex items-center">
                                                <div className="w-1.5 h-4 bg-blue-600 mr-2 rounded-full" />
                                                Agent Identified Highlights
                                            </h4>
                                            <ul className="space-y-4 list-none text-sm text-foreground/80 font-medium">
                                                {(courseData?.TasksAndHighlights.find(t => t.TaskName === currentAgent?.taskName)?.Highlights ||
                                                    ["Comprehensive coverage of core concepts", "Highly interactive learning modules", "Clear and concise documentation"]).map((item, i) => (
                                                        <li key={i} className="flex items-start gap-4 p-3 rounded-xl bg-blue-50/30 border border-blue-100/50">
                                                            <CheckCircle2 className="mt-0.5 w-4 h-4 text-blue-500 shrink-0" />
                                                            <span className="leading-relaxed">{item}</span>
                                                        </li>
                                                    ))}
                                            </ul>
                                        </div>

                                        <div className="space-y-4">
                                            <h4 className="text-xs font-bold text-slate-800 uppercase tracking-widest flex items-center">
                                                <div className="w-1.5 h-4 bg-amber-500 mr-2 rounded-full" />
                                                Agent Critical Lowlights
                                            </h4>
                                            <ul className="space-y-4 list-none text-sm text-muted-foreground font-medium">
                                                {(courseData?.TasksAndLowlights.find(t => t.TaskName === currentAgent?.taskName)?.Lowlights ||
                                                    ["Minor technical glitches in mobile view", "Some advanced topics could use more depth"]).map((item, i) => (
                                                        <li key={i} className="flex items-start gap-4 p-3 rounded-xl bg-amber-50/30 border border-amber-100/50 text-amber-900">
                                                            <AlertCircle className="mt-0.5 w-4 h-4 text-amber-500 shrink-0" />
                                                            <span className="leading-relaxed font-semibold">{item}</span>
                                                        </li>
                                                    ))}
                                                {courseData?.TasksAndLowlights.find(t => t.TaskName === currentAgent?.taskName)?.Lowlights.length === 0 && (
                                                    <li className="flex items-center gap-2 p-3 text-xs italic text-muted-foreground">
                                                        <ShieldCheck className="h-4 w-4 text-emerald-500" />
                                                        No lowlights identified for this section.
                                                    </li>
                                                )}
                                            </ul>
                                        </div>
                                    </div>

                                    <div className="grid grid-cols-2 md:grid-cols-4 gap-4 pt-8 border-t border-border/50">
                                        {[
                                            { label: "Instructional Quality", score: courseData ? `${(courseData.AgentScore + 0.5).toFixed(1)}/10` : "9/10" },
                                            { label: "Visual Presentation", score: courseData ? `${(courseData.AgentScore - 0.2).toFixed(1)}/10` : "8/10" },
                                            { label: "Content Accuracy", score: courseData ? `${(courseData.AgentScore + 0.3).toFixed(1)}/10` : "9/10" },
                                            { label: "Engagement Level", score: courseData ? `${(courseData.AgentScore - 0.5).toFixed(1)}/10` : "7/10" }
                                        ].map(metric => (
                                            <div key={metric.label} className="p-4 rounded-xl bg-muted/20 border border-border/20">
                                                <h4 className="text-[10px] font-bold text-muted-foreground uppercase tracking-widest mb-1">{metric.label}</h4>
                                                <p className="text-xl font-black text-foreground tracking-tight">{metric.score}</p>
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
                                        <h3 className="text-xl font-black tracking-tight">Course Structural Overview</h3>
                                        <p className="text-base text-muted-foreground font-medium leading-relaxed">
                                            Our AI agent <strong>{currentAgent?.name}</strong> has performed a deep-dive analysis of <strong>{courseData?.CourseName || selectedCourse}</strong>.
                                            {courseData ? (
                                                <>
                                                    The course features a robust architecture with <strong>{courseData.ModuleLevel.length} modules</strong> and
                                                    comprehensive evaluation across <strong>{courseData.CourseTaskScores.length} key pedagogical dimensions</strong>.
                                                </>
                                            ) : (
                                                "The course follows a modular structure with 12 sections and 48 individual learning units."
                                            )}
                                        </p>
                                    </div>
                                </CardContent>
                            </Card>
                        </TabsContent>

                        <TabsContent value="points">
                            <Card className="border border-border bg-card shadow-none">
                                <CardContent className="p-8 space-y-6">
                                    <div className="flex flex-col gap-1">
                                        <h4 className="text-xs font-bold text-slate-800 uppercase tracking-widest">Pedagogical Framework</h4>
                                        <p className="text-base text-muted-foreground font-medium">Key concepts analyzed by the {currentAgent?.name} agent.</p>
                                    </div>
                                    <div className="grid grid-cols-1 gap-4">
                                        {courseData && Object.entries(courseData.Glossary).map(([term, definition], i) => (
                                            <div key={i} className="p-4 rounded-xl bg-muted/20 border border-border/50 space-y-2">
                                                <p className="text-sm font-black text-blue-600 uppercase tracking-tight">{term}</p>
                                                <p className="text-sm text-foreground/80 leading-relaxed font-medium">{definition}</p>
                                            </div>
                                        ))}
                                        {!courseData && (
                                            <div className="flex flex-col items-center py-10 text-center opacity-50">
                                                <BookOpen className="h-8 w-8 mb-2" />
                                                <p className="text-sm font-bold">Standard pedagogical patterns applied.</p>
                                            </div>
                                        )}
                                    </div>
                                </CardContent>
                            </Card>
                        </TabsContent>

                        <TabsContent value="difficulty">
                            <Card className="border border-border bg-card shadow-none">
                                <CardContent className="p-8 space-y-8">
                                    <div className="flex flex-col gap-1">
                                        <h4 className="text-xs font-bold text-slate-800 uppercase tracking-widest">Assessment Metrics</h4>
                                        <p className="text-base text-muted-foreground font-medium">Granular performance indicators for the {selectedCourse} course.</p>
                                    </div>
                                    <div className="space-y-6">
                                        {(courseData?.ModuleTaskScores || []).map((task, i) => (
                                            <div key={i} className="space-y-3">
                                                <div className="flex items-center justify-between">
                                                    <span className="text-sm font-black text-foreground uppercase tracking-tight">{task.TaskName}</span>
                                                    <span className="text-xs font-bold text-blue-600 bg-blue-50 px-2 py-1 rounded-md">
                                                        {(task.Modules.reduce((acc, m) => acc + m.ModuleScore, 0) / (task.Modules.length || 1)).toFixed(1)} / 5.0
                                                    </span>
                                                </div>
                                                <div className="grid grid-cols-2 md:grid-cols-5 gap-2">
                                                    {task.Modules.map((mod, j) => (
                                                        <div key={j} className="flex flex-col items-center gap-1 p-2 rounded-lg bg-muted/10 border border-border/20">
                                                            <div className="h-1.5 w-full bg-muted/50 rounded-full overflow-hidden">
                                                                <div
                                                                    className="h-full bg-blue-500 rounded-full transition-all duration-1000"
                                                                    style={{ width: `${(mod.ModuleScore / 5) * 100}%` }}
                                                                />
                                                            </div>
                                                            <span className="text-[9px] font-bold text-muted-foreground uppercase truncate w-full text-center">{mod.ModuleName}</span>
                                                        </div>
                                                    ))}
                                                </div>
                                            </div>
                                        ))}
                                        {(!courseData || courseData.ModuleTaskScores.length === 0) && (
                                            <div className="flex flex-col items-center py-20 text-center opacity-50">
                                                <TrendingUp className="h-12 w-12 text-blue-600/20 mb-4" />
                                                <h3 className="text-lg font-bold">General Analysis Available</h3>
                                                <p className="text-sm font-medium text-muted-foreground max-w-xs mt-2">
                                                    Detailed assessment metrics are calculated based on module-specific performance.
                                                </p>
                                            </div>
                                        )}
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

import { Suspense } from "react";

export default function ReportsPage() {
    return (
        <Suspense fallback={<ReportsSkeleton />}>
            <ReportsPageContent />
        </Suspense>
    );
}
