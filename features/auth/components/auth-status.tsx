"use client";

import Link from "next/link";
import { User } from "lucide-react";
import { useMe } from "../hooks/use-me";
import { Button } from "@/components/ui/button";
import { Skeleton } from "@/components/ui/skeleton";
import ProfileDialog from "./profile/profile-dialog";

type Props = {
  variant: "desktop" | "mobile";
};

export function AuthStatus({ variant }: Props) {
  const { data: user, isLoading } = useMe();

  if (isLoading) {
    return variant === "desktop" ? <Skeleton className="h-9 w-9 rounded-full" /> : <Skeleton className="h-9 w-full rounded-md" />;
  }

  if (!user) {
    return variant === "desktop" ? (
      <Link href="/login">
        <Button variant="ghost" size="icon">
          <User className="h-5 w-5" />
        </Button>
      </Link>
    ) : (
      <Link href="/login">
        <Button variant="ghost" className="w-full justify-start gap-3 px-2">
          <User className="h-4 w-4" />
          <span>Account</span>
        </Button>
      </Link>
    );
  }

  return <ProfileDialog user={user} variant={variant} />;
}
