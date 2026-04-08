"use client";

import { Carousel, CarouselContent, CarouselItem, CarouselNext, CarouselPrevious } from "@/components/ui/carousel";
import { ProductCard } from "./product-card";
import { ProductCard as ProductCardType } from "@/features/product/types";

type Props = {
  products: ProductCardType[];
};

export function ProductCarousel({ products }: Props) {
  const showControls = products.length > 5;

  return (
    <Carousel opts={{ align: "start" }}>
      <CarouselContent className="pl-1 pr-4 md:pr-0">
        {products.map((product) => (
          <CarouselItem key={product.id} className="basis-[45%] md:basis-1/3 lg:basis-1/5 pb-1">
            <ProductCard product={product} />
          </CarouselItem>
        ))}
      </CarouselContent>

      {showControls && (
        <>
          <CarouselPrevious className="absolute -left-4 top-1/2 z-20 hidden h-9 w-9 -translate-y-1/2 md:flex bg-white border border-gray-200 shadow-md hover:bg-gray-50" />
          <CarouselNext className="absolute -right-4 top-1/2 z-20 hidden h-9 w-9 -translate-y-1/2 md:flex bg-white border border-gray-200 shadow-md hover:bg-gray-50" />
        </>
      )}
    </Carousel>
  );
}
