import Image from "next/image";
import Link from "next/link";
import { Card, CardContent } from "@/components/ui/card";
import { ProductCard as ProductCardType } from "@/features/product/types";
import { getImageUrl } from "@/shared/utils/media";
import { navigateProductPage } from "@/shared/utils/navigate-product-page";

type Props = {
  product: ProductCardType;
};

export function ProductCard({ product }: Props) {
  return (
    <Link href={navigateProductPage(Number(product.id), product.slug)}>
      <Card className="p-0 gap-0">
        <div className="relative aspect-square w-full">
          <Image
            src={getImageUrl(product.imageKey)}
            alt={product.name}
            fill
            loading="lazy"
            sizes="(max-width: 768px) 50vw, (max-width: 1024px) 33vw, 20vw"
            className="object-cover"
          />
        </div>

        <CardContent className="flex flex-col gap-2 p-4 flex-1">
          {/* TITLE AREA FIXED HEIGHT */}
          <p className="line-clamp-2 text-sm font-medium min-h-11">{product.name}</p>

          <span className="font-semibold mt-auto">Rp{product.displayPrice.toLocaleString("id-ID")}</span>
        </CardContent>
      </Card>
    </Link>
  );
}
