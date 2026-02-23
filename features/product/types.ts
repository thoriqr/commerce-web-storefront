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
