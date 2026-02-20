import {
  NavigationMenu,
  NavigationMenuContent,
  NavigationMenuItem,
  NavigationMenuList,
  NavigationMenuTrigger
} from "@/components/ui/navigation-menu";
import Link from "next/link";
import { NavbarSearch } from "./navbar-search";
import { Button } from "@/components/ui/button";
import { ShoppingCart, User } from "lucide-react";
import { NavbarCategoriesBoundary } from "./navbar-categories-boundary";

export default function NavbarDesktop() {
  return (
    <div className="hidden h-16 grid-cols-[auto_auto_1fr_auto] items-center gap-6 md:grid">
      {/* Logo */}
      <Link href="/" className="text-lg font-semibold">
        Commerce
      </Link>

      {/* Navigation */}
      <NavigationMenu viewport={false}>
        <NavigationMenuList>
          <NavigationMenuItem>
            <NavigationMenuTrigger>Categories</NavigationMenuTrigger>

            <NavigationMenuContent>
              <NavbarCategoriesBoundary />
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
  );
}
