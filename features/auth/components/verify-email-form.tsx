"use client";

import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { useRouter } from "next/navigation";
import { useVerifyEmail } from "../hooks/use-verify-email";
import { useState } from "react";
import { extractFieldError } from "../utils/extract-field-error";
import { Field, FieldGroup, FieldLabel } from "@/components/ui/field";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";

type Props = {
  token: string;
};

export default function VerifyEmailForm({ token }: Props) {
  const router = useRouter();
  const verifyMutation = useVerifyEmail();

  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [displayName, setDisplayName] = useState("");
  const [localError, setLocalError] = useState("");

  async function handleSubmit(e: React.SubmitEvent<HTMLFormElement>) {
    e.preventDefault();

    if (password !== confirmPassword) {
      setLocalError("Passwords do not match");
      return;
    }

    const result = await verifyMutation.mutateAsync({
      token,
      displayName,
      password
    });

    if (!result.ok) return;

    router.push("/");
  }

  function handleNameChange(value: string) {
    if (verifyMutation.isError || verifyMutation.data) {
      verifyMutation.reset();
    }
    setDisplayName(value);
  }

  function handlePasswordChange(value: string) {
    if (verifyMutation.isError || verifyMutation.data) {
      verifyMutation.reset();
    }
    setPassword(value);
  }

  const apiError = verifyMutation.data && !verifyMutation.data.ok ? verifyMutation.data.error : undefined;

  const nameError = extractFieldError(apiError, "displayName");
  const passwordError = extractFieldError(apiError, "password");
  const tokenError = extractFieldError(apiError, "token");

  const generalError = !passwordError || !nameError || !tokenError ? apiError?.message : undefined;

  return (
    <Card>
      <CardHeader className="text-center">
        <CardTitle className="text-xl">Set up your account</CardTitle>
        <CardDescription>Choose a display name and password to finish creating your account.</CardDescription>
      </CardHeader>
      <CardContent>
        <form onSubmit={handleSubmit}>
          <FieldGroup>
            <Field>
              <FieldLabel htmlFor="display-name">Display Name</FieldLabel>
              <Input
                id="display-name"
                type="text"
                placeholder="John Doe"
                required
                value={displayName}
                onChange={(e) => handleNameChange(e.target.value)}
                disabled={verifyMutation.isPending}
              />

              {nameError && <p className="text-sm text-destructive mt-2">{nameError}</p>}
            </Field>

            <Field>
              <FieldLabel htmlFor="password">Password</FieldLabel>
              <Input
                id="password"
                type="password"
                autoComplete="new-password"
                required
                value={password}
                onChange={(e) => handlePasswordChange(e.target.value)}
                disabled={verifyMutation.isPending}
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
                  if (verifyMutation.isError || verifyMutation.data) {
                    setLocalError("");
                  }
                  setConfirmPassword(e.target.value);
                }}
                disabled={verifyMutation.isPending}
              />

              {localError && <p className="text-sm text-destructive mt-2">{localError}</p>}
              {tokenError && <p className="text-sm text-destructive mt-2">{tokenError}</p>}
              {generalError && <p className="text-sm text-destructive text-center mt-2">{generalError}</p>}
            </Field>

            <Field>
              <Button type="submit" disabled={verifyMutation.isPending}>
                {verifyMutation.isPending ? "Setting up..." : "Complete Setup"}
              </Button>
            </Field>
          </FieldGroup>
        </form>
      </CardContent>
    </Card>
  );
}
