import { User } from "./types";
import { fetchAuth } from "@/shared/lib/fetch-auth";

export async function getUserProfile() {
  return await fetchAuth<User>(`/user/profile`);
}
