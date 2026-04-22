import LoginForm from "@/features/auth/components/forms/login-form";
import { Metadata } from "next";

export const dynamic = "force-dynamic";

export const metadata: Metadata = {
  title: "Login",
  description: "Login to your account"
};

export default function LoginPage() {
  return <LoginForm />;
}
