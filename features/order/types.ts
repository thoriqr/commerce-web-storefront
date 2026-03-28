export type OptionSnapshot = { dimension: string; value: string };

export type PaymentStatus = "UNPAID" | "PAID" | "FAILED" | "EXPIRED";

export type OrderStatus = "PENDING" | "PROCESSING" | "CANCELLED" | "COMPLETED";

export type OrderDetail = {
  orderCode: string;
  subtotal: number;
  shippingCost: number;
  total: number;
  status: OrderStatus;
  paymentStatus: PaymentStatus;
  expiresAt: Date;
  paidAt: Date | null;
  canPay: boolean;
  address: {
    recipientName: string;
    phone: string;
    addressLine: string;
    provinceName: string;
    cityName: string;
    districtName: string;
    postalCode: string;
  };
  shipping: {
    courierCode: string;
    courierName: string;
    courierService: string;
    etd: string;
  };
  items: {
    productId: number;
    variantId: number;
    name: string;
    slug: string;
    price: number;
    quantity: number;
    weight: number;
    imageKey: string;
    options: OptionSnapshot[];
  }[];
};
