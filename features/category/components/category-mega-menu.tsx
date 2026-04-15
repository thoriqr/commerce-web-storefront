import { NavigationMenuLink } from "@/components/ui/navigation-menu";
import { CategoryTree } from "@/features/category/types";
import Link from "next/link";

type Props = {
  categories: CategoryTree[];
};

export function CategoryMegaMenu({ categories }: Props) {
  return (
    <div className="w-[800px] max-h-[500px] overflow-y-auto px-6 py-4">
      <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
        {categories.map((root) => {
          const lvl2Children = root.children ?? [];

          return (
            <div key={root.id} className="space-y-4">
              {/* Root */}
              <NavigationMenuLink disableDefaultStyle className="block text-sm font-semibold tracking-wide hover:text-primary" asChild>
                <Link href={`/category/${root.slug}`}>{root.name}</Link>
              </NavigationMenuLink>

              {/* Divider */}
              <div className="h-px bg-border" />

              {/* Level 2 + 3 */}
              <div className="space-y-3">
                {lvl2Children.map((lvl2) => {
                  const lvl3Children = lvl2.children ?? [];

                  return (
                    <div key={lvl2.id} className="space-y-1">
                      <NavigationMenuLink
                        asChild
                        disableDefaultStyle
                        className="block text-sm text-muted-foreground hover:text-foreground transition-colors"
                      >
                        <Link href={`/category/${root.slug}/${lvl2.slug}`}>{lvl2.name}</Link>
                      </NavigationMenuLink>

                      {lvl3Children.length > 0 && (
                        <div className="space-y-1 pl-3 border-l border-muted">
                          {lvl3Children.map((lvl3) => (
                            <NavigationMenuLink
                              disableDefaultStyle
                              key={lvl3.id}
                              asChild
                              className="block text-sm text-muted-foreground/80 hover:text-foreground transition-colors"
                            >
                              <Link href={`/category/${root.slug}/${lvl2.slug}/${lvl3.slug}`}>{lvl3.name}</Link>
                            </NavigationMenuLink>
                          ))}
                        </div>
                      )}
                    </div>
                  );
                })}
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
}
