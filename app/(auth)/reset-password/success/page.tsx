import Link from "next/link";
import type { Metadata } from "next";

import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";

export const metadata: Metadata = {
  title: "Password updated",
  description: "Your password has been updated successfully"
};

export default function ResetPasswordSuccessPage() {
  return (
    <div className="flex items-center justify-center px-4">
      <Card className="w-full max-w-sm">
        <CardHeader className="text-center">
          <CardTitle>Password updated</CardTitle>

          <CardDescription>Your password has been updated successfully. You can now sign in using your new password.</CardDescription>
        </CardHeader>

        <CardContent>
          <Button asChild className="w-full">
            <Link href="/login" replace>
              Continue to sign in
            </Link>
          </Button>
        </CardContent>
      </Card>
    </div>
  );
}
