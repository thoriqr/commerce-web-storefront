"use client";

import { Card, CardContent, CardHeader } from "@/components/ui/card";
import { Skeleton } from "@/components/ui/skeleton";

export default function UserProfileSkeleton() {
  return (
    <div className="max-w-3xl mx-auto space-y-6">
      {/* HEADER */}
      <Card>
        <CardHeader className="space-y-3">
          <div className="flex items-center justify-between">
            <Skeleton className="h-6 w-40" />
            <Skeleton className="h-5 w-20 rounded-full" />
          </div>

          <Skeleton className="h-4 w-60" />
        </CardHeader>
      </Card>

      {/* TABS */}
      <div className="space-y-4">
        {/* Tabs list */}
        <div className="grid grid-cols-4 gap-2">
          <Skeleton className="h-10 w-full rounded-md" />
          <Skeleton className="h-10 w-full rounded-md" />
          <Skeleton className="h-10 w-full rounded-md" />
          <Skeleton className="h-10 w-full rounded-md" />
        </div>

        {/* Content Card */}
        <Card>
          <CardHeader>
            <Skeleton className="h-5 w-40" />
          </CardHeader>

          <CardContent className="space-y-4">
            {/* Display Name */}
            <div className="space-y-2">
              <Skeleton className="h-3 w-24" />
              <Skeleton className="h-4 w-48" />
            </div>

            {/* Email */}
            <div className="space-y-2">
              <Skeleton className="h-3 w-16" />
              <Skeleton className="h-4 w-56" />
            </div>

            {/* Address */}
            <div className="space-y-2">
              <Skeleton className="h-3 w-32" />

              <div className="border rounded-md p-3 space-y-2">
                <Skeleton className="h-4 w-40" />
                <Skeleton className="h-4 w-32" />
                <Skeleton className="h-4 w-full" />
                <Skeleton className="h-4 w-48" />
                <Skeleton className="h-4 w-24" />
              </div>
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  );
}
