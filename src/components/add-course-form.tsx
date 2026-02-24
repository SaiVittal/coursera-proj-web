"use client";

import * as React from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Card, CardContent } from "@/components/ui/card";
import { Plus } from "lucide-react";

interface AddCourseFormProps {
    onAdd: (slugs: string) => void;
    isLoading?: boolean;
}

export function AddCourseForm({ onAdd, isLoading }: AddCourseFormProps) {
    const [inputValue, setInputValue] = React.useState("");

    const handleAdd = () => {
        if (inputValue.trim()) {
            onAdd(inputValue);
            setInputValue("");
        }
    };

    return (
        <Card className="border-border/50 bg-background shadow-sm overflow-hidden">
            <CardContent className="p-8 space-y-6">
                <div className="space-y-2">
                    <h2 className="text-xl font-bold tracking-tight text-foreground">Add New Course</h2>
                    <p className="text-[11px] font-bold text-muted-foreground uppercase tracking-widest leading-relaxed">
                        Enter course slug(s) to add to your dashboard. Use commas for multiple entries.
                    </p>
                </div>

                <div className="flex flex-col sm:flex-row gap-3 items-center">
                    <div className="relative flex-1 w-full">
                        <Input
                            value={inputValue}
                            onChange={(e) => setInputValue(e.target.value)}
                            placeholder="e.g., react-fundamentals, typescript-mastery"
                            className="h-12 bg-muted/10 border-border/50 focus-visible:ring-1 focus-visible:ring-blue-500 text-xs font-medium placeholder:font-normal"
                        />
                    </div>
                    <Button
                        onClick={handleAdd}
                        loading={isLoading}
                        className="h-12 px-8 bg-blue-600 hover:bg-blue-700 text-white font-bold text-xs uppercase tracking-[0.2em] transition-all duration-300 shadow-xl shadow-blue-500/20 active:scale-[0.98]"
                    >
                        <Plus className="mr-2 h-4 w-4" />
                        Add Course
                    </Button>
                </div>
            </CardContent>
        </Card>
    );
}
