"use client";

import { useEffect } from "react";
import { useRouter } from "next/navigation";
import { Empty, EmptyContent, EmptyDescription, EmptyHeader, EmptyTitle } from "@/components/ui/empty";
import { Button } from "@/components/ui/button";

export default function Error({ error, reset }: { error: Error & { digest?: string }; reset: () => void }) {
  const router = useRouter();

  useEffect(() => {
    // Sentry / logger
    console.error("Route error:", error);
  }, [error]);

  return (
    <div className="flex min-h-[60vh] items-center justify-center px-4">
      <Empty>
        <EmptyHeader>
          <EmptyTitle>We couldn&apos;t load this page</EmptyTitle>
          <EmptyDescription>There was a temporary issue loading this content. Please try again or go back.</EmptyDescription>
        </EmptyHeader>

        <EmptyContent>
          <div className="flex gap-2">
            <Button onClick={() => reset()} size="sm">
              Try Again
            </Button>

            <Button variant="ghost" size="sm" onClick={() => router.back()}>
              Go Back
            </Button>
          </div>
        </EmptyContent>
      </Empty>
    </div>
  );
}
