"use client";

import { Card, CardContent, CardHeader } from "@/components/ui/card";
import { Skeleton } from "@/components/ui/skeleton";

export function ProfileTabSkeleton() {
  return (
    <Card>
      {/* HEADER */}
      <CardHeader className="space-y-3">
        <div className="flex items-center justify-between">
          <Skeleton className="h-5 w-40" /> {/* name */}
          <Skeleton className="h-5 w-20 rounded-full" /> {/* badge */}
        </div>
        <Skeleton className="h-4 w-60" /> {/* email */}
      </CardHeader>

      <CardContent className="space-y-6">
        {/* DISPLAY NAME */}
        <div className="space-y-2">
          <Skeleton className="h-4 w-32" /> {/* label */}
          <div className="flex items-center justify-between">
            <Skeleton className="h-4 w-40" />
            <Skeleton className="h-8 w-16" />
          </div>
        </div>

        {/* PASSWORD */}
        <div className="space-y-2">
          <Skeleton className="h-4 w-24" />

          <div className="flex items-center justify-between">
            <Skeleton className="h-4 w-32" />
            <Skeleton className="h-8 w-32" />
          </div>
        </div>

        {/* ADDRESS */}
        <div className="space-y-2">
          <Skeleton className="h-4 w-36" />

          <div className="border rounded-md p-3 space-y-2">
            <Skeleton className="h-4 w-40" />
            <Skeleton className="h-4 w-32" />
            <Skeleton className="h-4 w-full" />
            <Skeleton className="h-4 w-48" />
            <Skeleton className="h-4 w-24" />
          </div>
        </div>

        {/* PROVIDERS */}
        <div className="space-y-2">
          <Skeleton className="h-4 w-40" />

          <div className="space-y-2">
            {[1, 2].map((i) => (
              <div key={i} className="flex items-center justify-between border rounded-md p-3">
                <div className="flex items-center gap-3">
                  <Skeleton className="h-5 w-5 rounded-full" />
                  <div className="space-y-1">
                    <Skeleton className="h-4 w-24" />
                    <Skeleton className="h-3 w-40" />
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </CardContent>
    </Card>
  );
}
