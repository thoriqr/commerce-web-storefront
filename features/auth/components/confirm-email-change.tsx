"use client";

import { useRouter } from "next/navigation";
import { useConfirmEmailChange } from "../hooks/use-confirm-email-change";

import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { extractFieldError } from "../utils/extract-field-error";

type Props = {
  token: string;
};

export default function ConfirmEmailChange({ token }: Props) {
  const router = useRouter();
  const confirmMutation = useConfirmEmailChange();

  async function handleConfirm() {
    const result = await confirmMutation.mutateAsync({ token });

    if (!result.ok) return;

    router.replace("/");
  }

  const apiError = confirmMutation.data && !confirmMutation.data.ok ? confirmMutation.data.error : undefined;

  const tokenError = extractFieldError(apiError, "token");

  const generalError = !tokenError ? apiError?.message : undefined;

  return (
    <div className="flex min-h-[60vh] items-center justify-center px-4">
      <Card className="w-full max-w-sm">
        <CardHeader className="text-center">
          <CardTitle>Confirm email change</CardTitle>
          <CardDescription>Click the button below to confirm your new email address.</CardDescription>
        </CardHeader>

        <CardContent>
          {generalError && <p className="text-sm text-destructive text-center my-2">{generalError}</p>}
          <Button className="w-full" onClick={handleConfirm} disabled={confirmMutation.isPending}>
            {confirmMutation.isPending ? "Confirming..." : "Confirm"}
          </Button>
        </CardContent>
      </Card>
    </div>
  );
}
