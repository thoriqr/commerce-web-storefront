import { Skeleton } from "@/components/ui/skeleton";

export default function OrderRowSkeleton() {
  return (
    <div className="space-y-4">
      {Array.from({ length: 4 }).map((_, i) => (
        <div key={i} className="rounded-md border p-3 space-y-3">
          {/* TOP */}
          <div className="flex gap-3">
            {/* IMAGE */}
            <Skeleton className="w-16 h-16 rounded-md" />

            {/* INFO */}
            <div className="flex-1 space-y-2">
              <Skeleton className="h-4 w-3/4" />
              <Skeleton className="h-3 w-32" />
              <Skeleton className="h-3 w-40" />
            </div>
          </div>

          {/* STATUS + PRICE */}
          <div className="flex items-center justify-between">
            <Skeleton className="h-5 w-20 rounded-full" />
            <Skeleton className="h-4 w-24" />
          </div>

          {/* ACTIONS */}
          <div className="flex gap-2">
            <Skeleton className="h-8 flex-1" />
            <Skeleton className="h-8 flex-1" />
          </div>
        </div>
      ))}
    </div>
  );
}
