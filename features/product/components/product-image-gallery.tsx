"use client";

import { useEffect, useMemo, useRef, useState } from "react";
import Image from "next/image";
import { Carousel, CarouselContent, CarouselItem, CarouselNext, CarouselPrevious, type CarouselApi } from "@/components/ui/carousel";

import { ProductDetail } from "@/features/product/types";
import { getImageUrl } from "@/lib/media";

type Props = {
  product: ProductDetail;
  activeVariantId: string;
};

export function ProductImageGallery({ product, activeVariantId }: Props) {
  const [api, setApi] = useState<CarouselApi>();
  const [current, setCurrent] = useState(0);

  const thumbRefs = useRef<(HTMLButtonElement | null)[]>([]);
  const hasMountedRef = useRef(false);

  // 🔥 Cari active variant
  const activeVariant = useMemo(() => {
    return product.variants.find((v) => String(v.id) === activeVariantId);
  }, [product.variants, activeVariantId]);

  // 🔥 Cari image index berdasarkan signature
  const variantImageIndex = useMemo(() => {
    if (!activeVariant) return -1;

    return product.images.findIndex((img) => {
      if (img.type !== "variant" || !img.signature) return false;

      return activeVariant.options.some((opt) => opt.dimensionKey === img.signature?.dimensionKey && opt.valueKey === img.signature?.valueKey);
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

    if (!hasMountedRef.current) {
      hasMountedRef.current = true;
      return; // skip only first mount
    }

    if (variantImageIndex >= 0) {
      api.scrollTo(variantImageIndex);
    }
  }, [api, variantImageIndex]);

  useEffect(() => {
    const el = thumbRefs.current[current];

    if (el) {
      el.scrollIntoView({
        behavior: "smooth",
        inline: "center",
        block: "nearest"
      });
    }
  }, [current]);

  return (
    <div className="space-y-4">
      {/* MAIN CAROUSEL */}
      <Carousel setApi={setApi} opts={{ align: "start" }} className="w-full">
        <CarouselContent>
          {product.images.map((img, idx) => (
            <CarouselItem key={img.id}>
              <div className="relative aspect-square w-full overflow-hidden rounded-xl border bg-muted">
                <Image
                  src={getImageUrl(img.imageKey)}
                  alt={product.name}
                  fill
                  sizes="(max-width: 768px) 100vw, 50vw"
                  loading="eager"
                  className="object-cover"
                />
              </div>
            </CarouselItem>
          ))}
        </CarouselContent>

        <CarouselPrevious className="hidden md:flex -left-5 h-9 w-9 bg-white border border-gray-200 shadow-md hover:bg-gray-50" />
        <CarouselNext className="hidden md:flex -right-5 h-9 w-9 bg-white border border-gray-200 shadow-md hover:bg-gray-50" />
      </Carousel>

      {/* THUMBNAILS */}
      <div className="w-full overflow-x-auto scroll-smooth">
        <div className="flex gap-3 p-1 w-max">
          {product.images.map((img, index) => (
            <button
              ref={(el) => {
                thumbRefs.current[index] = el;
              }}
              key={img.id}
              onClick={() => api?.scrollTo(index)}
              className={` relative h-16 w-16 shrink-0 rounded-md border transition ${current === index ? "ring-2 ring-primary" : "hover:ring-1 hover:ring-muted-foreground"}`}
            >
              <div className="relative h-full w-full overflow-hidden rounded-md">
                <Image src={getImageUrl(img.imageKey)} alt={product.name} fill sizes="(max-width: 768px) 25vw, 10vw" className="object-cover" />
              </div>
            </button>
          ))}
        </div>
      </div>
    </div>
  );
}
