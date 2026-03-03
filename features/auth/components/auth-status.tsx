"use client";

import { useState } from "react";
import Link from "next/link";
import { User, LogOut } from "lucide-react";
import { useMe } from "../hooks/use-me";
import { Button } from "@/components/ui/button";
import { Skeleton } from "@/components/ui/skeleton";
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogDescription } from "@/components/ui/dialog";
import { useLogout } from "../hooks/use-logout";

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

function ProfileDialog({ user, variant }: { user: { displayName: string | null; email: string }; variant: "desktop" | "mobile" }) {
  const [open, setOpen] = useState(false);
  const logoutMutation = useLogout();

  const name = user.displayName?.trim() || user.email || "User";
  const initial = name.charAt(0).toUpperCase();

  async function handleLogout() {
    await logoutMutation.mutateAsync();
    setOpen(false);
  }

  return (
    <Dialog open={open} onOpenChange={setOpen}>
      {variant === "desktop" ? (
        <Button variant="ghost" size="icon" className="rounded-full" onClick={() => setOpen(true)}>
          <div className="flex h-8 w-8 items-center justify-center rounded-full bg-primary text-primary-foreground text-sm font-medium">
            {initial}
          </div>
        </Button>
      ) : (
        <Button variant="ghost" className="w-full justify-start gap-3 px-2" onClick={() => setOpen(true)}>
          <div className="flex h-7 w-7 items-center justify-center rounded-full bg-primary text-primary-foreground text-xs font-medium">
            {initial}
          </div>
          <span className="truncate text-sm font-medium">{name}</span>
        </Button>
      )}

      <DialogContent className="sm:max-w-sm">
        <DialogHeader>
          <DialogTitle>My Account</DialogTitle>
          <DialogDescription>Manage your account session</DialogDescription>
        </DialogHeader>

        <div className="space-y-4 mt-4">
          <div className="space-y-1">
            <p className="text-sm font-medium">{name}</p>
            <p className="text-sm text-muted-foreground">{user.email}</p>
          </div>

          <Button variant="destructive" className="w-full gap-2" onClick={handleLogout} disabled={logoutMutation.isPending}>
            <LogOut className="h-4 w-4" />
            {logoutMutation.isPending ? "Logging out..." : "Logout"}
          </Button>
        </div>
      </DialogContent>
    </Dialog>
  );
}
