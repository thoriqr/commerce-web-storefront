"use client";

import { Button } from "@/components/ui/button";
import { DialogDescription, DialogHeader, DialogTitle } from "@/components/ui/dialog";
import { Field, FieldGroup, FieldLabel } from "@/components/ui/field";
import { Input } from "@/components/ui/input";
import { useState } from "react";
import { useSetPassword } from "../hooks/use-set-password";
import { extractFieldError } from "../utils/extract-field-error";

type Props = {
  onClose: () => void;
};

export default function SetPasswordForm({ onClose }: Props) {
  const setPass = useSetPassword();

  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [localError, setLocalError] = useState("");
  const [success, setSuccess] = useState(false);

  async function handleSubmit(e: React.SubmitEvent<HTMLFormElement>) {
    e.preventDefault();

    if (password !== confirmPassword) {
      setLocalError("Passwords do not match");
      return;
    }

    const result = await setPass.mutateAsync({
      password
    });

    if (!result.ok) return;

    setSuccess(true);
  }

  function handlePasswordChange(value: string) {
    if (setPass.isError || setPass.data) {
      setPass.reset();
    }
    setPassword(value);
  }

  const apiError = setPass.data && !setPass.data.ok ? setPass.data.error : undefined;

  const passwordError = extractFieldError(apiError, "password");

  const generalError = !passwordError ? apiError?.message : undefined;

  if (success) {
    return (
      <>
        <DialogHeader>
          <DialogTitle>Password set</DialogTitle>
          <DialogDescription>Your password has been set successfully. You can now login using your email and password.</DialogDescription>
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
        <DialogTitle>Set a password</DialogTitle>
        <DialogDescription>Create a password so you can sign in with your email and password.</DialogDescription>
      </DialogHeader>
      <form onSubmit={handleSubmit}>
        <FieldGroup>
          <Field>
            <FieldLabel htmlFor="password">Password</FieldLabel>
            <Input
              id="password"
              type="password"
              autoComplete="new-password"
              required
              value={password}
              onChange={(e) => handlePasswordChange(e.target.value)}
              disabled={setPass.isPending}
            />

            {passwordError && <p className="text-sm text-destructive mt-2">{passwordError}</p>}
          </Field>

          <Field>
            <FieldLabel htmlFor="confirm-password">Confirm Password</FieldLabel>
            <Input
              id="confirm-password"
              type="password"
              autoComplete="new-password"
              required
              value={confirmPassword}
              onChange={(e) => {
                if (setPass.isError || setPass.data) {
                  setLocalError("");
                }
                setConfirmPassword(e.target.value);
              }}
              disabled={setPass.isPending}
            />

            {localError && <p className="text-sm text-destructive mt-2">{localError}</p>}
            {generalError && <p className="text-sm text-destructive text-center mt-2">{generalError}</p>}
          </Field>

          <Field>
            <Button type="submit" disabled={setPass.isPending}>
              Set Password
            </Button>
          </Field>
        </FieldGroup>
      </form>
    </>
  );
}
