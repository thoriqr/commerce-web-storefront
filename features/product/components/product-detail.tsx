"use client";

import { ProductImageGallery } from "./product-image-gallery";
import ProductBreadcrumb from "./product-breadcrumb";
import { ProductDimensionSelector } from "./product-dimension-selector";
import { ProductPurchaseSection } from "./product-purchase-section";
import { useQuery } from "@tanstack/react-query";
import { getProductByIdOrFail, getVariantByProductIdAndVariantId } from "@/features/product/api";
import { ProductDetailSkeleton } from "./skeletons/product-detail-skeleton";
import { Skeleton } from "../../../components/ui/skeleton";
import { getVariantStatusText } from "./get-variant-status-text";
import { formatRupiah } from "@/shared/utils/formatter";
import { ExpandableText } from "@/components/expandable-text";
import { useEffect, useState } from "react";

type Props = {
  productId: number;
  activeVariantId: string;
};

export function ProductDetail({ productId, activeVariantId }: Props) {
  const [isSwitching, setIsSwitching] = useState(false);

  const {
    data: product,
    isLoading: isProductLoading,
    error: productError
  } = useQuery({
    queryKey: ["product", productId],
    queryFn: () => getProductByIdOrFail(productId)
  });

  const { data: variant, isFetching: isVariantFetching } = useQuery({
    queryKey: ["variant", productId, activeVariantId],
    queryFn: () => getVariantByProductIdAndVariantId(productId, Number(activeVariantId))
  });

  useEffect(() => {
    // eslint-disable-next-line react-hooks/set-state-in-effect
    setIsSwitching(false);
  }, [activeVariantId]);

  if (isProductLoading) return <ProductDetailSkeleton />;

  if (productError) throw productError;

  if (!product) return null;

  const isActionLocked = isSwitching || isVariantFetching;

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
              {isVariantFetching ? <Skeleton className="h-6 w-32" /> : <>{formatRupiah(variant!.price)}</>}
            </div>

            <div className="text-xs sm:text-sm">
              {isVariantFetching ? <Skeleton className="h-3 w-20" /> : getVariantStatusText(variant?.warning ?? null, variant?.stock ?? 0)}
            </div>
          </div>

          <ExpandableText text={product.description} />

          <ProductDimensionSelector product={product} activeVariantId={activeVariantId} onSwitchStart={() => setIsSwitching(true)} />

          <div className="hidden md:block">
            <ProductPurchaseSection variantId={Number(activeVariantId)} variant={variant} isVariantLoading={isActionLocked} />
          </div>
        </div>
      </div>

      {/* Mobile Sticky Purchase */}
      <div className="fixed bottom-0 left-0 right-0 z-50 border-t bg-background p-4 md:hidden">
        <ProductPurchaseSection variantId={Number(activeVariantId)} variant={variant} isVariantLoading={isActionLocked} mobile />
      </div>
    </div>
  );
}
