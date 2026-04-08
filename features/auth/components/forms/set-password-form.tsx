"use client";

import { Button } from "@/components/ui/button";
import { DialogDescription, DialogHeader, DialogTitle } from "@/components/ui/dialog";
import { Field, FieldError, FieldGroup, FieldLabel } from "@/components/ui/field";
import { Input } from "@/components/ui/input";
import { useState } from "react";
import { useSetPassword } from "../../hooks/use-set-password";
import { handleFormError } from "@/shared/utils/form";
import { standardSchemaResolver } from "@hookform/resolvers/standard-schema";
import { Controller, useForm } from "react-hook-form";
import { usePasswordToggle } from "@/shared/hooks/use-password-toggle";
import { PasswordToggleButton } from "@/components/password-toggle-button";
import { ResetPasswordFormSchema, resetPasswordSchema } from "../schema";
import { useQueryClient } from "@tanstack/react-query";
import { USER_QUERY_KEYS } from "@/shared/constants/query-keys";

type Props = {
  onClose: () => void;
};

export default function SetPasswordForm({ onClose }: Props) {
  const queryClient = useQueryClient();
  const passwordToggle = usePasswordToggle();
  const confirmPasswordToggle = usePasswordToggle();
  const [success, setSuccess] = useState(false);

  const form = useForm<ResetPasswordFormSchema>({
    resolver: standardSchemaResolver(resetPasswordSchema),
    defaultValues: {
      password: "",
      confirmPassword: ""
    }
  });

  const setMutation = useSetPassword({
    onError: (err) => {
      handleFormError(err, form);
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: [USER_QUERY_KEYS.USER_PROFILE] });
      setSuccess(true);
    }
  });

  const mutationIsPending = setMutation.isPending;

  function onSubmit(values: ResetPasswordFormSchema) {
    setMutation.mutate({ password: values.password });
  }

  if (success) {
    return (
      <>
        <DialogHeader>
          <DialogTitle>Password set</DialogTitle>
          <DialogDescription>Your password has been set successfully. You can now login using your email and password.</DialogDescription>
        </DialogHeader>

        <Button
          className="w-full"
          onClick={() => {
            onClose();
            setSuccess(false);
          }}
        >
          Close
        </Button>
      </>
    );
  }

  return (
    <>
      <DialogHeader>
        <DialogTitle>Set a password</DialogTitle>
        <DialogDescription>Create a password so you can sign in with your email and password.</DialogDescription>
      </DialogHeader>
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
              {mutationIsPending ? "Setting up your password..." : "Set Password"}
            </Button>
          </Field>
        </FieldGroup>
      </form>
    </>
  );
}
