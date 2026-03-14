"use client";

import { notFound } from "next/navigation";
import { ProductImageGallery } from "./product-image-gallery";
import ProductBreadcrumb from "./product-breadcrumb";
import { ProductDimensionSelector } from "./product-dimension-selector";
import { ProductPurchaseSection } from "./product-purchase-section";
import { useQuery } from "@tanstack/react-query";
import { getProductBySlug, getVariantByProductSlugAndVariantId } from "@/features/product/api";
import { ProductDetailSkeleton } from "./skeletons/product-detail-skeleton";
import { Skeleton } from "../../../components/ui/skeleton";

type Props = {
  slug: string;
  activeVariantId: string;
};

export function ProductDetail({ slug, activeVariantId }: Props) {
  // Product query
  const { data: product, isLoading: isProductLoading } = useQuery({
    queryKey: ["product", slug],
    queryFn: () => getProductBySlug(slug)
  });

  // Variant query (always declared)
  const { data: variant, isLoading: isVariantLoading } = useQuery({
    queryKey: ["variant", slug, activeVariantId],
    queryFn: () => getVariantByProductSlugAndVariantId(slug, Number(activeVariantId))
  });

  // EARLY RETURNS AFTER ALL HOOKS
  if (isProductLoading) return <ProductDetailSkeleton />;

  if (!product) notFound();

  if (!variant && !isVariantLoading) notFound();

  const productUnavailable = !product.isAvailable;
  const variantUnavailable = variant?.isAvailable === false;
  const outOfStock = variant?.stock === 0;

  const disablePurchase = isVariantLoading || productUnavailable || variantUnavailable || outOfStock;

  return (
    <div className="space-y-8 pb-24 md:pb-0">
      <ProductBreadcrumb name={product.name} slug={product.slug} />

      <div className="grid gap-6 md:gap-10 md:grid-cols-2">
        <div className="min-w-0">
          <ProductImageGallery product={product} activeVariantId={activeVariantId} />
        </div>

        <div className="space-y-4 sm:space-y-6">
          <h1 className="text-lg sm:text-xl font-semibold leading-tight">{product.name}</h1>

          {/* PRICE + STOCK TEXT */}
          <div className="space-y-1 min-h-14">
            <div className="text-xl sm:text-2xl font-bold">
              {isVariantLoading ? <Skeleton className="h-6 w-32" /> : <>Rp {variant!.price.toLocaleString("id-ID")}</>}
            </div>

            <div className="text-xs sm:text-sm">
              {isVariantLoading ? (
                <Skeleton className="h-3 w-20" />
              ) : productUnavailable || variantUnavailable ? (
                <span className="text-destructive font-medium">Unavailable</span>
              ) : outOfStock ? (
                <span className="text-destructive font-medium">Out of stock</span>
              ) : (
                <span className="text-muted-foreground">{variant!.stock} available</span>
              )}
            </div>
          </div>

          <p className="text-sm leading-relaxed text-muted-foreground">{product.description}</p>

          <ProductDimensionSelector product={product} activeVariantId={activeVariantId} />

          <div className="hidden md:block">
            <ProductPurchaseSection
              variantId={Number(activeVariantId)}
              price={variant?.price ?? 0}
              stock={variant?.stock ?? 0}
              isVariantLoading={isVariantLoading}
              productUnavailable={productUnavailable}
              variantUnavailable={variantUnavailable}
              outOfStock={outOfStock}
              disablePurchase={disablePurchase}
            />
          </div>
        </div>
      </div>

      {/* Mobile Sticky Purchase */}
      <div className="fixed bottom-0 left-0 right-0 z-50 border-t bg-background p-4 md:hidden">
        <ProductPurchaseSection
          variantId={Number(activeVariantId)}
          price={variant?.price ?? 0}
          stock={variant?.stock ?? 0}
          isVariantLoading={isVariantLoading}
          productUnavailable={productUnavailable}
          variantUnavailable={variantUnavailable}
          outOfStock={outOfStock}
          disablePurchase={disablePurchase}
          mobile
        />
      </div>
    </div>
  );
}
