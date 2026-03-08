"use client";

import { useEffect, useState } from "react";
import { useRouter, useSearchParams } from "next/navigation";
import { Search } from "lucide-react";
import { Input } from "@/components/ui/input";

export function NavbarSearch() {
  const router = useRouter();
  const searchParams = useSearchParams();

  const q = searchParams.get("q") ?? "";
  const [query, setQuery] = useState(q);

  useEffect(() => {
    setQuery(q);
  }, [q]);

  function submitSearch(value: string) {
    const trimmed = value.trim();
    if (!trimmed) return;

    router.push(`/products?q=${encodeURIComponent(trimmed)}`);
  }

  const handleSubmit = (e: React.SubmitEvent) => {
    e.preventDefault();
    submitSearch(query);
  };

  return (
    <form onSubmit={handleSubmit} className="w-full max-w-md flex items-center">
      <div className="relative w-full">
        <button type="button" onClick={() => submitSearch(query)} className="absolute left-3 top-2.5 text-muted-foreground hover:text-foreground">
          <Search className="h-4 w-4" />
        </button>

        <Input placeholder="Search products..." value={query} onChange={(e) => setQuery(e.target.value)} className="pl-9" />
      </div>
    </form>
  );
}
