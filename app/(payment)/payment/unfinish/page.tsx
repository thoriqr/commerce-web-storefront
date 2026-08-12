import { CirclePause } from "lucide-react";

import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";

export default function PaymentUnfinishedPage() {
  return (
    <Card>
      <CardHeader className="text-center">
        <div className="mx-auto mb-2 flex size-16 items-center justify-center rounded-full bg-amber-100 text-amber-600 dark:bg-amber-950 dark:text-amber-400">
          <CirclePause className="size-9" />
        </div>

        <CardTitle>Payment Unfinished</CardTitle>

        <CardDescription className="mx-auto max-w-sm leading-6">Your payment has not been completed yet.</CardDescription>
      </CardHeader>

      <CardContent className="text-center">
        <p className="text-sm leading-6 text-muted-foreground">
          You can return to the app and continue your payment if the order is still available. If you opened this page from our mobile application,
          you may safely
          <strong className="font-medium text-foreground"> close this page</strong> and return to the app.
        </p>
      </CardContent>
    </Card>
  );
}
