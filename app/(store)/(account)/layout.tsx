import ProtectedRoute from "@/features/auth/components/protected-route";
import AccountTabs from "@/features/user/components/account-tabs";

export default function AccountLayout({ children }: { children: React.ReactNode }) {
  return (
    <ProtectedRoute>
      <div className="mx-auto max-w-5xl space-y-6">
        <AccountTabs />
        {children}
      </div>
    </ProtectedRoute>
  );
}
