"use client";

import Link from "next/link";
import { NavbarSearch } from "./navbar-search";
import { AuthStatus } from "@/features/auth/components/auth-status";
import CartDrawer from "@/features/cart/components/drawer/cart-drawer";
import { useState } from "react";
import { Button } from "@/components/ui/button";
import CategoryMenuModal from "@/features/category/components/category-menu-dialog";

export default function NavbarDesktop() {
  const [open, setOpen] = useState(false);

  return (
    <>
      {open && <CategoryMenuModal open={open} onClose={() => setOpen(false)} />}

      <div className="hidden h-16 grid-cols-[auto_auto_1fr_auto] items-center gap-6 md:grid">
        {/* Logo */}

        <Link href="/" className="text-lg font-semibold">
          Commerce
        </Link>

        <Button onClick={() => setOpen(true)} variant="outline">
          Categories
        </Button>

        {/* Search */}
        <div className="flex justify-center">
          <div className="w-full max-w-xl">
            <NavbarSearch />
          </div>
        </div>

        {/* Right actions */}
        <div className="flex justify-end gap-2">
          <CartDrawer />

          <AuthStatus variant="desktop" />
        </div>
      </div>
    </>
  );
}
