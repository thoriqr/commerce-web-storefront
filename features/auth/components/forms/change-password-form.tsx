"use client";

import { Button } from "@/components/ui/button";
import { Field, FieldError, FieldGroup, FieldLabel } from "@/components/ui/field";
import { Input } from "@/components/ui/input";
import { useState } from "react";
import { DialogDescription, DialogHeader, DialogTitle } from "@/components/ui/dialog";
import { useChangePassword } from "../../hooks/use-change-password";
import { ChangePasswordFormSchema, changePasswordSchema } from "../schema";
import { handleFormError } from "@/shared/utils/form";
import { standardSchemaResolver } from "@hookform/resolvers/standard-schema";
import { Controller, useForm } from "react-hook-form";
import { usePasswordToggle } from "@/shared/hooks/use-password-toggle";
import { PasswordToggleButton } from "@/components/password-toggle-button";

type Props = {
  onClose: () => void;
};

export default function ChangePasswordForm({ onClose }: Props) {
  const changeMutation = useChangePassword();
  const mutationIsPending = changeMutation.isPending;
  const currentPasswordToggle = usePasswordToggle();
  const newPasswordToggle = usePasswordToggle();
  const confirmNewPasswordToggle = usePasswordToggle();
  const [success, setSuccess] = useState(false);

  const form = useForm<ChangePasswordFormSchema>({
    resolver: standardSchemaResolver(changePasswordSchema),
    defaultValues: {
      currentPassword: "",
      newPassword: "",
      confirmNewPassword: ""
    }
  });

  async function onSubmit(values: ChangePasswordFormSchema) {
    try {
      await changeMutation.mutateAsync({ currentPassword: values.currentPassword, newPassword: values.newPassword });
      setSuccess(true);
    } catch (err) {
      handleFormError(err, form);
    }
  }

  if (success) {
    return (
      <>
        <DialogHeader>
          <DialogTitle>Password updated</DialogTitle>
          <DialogDescription>Your password has been updated successfully.</DialogDescription>
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
        <DialogTitle>Change password</DialogTitle>
        <DialogDescription>Enter your new password below.</DialogDescription>
      </DialogHeader>
      <form onSubmit={form.handleSubmit(onSubmit)}>
        <FieldGroup>
          <Controller
            name="currentPassword"
            control={form.control}
            render={({ field, fieldState }) => (
              <Field data-invalid={fieldState.invalid}>
                <FieldLabel htmlFor={field.name}>Current Password</FieldLabel>

                <div className="relative">
                  <Input
                    {...field}
                    id={field.name}
                    aria-invalid={fieldState.invalid}
                    type={currentPasswordToggle.inputType}
                    autoComplete="current-password"
                    disabled={mutationIsPending}
                  />

                  <PasswordToggleButton visible={currentPasswordToggle.visible} onToggle={currentPasswordToggle.toggle} />
                </div>

                {fieldState.invalid && <FieldError errors={[fieldState.error]} />}
              </Field>
            )}
          />

          <Controller
            name="newPassword"
            control={form.control}
            render={({ field, fieldState }) => (
              <Field data-invalid={fieldState.invalid}>
                <FieldLabel htmlFor={field.name}>New Password</FieldLabel>

                <div className="relative">
                  <Input
                    {...field}
                    id={field.name}
                    aria-invalid={fieldState.invalid}
                    type={newPasswordToggle.inputType}
                    autoComplete="new-password"
                    disabled={mutationIsPending}
                  />

                  <PasswordToggleButton visible={newPasswordToggle.visible} onToggle={newPasswordToggle.toggle} />
                </div>

                {fieldState.invalid && <FieldError errors={[fieldState.error]} />}
              </Field>
            )}
          />

          <Controller
            name="confirmNewPassword"
            control={form.control}
            render={({ field, fieldState }) => (
              <Field data-invalid={fieldState.invalid}>
                <FieldLabel htmlFor={field.name}>Confirm New Password</FieldLabel>

                <div className="relative">
                  <Input
                    {...field}
                    id={field.name}
                    aria-invalid={fieldState.invalid}
                    type={confirmNewPasswordToggle.inputType}
                    autoComplete="new-password"
                    disabled={mutationIsPending}
                  />

                  <PasswordToggleButton visible={confirmNewPasswordToggle.visible} onToggle={confirmNewPasswordToggle.toggle} />
                </div>

                {fieldState.invalid && <FieldError errors={[fieldState.error]} />}
              </Field>
            )}
          />

          {form.formState.errors.root && <p className="text-sm text-destructive">{form.formState.errors.root.message}</p>}

          <Field>
            <div className="flex gap-2 justify-end">
              <Button type="button" variant="outline" disabled={mutationIsPending} onClick={onClose}>
                Cancel
              </Button>
              <Button type="submit" disabled={mutationIsPending}>
                {mutationIsPending ? "Saving..." : "Save"}
              </Button>
            </div>
          </Field>
        </FieldGroup>
      </form>
    </>
  );
}
