import {
  NavigationMenu,
  NavigationMenuContent,
  NavigationMenuItem,
  NavigationMenuList,
  NavigationMenuTrigger
} from "@/components/ui/navigation-menu";
import Link from "next/link";
import { NavbarSearch } from "./navbar-search";
import { CategoryTree } from "@/features/category/types";
import { CategoryMegaMenu } from "@/features/category/components/category-mega-menu";
import { AuthStatus } from "@/features/auth/components/auth-status";
import CartDrawer from "@/features/cart/components/drawer/cart-drawer";

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
      <NavigationMenu>
        <NavigationMenuList>
          <NavigationMenuItem>
            <NavigationMenuTrigger>Categories</NavigationMenuTrigger>

            <NavigationMenuContent className="overflow-visible">
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
        <CartDrawer />

        <AuthStatus variant="desktop" />
      </div>
    </div>
  );
}
