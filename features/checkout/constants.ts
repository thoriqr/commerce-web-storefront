import { CheckoutBlockReason } from "./types";

export const COURIERS = [
  { label: "JNE", value: "jne" },
  { label: "J&T", value: "jnt" },
  { label: "POS", value: "pos" },
  { label: "TIKI", value: "tiki" }
];

export const reasonMap: Record<CheckoutBlockReason, string> = {
  INVALID_ITEMS: "Some items are no longer available. Please review your cart.",
  NO_ADDRESS: "Please select a shipping address to continue.",
  NO_SHIPPING: "Please choose a shipping method.",
  SHIPPING_NOT_CALCULATED: "Please calculate shipping cost before placing order."
};

export const QUERY_KEYS = {
  CHECKOUT_SESSION: "checkout-session"
};
