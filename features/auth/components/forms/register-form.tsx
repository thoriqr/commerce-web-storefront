"use client";

import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Field, FieldDescription, FieldError, FieldGroup, FieldLabel, FieldSeparator } from "@/components/ui/field";
import { Input } from "@/components/ui/input";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { useRegister } from "../../hooks/use-register";
import { standardSchemaResolver } from "@hookform/resolvers/standard-schema";
import { Controller, useForm } from "react-hook-form";
import { handleFormError } from "@/shared/utils/form";
import { EmailFormSchema, emailSchema } from "../../schema";
import { useEffect, useState } from "react";
import GoogleLoginButton from "../google-login-button";
import { useMe } from "../../hooks/use-me";
import AuthSessionLoading from "../auth-session-loading";

export default function RegisterForm() {
  const router = useRouter();
  const [isLocked, setIsLocked] = useState(false);

  const { data: user, isLoading: isCheckingSession } = useMe();

  const form = useForm<EmailFormSchema>({
    resolver: standardSchemaResolver(emailSchema),
    defaultValues: {
      email: ""
    }
  });

  const registerMutation = useRegister({
    onMutate() {
      setIsLocked(true);
    },
    onError: (err) => {
      setIsLocked(false);
      handleFormError(err, form);
    },
    onSuccess: () => {
      router.replace("/register/success");
    }
  });

  const mutationIsPending = registerMutation.isPending;

  useEffect(() => {
    if (user) {
      router.replace("/");
    }
  }, [user, router]);

  if (isCheckingSession || user) {
    return <AuthSessionLoading />;
  }

  function onSubmit(values: EmailFormSchema) {
    registerMutation.mutate(values);
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
            <Field>
              <GoogleLoginButton isLocked={isLocked} onLockChange={setIsLocked} />
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
                    disabled={mutationIsPending || isLocked}
                  />
                  {fieldState.invalid && <FieldError errors={[fieldState.error]} />}
                </Field>
              )}
            />

            {form.formState.errors.root && <p className="text-sm text-destructive">{form.formState.errors.root.message}</p>}

            <Field>
              <Button type="submit" disabled={mutationIsPending || isLocked}>
                {mutationIsPending ? "Creating Account..." : "Create Account"}
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
