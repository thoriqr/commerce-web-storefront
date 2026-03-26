import { fetchAuth } from "@/shared/lib/fetch-auth";
import { City, District, Province } from "./types";

export async function getProvinces() {
  return await fetchAuth<Province[]>(`/shipping/provinces`);
}

export async function getCities(provinceId: number) {
  return await fetchAuth<City[]>(`/shipping/cities/${provinceId}`);
}

export async function getDistricts(cityId: number) {
  return await fetchAuth<District[]>(`/shipping/districts/${cityId}`);
}
