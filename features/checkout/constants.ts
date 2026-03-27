import { CheckoutBlockReason } from "./types";

export const COURIERS = [
  { label: "JNE", value: "jne" },
  { label: "J&T", value: "jnt" },
  { label: "POS", value: "pos" },
  { label: "TIKI", value: "tiki" }
];

export const reasonMap: Record<CheckoutBlockReason, string> = {
  INVALID_ITEMS: "Some items are unavailable or out of stock.",
  NO_ADDRESS: "Please select a shipping address.",
  NO_SHIPPING: "Please choose a shipping method.",
  SHIPPING_NOT_CALCULATED: "Please calculate shipping cost first."
};

export const QUERY_KEYS = {
  CHECKOUT_SESSION: "checkout-session"
};
