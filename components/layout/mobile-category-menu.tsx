"use client";

import Link from "next/link";
import { Accordion, AccordionItem, AccordionTrigger, AccordionContent } from "@/components/ui/accordion";

type Category = {
  id: number;
  name: string;
  slug: string;
  children?: Category[];
};

type Props = {
  categories: Category[];
};

export function MobileCategoryMenu({ categories }: Props) {
  return (
    <div className="space-y-4">
      <h3 className="text-sm font-semibold text-muted-foreground">Categories</h3>

      <Accordion type="multiple" className="w-full">
        {categories.map((root) => (
          <AccordionItem key={root.id} value={`root-${root.id}`}>
            <AccordionTrigger className="text-sm font-medium">{root.name}</AccordionTrigger>

            <AccordionContent>
              <div className="space-y-3 pl-4">
                {/* View all root */}
                <Link href={`/category/${root.slug}`} className="block text-sm font-medium hover:underline">
                  View all
                </Link>

                {/* Level 2 */}
                {root.children?.map((lvl2) => (
                  <div key={lvl2.id} className="space-y-2">
                    <Link href={`/category/${root.slug}/${lvl2.slug}`} className="block text-sm text-muted-foreground hover:text-foreground">
                      {lvl2.name}
                    </Link>

                    {/* Level 3 */}
                    {lvl2.children?.length ? (
                      <div className="space-y-1 pl-4 border-l border-muted">
                        {lvl2.children.map((lvl3) => (
                          <Link
                            key={lvl3.id}
                            href={`/category/${root.slug}/${lvl2.slug}/${lvl3.slug}`}
                            className="block text-sm text-muted-foreground hover:text-foreground"
                          >
                            {lvl3.name}
                          </Link>
                        ))}
                      </div>
                    ) : null}
                  </div>
                ))}
              </div>
            </AccordionContent>
          </AccordionItem>
        ))}
      </Accordion>
    </div>
  );
}
