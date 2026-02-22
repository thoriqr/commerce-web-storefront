"use client";

import { Empty, EmptyHeader, EmptyTitle, EmptyDescription, EmptyContent } from "@/components/ui/empty";
import { Button } from "@/components/ui/button";

type Props = {
  message?: string;
  onRetry: () => void;
  onResetFilters: () => void;
};

export function ProductListError({ message, onRetry, onResetFilters }: Props) {
  return (
    <div className="flex justify-center py-16">
      <Empty>
        <EmptyHeader>
          <EmptyTitle>Something went wrong</EmptyTitle>
          <EmptyDescription>{message ?? "We couldn't load the products."}</EmptyDescription>
        </EmptyHeader>

        <EmptyContent>
          <div className="flex gap-2">
            <Button size="sm" onClick={onRetry}>
              Try Again
            </Button>
            <Button size="sm" variant="outline" onClick={onResetFilters}>
              Reset Filters
            </Button>
          </div>
        </EmptyContent>
      </Empty>
    </div>
  );
}
