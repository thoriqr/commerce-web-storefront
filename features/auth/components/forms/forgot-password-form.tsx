"use client";

import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Field, FieldDescription, FieldError, FieldGroup, FieldLabel } from "@/components/ui/field";
import { Input } from "@/components/ui/input";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { usePasswordResetRequest } from "../../hooks/use-password-reset-request";
import { standardSchemaResolver } from "@hookform/resolvers/standard-schema";
import { Controller, useForm } from "react-hook-form";
import { EmailFormSchema, emailSchema } from "../schema";
import { handleFormError } from "@/shared/utils/form";

export default function ForgotPasswordForm() {
  const router = useRouter();
  const resetMutation = usePasswordResetRequest();
  const mutationIsPending = resetMutation.isPending;
  const form = useForm<EmailFormSchema>({
    resolver: standardSchemaResolver(emailSchema),
    defaultValues: {
      email: ""
    }
  });

  async function onSubmit(values: EmailFormSchema) {
    try {
      await resetMutation.mutateAsync(values);
      router.replace("/forgot-password/success");
    } catch (err) {
      handleFormError(err, form);
    }
  }

  return (
    <Card>
      <CardHeader className="text-center">
        <CardTitle className="text-xl">Reset Your Password</CardTitle>
        <CardDescription>Enter your email and we&apos;ll send you a link to reset your password.</CardDescription>
      </CardHeader>
      <CardContent>
        <form onSubmit={form.handleSubmit(onSubmit)}>
          <FieldGroup>
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

            {form.formState.errors.root && <p className="text-sm text-destructive">{form.formState.errors.root.message}</p>}

            <Field>
              <Button type="submit" disabled={mutationIsPending}>
                {mutationIsPending ? "Sending..." : "Reset password"}
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
