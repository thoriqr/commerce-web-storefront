import { EmptyState } from "@/components/ui/empty-state";

export default function NotFound() {
  return (
    <EmptyState
      title="Invalid verification link"
      description="This verification link is missing or invalid."
      buttonLabel="Back to register"
      href="/register"
    />
  );
}
