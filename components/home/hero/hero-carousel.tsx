"use client";

import Autoplay from "embla-carousel-autoplay";
import Image from "next/image";
import Link from "next/link";
import { useRef } from "react";
import { Carousel, CarouselContent, CarouselItem, CarouselNext, CarouselPrevious } from "@/components/ui/carousel";
import { Banner } from "@/features/marketing/types";
import { getImageUrl } from "@/shared/utils/media";

type Props = {
  banners: Banner[];
};

export function HeroCarousel({ banners }: Props) {
  const plugin = useRef(Autoplay({ delay: 4000, stopOnInteraction: false }));

  return (
    <section className="w-full">
      <Carousel plugins={[plugin.current]} opts={{ loop: true }} className="relative w-full">
        {/* FRAME */}
        <div className="overflow-hidden rounded-lg">
          <CarouselContent>
            {banners.map((banner, idx) => (
              <CarouselItem key={banner.id} className="pl-0">
                <Link href={banner.url ?? "#"}>
                  <div className="relative aspect-3/1 w-full">
                    <Image
                      src={getImageUrl(banner.imageKey)}
                      alt={banner.title}
                      fill
                      loading={idx === 0 ? "eager" : "lazy"}
                      className="object-cover"
                    />
                  </div>
                </Link>
              </CarouselItem>
            ))}
          </CarouselContent>
        </div>

        {/* ARROWS INSIDE CAROUSEL */}
        <CarouselPrevious className="absolute -left-5 top-1/2 z-20 hidden h-9 w-9 -translate-y-1/2 md:flex bg-white border border-gray-200 shadow-md hover:bg-gray-50" />
        <CarouselNext className="absolute -right-5 top-1/2 z-20 hidden h-9 w-9 -translate-y-1/2 md:flex bg-white border border-gray-200 shadow-md hover:bg-gray-50" />
      </Carousel>
    </section>
  );
}
