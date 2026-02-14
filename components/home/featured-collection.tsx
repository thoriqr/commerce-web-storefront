"use client";

import { Carousel, CarouselContent, CarouselItem, CarouselNext, CarouselPrevious } from "@/components/ui/carousel";
import { ProductCard } from "./product-card";
import { Button } from "@/components/ui/button";

type Product = {
  id: number;
  name: string;
  price: number;
  image: string;
  discount?: number;
};

type Props = {
  title: string;
  products: Product[];
};

export function FeaturedCollection({ title, products }: Props) {
  return (
    <section className="space-y-4">
      <div className="flex items-center justify-between">
        <h2 className="text-xl font-semibold">{title}</h2>
        <Button variant="ghost" size="sm">
          View all
        </Button>
      </div>

      <div className="relative">
        <Carousel opts={{ align: "start" }}>
          <CarouselContent>
            {products.map((product) => (
              <CarouselItem key={product.id} className="basis-1/2 md:basis-1/3 lg:basis-1/5">
                <ProductCard product={product} />
              </CarouselItem>
            ))}
          </CarouselContent>

          {/* navigation buttons */}
          <CarouselPrevious className="hidden md:flex -left-5 h-9 w-9 bg-white border border-gray-200 shadow-md hover:bg-gray-50" />
          <CarouselNext className="hidden md:flex -right-5 h-9 w-9 bg-white border border-gray-200 shadow-md hover:bg-gray-50" />
        </Carousel>
      </div>
    </section>
  );
}
