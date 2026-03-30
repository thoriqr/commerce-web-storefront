import { verificationToken } from "@/features/auth/api";
import VerifyEmailForm from "@/features/auth/components/forms/verify-email-form";
import { notFound } from "next/navigation";

type Props = {
  searchParams: Promise<{ token?: string }>;
};

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
