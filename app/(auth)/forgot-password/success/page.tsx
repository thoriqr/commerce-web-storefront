import { EmptyState } from "@/components/ui/empty-state";

export default function ForgotPasswordSuccessPage() {
  return (
    <EmptyState
      title="Check your email"
      description="If an account with that email exists, we’ve sent a password reset link."
      buttonLabel="Try another email"
      href="/forgot-password"
    />
  );
}
