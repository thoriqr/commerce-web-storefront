import ForgotPasswordForm from "@/features/auth/components/forms/forgot-password-form";
import { Metadata } from "next";

export const metadata: Metadata = {
  title: "Reset your password",
  description: "Enter your email to receive a password reset link"
};

export default function ForgotPasswordPage() {
  return <ForgotPasswordForm />;
}
