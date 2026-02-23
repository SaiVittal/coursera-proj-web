"use client";

import * as React from "react";
import { Card, CardContent, CardFooter } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Clock } from "lucide-react";

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

    return (
        <Card className="hover:shadow-xl transition-all duration-300 border-border/40 overflow-hidden group h-full flex flex-col">
            <div className={`h-32 w-full flex items-center justify-center relative ${gradient}`}>
                <div className="absolute inset-0 bg-black/5 group-hover:bg-black/0 transition-colors" />
                <div className="z-10 bg-white/10 backdrop-blur-md rounded-full p-3 border border-white/20">
                    <div className="h-8 w-8 rounded-full border-2 border-white/60 flex items-center justify-center">
                        <div className="h-4 w-4 rounded-full border border-white/40" />
                    </div>
                </div>
                <div className="absolute bottom-4 left-4 right-4">
                    <span className="text-[10px] font-bold text-white/90 uppercase tracking-widest leading-none drop-shadow-sm">{title}</span>
                </div>
            </div>
            <CardContent className="p-5 flex-1 space-y-4">
                <div className="space-y-1">
                    <h3 className="font-bold text-base leading-tight tracking-tight text-foreground group-hover:text-blue-600 transition-colors">{title}</h3>
                    <p className="text-sm text-muted-foreground font-medium">{instructor}</p>
                </div>

                <div className="flex items-center gap-1.5 text-muted-foreground">
                    <Clock className="h-4 w-4" />
                    <span className="text-xs font-semibold">{duration}</span>
                </div>
            </CardContent>
            <CardFooter className="p-5 pt-0 flex flex-col gap-3">
                <div className="w-full space-y-2">
                    <div className="flex items-center justify-between">
                        <div className="flex items-center gap-2">
                            {isCompleted ? (
                                <span className="text-[10px] font-bold text-foreground uppercase tracking-widest">Completed</span>
                            ) : (
                                <Badge className="bg-blue-600 text-white hover:bg-blue-600 text-[9px] px-2 py-0 border-none uppercase font-bold tracking-widest">In Progress</Badge>
                            )}
                        </div>
                        <span className="text-[10px] font-bold text-muted-foreground">{progress}%</span>
                    </div>
                    <div className="h-1.5 w-full bg-muted rounded-full overflow-hidden">
                        <div
                            className={`h-full transition-all duration-500 rounded-full ${isCompleted ? "bg-[#2563eb]" : "bg-[#2563eb]"}`}
                            style={{ width: `${progress}%` }}
                        />
                    </div>
                </div>
            </CardFooter>
        </Card>
    );
}
