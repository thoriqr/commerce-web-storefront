import { Skeleton } from "@/components/ui/skeleton";

export default function CartContentSkeleton() {
  return (
    <div className="flex h-full flex-col">
      {/* Items */}
      <div className="flex-1 overflow-y-auto px-5 py-4 space-y-4">
        {Array.from({ length: 3 }).map((_, i) => (
          <div key={i} className="flex gap-3 border-b pb-4">
            {/* Image */}
            <Skeleton className="h-16 w-16 rounded-md" />

            {/* Content */}
            <div className="flex flex-1 flex-col gap-2">
              <Skeleton className="h-4 w-3/4" />
              <Skeleton className="h-3 w-1/2" />

              {/* price + controls */}
              <div className="mt-2 flex items-center justify-between">
                <Skeleton className="h-4 w-20" />

                <div className="flex items-center gap-2">
                  <Skeleton className="h-7 w-7 rounded-md" />
                  <Skeleton className="h-4 w-6" />
                  <Skeleton className="h-7 w-7 rounded-md" />
                  <Skeleton className="h-7 w-7 rounded-md" />
                </div>
              </div>
            </div>
          </div>
        ))}
      </div>

      {/* Sticky Summary */}
      <div className="border-t bg-background px-5 py-4">
        <div className="flex justify-between">
          <Skeleton className="h-4 w-16" />
          <Skeleton className="h-4 w-24" />
        </div>

        <Skeleton className="mt-4 h-10 w-full rounded-md" />
      </div>
    </div>
  );
}
