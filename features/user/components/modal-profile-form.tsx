"use client";

import { Button } from "@/components/ui/button";
import {
  Dialog,
  DialogClose,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger
} from "@/components/ui/dialog";
import { Field, FieldError, FieldGroup, FieldLabel } from "@/components/ui/field";
import { Input } from "@/components/ui/input";
import { useState } from "react";
import { useUpdateProfile } from "../hooks/use-update-profile";
import { standardSchemaResolver } from "@hookform/resolvers/standard-schema";
import { handleFormError } from "@/shared/utils/form";
import { UserProfileFormSchema, userProfileSchema } from "../schema";
import { Controller, useForm } from "react-hook-form";

type Props = {
  initialValue: string;
};

export default function ModalProfileForm({ initialValue }: Props) {
  const [open, setOpen] = useState(false);
  const updateMutation = useUpdateProfile();
  const mutationIsPending = updateMutation.isPending;

  const form = useForm<UserProfileFormSchema>({
    resolver: standardSchemaResolver(userProfileSchema),
    defaultValues: {
      displayName: initialValue
    }
  });

  async function onSubmit(values: UserProfileFormSchema) {
    try {
      await updateMutation.mutateAsync(values.displayName);
      setOpen(false);
    } catch (err) {
      handleFormError(err, form);
    }
  }

  return (
    <Dialog onOpenChange={setOpen} open={open}>
      <DialogTrigger asChild>
        <Button size="sm" variant="ghost" onClick={() => setOpen(true)}>
          Edit
        </Button>
      </DialogTrigger>
      <DialogContent onOpenAutoFocus={(e) => e.preventDefault()}>
        <DialogHeader>
          <DialogTitle>Update display name</DialogTitle>
          <DialogDescription>Change how your name appears.</DialogDescription>
        </DialogHeader>

        <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-3">
          <FieldGroup>
            <Controller
              name="displayName"
              control={form.control}
              render={({ field, fieldState }) => (
                <Field data-invalid={fieldState.invalid}>
                  <FieldLabel htmlFor={field.name}>Display name</FieldLabel>
                  <Input {...field} id={field.name} aria-invalid={fieldState.invalid} disabled={mutationIsPending} />
                  {fieldState.invalid && <FieldError errors={[fieldState.error]} />}
                </Field>
              )}
            />

            {form.formState.errors.root && <p className="text-sm text-destructive">{form.formState.errors.root.message}</p>}
          </FieldGroup>
          <DialogFooter>
            <DialogClose asChild>
              <Button variant="outline" disabled={mutationIsPending}>
                Cancel
              </Button>
            </DialogClose>
            <Button type="submit" disabled={mutationIsPending}>
              {updateMutation.isPending ? "Saving..." : "Save"}
            </Button>
          </DialogFooter>
        </form>
      </DialogContent>
    </Dialog>
  );
}
