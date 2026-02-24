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
                <div className="space-y-1">
                    <h2 className="text-xl font-bold tracking-tight text-foreground">Add New Course</h2>
                    <p className="text-sm text-muted-foreground">
                        Enter course slug(s) to add to your dashboard. Use commas to add multiple courses at once (e.g., react-fundamentals, typescript-mastery, css-design)
                    </p>
                </div>

                <div className="flex flex-col sm:flex-row gap-3 items-center">
                    <Input
                        value={inputValue}
                        onChange={(e) => setInputValue(e.target.value)}
                        placeholder="e.g., react-fundamentals, typescript-mastery, css-design"
                        className="h-12 bg-muted/20 border-border/50 focus-visible:ring-1 focus-visible:ring-blue-500 placeholder:text-muted-foreground/50"
                    />
                    <Button
                        onClick={handleAdd}
                        loading={isLoading}
                        className="h-12 px-6 bg-[#2563eb] hover:bg-[#1d4ed8] text-white font-medium"
                    >
                        <Plus className="mr-2 h-4 w-4" />
                        Add Course
                    </Button>
                </div>
            </CardContent>
        </Card>
    );
}
