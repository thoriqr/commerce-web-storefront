"use client";

import Image from "next/image";
import Link from "next/link";
import { Card, CardContent } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";

type Product = {
  id: number;
  name: string;
  price: number;
  image: string;
  discount?: number;
};

export function ProductCard({ product }: { product: Product }) {
  const finalPrice = product.discount ? product.price - (product.price * product.discount) / 100 : product.price;

  return (
    <Link href={`/products/${product.id}`}>
      <Card className="group overflow-hidden transition hover:shadow-md">
        <div className="relative aspect-square w-full overflow-hidden bg-muted">
          <Image src={product.image} alt={product.name} fill className="object-cover transition group-hover:scale-105" />

          {product.discount && <Badge className="absolute left-2 top-2">-{product.discount}%</Badge>}
        </div>

        <CardContent className="space-y-2 p-4">
          <p className="line-clamp-2 text-sm font-medium">{product.name}</p>

          <div className="flex items-center gap-2">
            <span className="font-semibold">Rp {finalPrice.toLocaleString("id-ID")}</span>

            {product.discount && <span className="text-sm text-muted-foreground line-through">Rp {product.price.toLocaleString("id-ID")}</span>}
          </div>
        </CardContent>
      </Card>
    </Link>
  );
}
