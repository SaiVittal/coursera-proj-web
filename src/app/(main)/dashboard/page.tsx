"use client";

import * as React from "react";
import { AddCourseForm } from "@/components/add-course-form";
import { CourseCard } from "@/components/course-card";

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
    const [courses, setCourses] = React.useState(INITIAL_COURSES);
    const [isAdding, setIsAdding] = React.useState(false);

    const handleAddCourse = (slugs: string) => {
        setIsAdding(true);
        const slugList = slugs.split(",").map(s => s.trim()).filter(Boolean);

        // Simulation: Add courses one by one or all at once? Let's do all.
        const newCourses = slugList.map(slug => ({
            title: slug.split("-").map(word => word.charAt(0).toUpperCase() + word.slice(1)).join(" "),
            instructor: "Pending Assignment",
            duration: "Calculating...",
            progress: 0,
            status: "In Progress" as const,
            gradient: "bg-gradient-to-br from-slate-700 to-slate-900",
        }));

        setCourses(prev => [...newCourses, ...prev]);

        // Simulate agent runs
        setTimeout(() => {
            setIsAdding(false);
            // Gradually update progress to simulate 7 agents running
            let currentProgress = 0;
            const interval = setInterval(() => {
                currentProgress += 14; // 100 / 7 approx
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
            }, 1500);
        }, 1000);
    };

    return (
        <div className="space-y-10">
            <div className="flex flex-col gap-2">
                <h1 className="text-4xl font-extrabold tracking-tight text-foreground">My Courses</h1>
                <p className="text-base text-muted-foreground font-medium">
                    Manage and analyze your online courses with automated agents
                </p>
            </div>

            <section>
                <AddCourseForm onAdd={handleAddCourse} isLoading={isAdding} />
            </section>

            <section className="grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-4">
                {courses.map((course, idx) => (
                    <CourseCard key={idx} {...course} />
                ))}
            </section>
        </div>
    );
}
