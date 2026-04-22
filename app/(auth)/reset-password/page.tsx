import { verificationToken } from "@/features/auth/api";
import ResetPasswordForm from "@/features/auth/components/forms/reset-password-form";
import { Metadata } from "next";
import { notFound } from "next/navigation";

export const dynamic = "force-dynamic";

type Props = {
  searchParams: Promise<{ token?: string }>;
};

export async function generateMetadata({ searchParams }: Props): Promise<Metadata> {
  const { token } = await searchParams;

  if (!token) {
    return {
      title: "Invalid reset link"
    };
  }

  return {
    title: "Set a new password",
    description: "Create a new password for your account"
  };
}

export default async function ResetPasswordPage({ searchParams }: Props) {
  const { token } = await searchParams;

  if (!token) {
    notFound();
  }

  try {
    await verificationToken({ token, type: "RESET_PASSWORD" });
  } catch {
    notFound();
  }

  return <ResetPasswordForm token={token} />;
}
