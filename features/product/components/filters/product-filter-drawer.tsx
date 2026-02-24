"use client";

import { Sheet, SheetContent, SheetClose, SheetHeader, SheetTitle, SheetDescription } from "@/components/ui/sheet";
import { Button } from "@/components/ui/button";
import { useEffect, useState } from "react";

type Props = {
  children: React.ReactNode;
  activeCount?: number;
  draftCount?: number;
  hasChanges?: boolean;
  onApply?: () => void;
  onReset?: () => void;
  onOpen?: () => void;
  onClose?: () => void;
};

export function ProductFilterDrawer({ children, activeCount = 0, draftCount = 0, hasChanges = false, onApply, onReset, onOpen, onClose }: Props) {
  const [open, setOpen] = useState(false);
  const handleApply = () => {
    setOpen(false); // close first
    onApply?.();
  };

  const handleReset = () => {
    setOpen(false);
    onReset?.();
  };

  useEffect(() => {
    if (open) {
      onOpen?.();
    } else {
      onClose?.();
    }
  }, [open, onOpen, onClose]);

  return (
    <>
      <Button variant={activeCount ? "default" : "outline"} size="sm" className="relative" onClick={() => setOpen(true)}>
        Filter
        {activeCount > 0 && (
          <span className="ml-2 inline-flex items-center justify-center rounded-full bg-muted text-primary text-xs font-semibold w-5 h-5 animate-scaleIn">
            {activeCount}
          </span>
        )}
      </Button>
      {open && (
        <Sheet open={open} onOpenChange={setOpen}>
          <SheetContent side="left">
            <div className="px-6 py-6 flex flex-col flex-1">
              <SheetHeader className="flex flex-row items-center justify-between p-0">
                <SheetTitle className="text-lg font-semibold">Filter</SheetTitle>
              </SheetHeader>

              <SheetDescription className="text-sm text-muted-foreground">Narrow down products by price and attributes.</SheetDescription>

              <div className="mt-6 flex-1 space-y-6 overflow-y-auto">{children}</div>

              <div className="mt-6 flex gap-2">
                <Button variant="outline" className="flex-1" onClick={handleReset}>
                  Reset
                </Button>

                <SheetClose asChild>
                  <Button className="flex-1" disabled={!hasChanges} onClick={handleApply}>
                    Apply {draftCount > 0 ? `(${draftCount})` : ""}
                  </Button>
                </SheetClose>
              </div>
            </div>
          </SheetContent>
        </Sheet>
      )}
    </>
  );
}
