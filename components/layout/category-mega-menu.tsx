"use client";

import Link from "next/link";

type Category = {
  id: number;
  name: string;
  slug: string;
  children?: Category[];
};

type Props = {
  categories: Category[];
};

export function CategoryMegaMenu({ categories }: Props) {
  return (
    <div className="w-1000 max-w-[90vw] p-4">
      <div className="grid grid-cols-4 gap-10">
        {categories.map((root) => {
          const lvl2Children = root.children ?? [];

          return (
            <div key={root.id} className="space-y-4">
              {/* Root */}
              <Link href={`/category/${root.slug}`} className="block text-sm font-semibold tracking-wide hover:text-primary">
                {root.name}
              </Link>

              {/* Divider */}
              <div className="h-px bg-border" />

              {/* Level 2 + 3 */}
              <div className="space-y-3">
                {lvl2Children.map((lvl2) => {
                  const lvl3Children = lvl2.children ?? [];

                  return (
                    <div key={lvl2.id} className="space-y-1">
                      <Link
                        href={`/category/${root.slug}/${lvl2.slug}`}
                        className="block text-sm text-muted-foreground hover:text-foreground transition-colors"
                      >
                        {lvl2.name}
                      </Link>

                      {lvl3Children.length > 0 && (
                        <div className="space-y-1 pl-3 border-l border-muted">
                          {lvl3Children.map((lvl3) => (
                            <Link
                              key={lvl3.id}
                              href={`/category/${root.slug}/${lvl2.slug}/${lvl3.slug}`}
                              className="block text-sm text-muted-foreground/80 hover:text-foreground transition-colors"
                            >
                              {lvl3.name}
                            </Link>
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
