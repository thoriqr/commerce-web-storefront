"use client";

import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { useProfile } from "../hooks/use-profile";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import Image from "next/image";
import { ProfileTabSkeleton } from "./skeletons/profile-tab-skeleton";
import ModalProfileForm from "./modal-profile-form";
import ModalChangePasswordForm from "./modal-change-password-form";

const providerMeta = {
  GOOGLE: {
    label: "Google",
    icon: "/google-icon-logo.svg"
  },
  GITHUB: {
    label: "GitHub",
    icon: "/github.svg"
  }
} as const;

export function ProfileTab() {
  const { data: user, isLoading, error } = useProfile();

  if (isLoading) return <ProfileTabSkeleton />;
  if (error) throw error;
  if (!user) return null;

  const displayName = user.displayName ?? "User";

  return (
    <Card>
      {/* HEADER */}
      <CardHeader className="space-y-2">
        <CardTitle className="flex items-center justify-between">
          <span>{displayName}</span>

          <Badge variant={user.status === "ACTIVE" ? "default" : "destructive"}>{user.status === "ACTIVE" ? "Verified" : "Suspended"}</Badge>
        </CardTitle>

        <p className="text-sm text-muted-foreground">{user.email}</p>
      </CardHeader>

      <CardContent className="space-y-6">
        {/* DISPLAY NAME */}
        <div className="space-y-2">
          <p className="text-sm text-muted-foreground">Display Name</p>

          <div className="flex items-center justify-between">
            <p className="font-medium">{displayName}</p>

            <ModalProfileForm initialValue={displayName} />
          </div>
        </div>

        {/* PASSWORD */}
        <div className="space-y-2">
          <p className="text-sm text-muted-foreground">Password</p>

          <div className="flex items-center justify-between">
            <p className="font-medium">{user.hasPassword ? "Password set" : "No password"}</p>

            <ModalChangePasswordForm hasPassword={user.hasPassword} />
          </div>
        </div>

        {/* DEFAULT ADDRESS */}
        <div className="space-y-2">
          <p className="text-sm text-muted-foreground">Default Address</p>

          {user.defaultAddress ? (
            <div className="border rounded-md p-3 space-y-2 text-sm">
              {/* HEADER */}
              <div className="flex items-center gap-2 flex-wrap">
                {user.defaultAddress.label && (
                  <Badge variant="secondary" className="font-normal">
                    {user.defaultAddress.label}
                  </Badge>
                )}

                <p className="font-medium">{user.defaultAddress.recipientName || "-"}</p>

                <Badge>Default</Badge>
              </div>

              {/* BODY */}
              <div className="text-muted-foreground space-y-1">
                <p>{user.defaultAddress.phone || "-"}</p>

                <p>
                  {[user.defaultAddress.addressLine, user.defaultAddress.districtName, user.defaultAddress.cityName, user.defaultAddress.provinceName]
                    .filter(Boolean)
                    .join(", ")}
                  {user.defaultAddress.postalCode ? ` ${user.defaultAddress.postalCode}` : ""}
                </p>
              </div>
            </div>
          ) : (
            <p className="text-sm text-muted-foreground">No default address set</p>
          )}
        </div>

        {/* PROVIDERS */}
        <div className="space-y-2">
          <p className="text-sm text-muted-foreground">Connected Accounts</p>

          {user.providers.length === 0 ? (
            <p className="text-sm text-muted-foreground">No connected accounts</p>
          ) : (
            <div className="space-y-2">
              {user.providers.map((p) => {
                const meta = providerMeta[p.provider];

                return (
                  <div key={p.provider} className="flex items-center justify-between border rounded-md p-3">
                    <div className="flex items-center gap-3">
                      <Image src={meta.icon} alt={meta.label} width={20} height={20} />

                      <div>
                        <p className="font-medium">{meta.label}</p>
                        <p className="text-sm text-muted-foreground">{p.providerEmail}</p>
                      </div>
                    </div>
                  </div>
                );
              })}
            </div>
          )}
        </div>
      </CardContent>
    </Card>
  );
}
