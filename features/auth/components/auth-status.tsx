"use client";

import { useState } from "react";
import Link from "next/link";
import { User, LogOut } from "lucide-react";
import { useMe } from "../hooks/use-me";
import { Button } from "@/components/ui/button";
import { Skeleton } from "@/components/ui/skeleton";
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogDescription } from "@/components/ui/dialog";
import { useLogout } from "../hooks/use-logout";
import { AccountFormDialog } from "./account-form-dialog";
import ChangeEmailForm from "./change-email-form";
import ChangePasswordForm from "./change-password-form";

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
  const [changeEmailOpen, setChangeEmailOpen] = useState(false);
  const [changePasswordOpen, setChangePasswordOpen] = useState(false);
  const logoutMutation = useLogout();

  const name = user.displayName?.trim() || user.email || "User";
  const initial = name.charAt(0).toUpperCase();

  async function handleLogout() {
    await logoutMutation.mutateAsync();
    setOpen(false);
  }

  function handleChangeEmail() {
    setOpen(false);
    setChangePasswordOpen(false);
    setChangeEmailOpen(true);
    // nanti kita buka dialog change email
  }

  function handleChangePassword() {
    setOpen(false);
    setChangeEmailOpen(false);
    setChangePasswordOpen(true);
    // nanti kita buka dialog change password
  }

  return (
    <>
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
            <DialogDescription>Manage your account settings</DialogDescription>
          </DialogHeader>

          <div className="space-y-4 mt-4">
            {/* User info */}
            <div className="space-y-1">
              <p className="text-sm font-medium">{name}</p>
              <p className="text-sm text-muted-foreground">{user.email}</p>
            </div>

            {/* Account actions */}
            <div className="space-y-2">
              <Button variant="outline" className="w-full justify-start" onClick={handleChangeEmail}>
                Change Email
              </Button>

              <Button variant="outline" className="w-full justify-start" onClick={handleChangePassword}>
                Change Password
              </Button>
            </div>

            {/* Logout */}
            <Button variant="destructive" className="w-full gap-2" onClick={handleLogout} disabled={logoutMutation.isPending}>
              <LogOut className="h-4 w-4" />
              {logoutMutation.isPending ? "Logging out..." : "Logout"}
            </Button>
          </div>
        </DialogContent>
      </Dialog>

      <AccountFormDialog
        open={changeEmailOpen}
        onOpenChange={setChangeEmailOpen}
        title="Change email"
        description="Enter a new email address. We'll send a confirmation link."
      >
        <ChangeEmailForm />
      </AccountFormDialog>

      <AccountFormDialog
        open={changePasswordOpen}
        onOpenChange={setChangePasswordOpen}
        title="Change password"
        description="Enter your new password below."
      >
        <ChangePasswordForm />
      </AccountFormDialog>
    </>
  );
}
