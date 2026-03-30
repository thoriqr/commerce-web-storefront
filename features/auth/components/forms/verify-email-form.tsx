"use client";

import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { useRouter } from "next/navigation";
import { Field, FieldError, FieldGroup, FieldLabel } from "@/components/ui/field";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { useVerifyEmail } from "../../hooks/use-verify-email";
import { handleFormError } from "@/shared/utils/form";
import { standardSchemaResolver } from "@hookform/resolvers/standard-schema";
import { Controller, useForm } from "react-hook-form";
import { usePasswordToggle } from "@/shared/hooks/use-password-toggle";
import { PasswordToggleButton } from "@/components/password-toggle-button";
import { VerifyEmailFormSchema, verifyEmailSchema } from "../schema";

type Props = {
  token: string;
};

export default function VerifyEmailForm({ token }: Props) {
  const router = useRouter();
  const verifyMutation = useVerifyEmail();
  const mutationIsPending = verifyMutation.isPending;
  const passwordToggle = usePasswordToggle();
  const confirmPasswordToggle = usePasswordToggle();

  const form = useForm<VerifyEmailFormSchema>({
    resolver: standardSchemaResolver(verifyEmailSchema),
    defaultValues: {
      displayName: "",
      password: "",
      confirmPassword: ""
    }
  });

  async function onSubmit(values: VerifyEmailFormSchema) {
    try {
      await verifyMutation.mutateAsync({ displayName: values.displayName, password: values.password, token });
      router.replace("/");
    } catch (err) {
      handleFormError(err, form);
    }
  }

  return (
    <Card>
      <CardHeader className="text-center">
        <CardTitle className="text-xl">Set up your account</CardTitle>
        <CardDescription>Choose a display name and password to finish creating your account.</CardDescription>
      </CardHeader>
      <CardContent>
        <form onSubmit={form.handleSubmit(onSubmit)}>
          <FieldGroup>
            <Controller
              name="displayName"
              control={form.control}
              render={({ field, fieldState }) => (
                <Field data-invalid={fieldState.invalid}>
                  <FieldLabel htmlFor={field.name}>Display Name</FieldLabel>
                  <Input {...field} id={field.name} aria-invalid={fieldState.invalid} placeholder="John Doe" disabled={mutationIsPending} />
                  {fieldState.invalid && <FieldError errors={[fieldState.error]} />}
                </Field>
              )}
            />

            <Controller
              name="password"
              control={form.control}
              render={({ field, fieldState }) => (
                <Field data-invalid={fieldState.invalid}>
                  <FieldLabel htmlFor={field.name}>Password</FieldLabel>

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

            <Controller
              name="confirmPassword"
              control={form.control}
              render={({ field, fieldState }) => (
                <Field data-invalid={fieldState.invalid}>
                  <FieldLabel htmlFor={field.name}>Confirm Password</FieldLabel>

                  <div className="relative">
                    <Input
                      {...field}
                      id={field.name}
                      aria-invalid={fieldState.invalid}
                      type={confirmPasswordToggle.inputType}
                      autoComplete="new-password"
                      disabled={mutationIsPending}
                    />

                    <PasswordToggleButton visible={confirmPasswordToggle.visible} onToggle={confirmPasswordToggle.toggle} />
                  </div>

                  {fieldState.invalid && <FieldError errors={[fieldState.error]} />}
                </Field>
              )}
            />

            {form.formState.errors.root && <p className="text-sm text-destructive">{form.formState.errors.root.message}</p>}

            <Field>
              <Button type="submit" disabled={mutationIsPending}>
                {mutationIsPending ? "Setting up..." : "Complete Setup"}
              </Button>
            </Field>
          </FieldGroup>
        </form>
      </CardContent>
    </Card>
  );
}
