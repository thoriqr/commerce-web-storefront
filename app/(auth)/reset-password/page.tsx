import ResetPasswordForm from "@/features/auth/components/reset-password-form";
import { notFound } from "next/navigation";

type Props = {
  searchParams: Promise<{ token?: string }>;
};

export default async function ResetPasswordPage({ searchParams }: Props) {
  const { token } = await searchParams;

  if (!token) {
    notFound();
  }

  return <ResetPasswordForm token={token} />;
}
