import { Skeleton } from "@/components/ui/skeleton";
import { Card, CardContent, CardFooter } from "@/components/ui/card";

export function DashboardSkeleton() {
    return (
        <div className="space-y-10 animate-in fade-in duration-500">
            <div className="flex flex-col gap-2">
                <Skeleton className="h-10 w-48" />
                <Skeleton className="h-5 w-96" />
            </div>

            <section>
                <div className="h-40 w-full rounded-2xl border-2 border-dashed border-border/50 bg-muted/5 flex items-center justify-center">
                    <Skeleton className="h-12 w-64" />
                </div>
            </section>

            <section className="grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-4">
                {[...Array(4)].map((_, i) => (
                    <Card key={i} className="border-border/40 overflow-hidden h-full flex flex-col">
                        <Skeleton className="h-32 w-full" />
                        <CardContent className="p-5 flex-1 space-y-4">
                            <div className="space-y-2">
                                <Skeleton className="h-5 w-3/4" />
                                <Skeleton className="h-4 w-1/2" />
                            </div>
                            <Skeleton className="h-4 w-1/4" />
                        </CardContent>
                        <CardFooter className="p-5 pt-0 flex flex-col gap-3">
                            <div className="w-full space-y-2">
                                <div className="flex items-center justify-between">
                                    <Skeleton className="h-3 w-16" />
                                    <Skeleton className="h-3 w-8" />
                                </div>
                                <Skeleton className="h-2 w-full" />
                            </div>
                        </CardFooter>
                    </Card>
                ))}
            </section>
        </div>
    );
}
