import { EmptyState } from "@/components/ui/empty-state";

export default function NotFound() {
  return (
    <EmptyState
      title="Invalid reset link"
      description="This password reset link is missing or invalid."
      buttonLabel="Request a new link"
      href="/forgot-password"
    />
  );
}
