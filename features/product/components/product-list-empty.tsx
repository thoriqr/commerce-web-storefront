"use client";

import { Empty, EmptyHeader, EmptyTitle, EmptyDescription, EmptyContent } from "@/components/ui/empty";
import { Button } from "@/components/ui/button";

type Props = {
  onResetFilters: () => void;
};

export function ProductListEmpty({ onResetFilters }: Props) {
  return (
    <div className="flex justify-center py-16">
      <Empty>
        <EmptyHeader>
          <EmptyTitle>No products found</EmptyTitle>
          <EmptyDescription>Try adjusting your filters or clear them to see more results.</EmptyDescription>
        </EmptyHeader>

        <EmptyContent>
          <Button size="sm" onClick={onResetFilters}>
            Clear Filters
          </Button>
        </EmptyContent>
      </Empty>
    </div>
  );
}
