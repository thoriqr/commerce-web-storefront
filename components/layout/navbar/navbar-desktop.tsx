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
import { ShoppingCart } from "lucide-react";
import { CategoryTree } from "@/features/category/types";
import { CategoryMegaMenu } from "@/features/category/components/category-mega-menu";
import { AuthStatus } from "@/features/auth/components/auth-status";

type Props = {
  categories: CategoryTree[];
};

export default function NavbarDesktop({ categories }: Props) {
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
              <CategoryMegaMenu categories={categories} />
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

        <AuthStatus variant="desktop" />
      </div>
    </div>
  );
}
