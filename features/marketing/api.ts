import { apiFetch } from "@/lib/api";
import { Banner, BannerPlacement } from "./types";

export async function getBannerPlacement(placement: BannerPlacement) {
  return apiFetch<Banner[]>(`/marketing/banners?placement=${placement}`);
}
