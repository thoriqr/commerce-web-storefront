import { City, District, Province } from "./types";
import { authRequest } from "@/shared/lib/auth-request";

export function getProvinces() {
  return authRequest<Province[]>({
    url: `/shipping/provinces`,
    method: "GET"
  });
}

export function getCities(provinceId: number) {
  return authRequest<City[]>({
    url: `/shipping/cities/${provinceId}`,
    method: "GET"
  });
}

export function getDistricts(cityId: number) {
  return authRequest<District[]>({
    url: `/shipping/districts/${cityId}`,
    method: "GET"
  });
}
