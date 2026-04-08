import { CheckoutSession, SetShippingPayload, ShippingCost } from "./types";
import { authRequest } from "@/shared/lib/auth-request";

const BASE_URL = "/user/checkout-sessions";

export function getCheckoutSession(sessionId: number) {
  return authRequest<CheckoutSession>({
    url: `${BASE_URL}/${sessionId}`,
    method: "GET"
  });
}

export function getShippingCost(sessionId: number, courier: string) {
  return authRequest<ShippingCost>({
    url: `${BASE_URL}/${sessionId}/shipping-cost`,
    method: "POST",
    data: { courier }
  });
}

export function createCheckoutSession() {
  return authRequest<{ sessionId: number }>({
    url: `${BASE_URL}`,
    method: "POST"
  });
}

export function setAddressCheckoutSession(sessionId: number, addressId: number) {
  return authRequest<void>({
    url: `${BASE_URL}/${sessionId}/address`,
    method: "PATCH",
    data: { addressId }
  });
}

export function setShippingCheckoutSession(sessionId: number, payload: SetShippingPayload) {
  return authRequest<void>({
    url: `${BASE_URL}/${sessionId}/shipping-method`,
    method: "PATCH",
    data: payload
  });
}

export function confirmCheckout(sessionId: number) {
  return authRequest<{ orderCode: string }>({
    url: `${BASE_URL}/${sessionId}/confirm`,
    method: "POST"
  });
}
