import { Empty, EmptyHeader, EmptyTitle, EmptyDescription, EmptyContent } from "@/components/ui/empty";
import { Button } from "@/components/ui/button";
import Link from "next/link";

export default function NotFound() {
  return (
    <div className="flex min-h-[60vh] items-center justify-center px-4">
      <Empty>
        <EmptyHeader>
          <EmptyTitle>Category Not Found</EmptyTitle>
          <EmptyDescription>The category you are looking for does not exist or may have been removed.</EmptyDescription>
        </EmptyHeader>

        <EmptyContent>
          <div className="flex gap-2">
            <Button asChild size="sm">
              <Link href="/">Back to Home</Link>
            </Button>
          </div>
        </EmptyContent>
      </Empty>
    </div>
  );
}
