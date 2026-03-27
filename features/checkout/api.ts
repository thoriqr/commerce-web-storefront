import { fetchAuth } from "@/shared/lib/fetch-auth";
import { CheckoutSession, SetShippingPayload, ShippingCost } from "./types";

const BASE_URL = "/checkout-sessions";

export async function getCheckoutSession(sessionId: number) {
  return await fetchAuth<CheckoutSession>(`${BASE_URL}/${sessionId}`);
}

export async function getShippingCost(sessionId: number, courier: string) {
  return await fetchAuth<ShippingCost>(`${BASE_URL}/${sessionId}/shipping-cost`, {
    method: "POST",
    body: JSON.stringify({ courier })
  });
}

export async function createCheckoutSession() {
  return await fetchAuth<{ sessionId: number }>(`${BASE_URL}`, {
    method: "POST"
  });
}

export async function setAddressCheckoutSession(sessionId: number, addressId: number) {
  return await fetchAuth<void>(`${BASE_URL}/${sessionId}/address`, {
    method: "PATCH",
    body: JSON.stringify({ addressId })
  });
}

export async function setShippingCheckoutSession(sessionId: number, payload: SetShippingPayload) {
  return await fetchAuth<void>(`${BASE_URL}/${sessionId}/shipping-method`, {
    method: "PATCH",
    body: JSON.stringify(payload)
  });
}
