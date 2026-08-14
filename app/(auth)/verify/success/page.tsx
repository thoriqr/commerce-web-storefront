import Link from "next/link";
import type { Metadata } from "next";

import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";

export const metadata: Metadata = {
  title: "Email verified",
  description: "Your email has been verified successfully"
};

export default function VerifySuccessPage() {
  return (
    <div className="flex items-center justify-center px-4">
      <Card className="w-full max-w-sm">
        <CardHeader className="text-center">
          <CardTitle>Email verified</CardTitle>

          <CardDescription>Your email has been verified successfully. You can now log in and start using your account.</CardDescription>
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
