"use client";

import { Button } from "@/components/ui/button";
import { Dialog, DialogContent, DialogTrigger } from "@/components/ui/dialog";
import ChangePasswordForm from "@/features/auth/components/forms/change-password-form";
import { useState } from "react";

type Props = {
  hasPassword: boolean;
};

export default function ModalChangePasswordForm({ hasPassword }: Props) {
  const [open, setOpen] = useState(false);
  return (
    <Dialog open={open} onOpenChange={setOpen}>
      <DialogTrigger asChild>
        <Button size="sm" variant="outline" onClick={() => setOpen(true)}>
          {hasPassword ? "Change Password" : "Set Password"}
        </Button>
      </DialogTrigger>
      <DialogContent>
        <ChangePasswordForm onClose={() => setOpen(false)} />
      </DialogContent>
    </Dialog>
  );
}
