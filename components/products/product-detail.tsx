import { notFound } from "next/navigation";
import { ProductImageGallery } from "./product-image-gallery";
import { mockProductDetail } from "@/lib/products/mock-product-detail";
import ProductBreadcrumb from "./product-breadcrumb";
import { mockVariantDetails } from "@/lib/products/mock-variant-details";
import { ProductDimensionSelector } from "./product-dimension-selector";
import { ProductPurchaseSection } from "./product-purchase-sectiont";

type Props = {
  slug: string;
  variantId?: string;
};

export async function ProductDetail({ slug, variantId }: Props) {
  // 🔥 nanti ganti fetch API
  const product = mockProductDetail;

  // if (!product || product.slug !== slug) {
  //   return notFound();
  // }

  if (!product) {
    return notFound();
  }

  // 🔥 pakai variant dari URL jika ada
  const activeVariantId = variantId ?? product.initialVariantId;

  const selectedVariant = mockVariantDetails.find((v) => v.variantId === activeVariantId);

  // // 3️⃣ fetch variant detail
  // const selectedVariant = await getVariantDetail(activeVariantId);

  if (!selectedVariant) {
    return notFound();
  }

  return (
    <div className="space-y-8 pb-28 md:pb-0">
      <ProductBreadcrumb name={product.name} slug={product.slug} />

      <div className="grid gap-10 md:grid-cols-2">
        <ProductImageGallery product={product} activeVariantId={activeVariantId} />

        <div className="space-y-6">
          <h1 className="text-2xl font-semibold">{product.name}</h1>

          {/* Price */}
          <div className="space-y-1">
            <p className="text-2xl font-bold">Rp {selectedVariant.price.toLocaleString("id-ID")}</p>

            {selectedVariant.stock === 0 ? (
              <p className="text-sm text-destructive font-medium">Out of stock</p>
            ) : (
              <p className="text-sm text-muted-foreground">{selectedVariant.stock} available</p>
            )}
          </div>

          <p className="text-sm text-muted-foreground">{product.description}</p>

          <ProductDimensionSelector product={product} activeVariantId={activeVariantId} />

          {/* Desktop Purchase Section */}
          <div className="hidden md:block">
            <ProductPurchaseSection price={selectedVariant.price} stock={selectedVariant.stock} />
          </div>
        </div>
      </div>

      {/* Mobile Sticky Purchase */}
      <div className="fixed bottom-0 left-0 right-0 z-50 border-t bg-background p-4 md:hidden">
        <ProductPurchaseSection price={selectedVariant.price} stock={selectedVariant.stock} mobile />
      </div>
    </div>
  );
}
