"use client";

import * as React from "react";
import Autoplay from "embla-carousel-autoplay";
import Image from "next/image";
import Link from "next/link";

import { Carousel, CarouselContent, CarouselItem, CarouselNext, CarouselPrevious } from "@/components/ui/carousel";

type Banner = {
  id: number;
  title: string;
  imageUrl: string;
  href?: string;
};

const banners: Banner[] = [
  {
    id: 1,
    title: "Summer Sale",
    imageUrl: "https://images.unsplash.com/photo-1607082349566-187342175e2f?q=80&w=1920&auto=format&fit=crop",
    href: "/products"
  },
  {
    id: 2,
    title: "New Arrivals",
    imageUrl: "https://images.unsplash.com/photo-1523275335684-37898b6baf30?q=80&w=1920&auto=format&fit=crop",
    href: "/products"
  },
  {
    id: 3,
    title: "Limited Offer",
    imageUrl: "https://images.unsplash.com/photo-1607083206968-13611e3d76db?q=80&w=1920&auto=format&fit=crop",
    href: "/products"
  }
];

export function HeroCarousel() {
  const plugin = React.useRef(Autoplay({ delay: 4000, stopOnInteraction: false }));

  return (
    <section className="w-full">
      <Carousel plugins={[plugin.current]} className="w-full">
        <CarouselContent>
          {banners.map((banner) => (
            <CarouselItem key={banner.id}>
              <Link href={banner.href ?? "#"}>
                <div className="relative aspect-[16/6] w-full overflow-hidden">
                  <Image
                    src={banner.imageUrl}
                    alt={banner.title}
                    fill
                    priority
                    className="object-cover transition-transform duration-500 hover:scale-105"
                  />

                  {/* Overlay */}
                  <div className="absolute inset-0 bg-black/30" />

                  {/* Content */}
                  <div className="absolute inset-0 flex items-center">
                    <div className="mx-auto w-full max-w-7xl px-4">
                      <h2 className="text-3xl font-bold text-white md:text-5xl">{banner.title}</h2>
                    </div>
                  </div>
                </div>
              </Link>
            </CarouselItem>
          ))}
        </CarouselContent>

        <CarouselPrevious className="hidden md:flex -left-5 h-9 w-9 bg-white border border-gray-200 shadow-md hover:bg-gray-50" />
        <CarouselNext className="hidden md:flex -right-5 h-9 w-9 bg-white border border-gray-200 shadow-md hover:bg-gray-50" />
      </Carousel>
    </section>
  );
}
