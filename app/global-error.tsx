"use client";

import { useEffect } from "react";
import { Empty, EmptyContent, EmptyDescription, EmptyHeader, EmptyTitle } from "@/components/ui/empty";
import { Button } from "@/components/ui/button";

export default function GlobalError({ error }: { error: Error & { digest?: string } }) {
  useEffect(() => {
    console.error("Global error:", error);
  }, [error]);

  return (
    <html>
      <body className="h-screen flex items-center justify-center">
        <Empty>
          <EmptyHeader>
            <EmptyTitle>Unexpected Application Error</EmptyTitle>
            <EmptyDescription>We encountered a critical error. Please refresh the page.</EmptyDescription>
          </EmptyHeader>

          <EmptyContent>
            <Button onClick={() => window.location.reload()} size="sm">
              Refresh Page
            </Button>
          </EmptyContent>
        </Empty>
      </body>
    </html>
  );
}
