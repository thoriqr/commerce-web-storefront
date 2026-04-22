import { verificationToken } from "@/features/auth/api";
import VerifyEmailForm from "@/features/auth/components/forms/verify-email-form";
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
      title: "Invalid verification link"
    };
  }

  return {
    title: "Complete your account",
    description: "Set up your account to get started"
  };
}

export default async function VerifyEmailPage({ searchParams }: Props) {
  const { token } = await searchParams;

  if (!token) {
    notFound();
  }

  try {
    await verificationToken({ token, type: "REGISTER" });
  } catch {
    notFound();
  }

  return <VerifyEmailForm token={token} />;
}
