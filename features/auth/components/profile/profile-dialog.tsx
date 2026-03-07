"use client";

import { MeResponse } from "@/lib/types";
import { useState } from "react";
import { useLogout } from "../../hooks/use-logout";
import { Dialog, DialogContent, DialogDescription, DialogHeader, DialogTitle } from "@/components/ui/dialog";
import { AccountInfo } from "./account-info";
import ConnectedProviders from "./connected-providers";
import AccountActions from "./account-actions";
import LogoutButton from "./logout-button";
import { AccountFormDialog } from "../account-form-dialog";
import ChangeEmailForm from "../forms/change-email-form";
import ChangePasswordForm from "../forms/change-password-form";
import SetPasswordForm from "../forms/set-password-form";
import AccountAvatarButton from "./account-avatar-button";

export default function ProfileDialog({ user, variant }: { user: MeResponse; variant: "desktop" | "mobile" }) {
  const [open, setOpen] = useState(false);
  const [changeEmailOpen, setChangeEmailOpen] = useState(false);
  const [changePasswordOpen, setChangePasswordOpen] = useState(false);
  const [newPasswordOpen, setNewPasswordOpen] = useState(false);
  const logoutMutation = useLogout();

  const name = user.displayName?.trim() || user.email || "User";
  const initial = name.charAt(0).toUpperCase();

  async function handleLogout() {
    await logoutMutation.mutateAsync();
    setOpen(false);
  }

  return (
    <>
      <>
        <Dialog open={open} onOpenChange={setOpen}>
          <AccountAvatarButton variant={variant} initial={initial} name={name} onClick={() => setOpen(true)} />

          <DialogContent className="sm:max-w-sm">
            <DialogHeader>
              <DialogTitle>My Account</DialogTitle>
              <DialogDescription>Manage your account settings</DialogDescription>
            </DialogHeader>

            <div className="space-y-5">
              <AccountInfo name={name} email={user.email} />

              <ConnectedProviders providers={user.providers} />

              <AccountActions
                hasPassword={user.hasPassword}
                onChangeEmail={() => {
                  setOpen(false);
                  setChangeEmailOpen(true);
                }}
                onChangePassword={() => {
                  setOpen(false);
                  setChangePasswordOpen(true);
                }}
                onSetPassword={() => {
                  setOpen(false);
                  setNewPasswordOpen(true);
                }}
              />

              <LogoutButton isPending={logoutMutation.isPending} onLogout={handleLogout} />
            </div>
          </DialogContent>
        </Dialog>

        {/* dialogs */}
        <AccountFormDialog open={changeEmailOpen} onOpenChange={setChangeEmailOpen}>
          <ChangeEmailForm currentEmail={user.email} onClose={() => setChangeEmailOpen(false)} />
        </AccountFormDialog>

        <AccountFormDialog open={changePasswordOpen} onOpenChange={setChangePasswordOpen}>
          <ChangePasswordForm onClose={() => setChangePasswordOpen(false)} />
        </AccountFormDialog>

        <AccountFormDialog open={newPasswordOpen} onOpenChange={setNewPasswordOpen}>
          <SetPasswordForm onClose={() => setNewPasswordOpen(false)} />
        </AccountFormDialog>
      </>
    </>
  );
}
