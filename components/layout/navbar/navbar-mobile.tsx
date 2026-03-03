import { Button } from "@/components/ui/button";
import { Sheet, SheetContent, SheetDescription, SheetHeader, SheetTitle, SheetTrigger } from "@/components/ui/sheet";
import { Menu, ShoppingCart } from "lucide-react";
import { NavbarSearch } from "./navbar-search";
import Link from "next/link";
import { CategoryTree } from "@/features/category/types";
import { MobileCategoryMenu } from "@/features/category/components/mobile-category-menu";
import { AuthStatus } from "@/features/auth/components/auth-status";

type Props = {
  categories: CategoryTree[];
};

export default function NavbarMobile({ categories }: Props) {
  return (
    <>
      <div className="flex h-16 items-center justify-between md:hidden">
        {/* Logo */}
        <Link href="/" className="text-lg font-semibold">
          Commerce
        </Link>

        {/* Right Actions */}
        <div className="flex items-center gap-1">
          <Button variant="ghost" size="icon" className="h-9 w-9">
            <ShoppingCart className="h-5 w-5" />
          </Button>

          <Sheet>
            <SheetTrigger asChild>
              <Button variant="ghost" size="icon" className="h-9 w-9">
                <Menu className="h-5 w-5" />
              </Button>
            </SheetTrigger>

            <SheetContent side="right" className="overflow-y-auto ">
              <SheetHeader>
                <SheetTitle>Browse</SheetTitle>
                <SheetDescription className="sr-only">Browse categories and navigate your account and cart.</SheetDescription>
              </SheetHeader>

              <div className="mt-3 space-y-6 px-5">
                <MobileCategoryMenu categories={categories} />

                <div className="border-t pt-4 space-y-2">
                  <AuthStatus variant="mobile" />

                  <Link href="/cart">
                    <Button variant="ghost" className="w-full justify-start gap-3 px-2">
                      <ShoppingCart className="h-4 w-4" />
                      <span>Cart</span>
                    </Button>
                  </Link>
                </div>
              </div>
            </SheetContent>
          </Sheet>
        </div>
      </div>
      {/* 🔍 MOBILE SEARCH (DI LUAR SHEET) */}
      <div className="pb-3 md:hidden">
        <NavbarSearch />
      </div>
    </>
  );
}
