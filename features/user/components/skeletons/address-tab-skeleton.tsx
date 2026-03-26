import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Skeleton } from "@/components/ui/skeleton";

export function AddressTabSkeleton() {
  return (
    <Card>
      {/* HEADER */}
      <CardHeader className="flex flex-row items-center justify-between">
        <CardTitle>
          <Skeleton className="h-5 w-28" />
        </CardTitle>

        <Skeleton className="h-4 w-24" />
      </CardHeader>

      <CardContent>
        <div className="space-y-3">
          {Array.from({ length: 2 }).map((_, i) => (
            <div key={i} className="border rounded-md p-4 space-y-3">
              {/* HEADER */}
              <div className="flex items-center gap-2 flex-wrap">
                <Skeleton className="h-5 w-16 rounded-full" /> {/* label */}
                <Skeleton className="h-4 w-32" /> {/* recipient */}
                <Skeleton className="h-5 w-16 rounded-full" /> {/* default */}
              </div>

              {/* BODY */}
              <div className="space-y-1">
                <Skeleton className="h-4 w-32" /> {/* phone */}
                <Skeleton className="h-4 w-full" /> {/* address (1 line) */}
              </div>

              {/* ACTIONS */}
              <div className="flex gap-2 pt-2 flex-wrap">
                <Skeleton className="h-8 w-28" />
                <Skeleton className="h-8 w-16" />
                <Skeleton className="h-8 w-20" />
              </div>
            </div>
          ))}
        </div>
      </CardContent>
    </Card>
  );
}
