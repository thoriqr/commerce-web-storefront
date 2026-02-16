"use client";

import { useEffect, useMemo, useState } from "react";
import Image from "next/image";
import { Carousel, CarouselContent, CarouselItem, CarouselNext, CarouselPrevious, type CarouselApi } from "@/components/ui/carousel";
import { ProductDetail, ProductImage } from "@/lib/products/types";

type Props = {
  product: ProductDetail;
  activeVariantId: string;
};

export function ProductImageGallery({ product, activeVariantId }: Props) {
  const [api, setApi] = useState<CarouselApi>();
  const [current, setCurrent] = useState(0);

  const isInitial = activeVariantId === product.initialVariantId;

  // 🔥 Cari active variant
  const activeVariant = useMemo(() => {
    return product.variants.find((v) => v.id === activeVariantId);
  }, [product.variants, activeVariantId]);

  // 🔥 Cari image index berdasarkan signature
  const variantImageIndex = useMemo(() => {
    if (!activeVariant) return -1;

    return product.images.findIndex((img) => {
      if (img.type !== "variant" || !img.signature) return false;

      return activeVariant.options.some((opt) => opt.dimensionId === img.signature?.dimensionId && opt.valueId === img.signature?.valueId);
    });
  }, [product.images, activeVariant]);

  useEffect(() => {
    if (!api) return;

    const onSelect = () => {
      setCurrent(api.selectedScrollSnap());
    };

    onSelect();
    api.on("select", onSelect);

    return () => {
      api.off("select", onSelect);
    };
  }, [api]);

  useEffect(() => {
    if (!api) return;

    if (!isInitial && variantImageIndex >= 0) {
      api.scrollTo(variantImageIndex);
    }
  }, [api, variantImageIndex, isInitial]);

  return (
    <div className="space-y-4">
      {/* MAIN CAROUSEL */}
      <Carousel setApi={setApi} opts={{ align: "start" }} className="w-full">
        <CarouselContent>
          {product.images.map((img) => (
            <CarouselItem key={img.id}>
              <div className="relative aspect-square w-full overflow-hidden rounded-xl border bg-muted">
                <Image src={img.url} alt="" fill className="object-cover" />
              </div>
            </CarouselItem>
          ))}
        </CarouselContent>

        <CarouselPrevious className="hidden md:flex -left-5 h-9 w-9 bg-white border border-gray-200 shadow-md hover:bg-gray-50" />
        <CarouselNext className="hidden md:flex -right-5 h-9 w-9 bg-white border border-gray-200 shadow-md hover:bg-gray-50" />
      </Carousel>

      {/* THUMBNAILS */}
      <div className="w-full overflow-x-auto">
        <div className="flex justify-center gap-3 p-1 min-w-max">
          {product.images.map((img, index) => (
            <button
              key={img.id}
              onClick={() => api?.scrollTo(index)}
              className={`
          relative h-16 w-16 shrink-0 rounded-md border
          transition
          ${current === index ? "ring-2 ring-primary" : "hover:ring-1 hover:ring-muted-foreground"}
        `}
            >
              <div className="relative h-full w-full overflow-hidden rounded-md">
                <Image src={img.url} alt="" fill className="object-cover" />
              </div>
            </button>
          ))}
        </div>
      </div>
    </div>
  );
}
