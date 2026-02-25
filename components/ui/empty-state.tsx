import Link from "next/link";
import { Button } from "@/components/ui/button";
import { Empty, EmptyHeader, EmptyTitle, EmptyDescription, EmptyContent } from "@/components/ui/empty";

type Props = {
  title: string;
  description: string;
  buttonLabel?: string;
  href?: string;
};

export function EmptyState({ title, description, buttonLabel = "Back to Home", href = "/" }: Props) {
  return (
    <div className="flex min-h-[60vh] items-center justify-center px-4">
      <Empty>
        <EmptyHeader>
          <EmptyTitle>{title}</EmptyTitle>
          <EmptyDescription>{description}</EmptyDescription>
        </EmptyHeader>

        <EmptyContent>
          <Button asChild>
            <Link href={href}>{buttonLabel}</Link>
          </Button>
        </EmptyContent>
      </Empty>
    </div>
  );
}
