import { UserAddresses, User, UpsertAddressPayload, AddressDetail } from "./types";
import { authRequest } from "@/shared/lib/auth-request";

const BASE_URL = "/user";

export function getUserProfile() {
  return authRequest<User>({
    url: `${BASE_URL}/profile`,
    method: "GET"
  });
}

export function updateProfile(displayName: string) {
  return authRequest<void>({
    url: `${BASE_URL}/profile`,
    method: "PUT",
    data: { displayName }
  });
}

export function getUserAddresses() {
  return authRequest<UserAddresses>({
    url: `${BASE_URL}/addresses`,
    method: "GET"
  });
}

export function getAddress(addressId: number) {
  return authRequest<AddressDetail>({
    url: `${BASE_URL}/addresses/${addressId}`,
    method: "GET"
  });
}

export function createAddress(payload: UpsertAddressPayload) {
  return authRequest<void>({
    url: `${BASE_URL}/addresses`,
    method: "POST",
    data: payload
  });
}

export function updateAddress(addressId: number, payload: UpsertAddressPayload) {
  return authRequest<void>({
    url: `${BASE_URL}/addresses/${addressId}`,
    method: "PUT",
    data: payload
  });
}

export function deleteAddress(addressId: number) {
  return authRequest<void>({
    url: `${BASE_URL}/addresses/${addressId}`,
    method: "DELETE"
  });
}

export function setDefaultAddress(addressId: number) {
  return authRequest<void>({
    url: `${BASE_URL}/addresses/${addressId}/default`,
    method: "PATCH"
  });
}
