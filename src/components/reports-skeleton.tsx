import { Skeleton } from "@/components/ui/skeleton";
import { Card, CardContent } from "@/components/ui/card";

export function ReportsSkeleton() {
    return (
        <div className="space-y-8 animate-in fade-in duration-500">
            <div className="flex flex-col gap-2">
                <Skeleton className="h-10 w-32" />
                <Skeleton className="h-5 w-80" />
            </div>

            <Card className="border-border/50 bg-background shadow-sm">
                <CardContent className="p-6 space-y-6">
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                        <div className="space-y-2">
                            <Skeleton className="h-4 w-24" />
                            <Skeleton className="h-12 w-full" />
                        </div>
                        <div className="space-y-2">
                            <Skeleton className="h-4 w-32" />
                            <Skeleton className="h-12 w-full" />
                        </div>
                    </div>
                </CardContent>
            </Card>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                {[...Array(3)].map((_, i) => (
                    <Card key={i} className="border-border/40 shadow-sm">
                        <CardContent className="p-6 space-y-2">
                            <Skeleton className="h-4 w-20" />
                            <Skeleton className="h-8 w-12" />
                        </CardContent>
                    </Card>
                ))}
            </div>

            <Card className="border-border/40 shadow-sm">
                <div className="p-1 border-b border-border/40">
                    <Skeleton className="h-10 w-full" />
                </div>
                <div className="p-6 space-y-4">
                    <Skeleton className="h-6 w-48" />
                    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
                        {[...Array(6)].map((_, i) => (
                            <Skeleton key={i} className="h-20 w-full" />
                        ))}
                    </div>
                </div>
            </Card>
        </div>
    );
}
