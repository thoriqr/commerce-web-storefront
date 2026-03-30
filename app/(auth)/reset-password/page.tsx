import { verificationToken } from "@/features/auth/api";
import ResetPasswordForm from "@/features/auth/components/forms/reset-password-form";
import { notFound } from "next/navigation";

type Props = {
  searchParams: Promise<{ token?: string }>;
};

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
