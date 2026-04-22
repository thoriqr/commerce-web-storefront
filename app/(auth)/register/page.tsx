import RegisterForm from "@/features/auth/components/forms/register-form";
import { Metadata } from "next";

export const metadata: Metadata = {
  title: "Register",
  description: "Create your account"
};

export default function RegisterPage() {
  return <RegisterForm />;
}
