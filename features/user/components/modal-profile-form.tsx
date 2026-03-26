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
import { Field, FieldGroup, FieldLabel } from "@/components/ui/field";
import { Input } from "@/components/ui/input";
import { useState } from "react";
import { useUpdateProfile } from "../hooks/use-update-profile";
import { extractFieldError } from "@/shared/utils/extract-field-error";

type Props = {
  initialValue: string;
};

export default function ModalProfileForm({ initialValue }: Props) {
  const [open, setOpen] = useState(false);
  const [displayName, setDisplayName] = useState(initialValue);

  const updateMutation = useUpdateProfile();

  async function handleSubmit(e: React.SubmitEvent<HTMLFormElement>) {
    e.preventDefault();

    const result = await updateMutation.mutateAsync(displayName);
    if (!result.ok) return;

    setOpen(false);
  }

  const apiError = updateMutation.data && !updateMutation.data.ok ? updateMutation.data.error : undefined;

  const displayNameError = extractFieldError(apiError, "displayName");

  const generalError = !displayNameError ? apiError?.message : undefined;

  return (
    <Dialog
      onOpenChange={(val) => {
        setOpen(val);

        if (!val) {
          setDisplayName(initialValue);
        }
      }}
      open={open}
    >
      <DialogTrigger asChild>
        <Button size="sm" variant="ghost" onClick={() => setOpen(true)}>
          Edit
        </Button>
      </DialogTrigger>
      <DialogContent onOpenAutoFocus={(e) => e.preventDefault()}>
        <DialogHeader>
          <DialogTitle>Update Display Name</DialogTitle>
          <DialogDescription>Change how your name appears.</DialogDescription>
        </DialogHeader>

        <form onSubmit={handleSubmit} className="space-y-3">
          <FieldGroup>
            <Field>
              <FieldLabel htmlFor="display-name">Display Name</FieldLabel>
              <Input
                id="display-name"
                type="text"
                value={displayName}
                onChange={(e) => {
                  if (e.target.value.length > 120) return;

                  if (updateMutation.isError || updateMutation.data) {
                    updateMutation.reset();
                  }

                  setDisplayName(e.target.value);
                }}
                required
              />

              <p className="text-xs text-muted-foreground text-right">{displayName.length}/120</p>
              {displayNameError && <p className="text-sm text-destructive mt-2">{displayNameError}</p>}
            </Field>

            {generalError && <p className="text-sm text-destructive text-center mt-2">{generalError}</p>}
          </FieldGroup>
          <DialogFooter>
            <DialogClose asChild>
              <Button variant="outline" disabled={updateMutation.isPending}>
                Cancel
              </Button>
            </DialogClose>
            <Button type="submit" disabled={updateMutation.isPending}>
              {updateMutation.isPending ? "Saving..." : "Save"}
            </Button>
          </DialogFooter>
        </form>
      </DialogContent>
    </Dialog>
  );
}
