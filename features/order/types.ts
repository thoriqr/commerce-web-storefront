export type OptionSnapshot = { dimension: string; value: string };

export type PaymentStatus = "UNPAID" | "PAID" | "FAILED" | "EXPIRED";

export type ShipmentStatus = "PENDING" | "SHIPPED" | "DELIVERED";

export type OrderStatus = "FAILED" | "EXPIRED" | "PROCESSING" | "CANCELLED" | "COMPLETED" | "SHIPPED" | "DELIVERED" | "WAITING_PAYMENT" | "UNKNOWN";

export type OrderRawStatus = "PENDING" | "PROCESSING" | "CANCELLED" | "COMPLETED";

export type TimelineItem = {
  key: string;
  label: string;
  date: Date | null;
  isCompleted: boolean;
  isCurrent: boolean;
};

export type OrderWarehouseOrigin = {
  name: string;
  province: string;
  city: string;
  district: string;
  postalCode: string;
};

export type OrderDetail = {
  orderCode: string;
  subtotal: number;
  shippingCost: number;
  total: number;
  rawStatus: OrderRawStatus;
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
    trackingNumber: string;
    status: ShipmentStatus;
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
  warehouseOrigin: OrderWarehouseOrigin | null;
  timeline: TimelineItem[];
};

export type OrderListing = {
  items: {
    id: number;
    orderCode: string;
    productId: number;
    slug: string;
    status: OrderStatus;
    total: number;
    createdAt: Date;
    itemCount: number;
    previewItem: {
      name: string;
      imageKey: string | null;
    };
    canConfirm: boolean;
  }[];
  meta: { page: number; limit: number; total: number; totalPages: number; hasNext: boolean; hasPrev: boolean };
};

export type OrderListingQueryParams = {
  page: number;
  limit: number;
  status?: "ongoing" | "completed" | "cancelled";
};
