import { Skeleton } from "@/components/ui/skeleton";

export function NavbarSearchSkeleton() {
  return (
    <div className="w-full max-w-md flex items-center">
      <div className="relative w-full">
        {/* icon placeholder */}
        <div className="absolute left-3 top-1/2 -translate-y-1/2">
          <Skeleton className="h-4 w-4 rounded" />
        </div>

        {/* input skeleton */}
        <Skeleton className="h-10 w-full rounded-md" />
      </div>
    </div>
  );
}
