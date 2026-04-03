export type OptionSnapshot = { dimension: string; value: string };

export type CheckoutBlockReason = "INVALID_ITEMS" | "NO_ADDRESS" | "NO_SHIPPING" | "SHIPPING_NOT_CALCULATED";

export type ItemWarning = "UNAVAILABLE" | "INSUFFICIENT_STOCK";

export interface CheckoutSession {
  sessionId: number;
  expiresAt: Date;
  subtotal: number;
  shippingCost: number;
  total: number;
  totalWeight: number;
  address: {
    id: number;
    recipientName: string;
    phone: string;
    addressLine: string;
    provinceName: string;
    cityName: string;
    districtName: string;
    postalCode: string;
  } | null;
  courierCode: string | null;
  courierName: string | null;
  courierService: string | null;
  shippingEtd: string | null;
  items: {
    variantId: number;
    productId: number;
    productName: string;
    slug: string;
    price: number;
    quantity: number;
    stock: number;
    weight: number;
    isAvailable: boolean;
    imageKey: string | null;
    warning: string | null;
    options: OptionSnapshot[];
  }[];
  canPlaceOrder: boolean;
  reason: CheckoutBlockReason | null;
}

export type ShippingCost = {
  courier: string;
  services: { name: string; code: string; service: string; description: string; cost: number; etd: string }[];
};

export type SetShippingPayload = {
  courierCode: string;
  courierService: string;
};
