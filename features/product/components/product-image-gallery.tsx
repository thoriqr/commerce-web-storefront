"use client";

import { useEffect, useMemo, useRef, useState } from "react";
import Image from "next/image";
import { Carousel, CarouselContent, CarouselItem, CarouselNext, CarouselPrevious, type CarouselApi } from "@/components/ui/carousel";

import { ProductDetail } from "@/features/product/types";
import { getImageUrl } from "@/shared/utils/media";

type Props = {
  product: ProductDetail;
  activeVariantId: string;
};

export function ProductImageGallery({ product, activeVariantId }: Props) {
  const [api, setApi] = useState<CarouselApi>();
  const [current, setCurrent] = useState(0);

  const thumbRefs = useRef<(HTMLButtonElement | null)[]>([]);
  const hasMountedRef = useRef(false);

  const imageMap = useMemo(() => {
    const map = new Map<string, number>();

    product.images.forEach((img, index) => {
      if (img.type === "variant" && img.signature) {
        const key = `${img.signature.dimensionKey}:${img.signature.valueKey}`;
        map.set(key, index);
      }
    });

    return map;
  }, [product.images]);

  // Cari active variant
  const activeVariant = useMemo(() => {
    return product.variants.find((v) => String(v.id) === activeVariantId);
  }, [product.variants, activeVariantId]);

  // Cari image index berdasarkan signature
  const variantImageIndex = (() => {
    if (!activeVariant) return -1;

    for (const opt of activeVariant.options) {
      const key = `${opt.dimensionKey}:${opt.valueKey}`;
      if (imageMap.has(key)) {
        return imageMap.get(key)!;
      }
    }

    return -1;
  })();

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
    if (variantImageIndex < 0) return;

    //  skip first render
    if (!hasMountedRef.current) {
      hasMountedRef.current = true;
      return;
    }

    const id = setTimeout(() => {
      api.scrollTo(variantImageIndex);
    }, 50);

    return () => clearTimeout(id);
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
          {product.images.map((img) => (
            <CarouselItem key={img.imageKey}>
              <div className="relative aspect-square w-full overflow-hidden rounded-xl border bg-muted">
                <Image
                  src={getImageUrl(img.imageKey)}
                  alt={product.name}
                  fill
                  sizes="(max-width: 768px) 100vw, 50vw"
                  loading="lazy"
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
              key={img.imageKey}
              onClick={() => api?.scrollTo(index)}
              className={` relative h-16 w-16 shrink-0 rounded-md border transition ${current === index ? "ring-2 ring-primary" : "hover:ring-1 hover:ring-muted-foreground"}`}
            >
              <div className="relative h-full w-full overflow-hidden rounded-md">
                <Image
                  src={getImageUrl(img.imageKey)}
                  alt={product.name}
                  fill
                  sizes="(max-width: 768px) 25vw, 10vw"
                  loading="lazy"
                  className="object-cover"
                />
              </div>
            </button>
          ))}
        </div>
      </div>
    </div>
  );
}
