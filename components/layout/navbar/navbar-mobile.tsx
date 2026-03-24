"use client";

import { Button } from "@/components/ui/button";
import { Sheet, SheetContent, SheetDescription, SheetHeader, SheetTitle } from "@/components/ui/sheet";
import { Menu } from "lucide-react";
import { NavbarSearch } from "./navbar-search";
import Link from "next/link";
import { CategoryTree } from "@/features/category/types";
import { MobileCategoryMenu } from "@/features/category/components/mobile-category-menu";
import { AuthStatus } from "@/features/auth/components/auth-status";
import { useState } from "react";
import CartButton from "@/features/cart/components/cart-button";

type Props = {
  categories: CategoryTree[];
};

export default function NavbarMobile({ categories }: Props) {
  const [open, setOpen] = useState(false);

  return (
    <>
      <div className="flex h-16 items-center justify-between md:hidden">
        {/* Logo */}
        <Link href="/" className="text-lg font-semibold">
          Commerce
        </Link>

        {/* Right Actions */}
        <div className="flex items-center gap-1">
          <CartButton />

          <Button variant="ghost" size="icon" className="h-9 w-9" onClick={() => setOpen(true)}>
            <Menu className="h-5 w-5" />
          </Button>

          {open && (
            <Sheet open={open} onOpenChange={setOpen}>
              <SheetContent side="right" className="overflow-y-auto">
                <SheetHeader>
                  <SheetTitle>Browse</SheetTitle>
                  <SheetDescription className="sr-only">Browse categories and navigate your account</SheetDescription>
                </SheetHeader>

                <div className="mt-3 space-y-6 px-5">
                  <MobileCategoryMenu categories={categories} onClose={() => setOpen(false)} />

                  <div className="border-t pt-4 space-y-2">
                    <AuthStatus variant="mobile" onClose={() => setOpen(false)} />
                  </div>
                </div>
              </SheetContent>
            </Sheet>
          )}
        </div>
      </div>
      {/* MOBILE SEARCH (outside sheet) */}
      <div className="pb-3 md:hidden">
        <NavbarSearch />
      </div>
    </>
  );
}
