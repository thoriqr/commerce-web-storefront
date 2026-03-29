import { Skeleton } from "@/components/ui/skeleton";
import { SectionCard } from "../../../components/section-card";

export function CheckoutMainSkeleton() {
  return (
    <div className="grid gap-6 lg:grid-cols-[1fr_320px]">
      {/* LEFT */}
      <div className="space-y-6">
        {/* STATUS */}
        <Skeleton className="h-10 w-full rounded-md" />

        {/* ITEMS */}
        <SectionCard>
          <div className="space-y-3">
            <Skeleton className="h-4 w-20" />

            <div className="space-y-3">
              {Array.from({ length: 2 }).map((_, i) => (
                <div key={i} className="flex gap-3">
                  <Skeleton className="size-16 rounded-md" />

                  <div className="flex-1 space-y-2">
                    <Skeleton className="h-4 w-40" />
                    <Skeleton className="h-3 w-32" />
                    <Skeleton className="h-3 w-20" />
                  </div>

                  <Skeleton className="h-4 w-16" />
                </div>
              ))}
            </div>
          </div>
        </SectionCard>

        {/* ADDRESS */}
        <SectionCard>
          <div className="space-y-3">
            <Skeleton className="h-4 w-24" />

            <div className="space-y-2">
              <Skeleton className="h-4 w-40" />
              <Skeleton className="h-4 w-32" />
              <Skeleton className="h-4 w-full" />
              <Skeleton className="h-4 w-48" />
            </div>
          </div>
        </SectionCard>

        {/* SHIPPING */}
        <SectionCard>
          <div className="space-y-3">
            <Skeleton className="h-4 w-32" />

            <div className="flex gap-2">
              {Array.from({ length: 3 }).map((_, i) => (
                <Skeleton key={i} className="h-8 w-16 rounded-md" />
              ))}
            </div>

            <div className="space-y-2">
              {Array.from({ length: 2 }).map((_, i) => (
                <Skeleton key={i} className="h-14 w-full rounded-md" />
              ))}
            </div>
          </div>
        </SectionCard>
      </div>

      {/* RIGHT */}
      <div className="space-y-6">
        <SectionCard>
          <div className="space-y-4">
            <Skeleton className="h-4 w-32" />
            <Skeleton className="h-3 w-20" />

            <div className="space-y-2">
              <Skeleton className="h-4 w-full" />
              <Skeleton className="h-4 w-full" />
              <Skeleton className="h-5 w-full" />
            </div>

            <Skeleton className="h-10 w-full rounded-md" />
          </div>
        </SectionCard>
      </div>
    </div>
  );
}
