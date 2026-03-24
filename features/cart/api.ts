import { AddItemInput, Cart, DeleteCartItemInput, UpdateCartItemInput } from "./types";
import { fetchStore } from "@/shared/lib/fetch-store";
import { fetchAction } from "@/shared/lib/fetch-action";

const CART_URL = "/store/cart";

export async function getCart() {
  return fetchStore<Cart>(`/cart`, {
    credentials: "include"
  });
}

export function addItem(input: AddItemInput) {
  return fetchAction<void>(`${CART_URL}/items`, {
    method: "POST",
    body: JSON.stringify(input),
    withAuth: true
  });
}

export function updateItem({ variantId, quantity }: UpdateCartItemInput) {
  return fetchAction<void>(`${CART_URL}/items/${variantId}`, {
    method: "PATCH",
    body: JSON.stringify({ quantity }),
    withAuth: true
  });
}

export function deleteItem({ variantId }: DeleteCartItemInput) {
  return fetchAction<void>(`${CART_URL}/items/${variantId}`, {
    method: "DELETE",
    withAuth: true
  });
}
