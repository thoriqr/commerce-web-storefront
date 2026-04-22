import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Metadata } from "next";
import Link from "next/link";

export const metadata: Metadata = {
  title: "Check your email",
  description: "We’ve sent a password reset link if the email exists"
};

export default function ForgotPasswordSuccessPage() {
  return (
    <div className="flex items-center justify-center px-4">
      <Card className="w-full max-w-sm">
        <CardHeader className="text-center">
          <CardTitle>Check your email</CardTitle>
          <CardDescription>If an account with that email exists, we’ve sent a password reset link.</CardDescription>
        </CardHeader>

        <CardContent>
          <Button asChild className="w-full">
            <Link href="/forgot-password" replace>
              Try another email
            </Link>
          </Button>
        </CardContent>
      </Card>
    </div>
  );
}
