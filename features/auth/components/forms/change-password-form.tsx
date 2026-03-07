"use client";

import { Button } from "@/components/ui/button";
import { Field, FieldGroup, FieldLabel } from "@/components/ui/field";
import { Input } from "@/components/ui/input";
import { useState } from "react";
import { DialogDescription, DialogHeader, DialogTitle } from "@/components/ui/dialog";
import { extractFieldError } from "../../utils/extract-field-error";
import { useChangePassword } from "../../hooks/use-change-password";

type Props = {
  onClose: () => void;
};

export default function ChangePasswordForm({ onClose }: Props) {
  const changePassword = useChangePassword();

  const [currentPassword, setCurrentPassword] = useState("");
  const [newPassword, setNewPassword] = useState("");
  const [confirmNewPassword, setConfirmNewPassword] = useState("");
  const [localError, setLocalError] = useState("");
  const [success, setSuccess] = useState(false);

  async function handleSubmit(e: React.SubmitEvent<HTMLFormElement>) {
    e.preventDefault();

    if (newPassword !== confirmNewPassword) {
      setLocalError("Confirm New Password do not match");
      return;
    }

    const result = await changePassword.mutateAsync({
      currentPassword,
      newPassword
    });

    if (!result.ok) return;

    setSuccess(true);
  }

  const handleCurrentPassword = (value: string) => {
    if (changePassword.isError || changePassword.data) {
      changePassword.reset();
    }
    setCurrentPassword(value);
  };

  function handleNewPasswordChange(value: string) {
    if (changePassword.isError || changePassword.data) {
      changePassword.reset();
    }
    setNewPassword(value);
  }

  const apiError = changePassword.data && !changePassword.data.ok ? changePassword.data.error : undefined;

  const newPasswordError = extractFieldError(apiError, "newPassword");
  const currentPasswordError = extractFieldError(apiError, "currentPassword");

  const generalError = !newPasswordError && !currentPasswordError ? apiError?.message : undefined;

  if (success) {
    return (
      <>
        <DialogHeader>
          <DialogTitle>Password updated</DialogTitle>
          <DialogDescription>Your password has been updated successfully.</DialogDescription>
        </DialogHeader>

        <Button
          className="w-full"
          onClick={() => {
            onClose();
            setSuccess(false);
          }}
        >
          Close
        </Button>
      </>
    );
  }

  return (
    <>
      <DialogHeader>
        <DialogTitle>Change password</DialogTitle>
        <DialogDescription>Enter your new password below.</DialogDescription>
      </DialogHeader>
      <form onSubmit={handleSubmit}>
        <FieldGroup>
          <Field>
            <FieldLabel htmlFor="current-password">Current Password</FieldLabel>
            <Input
              id="current-password"
              type="password"
              autoComplete="current-password"
              required
              value={currentPassword}
              onChange={(e) => handleCurrentPassword(e.target.value)}
              disabled={changePassword.isPending}
            />

            {currentPasswordError && <p className="text-sm text-destructive mt-2">{currentPasswordError}</p>}
          </Field>

          <Field>
            <FieldLabel htmlFor="new-password">New Password</FieldLabel>
            <Input
              id="new-password"
              type="password"
              autoComplete="new-password"
              required
              value={newPassword}
              onChange={(e) => handleNewPasswordChange(e.target.value)}
              disabled={changePassword.isPending}
            />

            {newPasswordError && <p className="text-sm text-destructive mt-2">{newPasswordError}</p>}
          </Field>

          <Field>
            <FieldLabel htmlFor="confirm-new-password">Confirm New Password</FieldLabel>
            <Input
              id="confirm-new-password"
              type="password"
              autoComplete="new-password"
              required
              value={confirmNewPassword}
              onChange={(e) => {
                if (changePassword.isError || changePassword.data) {
                  setLocalError("");
                }
                setConfirmNewPassword(e.target.value);
              }}
              disabled={changePassword.isPending}
            />

            {localError && <p className="text-sm text-destructive mt-2">{localError}</p>}
            {generalError && <p className="text-sm text-destructive text-center mt-2">{generalError}</p>}
          </Field>

          <Field>
            <Button type="submit" disabled={changePassword.isPending}>
              {changePassword.isPending ? "Changing..." : "Change Password"}
            </Button>
          </Field>
        </FieldGroup>
      </form>
    </>
  );
}
