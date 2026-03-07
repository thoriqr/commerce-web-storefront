"use client";

import { Home } from "lucide-react";
import Link from "next/link";
import { GoogleOAuthProvider } from "@react-oauth/google";

export default function AuthLayout({ children }: { children: React.ReactNode }) {
  return (
    <GoogleOAuthProvider clientId={process.env.NEXT_PUBLIC_GOOGLE_CLIENT_ID!}>
      <div className="flex min-h-svh flex-col items-center justify-center gap-6 bg-muted p-6 md:p-10">
        <div className="flex w-full max-w-sm flex-col gap-6">
          <Link href="/" replace className="flex items-center gap-2 self-center font-medium">
            <div className="flex size-6 items-center justify-center rounded-md bg-primary text-primary-foreground">
              <Home className="size-4" />
            </div>
            Commerce
          </Link>
          {children}
        </div>
      </div>
    </GoogleOAuthProvider>
  );
}
