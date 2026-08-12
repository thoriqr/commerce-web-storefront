import { CheckCircle2 } from "lucide-react";

import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";

export default function PaymentFinishPage() {
  return (
    <Card>
      <CardHeader className="text-center">
        <div className="mx-auto mb-2 flex size-16 items-center justify-center rounded-full bg-green-100 text-green-600 dark:bg-green-950 dark:text-green-400">
          <CheckCircle2 className="size-9" />
        </div>

        <CardTitle>Payment Received</CardTitle>

        <CardDescription className="mx-auto max-w-sm leading-6">Your payment has been received and is being processed.</CardDescription>
      </CardHeader>

      <CardContent className="text-center">
        <p className="text-sm leading-6 text-muted-foreground">
          If you opened this payment from our mobile application, you may safely
          <strong className="font-medium text-foreground"> close this page</strong> and return to the app to view the latest order status.
        </p>
      </CardContent>
    </Card>
  );
}
