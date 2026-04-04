import { Card, CardContent } from "@/components/ui/card";

export function OrdersEmpty() {
  return (
    <Card>
      <CardContent className="py-10 text-center space-y-2">
        <p className="text-sm font-medium">No orders yet</p>

        <p className="text-sm text-muted-foreground">Your orders will appear here once you make a purchase.</p>
      </CardContent>
    </Card>
  );
}
