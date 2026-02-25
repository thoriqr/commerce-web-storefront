"use client";

import { notFound } from "next/navigation";
import { ProductImageGallery } from "./product-image-gallery";
import ProductBreadcrumb from "./product-breadcrumb";
import { ProductDimensionSelector } from "./product-dimension-selector";
import { ProductPurchaseSection } from "./product-purchase-section";
import { useQuery } from "@tanstack/react-query";
import { getProductBySlug, getVariantByProductSlugAndVariantId } from "@/features/product/api";
import { ProductDetailSkeleton } from "./product-detail-skeleton";
import { Skeleton } from "../ui/skeleton";

type Props = {
  slug: string;
  variantId?: string;
};

export function ProductDetail({ slug, variantId }: Props) {
  // 1️⃣ Product query
  const { data: product, isLoading: isProductLoading } = useQuery({
    queryKey: ["product", slug],
    queryFn: () => getProductBySlug(slug)
  });

  // 2️⃣ Resolve activeVariantId (safe fallback)
  const activeVariantId = variantId ?? String(product?.initialVariantId ?? "");

  // 3️⃣ Variant query (always declared)
  const { data: variant, isLoading: isVariantLoading } = useQuery({
    queryKey: ["variant", slug, activeVariantId],
    queryFn: () => getVariantByProductSlugAndVariantId(slug, Number(activeVariantId)),
    enabled: !!product && !!activeVariantId
  });

  // 🔥 EARLY RETURNS AFTER ALL HOOKS
  if (isProductLoading) return <ProductDetailSkeleton />;

  if (!product) notFound();

  if (!isVariantLoading && !variant) {
    notFound();
  }

  return (
    <div className="space-y-8 pb-28 md:pb-0">
      <ProductBreadcrumb name={product.name} slug={product.slug} />

      <div className="grid gap-10 md:grid-cols-2">
        <div className="min-w-0">
          <ProductImageGallery product={product} activeVariantId={activeVariantId} />
        </div>

        <div className="space-y-6">
          <h1 className="text-2xl font-semibold">{product.name}</h1>

          {/* Price */}
          <div className="space-y-1 min-h-13">
            {isVariantLoading ? (
              <>
                <Skeleton className="h-7 w-40" />
                <Skeleton className="h-4 w-24" />
              </>
            ) : (
              <>
                <p className="text-2xl font-bold">Rp {variant!.price.toLocaleString("id-ID")}</p>

                {variant!.stock === 0 ? (
                  <p className="text-sm text-destructive font-medium">Out of stock</p>
                ) : (
                  <p className="text-sm text-muted-foreground">{variant!.stock} available</p>
                )}
              </>
            )}
          </div>

          <p className="text-sm text-muted-foreground">{product.description}</p>

          <ProductDimensionSelector product={product} activeVariantId={activeVariantId} />

          {/* Desktop Purchase Section */}
          <div className="hidden md:block">
            {isVariantLoading ? (
              <Skeleton className="h-32 w-full rounded-lg" />
            ) : (
              <ProductPurchaseSection price={variant!.price} stock={variant!.stock} />
            )}
          </div>
        </div>
      </div>

      {/* Mobile Sticky Purchase */}
      <div className="fixed bottom-0 left-0 right-0 z-50 border-t bg-background p-4 md:hidden">
        {isVariantLoading ? (
          <Skeleton className="h-20 w-full rounded-lg" />
        ) : (
          <ProductPurchaseSection price={variant!.price} stock={variant!.stock} mobile />
        )}
      </div>
    </div>
  );
}
