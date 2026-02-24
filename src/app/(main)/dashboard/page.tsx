"use client";

import * as React from "react";
import { useSearchParams } from "next/navigation";
import { AddCourseForm } from "@/components/add-course-form";
import { CourseCard } from "@/components/course-card";
import { DashboardSkeleton } from "@/components/dashboard-skeleton";
import { APP_CONFIG } from "@/constants/app-config";

const INITIAL_COURSES = [
    {
        title: "React Fundamentals",
        instructor: "John Smith",
        duration: "12 hours",
        progress: 100,
        status: "Completed" as const,
        gradient: "bg-gradient-to-br from-blue-500 to-blue-700",
    },
    {
        title: "Advanced Next.js Patterns",
        instructor: "Sarah Johnson",
        duration: "15 hours",
        progress: 100,
        status: "Completed" as const,
        gradient: "bg-gradient-to-br from-blue-600 to-indigo-800",
    },
    {
        title: "TypeScript Mastery",
        instructor: "Mike Davis",
        duration: "10 hours",
        progress: 85,
        status: "Completed" as const,
        gradient: "bg-gradient-to-br from-slate-700 to-slate-900",
    },
    {
        title: "Advanced CSS & Design Systems",
        instructor: "Emma Wilson",
        duration: "8 hours",
        progress: 65,
        status: "In Progress" as const,
        gradient: "bg-gradient-to-br from-orange-400 to-red-500",
    },
];

export default function DashboardPage() {
    const searchParams = useSearchParams();
    const query = searchParams.get("q") || "";

    const [courses, setCourses] = React.useState(INITIAL_COURSES);
    const [isAdding, setIsAdding] = React.useState(false);
    const [isLoading, setIsLoading] = React.useState(true);

    React.useEffect(() => {
        const timer = setTimeout(() => {
            setIsLoading(false);
        }, APP_CONFIG.DEFAULT_LOAD_DELAY);
        return () => clearTimeout(timer);
    }, []);

    const handleAddCourse = (slugs: string) => {
        setIsAdding(true);
        const slugList = slugs.split(",").map(s => s.trim()).filter(Boolean);

        const newCourses = slugList.map(slug => ({
            title: slug.split("-").map(word => word.charAt(0).toUpperCase() + word.slice(1)).join(" "),
            instructor: "Pending Assignment",
            duration: "Calculating...",
            progress: 0,
            status: "In Progress" as const,
            gradient: "bg-gradient-to-br from-slate-700 to-slate-900",
        }));

        setCourses(prev => [...newCourses, ...prev]);

        setTimeout(() => {
            setIsAdding(false);
            let currentProgress = 0;
            const interval = setInterval(() => {
                currentProgress += 14;
                if (currentProgress > 100) {
                    currentProgress = 100;
                    clearInterval(interval);
                }
                setCourses(prev => prev.map(c => {
                    if (newCourses.some(nc => nc.title === c.title) && c.progress < 100) {
                        return {
                            ...c,
                            progress: currentProgress,
                            status: currentProgress === 100 ? "Completed" as const : "In Progress" as const,
                            instructor: currentProgress === 100 ? "AI Analysis Complete" : "Agents Running...",
                            duration: currentProgress === 100 ? "4 hours extracted" : "Processing...",
                        };
                    }
                    return c;
                }));
            }, 1000);
        }, 1000);
    };

    const filteredCourses = courses.filter(course =>
        course.title.toLowerCase().includes(query.toLowerCase()) ||
        course.instructor.toLowerCase().includes(query.toLowerCase())
    );

    if (isLoading) {
        return <DashboardSkeleton />;
    }

    return (
        <div className="space-y-10">
            <div className="flex flex-col gap-1">
                <h1 className="text-3xl font-bold tracking-tight text-foreground">My Courses</h1>
                <p className="text-base text-muted-foreground font-medium">
                    Manage and analyze your online courses with automated agents
                </p>
            </div>

            <section>
                <AddCourseForm onAdd={handleAddCourse} isLoading={isAdding} />
            </section>

            <section className="grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-4">
                {filteredCourses.map((course, idx) => (
                    <CourseCard key={idx} {...course} />
                ))}
            </section>
        </div>
    );
}
