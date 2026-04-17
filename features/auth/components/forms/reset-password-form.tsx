"use client";

import { useRouter } from "next/navigation";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Field, FieldError, FieldGroup, FieldLabel } from "@/components/ui/field";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { useResetPassword } from "../../hooks/use-reset-password";
import { standardSchemaResolver } from "@hookform/resolvers/standard-schema";
import { Controller, useForm } from "react-hook-form";
import { usePasswordToggle } from "@/shared/hooks/use-password-toggle";
import { PasswordToggleButton } from "@/components/password-toggle-button";
import { handleFormError } from "@/shared/utils/form";
import { ResetPasswordFormSchema, resetPasswordSchema } from "../../schema";

type Props = {
  token: string;
};

export default function ResetPasswordForm({ token }: Props) {
  const router = useRouter();
  const passwordToggle = usePasswordToggle();
  const confirmPasswordToggle = usePasswordToggle();

  const form = useForm<ResetPasswordFormSchema>({
    resolver: standardSchemaResolver(resetPasswordSchema),
    defaultValues: {
      password: "",
      confirmPassword: ""
    }
  });

  const resetMutation = useResetPassword({
    onError: (err) => {
      handleFormError(err, form);
    },
    onSuccess: () => {
      router.replace("/");
    }
  });

  const mutationIsPending = resetMutation.isPending;

  function onSubmit(values: ResetPasswordFormSchema) {
    resetMutation.mutate({ password: values.password, token });
  }

  return (
    <Card>
      <CardHeader className="text-center">
        <CardTitle className="text-xl">Set a new password</CardTitle>
        <CardDescription>Enter a new password for your account.</CardDescription>
      </CardHeader>
      <CardContent>
        <form onSubmit={form.handleSubmit(onSubmit)}>
          <FieldGroup>
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
                {mutationIsPending ? "Resetting..." : "Reset Password"}
              </Button>
            </Field>
          </FieldGroup>
        </form>
      </CardContent>
    </Card>
  );
}
