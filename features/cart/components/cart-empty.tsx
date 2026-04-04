import { Button } from "@/components/ui/button";
import Link from "next/link";

export function CartEmpty() {
  return (
    <div className="max-w-5xl mx-auto px-4 py-16 text-center space-y-4">
      <h2 className="text-lg font-semibold">Your cart is empty</h2>

      <p className="text-sm text-muted-foreground">Looks like you haven&apos;t added anything yet.</p>

      <Link href="/">
        <Button>Start Shopping</Button>
      </Link>
    </div>
  );
}
