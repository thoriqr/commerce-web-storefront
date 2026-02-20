import { Skeleton } from "@/components/ui/skeleton";

export function HeroCarouselSkeleton() {
  return (
    <section className="w-full">
      <div className="overflow-hidden rounded-xl">
        <div className="relative aspect-16/6 w-full">
          <Skeleton className="absolute inset-0 h-full w-full" />

          <div className="absolute inset-0 flex items-end md:items-center">
            <div className="mx-auto w-full max-w-7xl px-6 pb-8 md:pb-0">
              <div className="max-w-2xl space-y-4">
                <Skeleton className="h-8 w-2/3 md:h-12" />
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
