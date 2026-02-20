import { getCategoryTree } from "@/features/category/api";
import { CategoryMegaMenu } from "@/features/category/components/category-mega-menu";
import { MobileCategoryMenu } from "@/features/category/components/mobile-category-menu";

export async function NavbarCategoriesBoundary() {
  const categories = await getCategoryTree();

  return (
    <>
      {/* Desktop */}
      <div className="hidden md:block">
        <CategoryMegaMenu categories={categories} />
      </div>

      {/* Mobile */}
      <div className="md:hidden">
        <MobileCategoryMenu categories={categories} />
      </div>
    </>
  );
}
