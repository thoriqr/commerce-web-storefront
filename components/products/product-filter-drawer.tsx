"use client";

import { Sheet, SheetTrigger, SheetContent, SheetHeader, SheetTitle, SheetFooter, SheetClose, SheetDescription } from "@/components/ui/sheet";
import { Button } from "@/components/ui/button";

export function ProductFilterDrawer({ children }: { children: React.ReactNode }) {
  return (
    <Sheet>
      <SheetTrigger asChild>
        <Button variant="outline" size="sm">
          Filter
        </Button>
      </SheetTrigger>

      <SheetContent side="left" className="w-80 flex flex-col">
        <div className="px-6 py-6 flex flex-col flex-1">
          <SheetHeader className="px-0">
            <SheetTitle>Filter Products</SheetTitle>
            <SheetDescription>Narrow down products by price and attributes.</SheetDescription>
          </SheetHeader>

          <div className="mt-6 flex-1 space-y-6 overflow-y-auto">{children}</div>

          <SheetFooter className="mt-6 px-0 flex gap-2">
            <Button variant="outline" className="flex-1">
              Reset
            </Button>

            <SheetClose asChild>
              <Button className="flex-1">Apply</Button>
            </SheetClose>
          </SheetFooter>
        </div>
      </SheetContent>
    </Sheet>
  );
}
