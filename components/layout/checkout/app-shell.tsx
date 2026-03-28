import Link from "next/link";

export default function AppShell({ children }: { children: React.ReactNode }) {
  return (
    <div className="min-h-svh bg-muted">
      {/* HEADER */}
      <header className="border-b bg-background">
        <div className="mx-auto max-w-7xl px-4 h-16 flex items-center">
          <Link href="/" className="text-lg font-semibold">
            Commerce
          </Link>
        </div>
      </header>

      <main className="mx-auto max-w-7xl px-4 py-6">{children}</main>
    </div>
  );
}
