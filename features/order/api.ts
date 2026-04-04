import { fetchAuth } from "@/shared/lib/fetch-auth";
import { OrderDetail, OrderListing, OrderListingQueryParams } from "./types";
import { appendQueryParams } from "@/shared/utils/append-query-params";

const BASE_URL = "/user/orders";

export async function getOrders(params?: OrderListingQueryParams) {
  const search = new URLSearchParams();

  appendQueryParams(search, params);

  const queryString = search.toString();

  const url = queryString ? `${BASE_URL}?${queryString}` : BASE_URL;

  return await fetchAuth<OrderListing>(url);
}

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
