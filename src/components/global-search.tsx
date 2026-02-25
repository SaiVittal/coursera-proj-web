"use client";

import * as React from "react";
import { Search, BookOpen, ChevronRight } from "lucide-react";
import { Input } from "@/components/ui/input";
import { useRouter, useSearchParams } from "next/navigation";

const SUGGESTIONS = [
    { title: "React Fundamentals", slug: "react-fundamentals", type: "Course" },
    { title: "Advanced Next.js Patterns", slug: "nextjs-advanced", type: "Course" },
    { title: "TypeScript Mastery", slug: "typescript-master", type: "Course" },
];

export function GlobalSearch() {
    const router = useRouter();
    const searchParams = useSearchParams();
    const [query, setQuery] = React.useState("");
    const [isOpen, setIsOpen] = React.useState(false);
    const containerRef = React.useRef<HTMLDivElement>(null);

    React.useEffect(() => {
        const handleClickOutside = (event: MouseEvent) => {
            if (containerRef.current && !containerRef.current.contains(event.target as Node)) {
                setIsOpen(false);
            }
        };
        document.addEventListener("mousedown", handleClickOutside);
        return () => document.removeEventListener("mousedown", handleClickOutside);
    }, []);

    const handleSearch = (q: string) => {
        setQuery(q);
        setIsOpen(q.length > 0);

        // Update URL query param for live filtering
        const params = new URLSearchParams(searchParams.toString());
        if (q) {
            params.set("q", q);
        } else {
            params.delete("q");
        }
        router.push(`?${params.toString()}`, { scroll: false });
    };

    const filteredSuggestions = SUGGESTIONS.filter(item =>
        item.title.toLowerCase().includes(query.toLowerCase())
    );

    return (
        <div ref={containerRef} className="relative w-full max-w-md">
            <Search className="absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-muted-foreground/60 z-10" />
            <Input
                value={query}
                onChange={(e) => handleSearch(e.target.value)}
                onFocus={() => query.length > 0 && setIsOpen(true)}
                placeholder="Search courses..."
                className="w-full bg-muted/50 border-border/50 pl-10 focus-visible:ring-1 focus-visible:ring-blue-500 h-10 text-sm"
            />

            {isOpen && (
                <div className="absolute top-full left-0 right-0 mt-2 bg-popover border border-border rounded-xl shadow-2xl z-50 overflow-hidden animate-in fade-in slide-in-from-top-2 duration-200">
                    <div className="p-2 border-b border-border bg-muted/30">
                        <p className="text-[10px] font-bold text-muted-foreground uppercase tracking-widest px-2 py-1">Suggestions</p>
                    </div>

                    <div className="max-h-[300px] overflow-y-auto">
                        {filteredSuggestions.length > 0 ? (
                            filteredSuggestions.map((item) => (
                                <button
                                    key={item.slug}
                                    className="w-full flex items-center justify-between px-4 py-3 hover:bg-muted transition-colors text-left group"
                                    onClick={() => {
                                        router.push(`/courses/${item.slug}`);
                                        setIsOpen(false);
                                        setQuery("");
                                    }}
                                >
                                    <div className="flex items-center gap-3">
                                        <div className="h-8 w-8 rounded bg-blue-500/10 flex items-center justify-center text-blue-600">
                                            <BookOpen className="h-4 w-4" />
                                        </div>
                                        <div>
                                            <p className="text-sm font-bold text-foreground leading-none">{item.title}</p>
                                            <p className="text-[10px] text-muted-foreground mt-1 uppercase tracking-tight">Suggested Course</p>
                                        </div>
                                    </div>
                                    <ChevronRight className="h-4 w-4 text-muted-foreground/30 group-hover:text-blue-500 transition-colors" />
                                </button>
                            ))
                        ) : (
                            <div className="px-4 py-8 text-center">
                                <p className="text-sm text-muted-foreground">No suggestions found</p>
                            </div>
                        )}

                        {query && (
                            <button
                                className="w-full flex items-center justify-between px-4 py-3 hover:bg-blue-500/10 bg-blue-500/5 transition-colors text-left border-t border-border group"
                                onClick={() => setIsOpen(false)}
                            >
                                <div className="flex items-center gap-3">
                                    <div className="h-8 w-8 rounded bg-blue-600 flex items-center justify-center text-white">
                                        <Search className="h-4 w-4" />
                                    </div>
                                    <div>
                                        <p className="text-sm font-bold text-blue-600 leading-none">Search Result: &quot;{query}&quot;</p>
                                        <p className="text-[10px] text-blue-400 mt-1 uppercase tracking-tight">12 matches found</p>
                                    </div>
                                </div>
                                <ChevronRight className="h-4 w-4 text-blue-300 group-hover:text-blue-600 transition-colors" />
                            </button>
                        )}
                    </div>
                </div>
            )}
        </div>
    );
}
