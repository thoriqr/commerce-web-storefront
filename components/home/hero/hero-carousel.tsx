"use client";

import Autoplay from "embla-carousel-autoplay";
import Image from "next/image";
import Link from "next/link";
import { useRef } from "react";
import { Carousel, CarouselContent, CarouselItem, CarouselNext, CarouselPrevious } from "@/components/ui/carousel";
import { Banner } from "@/features/marketing/types";
import { getImageUrl } from "@/lib/media";

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
            {banners.map((banner) => (
              <CarouselItem key={banner.id} className="pl-0">
                <Link href={banner.url ?? "#"}>
                  <div className="relative aspect-16/6 w-full">
                    <Image
                      src={getImageUrl(banner.imageKey)}
                      alt={banner.title}
                      fill
                      priority
                      className="object-cover transition-transform duration-700 hover:scale-105"
                    />

                    <div className="absolute inset-0 bg-linear-to-t from-black/60 via-black/30 to-transparent" />

                    <div className="absolute inset-0 flex items-end md:items-center">
                      <div className="mx-auto w-full max-w-7xl px-6 pb-8 md:pb-0">
                        <div className="max-w-2xl">
                          <h2 className="text-3xl font-semibold leading-tight text-white drop-shadow-lg md:text-5xl md:leading-[1.1]">
                            {banner.title}
                          </h2>
                        </div>
                      </div>
                    </div>
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
