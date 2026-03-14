export type DimOption = {
  dimension: string;
  value: string;
};

export type CartItem = {
  variantId: number;
  productId: number;
  name: string;
  slug: string;
  price: number;
  stock: number;
  quantity: number;
  imageKey: string;
  options: DimOption[];
  isAvailable: boolean;
  stockWarning: "OUT_OF_STOCK" | "INSUFFICIENT_STOCK" | null;
};

export type CartSummary = {
  totalItems: number;
  subtotal: number;
};

export type Cart = {
  items: CartItem[];
  summary: CartSummary;
};

export type AddItemInput = {
  variantId: number;
  quantity: number;
};

export type UpdateCartItemInput = {
  variantId: number;
  quantity: number;
};

export type DeleteCartItemInput = {
  variantId: number;
};
