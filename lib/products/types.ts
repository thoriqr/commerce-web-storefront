export type ProductDimension = {
  id: string;
  name: string; // e.g. "Color", "Size"
  values: {
    id: string;
    label: string;
    hexColor?: string;
  }[];
};

export type Product = {
  id: number;
  slug: string;
  name: string;
  price: number;
  image: string;
  initialVariantId: string;
  discount?: number;
};

export type ProductStatus = "ACTIVE" | "INACTIVE" | "ARCHIVED";

export type Dimension = {
  id: string;
  name: string;
  values: {
    id: string;
    name: string;
  }[];
};

export type ImageSignature = {
  dimensionId: string;
  valueId: string;
};

export type ProductImage =
  | {
      id: string;
      url: string;
      type: "product";
    }
  | {
      id: string;
      url: string;
      type: "variant";
      signature: ImageSignature;
    };

export type ProductVariant = {
  id: string;
  options: { dimensionId: string; valueId: string }[];
};

export type ProductDetail = {
  id: number;
  name: string;
  slug: string;
  description: string;
  category: {
    name: string;
    slug: string;
  };
  initialVariantId: string;
  isVariant: boolean;
  variants: ProductVariant[];
  status: ProductStatus;
  dimensions: Dimension[];
  images: ProductImage[];
};

export type VariantDetail = {
  variantId: string;
  price: number;
  stock: number;
};
