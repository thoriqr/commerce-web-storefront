import { OrderDetail, OrderListing, OrderListingQueryParams } from "./types";
import { appendQueryParams } from "@/shared/utils/append-query-params";
import { authRequest } from "@/shared/lib/auth-request";

const BASE_URL = "/user/orders";

export function getOrders(params?: OrderListingQueryParams) {
  const search = new URLSearchParams();

  appendQueryParams(search, params);

  const queryString = search.toString();
  const url = queryString ? `${BASE_URL}?${queryString}` : BASE_URL;

  return authRequest<OrderListing>({
    url,
    method: "GET"
  });
}

export function getOrder(orderCode: string) {
  return authRequest<OrderDetail>({
    url: `${BASE_URL}/${orderCode}`,
    method: "GET"
  });
}

export function cancelOrder(orderCode: string) {
  return authRequest<void>({
    url: `${BASE_URL}/${orderCode}/cancel`,
    method: "POST"
  });
}

export function confirmDelivered(orderCode: string) {
  return authRequest<void>({
    url: `${BASE_URL}/${orderCode}/deliver`,
    method: "POST"
  });
}

export function createSnapToken(orderCode: string) {
  return authRequest<{ token: string; redirect_url: string }>({
    url: `${BASE_URL}/${orderCode}/snap-token`,
    method: "POST"
  });
}
