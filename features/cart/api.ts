import { apiRequest } from "@/lib/api";
import { AddItemInput, Cart } from "./types";

const CART_URL = "/store/cart";

export function getCart() {
  return apiRequest<Cart>(`${CART_URL}`, {
    method: "GET"
  });
}

export function addItem(input: AddItemInput) {
  return apiRequest<void>(`${CART_URL}/items`, {
    method: "POST",
    body: JSON.stringify(input)
  });
}

export function updateItem(variantId: number, quantity: number) {
  return apiRequest<void>(`${CART_URL}/items/${variantId}`, {
    method: "PATCH",
    body: JSON.stringify(quantity)
  });
}

export function deleteItem(variantId: number) {
  return apiRequest<void>(`${CART_URL}/items/${variantId}`, {
    method: "DELETE"
  });
}
