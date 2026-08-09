import AppShell from "@/components/layout/checkout/app-shell";
import ProtectedRoute from "@/features/auth/components/protected-route";

export default function CheckoutLayout({ children }: { children: React.ReactNode }) {
  return (
    <ProtectedRoute>
      <AppShell>{children}</AppShell>;
    </ProtectedRoute>
  );
}
