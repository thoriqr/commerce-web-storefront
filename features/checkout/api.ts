import { fetchAuth } from "@/shared/lib/fetch-auth";
import { CheckoutSession, ShippingCost } from "./types";

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
