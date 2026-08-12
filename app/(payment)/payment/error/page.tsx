import { CircleAlert } from "lucide-react";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";

export default function PaymentErrorPage() {
  return (
    <Card>
      <CardHeader className="text-center">
        <div className="mx-auto mb-2 flex size-16 items-center justify-center rounded-full bg-red-100 text-red-600 dark:bg-red-950 dark:text-red-400">
          <CircleAlert className="size-9" />
        </div>

        <CardTitle>Payment Failed</CardTitle>

        <CardDescription className="mx-auto max-w-sm leading-6">We couldn&apos;t complete your payment.</CardDescription>
      </CardHeader>

      <CardContent className="text-center">
        <p className="text-sm leading-6 text-muted-foreground">
          Please return to the app and try the payment again. If you opened this page from our mobile application, you may safely
          <strong className="font-medium text-foreground"> close this page</strong> and return to the app.
        </p>
      </CardContent>
    </Card>
  );
}
