import { Card, CardContent } from "@/components/ui/card";
import { Skeleton } from "@/components/ui/skeleton";

export function ProductCardSkeleton() {
  return (
    <Card className="p-0 gap-0">
      {/* Image */}
      <div className="relative aspect-square w-full">
        <Skeleton className="h-full w-full" />
      </div>

      <CardContent className="flex flex-col gap-2 p-4 flex-1">
        {/* Title area fixed height (match min-h-11) */}
        <div className="space-y-2 min-h-11">
          <Skeleton className="h-4 w-3/4" />
          <Skeleton className="h-4 w-1/2" />
        </div>

        {/* Price pinned bottom */}
        <Skeleton className="h-4 w-1/3 mt-auto" />
      </CardContent>
    </Card>
  );
}
