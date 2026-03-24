import { Banner, BannerPlacement } from "./types";
import { fetchServer } from "@/shared/lib/fetch-server";

export async function getBannerPlacement(placement: BannerPlacement) {
  return fetchServer<Banner[]>(`/marketing/banners?placement=${placement}`);
}
