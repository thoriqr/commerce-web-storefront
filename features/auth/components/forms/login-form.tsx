"use client";

import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Field, FieldDescription, FieldError, FieldGroup, FieldLabel, FieldSeparator } from "@/components/ui/field";
import { Input } from "@/components/ui/input";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { useLogin } from "../../hooks/use-login";
import GoogleLoginButton from "../google-login-button";
import { Controller, useForm } from "react-hook-form";
import { LoginFormSchema, loginSchema } from "../schema";
import { standardSchemaResolver } from "@hookform/resolvers/standard-schema";
import { handleFormError } from "@/shared/utils/form";
import { usePasswordToggle } from "@/shared/hooks/use-password-toggle";
import { PasswordToggleButton } from "@/components/password-toggle-button";

export default function LoginForm() {
  const router = useRouter();
  const loginMutation = useLogin();
  const mutationIsPending = loginMutation.isPending;
  const passwordToggle = usePasswordToggle();

  const form = useForm<LoginFormSchema>({
    resolver: standardSchemaResolver(loginSchema),
    defaultValues: {
      email: "testuser1@example.com",
      password: "asdfasdf"
    }
  });

  async function onSubmit(values: LoginFormSchema) {
    try {
      await loginMutation.mutateAsync(values);
      router.replace("/");
    } catch (err) {
      handleFormError(err, form);
    }
  }

  return (
    <Card>
      <CardHeader className="text-center">
        <CardTitle className="text-xl">Welcome back</CardTitle>
        <CardDescription>Login with your account</CardDescription>
      </CardHeader>
      <CardContent>
        <form onSubmit={form.handleSubmit(onSubmit)}>
          <FieldGroup>
            <Field>
              <GoogleLoginButton />
            </Field>
            <FieldSeparator className="*:data-[slot=field-separator-content]:bg-card">Or continue with</FieldSeparator>

            <Controller
              name="email"
              control={form.control}
              render={({ field, fieldState }) => (
                <Field data-invalid={fieldState.invalid}>
                  <FieldLabel htmlFor={field.name}>Email</FieldLabel>
                  <Input
                    {...field}
                    id={field.name}
                    aria-invalid={fieldState.invalid}
                    placeholder="me@example.com"
                    autoComplete="username"
                    disabled={mutationIsPending}
                  />
                  {fieldState.invalid && <FieldError errors={[fieldState.error]} />}
                </Field>
              )}
            />

            <Controller
              name="password"
              control={form.control}
              render={({ field, fieldState }) => (
                <Field data-invalid={fieldState.invalid}>
                  <div className="flex justify-between">
                    <FieldLabel htmlFor={field.name}>Password</FieldLabel>
                    <Link href="/forgot-password" className="text-sm text-primary underline-offset-2 hover:underline">
                      Forgot your password?
                    </Link>
                  </div>

                  <div className="relative">
                    <Input
                      {...field}
                      id={field.name}
                      aria-invalid={fieldState.invalid}
                      type={passwordToggle.inputType}
                      autoComplete="new-password"
                      disabled={mutationIsPending}
                    />

                    <PasswordToggleButton visible={passwordToggle.visible} onToggle={passwordToggle.toggle} />
                  </div>

                  {fieldState.invalid && <FieldError errors={[fieldState.error]} />}
                </Field>
              )}
            />

            {form.formState.errors.root && <p className="text-sm text-destructive">{form.formState.errors.root.message}</p>}

            <Field>
              <Button type="submit" disabled={mutationIsPending} className="w-full">
                {mutationIsPending ? "Logging in..." : "Login"}
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
