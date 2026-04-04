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
    case "SHIPPED":
    case "DELIVERED":
      return "secondary";

    case "WAITING_PAYMENT":
      return "outline";

    case "CANCELLED":
    case "FAILED":
    case "EXPIRED":
      return "destructive";

    default:
      return "secondary";
  }
}

export function getOrderStatusLabel(status: OrderStatus): string {
  switch (status) {
    case "WAITING_PAYMENT":
      return "Waiting for Payment";
    case "PROCESSING":
      return "Being Processed";
    case "COMPLETED":
      return "Completed";
    case "CANCELLED":
      return "Cancelled";
    case "SHIPPED":
      return "Shipped";
    case "DELIVERED":
      return "Delivered";
    case "FAILED":
      return "Payment Failed";
    case "EXPIRED":
      return "Expired";
    default:
      return "Unknown";
  }
}

export function getPaymentStatusLabel(status: PaymentStatus): string {
  switch (status) {
    case "PAID":
      return "Paid";
    case "UNPAID":
      return "Unpaid";
    case "FAILED":
      return "Failed";
    case "EXPIRED":
      return "Expired";
    default:
      return "Unknown";
  }
}

export function getPaginationRange(current: number, total: number) {
  const delta = 1;
  const range: (number | "...")[] = [];

  const left = Math.max(2, current - delta);
  const right = Math.min(total - 1, current + delta);

  range.push(1);

  if (left > 2) {
    range.push("...");
  }

  for (let i = left; i <= right; i++) {
    range.push(i);
  }

  if (right < total - 1) {
    range.push("...");
  }

  if (total > 1) {
    range.push(total);
  }

  return range;
}
