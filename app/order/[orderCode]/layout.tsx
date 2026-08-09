import AppShell from "@/components/layout/checkout/app-shell";
import ProtectedRoute from "@/features/auth/components/protected-route";
import Script from "next/script";

export default function OrderLayout({ children }: { children: React.ReactNode }) {
  return (
    <ProtectedRoute>
      <AppShell>
        <Script
          src="https://app.sandbox.midtrans.com/snap/snap.js"
          data-client-key={process.env.NEXT_PUBLIC_MIDTRANS_CLIENT_KEY}
          strategy="afterInteractive"
        />
        {children}
      </AppShell>
    </ProtectedRoute>
  );
}
