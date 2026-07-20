import Link from "next/link";
import type { Metadata } from "next";

import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";

export const metadata: Metadata = {
  title: "Email verified",
  description: "Your account has been verified successfully"
};

export default function VerifySuccessPage() {
  return (
    <div className="flex items-center justify-center px-4">
      <Card className="w-full max-w-sm">
        <CardHeader className="text-center">
          <CardTitle>Email verified</CardTitle>

          <CardDescription>Your account has been verified successfully. You can now sign in and start using your account.</CardDescription>
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
