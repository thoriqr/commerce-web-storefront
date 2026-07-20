import { AddItemInput, Cart, DeleteCartItemInput, UpdateCartItemInput } from "./types";
import { authRequest } from "@/shared/lib/auth-request";

const CART_URL = "/cart";

export function getCart() {
  return authRequest<Cart>({
    url: CART_URL,
    method: "GET"
  });
}

export function addItem(input: AddItemInput) {
  return authRequest<void>({
    url: `${CART_URL}/items`,
    method: "POST",
    data: input
  });
}

export function updateItem({ variantId, quantity }: UpdateCartItemInput) {
  return authRequest<void>({
    url: `${CART_URL}/items/${variantId}`,
    method: "PATCH",
    data: {
      quantity
    }
  });
}

export function deleteItem({ variantId }: DeleteCartItemInput) {
  return authRequest<void>({
    url: `${CART_URL}/items/${variantId}`,
    method: "DELETE"
  });
}
