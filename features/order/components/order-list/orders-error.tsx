"use client";

import { Button } from "@/components/ui/button";
import { usePathname, useRouter } from "next/navigation";

export function OrdersError() {
  const router = useRouter();
  const pathname = usePathname();

  function reset() {
    router.replace(pathname); // clear  query params
  }

  return (
    <div className="py-10 text-center space-y-3">
      <p className="text-sm font-medium text-destructive">Something went wrong</p>

      <p className="text-sm text-muted-foreground">Invalid query or failed to load orders.</p>

      <Button size="sm" variant="outline" onClick={reset}>
        Reset Filters
      </Button>
    </div>
  );
}
