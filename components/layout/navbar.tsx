"use client";

import Link from "next/link";
import { ShoppingCart, Menu, User } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Sheet, SheetContent, SheetHeader, SheetTitle, SheetTrigger } from "@/components/ui/sheet";
import { NavbarSearch } from "./navbar-search";
import { CategoryMegaMenu } from "./category-mega-menu";
import { mockCategories } from "@/constants/mocks";
import { NavigationMenu, NavigationMenuContent, NavigationMenuItem, NavigationMenuList, NavigationMenuTrigger } from "../ui/navigation-menu";
import { MobileCategoryMenu } from "./mobile-category-menu";

export function Navbar() {
  return (
    <header className="sticky top-0 z-50 border-b bg-background">
      <div className="mx-auto max-w-7xl px-4">
        {/* ================= MOBILE ================= */}
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
                  <MobileCategoryMenu categories={mockCategories} />

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

        {/* ================= DESKTOP ================= */}
        <div className="hidden h-16 grid-cols-[auto_auto_1fr_auto] items-center gap-6 md:grid">
          {/* Logo */}
          <Link href="/" className="text-lg font-semibold">
            Commerce
          </Link>

          {/* Navigation */}
          <NavigationMenu>
            <NavigationMenuList>
              <NavigationMenuItem>
                <NavigationMenuTrigger>Categories</NavigationMenuTrigger>

                <NavigationMenuContent>
                  <CategoryMegaMenu categories={mockCategories} />
                </NavigationMenuContent>
              </NavigationMenuItem>
            </NavigationMenuList>
          </NavigationMenu>

          {/* Search */}
          <div className="flex justify-center">
            <div className="w-full max-w-xl">
              <NavbarSearch />
            </div>
          </div>

          {/* Right actions */}
          <div className="flex justify-end gap-2">
            <Button variant="ghost" size="icon">
              <ShoppingCart className="h-5 w-5" />
            </Button>

            <Button variant="ghost" size="icon">
              <User className="h-5 w-5" />
            </Button>
          </div>
        </div>
      </div>
    </header>
  );
}
