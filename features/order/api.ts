import { fetchAuth } from "@/shared/lib/fetch-auth";
import { OrderDetail } from "./types";

const BASE_URL = "/orders";

export async function getOrder(orderCode: string) {
  return await fetchAuth<OrderDetail>(`${BASE_URL}/${orderCode}`);
}

export async function cancelOrder(orderCode: string) {
  return await fetchAuth<void>(`${BASE_URL}/${orderCode}/cancel`, {
    method: "POST"
  });
}

export async function createSnapToken(orderCode: string) {
  return await fetchAuth<{ token: string; redirect_url: string }>(`${BASE_URL}/${orderCode}/snap-token`, {
    method: "POST"
  });
}
