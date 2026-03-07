"use client";

import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Field, FieldDescription, FieldGroup, FieldLabel } from "@/components/ui/field";
import { Input } from "@/components/ui/input";
import Link from "next/link";
import { useRouter } from "next/navigation";

import { useState } from "react";
import { useRegister } from "../../hooks/use-register";
import { extractFieldError } from "../../utils/extract-field-error";

export default function RegisterForm() {
  const router = useRouter();
  const register = useRegister();
  const [email, setEmail] = useState("");

  const handleSubmit = (e: React.SubmitEvent<HTMLFormElement>) => {
    e.preventDefault();

    register.mutate(
      { email },
      {
        onSuccess: (result) => {
          if (result.ok) {
            router.push("/register/success");
          }
        }
      }
    );
  };

  function handleEmailChange(value: string) {
    if (register.isError || register.data) {
      register.reset();
    }
    setEmail(value);
  }

  const apiError = register.data && !register.data.ok ? register.data.error : undefined;

  const emailError = extractFieldError(apiError, "email");

  const generalError = !emailError ? apiError?.message : undefined;

  return (
    <Card>
      <CardHeader className="text-center">
        <CardTitle className="text-xl">Create your account</CardTitle>
        <CardDescription>Enter your email below to create your account</CardDescription>
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
                disabled={register.isPending}
              />

              {emailError && <p className="text-sm text-destructive mt-2">{emailError}</p>}

              {generalError && <p className="text-sm text-destructive text-center mt-2">{generalError}</p>}
            </Field>

            <Field>
              <Button type="submit" disabled={register.isPending}>
                {register.isPending ? "Creating..." : "Create Account"}
              </Button>
              <FieldDescription className="text-center">
                Already have an account? <Link href="/login">Login</Link>
              </FieldDescription>
            </Field>
          </FieldGroup>
        </form>
      </CardContent>
    </Card>
  );
}
