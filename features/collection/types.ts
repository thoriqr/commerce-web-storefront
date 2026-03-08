import { ProductCard } from "../product/types";

export type CollectionPreview = {
  id: number;
  name: string;
  slug: string;
  hasMoreProducts: boolean;
  products: ProductCard[];
};

export type CollectionDetail = {
  id: number;
  name: string;
  slug: string;
  description: string;
};
