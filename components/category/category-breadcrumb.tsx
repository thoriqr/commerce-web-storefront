"use client";

import Link from "next/link";
import { Breadcrumb, BreadcrumbList, BreadcrumbItem, BreadcrumbLink, BreadcrumbSeparator, BreadcrumbPage } from "@/components/ui/breadcrumb";

type Props = {
  slug: string[];
};

function formatLabel(slug: string) {
  return slug.replace(/-/g, " ").replace(/\b\w/g, (l) => l.toUpperCase());
}

export function CategoryBreadcrumb({ slug }: Props) {
  const paths = slug.map((_, i) => {
    return {
      label: formatLabel(slug[i]),
      href: `/category/${slug.slice(0, i + 1).join("/")}`
    };
  });

  return (
    <Breadcrumb>
      <BreadcrumbList>
        <BreadcrumbItem>
          <BreadcrumbLink asChild>
            <Link href="/">Home</Link>
          </BreadcrumbLink>
        </BreadcrumbItem>

        {paths.map((item, index) => (
          <div key={item.href} className="gap-1.5 sm:gap-2.5 flex flex-wrap items-center wrap-break-word">
            <BreadcrumbSeparator />

            <BreadcrumbItem>
              {index === paths.length - 1 ? (
                <BreadcrumbPage>{item.label}</BreadcrumbPage>
              ) : (
                <BreadcrumbLink asChild>
                  <Link href={item.href}>{item.label}</Link>
                </BreadcrumbLink>
              )}
            </BreadcrumbItem>
          </div>
        ))}
      </BreadcrumbList>
    </Breadcrumb>
  );
}
