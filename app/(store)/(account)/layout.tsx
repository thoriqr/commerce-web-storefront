import AccountTabs from "@/features/user/components/account-tabs";

export default function AccountLayout({ children }: { children: React.ReactNode }) {
  return (
    <div className="space-y-6 mx-auto max-w-5xl">
      <AccountTabs />
      {children}
    </div>
  );
}
