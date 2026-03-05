"use client";

import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Field, FieldDescription, FieldGroup, FieldLabel, FieldSeparator } from "@/components/ui/field";
import { Input } from "@/components/ui/input";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { useState } from "react";
import { useLogin } from "../hooks/use-login";
import { extractFieldError } from "../utils/extract-field-error";

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

    router.push("/");
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
              <Button variant="outline" type="button" disabled={loginMutation.isPending}>
                <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24">
                  <path
                    d="M12.48 10.92v3.28h7.84c-.24 1.84-.853 3.187-1.787 4.133-1.147 1.147-2.933 2.4-6.053 2.4-4.827 0-8.6-3.893-8.6-8.72s3.773-8.72 8.6-8.72c2.6 0 4.507 1.027 5.907 2.347l2.307-2.307C18.747 1.44 16.133 0 12.48 0 5.867 0 .307 5.387.307 12s5.56 12 12.173 12c3.573 0 6.267-1.173 8.373-3.36 2.16-2.16 2.84-5.213 2.84-7.667 0-.76-.053-1.467-.173-2.053H12.48z"
                    fill="currentColor"
                  />
                </svg>
                Login with Google
              </Button>
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
