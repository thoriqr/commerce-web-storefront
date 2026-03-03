import Navbar from "@/components/layout/navbar/navbar";

export default function StoreLayout({ children }: { children: React.ReactNode }) {
  return (
    <>
      <Navbar />
      <div className="mx-auto max-w-7xl px-4 py-6">{children}</div>
    </>
  );
}
