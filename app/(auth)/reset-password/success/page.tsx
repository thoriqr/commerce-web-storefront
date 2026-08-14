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

          <CardDescription>Your password has been updated successfully. You can now log in using your new password.</CardDescription>
        </CardHeader>

        <CardContent className="space-y-4">
          <Button asChild className="w-full">
            <Link href="/login" replace>
              Continue to Login
            </Link>
          </Button>

          <div className="text-center">
            <p className="mb-2 text-sm text-muted-foreground">Already using the mobile app?</p>

            <Button asChild variant="outline" className="w-full">
              <a href="https://store.commerce.web.id/login">Open the app</a>
            </Button>
          </div>
        </CardContent>
      </Card>
    </div>
  );
}
