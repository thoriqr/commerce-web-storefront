"use client";

import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Field, FieldDescription, FieldError, FieldGroup, FieldLabel } from "@/components/ui/field";
import { Input } from "@/components/ui/input";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { useRegister } from "../../hooks/use-register";
import { standardSchemaResolver } from "@hookform/resolvers/standard-schema";
import { Controller, useForm } from "react-hook-form";
import { EmailFormSchema, emailSchema } from "../schema";
import { handleFormError } from "@/shared/utils/form";

export default function RegisterForm() {
  const router = useRouter();
  const registerMutation = useRegister();
  const mutationIsPending = registerMutation.isPending;

  const form = useForm<EmailFormSchema>({
    resolver: standardSchemaResolver(emailSchema),
    defaultValues: {
      email: ""
    }
  });

  async function onSubmit(values: EmailFormSchema) {
    try {
      await registerMutation.mutateAsync(values);
      router.replace("/register/success");
    } catch (err) {
      handleFormError(err, form);
    }
  }

  return (
    <Card>
      <CardHeader className="text-center">
        <CardTitle className="text-xl">Create your account</CardTitle>
        <CardDescription>Enter your email below to create your account</CardDescription>
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
                {mutationIsPending ? "Creating..." : "Create Account"}
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
