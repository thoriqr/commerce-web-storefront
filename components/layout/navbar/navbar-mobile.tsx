import { Button } from "@/components/ui/button";
import { Sheet, SheetContent, SheetHeader, SheetTitle, SheetTrigger } from "@/components/ui/sheet";
import { Menu, ShoppingCart, User } from "lucide-react";
import { NavbarSearch } from "./navbar-search";
import Link from "next/link";
import { NavbarCategoriesBoundary } from "./navbar-categories-boundary";

export default function NavbarMobile() {
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

            <SheetContent side="right" className="w-[85%] max-w-sm overflow-y-auto ">
              <SheetHeader>
                <SheetTitle>Browse</SheetTitle>
              </SheetHeader>

              <div className="mt-6 space-y-6 px-5">
                <NavbarCategoriesBoundary />

                <div className="border-t pt-4 space-y-4">
                  <Link href="/account" className="flex items-center gap-2 text-sm font-medium">
                    <User className="h-4 w-4" />
                    Account
                  </Link>

                  <Link href="/cart" className="flex items-center gap-2 text-sm font-medium">
                    <ShoppingCart className="h-4 w-4" />
                    Cart
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
