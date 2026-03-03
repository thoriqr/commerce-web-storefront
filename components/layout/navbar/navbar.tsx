import { getCategoryTree } from "@/features/category/api";
import NavbarDesktop from "./navbar-desktop";
import NavbarMobile from "./navbar-mobile";

export default async function Navbar() {
  const categories = await getCategoryTree();

  return (
    <header className="sticky top-0 z-50 border-b bg-background">
      <div className="mx-auto max-w-7xl px-4">
        <NavbarMobile categories={categories} />
        <NavbarDesktop categories={categories} />
      </div>
    </header>
  );
}
