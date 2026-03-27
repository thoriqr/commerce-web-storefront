import { Empty, EmptyTitle, EmptyDescription, EmptyContent } from "@/components/ui/empty";
import { Button } from "@/components/ui/button";

type Props = {
  title?: string;
  description?: string;
  actionLabel?: string;
  onAction?: () => void;
};

export function CheckoutEmptyState({
  title = "Checkout not available",
  description = "This checkout session is invalid or has expired.",
  actionLabel = "Back to home",
  onAction
}: Props) {
  return (
    <div className="flex justify-center py-16">
      <div className="w-full max-w-md rounded-lg border bg-background p-6">
        <Empty>
          <EmptyContent>
            <EmptyTitle>{title}</EmptyTitle>
            <EmptyDescription>{description}</EmptyDescription>

            {actionLabel && (
              <div className="pt-2">
                <Button size="sm" variant="outline" onClick={onAction}>
                  {actionLabel}
                </Button>
              </div>
            )}
          </EmptyContent>
        </Empty>
      </div>
    </div>
  );
}
