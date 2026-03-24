import { fetchJson } from "@/lib/api";
import { User } from "./types";

export async function getUserProfile() {
  return await fetchJson<User>(`/user/profile`);
}
