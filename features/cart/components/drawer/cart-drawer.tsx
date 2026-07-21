"use client";

import { Button } from "@/components/ui/button";
import { Sheet, SheetContent, SheetDescription, SheetHeader, SheetTitle } from "@/components/ui/sheet";
import { ShoppingCart } from "lucide-react";
import { useState } from "react";
import CartContent from "./cart-content";
import { useCart } from "../../hooks/use-cart";
import { useMe } from "@/features/auth/hooks/use-me";
import { Skeleton } from "@/components/ui/skeleton";

export default function CartDrawer() {
  const { data: user, isLoading: userLoading } = useMe();

  const [open, setOpen] = useState(false);

  const { data, isLoading } = useCart(!!user);

  if (userLoading) {
    return <Skeleton className="h-9 w-9 rounded-md" />;
  }

  const totalItems = data ? (data?.summary.totalItems ?? 0) : 0;

  return (
    <>
      <Button variant="ghost" size="icon" className="relative" onClick={() => setOpen(true)}>
        <div className="relative">
          <ShoppingCart className="h-5 w-5" />

          {totalItems > 0 && (
            <span className="absolute -top-3 -right-3 flex h-5 min-w-5 items-center justify-center rounded-full bg-primary px-1 text-[11px] font-medium text-primary-foreground">
              {totalItems > 99 ? "99+" : totalItems}
            </span>
          )}
        </div>
      </Button>

      {open && (
        <Sheet open={open} onOpenChange={setOpen}>
          <SheetContent side="right" className="overflow-y-auto min-w-full sm:min-w-xl">
            <SheetHeader>
              <SheetTitle>Shopping Cart</SheetTitle>
              <SheetDescription>Review the items in your cart before checkout.</SheetDescription>
            </SheetHeader>

            <CartContent isLoading={isLoading} data={data} onClose={() => setOpen(false)} user={user} />
          </SheetContent>
        </Sheet>
      )}
    </>
  );
}
