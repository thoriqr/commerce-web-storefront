"use client";

import { Button } from "@/components/ui/button";
import { DialogDescription, DialogHeader, DialogTitle } from "@/components/ui/dialog";
import { Field, FieldGroup, FieldLabel } from "@/components/ui/field";
import { Input } from "@/components/ui/input";
import { useState } from "react";
import { useChangeEmail } from "../hooks/use-change-email";
import { extractFieldError } from "../utils/extract-field-error";

type Props = {
  currentEmail: string;
  onClose: () => void;
};

export default function ChangeEmailForm({ currentEmail, onClose }: Props) {
  const changeEmail = useChangeEmail();

  const [newEmail, setNewEmail] = useState("");
  const [success, setSuccess] = useState(false);

  const handleSubmit = (e: React.SubmitEvent<HTMLFormElement>) => {
    e.preventDefault();

    changeEmail.mutate(
      { email: newEmail },
      {
        onSuccess: (result) => {
          if (result.ok) {
            setSuccess(true);
          }
        }
      }
    );
  };

  function handleEmailChange(value: string) {
    if (changeEmail.isError || changeEmail.data) {
      changeEmail.reset();
    }
    setNewEmail(value);
  }

  const apiError = changeEmail.data && !changeEmail.data.ok ? changeEmail.data.error : undefined;

  const emailError = extractFieldError(apiError, "email");

  const generalError = !emailError ? apiError?.message : undefined;

  if (success) {
    return (
      <>
        <DialogHeader>
          <DialogTitle>Check your email</DialogTitle>
          <DialogDescription>We sent a confirmation link to your new email address.</DialogDescription>
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
        <DialogTitle>Change email</DialogTitle>
        <DialogDescription>Enter a new email address. We&apos;ll send a confirmation link.</DialogDescription>
      </DialogHeader>
      <form onSubmit={handleSubmit}>
        <FieldGroup>
          <Field>
            <FieldLabel htmlFor="current-email">Current Email</FieldLabel>
            <Input id="current-email" type="email" autoComplete="username" value={currentEmail} disabled />
          </Field>

          <Field>
            <FieldLabel htmlFor="new-email">New Email</FieldLabel>
            <Input
              id="new-email"
              type="new-email"
              autoComplete="username"
              required
              value={newEmail}
              onChange={(e) => handleEmailChange(e.target.value)}
              disabled={changeEmail.isPending}
            />

            {emailError && <p className="text-sm text-destructive mt-2">{emailError}</p>}

            {generalError && <p className="text-sm text-destructive text-center mt-2">{generalError}</p>}
          </Field>

          <Field>
            <Button type="submit" disabled={changeEmail.isPending}>
              {changeEmail.isPending ? "Sending..." : "Send Confirmation Link"}
            </Button>
          </Field>
        </FieldGroup>
      </form>
    </>
  );
}
