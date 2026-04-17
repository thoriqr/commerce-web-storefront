"use client";

import { useEffect, useState } from "react";
import { useCategoryTree } from "../hooks/use-category-tree";
import { Dialog, DialogContent, DialogDescription, DialogHeader, DialogTitle } from "@/components/ui/dialog";
import Link from "next/link";
import { ScrollArea, ScrollBar } from "@/components/ui/scroll-area";
import { Skeleton } from "@/components/ui/skeleton";

type Props = {
  open: boolean;
  onClose: () => void;
  closeDrawer?: () => void;
};

export default function CategoryMenuModal({ open, onClose, closeDrawer }: Props) {
  const { data, isLoading, isError } = useCategoryTree(open);

  const [activeParent, setActiveParent] = useState<number | null>(null);

  const categories = data ?? [];
  const parents = categories;

  // set default active parent
  useEffect(() => {
    if (parents.length > 0 && activeParent === null) {
      // eslint-disable-next-line react-hooks/set-state-in-effect
      setActiveParent(parents[0].id);
    }
  }, [parents, activeParent]);

  const activeParentNode = parents.find((p) => p.id === activeParent);
  const children = activeParentNode?.children ?? [];

  return (
    <Dialog open={open} onOpenChange={onClose}>
      <DialogContent className="min-w-sm md:min-w-2xl lg:min-w-3xl xl:min-w-4xl sm:max-w-sm min-h-[60vh] flex flex-col">
        <DialogHeader>
          <DialogTitle>Categories</DialogTitle>
          <DialogDescription>Browse categories</DialogDescription>
        </DialogHeader>

        {isLoading && (
          <div className="flex flex-col md:grid md:grid-cols-3 gap-6 flex-1 overflow-hidden">
            {/* PARENTS*/}
            <div className="w-full md:max-h-[50vh] pb-3 md:pb-0 md:pr-3 md:border-r">
              {/* Mobile (horizontal) */}
              <div className="flex md:hidden gap-3 w-max">
                {Array.from({ length: 6 }).map((_, i) => (
                  <Skeleton key={i} className="h-6 w-20 rounded-full" />
                ))}
              </div>

              {/* Desktop (vertical) */}
              <div className="hidden md:flex flex-col gap-2">
                {Array.from({ length: 8 }).map((_, i) => (
                  <Skeleton key={i} className="h-4 w-24" />
                ))}
              </div>
            </div>

            {/* RIGHT CONTENT  */}
            <div className="w-full md:col-span-2 space-y-4">
              {/* parent title */}
              <Skeleton className="h-5 w-40" />

              {/* children grid */}
              <div className="grid grid-cols-2 gap-6">
                {Array.from({ length: 4 }).map((_, i) => (
                  <div key={i} className="space-y-2">
                    {/* child title */}
                    <Skeleton className="h-4 w-32" />

                    {/* grandchildren */}
                    <div className="space-y-1 pl-3">
                      <Skeleton className="h-3 w-24" />
                      <Skeleton className="h-3 w-20" />
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>
        )}

        {/* ERROR */}
        {isError && <p className="text-sm text-destructive">Failed to load categories</p>}

        {!isLoading && !isError && (
          <div className="flex flex-col md:grid md:grid-cols-3 gap-6 flex-1 overflow-hidden">
            {/* ===== LEFT: PARENTS (SELECT ONLY) ===== */}
            <ScrollArea className="w-full md:max-h-[50vh] pb-3 md:pb-0 md:pr-3 md:border-r">
              <div className="flex md:block gap-3 md:space-y-2 w-max md:w-auto">
                {parents.map((p) => (
                  <div
                    key={p.id}
                    onClick={() => setActiveParent(p.id)}
                    className={`cursor-pointer text-sm whitespace-nowrap ${
                      activeParent === p.id ? "font-medium text-foreground" : "text-muted-foreground hover:text-foreground"
                    }`}
                  >
                    {p.name}
                  </div>
                ))}
              </div>

              {/* optional */}
              <ScrollBar orientation="horizontal" className="md:hidden" />
            </ScrollArea>

            {/* RIGHT: PARENT + CHILDREN  */}
            <ScrollArea className="w-full md:col-span-2 max-h-[50vh]">
              <div className="space-y-4">
                {/* PARENT (CLICKABLE LINK) */}
                {activeParentNode && (
                  <Link
                    href={`/category/${activeParentNode.slugPath}`}
                    onClick={() => {
                      onClose();
                      closeDrawer?.();
                    }}
                    className="block text-base font-semibold hover:text-primary line-clamp-1"
                  >
                    {activeParentNode.name}
                  </Link>
                )}

                {/* CHILDREN GRID */}
                <div className="grid grid-cols-2 gap-6">
                  {children.map((child) => {
                    const grandchildren = child.children ?? [];

                    return (
                      <div key={child.id} className="space-y-2">
                        {/* Child */}
                        <Link
                          href={`/category/${child.slugPath}`}
                          onClick={() => {
                            onClose();
                            closeDrawer?.();
                          }}
                          className="block text-sm font-medium hover:text-primary line-clamp-1"
                        >
                          {child.name}
                        </Link>

                        {/* Grandchildren */}
                        {grandchildren.length > 0 && (
                          <div className="pl-3 border-l space-y-1">
                            {grandchildren.map((g) => (
                              <Link
                                key={g.id}
                                href={`/category/${g.slugPath}`}
                                onClick={() => {
                                  onClose();
                                  closeDrawer?.();
                                }}
                                className="block text-sm text-muted-foreground hover:text-foreground"
                              >
                                {g.name}
                              </Link>
                            ))}
                          </div>
                        )}
                      </div>
                    );
                  })}

                  {/* fallback */}
                  {children.length === 0 && <p className="text-sm text-muted-foreground col-span-2">No categories available</p>}
                </div>
              </div>
            </ScrollArea>
          </div>
        )}
      </DialogContent>
    </Dialog>
  );
}
