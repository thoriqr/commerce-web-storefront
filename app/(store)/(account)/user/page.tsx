import { ProfileTab } from "@/features/user/components/profile-tab";
import { Metadata } from "next";

export const dynamic = "force-dynamic";

export function generateMetadata(): Metadata {
  return {
    title: "Profile",
    description: "Manage your account information"
  };
}

export default function UserPage() {
  return <ProfileTab />;
}
