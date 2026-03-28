import { OrderStatus, PaymentStatus } from "./types";

export function getPaymentStatusVariant(status: PaymentStatus) {
  switch (status) {
    case "PAID":
      return "default";
    case "UNPAID":
      return "secondary";
    case "FAILED":
      return "destructive";
    case "EXPIRED":
      return "outline";
    default:
      return "secondary";
  }
}

export function getOrderStatusVariant(status: OrderStatus) {
  switch (status) {
    case "COMPLETED":
      return "default";
    case "PROCESSING":
      return "default";
    case "PENDING":
      return "secondary";
    case "CANCELLED":
      return "destructive";
    default:
      return "secondary";
  }
}
