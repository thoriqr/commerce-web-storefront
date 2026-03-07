"use client";

import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Field, FieldDescription, FieldGroup, FieldLabel } from "@/components/ui/field";
import { Input } from "@/components/ui/input";
import Link from "next/link";
import { useRouter } from "next/navigation";

import { useState } from "react";
import { usePasswordResetRequest } from "../../hooks/use-password-reset-request";
import { extractFieldError } from "../../utils/extract-field-error";

export default function ForgotPasswordForm() {
  const router = useRouter();
  const requestReset = usePasswordResetRequest();
  const [email, setEmail] = useState("");

  const handleSubmit = (e: React.SubmitEvent<HTMLFormElement>) => {
    e.preventDefault();

    requestReset.mutate(
      { email },
      {
        onSuccess: (result) => {
          if (result.ok) {
            router.replace("/forgot-password/success");
          }
        }
      }
    );
  };

  function handleEmailChange(value: string) {
    if (requestReset.isError || requestReset.data) {
      requestReset.reset();
    }
    setEmail(value);
  }

  const apiError = requestReset.data && !requestReset.data.ok ? requestReset.data.error : undefined;

  const emailError = extractFieldError(apiError, "email");

  const generalError = !emailError ? apiError?.message : undefined;

  return (
    <Card>
      <CardHeader className="text-center">
        <CardTitle className="text-xl">Reset Your Password</CardTitle>
        <CardDescription>Enter your email and we&apos;ll send you a link to reset your password.</CardDescription>
      </CardHeader>
      <CardContent>
        <form onSubmit={handleSubmit}>
          <FieldGroup>
            <Field>
              <FieldLabel htmlFor="email">Email</FieldLabel>
              <Input
                id="email"
                type="email"
                placeholder="m@example.com"
                autoComplete="username"
                required
                value={email}
                onChange={(e) => handleEmailChange(e.target.value)}
                disabled={requestReset.isPending}
              />

              {emailError && <p className="text-sm text-destructive mt-2">{emailError}</p>}

              {generalError && <p className="text-sm text-destructive text-center mt-2">{generalError}</p>}
            </Field>

            <Field>
              <Button type="submit" disabled={requestReset.isPending}>
                {requestReset.isPending ? "Sending..." : "Reset password"}
              </Button>
              <FieldDescription className="text-center">
                Back to <Link href="/login">Login</Link>
              </FieldDescription>
            </Field>
          </FieldGroup>
        </form>
      </CardContent>
    </Card>
  );
}
