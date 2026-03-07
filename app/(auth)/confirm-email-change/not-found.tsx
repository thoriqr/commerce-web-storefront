import { EmptyState } from "@/components/ui/empty-state";

export default function NotFound() {
  return <EmptyState title="Invalid confirmation link" description="This email change confirmation link is missing or invalid." />;
}
