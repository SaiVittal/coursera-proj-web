"use client";

import * as React from "react";
import { Card, CardContent, CardFooter } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Clock } from "lucide-react";
import Link from "next/link";
import { cn } from "@/lib/utils";

interface CourseCardProps {
    title: string;
    instructor: string;
    duration: string;
    progress: number;
    status: "Completed" | "In Progress";
    gradient: string;
}

export function CourseCard({ title, instructor, duration, progress, status, gradient }: CourseCardProps) {
    const isCompleted = status === "Completed";
    const slug = title.toLowerCase().replace(/ /g, "-");

    return (
        <Link href={`/courses/${slug}`} className="block h-full">
            <Card className="hover:shadow-md transition-all duration-300 border border-border/50 overflow-hidden group h-full flex flex-col bg-card">
                <div className={`h-32 w-full flex items-center justify-center relative ${gradient}`}>
                    <div className="absolute inset-0 bg-black/5 group-hover:bg-black/0 transition-colors" />
                    <div className="z-10 bg-background/10 backdrop-blur-md rounded-full p-3 border border-border/20">
                        <div className="h-8 w-8 rounded-full border-2 border-white/60 flex items-center justify-center">
                            <div className="h-4 w-4 rounded-full border border-white/40" />
                        </div>
                    </div>
                    <div className="absolute bottom-3 left-4 right-4">
                        <span className="text-[11px] font-bold text-white/90 uppercase tracking-wider leading-none">{title}</span>
                    </div>
                </div>
                <CardContent className="p-5 flex-1 space-y-4">
                    <div className="space-y-1">
                        <h3 className="font-bold text-base leading-tight tracking-tight text-foreground group-hover:text-blue-600 transition-colors">{title}</h3>
                        <p className="text-sm text-muted-foreground font-medium">{instructor}</p>
                    </div>

                    <div className="flex items-center gap-2 text-muted-foreground">
                        <Clock className="h-4 w-4" />
                        <span className="text-xs font-medium">{duration}</span>
                    </div>
                </CardContent>
                <CardFooter className="p-5 pt-0 flex flex-col gap-3">
                    <div className="w-full space-y-2">
                        <div className="flex items-center justify-between">
                            <div className="flex items-center gap-2">
                                {isCompleted ? (
                                    <span className="text-xs font-bold text-muted-foreground">Completed</span>
                                ) : (
                                    <Badge className="bg-blue-600 text-white hover:bg-blue-700 text-[11px] px-2 py-0 border-none font-bold">In Progress</Badge>
                                )}
                            </div>
                            <span className="text-xs font-bold text-muted-foreground">{progress}%</span>
                        </div>
                        <div className="h-2 w-full bg-muted rounded-full overflow-hidden">
                            <div
                                className={cn(
                                    "h-full transition-all duration-500 rounded-full",
                                    isCompleted ? "bg-blue-600" : "bg-blue-600"
                                )}
                                style={{ width: `${progress}%` }}
                            />
                        </div>
                    </div>
                </CardFooter>
            </Card>
        </Link>
    );
}
