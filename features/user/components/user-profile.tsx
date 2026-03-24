"use client";

import { useProfile } from "../hooks/use-profile";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { ProfileHeader } from "./profile-header";
import { ProfileTab } from "./profile-tab";
import { SecurityTab } from "./security-tab";
import { AddressTab } from "./address-tab";
import { ConnectedAccountsTab } from "./connected-accounts.tab";
import UserProfileSkeleton from "./user-profile-skeleton";

export default function UserProfile() {
  const { data, isLoading, error } = useProfile();

  if (isLoading) {
    return <UserProfileSkeleton />;
  }

  if (error) {
    throw error;
  }

  const user = data!;

  return (
    <div className="max-w-3xl mx-auto space-y-6">
      <ProfileHeader displayName={user.displayName} email={user.email} status={user.status} />

      <Tabs defaultValue="profile">
        <TabsList className="grid grid-cols-4 w-full">
          <TabsTrigger value="profile">Profile</TabsTrigger>
          <TabsTrigger value="security">Security</TabsTrigger>
          <TabsTrigger value="address">Address</TabsTrigger>
          <TabsTrigger value="accounts">Accounts</TabsTrigger>
        </TabsList>

        <TabsContent value="profile">
          <ProfileTab user={user} />
        </TabsContent>

        <TabsContent value="security">
          <SecurityTab hasPassword={user.hasPassword} />
        </TabsContent>

        <TabsContent value="address">
          <AddressTab />
        </TabsContent>

        <TabsContent value="accounts">
          <ConnectedAccountsTab providers={user.providers} />
        </TabsContent>
      </Tabs>
    </div>
  );
}
