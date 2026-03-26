"use client";

import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Field, FieldDescription, FieldGroup, FieldLabel, FieldSeparator } from "@/components/ui/field";
import { Input } from "@/components/ui/input";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { useState } from "react";
import { useLogin } from "../../hooks/use-login";
import { extractFieldError } from "../../../../shared/utils/extract-field-error";
import GoogleLoginButton from "../google-login-button";

export default function LoginForm() {
  const router = useRouter();
  const loginMutation = useLogin();

  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  async function handleSubmit(e: React.SubmitEvent<HTMLFormElement>) {
    e.preventDefault();

    const result = await loginMutation.mutateAsync({
      email,
      password
    });

    if (!result.ok) return;

    router.replace("/");
  }

  function handleEmailChange(value: string) {
    if (loginMutation.isError || loginMutation.data) {
      loginMutation.reset();
    }
    setEmail(value);
  }

  function handlePasswordChange(value: string) {
    if (loginMutation.isError || loginMutation.data) {
      loginMutation.reset();
    }
    setPassword(value);
  }

  const apiError = loginMutation.data && !loginMutation.data.ok ? loginMutation.data.error : undefined;

  const passwordError = extractFieldError(apiError, "password");

  const generalError = !passwordError ? apiError?.message : undefined;

  return (
    <Card>
      <CardHeader className="text-center">
        <CardTitle className="text-xl">Welcome back</CardTitle>
        <CardDescription>Login with your account</CardDescription>
      </CardHeader>
      <CardContent>
        <form onSubmit={handleSubmit}>
          <FieldGroup>
            <Field>
              <GoogleLoginButton />
            </Field>
            <FieldSeparator className="*:data-[slot=field-separator-content]:bg-card">Or continue with</FieldSeparator>
            <Field>
              <FieldLabel htmlFor="email">Email</FieldLabel>
              <Input
                id="email"
                type="email"
                autoComplete="username"
                placeholder="m@example.com"
                required
                value={email}
                onChange={(e) => handleEmailChange(e.target.value)}
                disabled={loginMutation.isPending}
              />
            </Field>
            <Field>
              <div className="flex items-center">
                <FieldLabel htmlFor="password">Password</FieldLabel>
                <Link href="/forgot-password" className="ml-auto text-sm underline-offset-4 hover:underline">
                  Forgot your password?
                </Link>
              </div>
              <Input
                id="password"
                type="password"
                autoComplete="current-password"
                required
                value={password}
                onChange={(e) => handlePasswordChange(e.target.value)}
                disabled={loginMutation.isPending}
              />

              {/* Error Message */}

              {passwordError && <p className="text-sm text-destructive mt-2">{passwordError}</p>}

              {generalError && <p className="text-sm text-destructive text-center mt-2">{generalError}</p>}
            </Field>
            <Field>
              <Button type="submit" disabled={loginMutation.isPending} className="w-full">
                {loginMutation.isPending ? "Logging in..." : "Login"}
              </Button>
              <FieldDescription className="text-center">
                Don&apos;t have an account? <Link href="/register">Register</Link>
              </FieldDescription>
            </Field>
          </FieldGroup>
        </form>
      </CardContent>
    </Card>
  );
}
