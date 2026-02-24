export type ProductCard = {
  id: string;
  name: string;
  slug: string;
  imageKey: string;
  displayPrice: number;
};

export type ProductListing = {
  items: ProductCard[];
  nextCursor: string | null;
  hasMore: boolean;
};

export type DimensionFilter = {
  name: string;
  label: string;
  values: {
    value: string;
    label: string;
    count: number;
    hexColor: string | null;
  }[];
};

export type ProductListingQueryParams = {
  cursor?: string;
  limit?: number;
  priceMin?: number;
  priceMax?: number;
  sortBy?: string;
  sortDir?: string;
} & Record<string, string | number | undefined>;

export type ProductDimensionValue = {
  key: string;
  label: string;
  hexColor: string | null;
};

export type ProductDimension = {
  key: string;
  label: string;
  values: ProductDimensionValue[];
};

export type ProductVariantOption = {
  id: number;
  options: { dimensionKey: string; valueKey: string }[];
};

export type ProductImageSignature = { dimensionKey: string; valueKey: string };

export type ProductImage = {
  id: number;
  imageKey: string;
  type: "product" | "variant";
  signature: ProductImageSignature;
};

export type ProductDetail = {
  id: number;
  name: string;
  slug: string;
  description: string;
  status: "ACTIVE" | "INACTIVE";
  isVariant: boolean;
  initialVariantId: number;
  category: {
    name: string;
    slugPath: string;
  };
  dimensions: ProductDimension[];
  variants: ProductVariantOption[];
  images: ProductImage[];
};

export type ProductVariantDetail = {
  variantId: number;
  price: number;
  stock: number;
  sku: string | null;
  currency: string;
  weight: number;
  weightUnit: string;
  isAvailable: boolean;
};
