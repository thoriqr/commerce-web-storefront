"use client";

import { useRouter } from "next/navigation";
import { useState } from "react";

import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Field, FieldGroup, FieldLabel } from "@/components/ui/field";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { useResetPassword } from "../../hooks/use-reset-password";
import { extractFieldError } from "../../../../shared/utils/extract-field-error";

type Props = {
  token: string;
};

export default function ResetPasswordForm({ token }: Props) {
  const router = useRouter();
  const resetPassword = useResetPassword();

  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [localError, setLocalError] = useState("");

  async function handleSubmit(e: React.SubmitEvent<HTMLFormElement>) {
    e.preventDefault();

    if (password !== confirmPassword) {
      setLocalError("Passwords do not match");
      return;
    }

    const result = await resetPassword.mutateAsync({
      token,
      password
    });

    if (!result.ok) return;

    router.replace("/");
  }

  function handlePasswordChange(value: string) {
    if (resetPassword.isError || resetPassword.data) {
      resetPassword.reset();
    }
    setPassword(value);
  }

  const apiError = resetPassword.data && !resetPassword.data.ok ? resetPassword.data.error : undefined;

  const passwordError = extractFieldError(apiError, "password");
  const tokenError = extractFieldError(apiError, "token");

  const generalError = !passwordError && !tokenError ? apiError?.message : undefined;

  return (
    <Card>
      <CardHeader className="text-center">
        <CardTitle className="text-xl">Set a new password</CardTitle>
        <CardDescription>Enter a new password for your account.</CardDescription>
      </CardHeader>
      <CardContent>
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
                disabled={resetPassword.isPending}
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
                  if (resetPassword.isError || resetPassword.data) {
                    setLocalError("");
                  }
                  setConfirmPassword(e.target.value);
                }}
                disabled={resetPassword.isPending}
              />

              {localError && <p className="text-sm text-destructive mt-2">{localError}</p>}
              {tokenError && <p className="text-sm text-destructive mt-2">{tokenError}</p>}
              {generalError && <p className="text-sm text-destructive text-center mt-2">{generalError}</p>}
            </Field>

            <Field>
              <Button type="submit" disabled={resetPassword.isPending}>
                {resetPassword.isPending ? "Resetting..." : "Reset Password"}
              </Button>
            </Field>
          </FieldGroup>
        </form>
      </CardContent>
    </Card>
  );
}
