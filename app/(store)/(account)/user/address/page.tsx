import AddressTab from "@/features/user/components/address-tab";
import { Metadata } from "next";

export function generateMetadata(): Metadata {
  return {
    title: "Addresses",
    description: "Manage your shipping addresses"
  };
}

export default function AddressPage() {
  return <AddressTab />;
}
