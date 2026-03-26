import { fetchAction } from "@/shared/lib/fetch-action";
import { UserAddresses, User, UpsertAddressPayload, AddressDetail } from "./types";
import { fetchAuth } from "@/shared/lib/fetch-auth";

const BASE_URL = "/user";

export async function getUserProfile() {
  return await fetchAuth<User>(`${BASE_URL}/profile`);
}

export async function updateProfile(displayName: string) {
  return await fetchAction<void>(`${BASE_URL}/profile`, { method: "PUT", body: JSON.stringify({ displayName }), withAuth: true });
}

export async function getUserAddresses() {
  return await fetchAuth<UserAddresses>(`${BASE_URL}/addresses`);
}

export async function getAddress(addressId: number) {
  return await fetchAuth<AddressDetail>(`${BASE_URL}/addresses/${addressId}`);
}

export async function createAddress(payload: UpsertAddressPayload) {
  return await fetchAction<void>(`${BASE_URL}/addresses`, { method: "POST", body: JSON.stringify(payload), withAuth: true });
}

export async function updateAddress(addressId: number, payload: UpsertAddressPayload) {
  return await fetchAction<void>(`${BASE_URL}/addresses/${addressId}`, { method: "PUT", body: JSON.stringify(payload), withAuth: true });
}

export async function deleteAddress(addressId: number) {
  return await fetchAction<void>(`${BASE_URL}/addresses/${addressId}`, { method: "DELETE", withAuth: true });
}

export async function setDefaultAddress(addressId: number) {
  return await fetchAction<void>(`${BASE_URL}/addresses/${addressId}/default`, { method: "PATCH", withAuth: true });
}
