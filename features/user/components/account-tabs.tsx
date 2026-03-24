"use client";

import { useRouter, usePathname } from "next/navigation";
import { Tabs, TabsList, TabsTrigger } from "@/components/ui/tabs";

export default function AccountTabs() {
  const router = useRouter();
  const pathname = usePathname();

  const value = pathname === "/user" ? "profile" : (pathname.split("/")[2] ?? "profile");

  return (
    <Tabs
      value={value}
      onValueChange={(val) => {
        if (val === "profile") router.push("/user");
        else router.push(`/user/${val}`);
      }}
    >
      <TabsList className="w-full">
        <TabsTrigger value="profile">Profile</TabsTrigger>
        <TabsTrigger value="orders">Orders</TabsTrigger>
        <TabsTrigger value="address">Address</TabsTrigger>
      </TabsList>
    </Tabs>
  );
}
