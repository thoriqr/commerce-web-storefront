"use client";

import Link from "next/link";
import { Breadcrumb, BreadcrumbList, BreadcrumbItem, BreadcrumbLink, BreadcrumbSeparator, BreadcrumbPage } from "@/components/ui/breadcrumb";
import { Category } from "@/features/category/types";
import React from "react";

type Props = {
  breadcrumb: Category[];
};

export function CategoryBreadcrumb({ breadcrumb }: Props) {
  return (
    <Breadcrumb>
      <BreadcrumbList>
        <BreadcrumbItem>
          <BreadcrumbLink asChild>
            <Link href="/">Home</Link>
          </BreadcrumbLink>
        </BreadcrumbItem>

        {breadcrumb.map((item, index) => (
          <React.Fragment key={item.id}>
            <BreadcrumbSeparator />

            <BreadcrumbItem>
              {index === breadcrumb.length - 1 ? (
                <BreadcrumbPage>{item.name}</BreadcrumbPage>
              ) : (
                <BreadcrumbLink asChild>
                  <Link href={`/category/${item.slugPath}`}>{item.name}</Link>
                </BreadcrumbLink>
              )}
            </BreadcrumbItem>
          </React.Fragment>
        ))}
      </BreadcrumbList>
    </Breadcrumb>
  );
}
