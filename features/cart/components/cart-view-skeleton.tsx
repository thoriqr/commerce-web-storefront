import { SectionCard } from "@/components/section-card";
import { Skeleton } from "@/components/ui/skeleton";

export default function CartViewSkeleton() {
  return (
    <div className="max-w-5xl mx-auto px-4 py-6 space-y-6">
      {/* Title */}
      <Skeleton className="h-5 w-40" />

      <div className="grid gap-4 sm:gap-6 lg:grid-cols-[1fr_320px]">
        {/* LEFT */}
        <div className="space-y-4 sm:space-y-6">
          <SectionCard>
            <div className="space-y-4">
              <Skeleton className="h-4 w-20" />

              {Array.from({ length: 3 }).map((_, i) => (
                <div key={i} className="flex gap-3 border-b pb-4">
                  <Skeleton className="w-16 h-16 rounded-md" />

                  <div className="flex-1 space-y-2">
                    <Skeleton className="h-3 w-40" />
                    <Skeleton className="h-3 w-32" />
                    <Skeleton className="h-3 w-24" />
                  </div>

                  <Skeleton className="h-4 w-16" />
                </div>
              ))}
            </div>
          </SectionCard>
        </div>

        {/* RIGHT */}
        <div>
          <SectionCard>
            <div className="space-y-4">
              <Skeleton className="h-4 w-28" />

              <div className="space-y-2">
                <div className="flex justify-between">
                  <Skeleton className="h-3 w-20" />
                  <Skeleton className="h-3 w-20" />
                </div>

                <div className="flex justify-between">
                  <Skeleton className="h-3 w-20" />
                  <Skeleton className="h-3 w-20" />
                </div>
              </div>

              <div className="border-t pt-2 flex justify-between">
                <Skeleton className="h-4 w-24" />
                <Skeleton className="h-4 w-28" />
              </div>

              <Skeleton className="h-10 w-full" />
            </div>
          </SectionCard>
        </div>
      </div>
    </div>
  );
}
