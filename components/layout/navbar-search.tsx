"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { Search } from "lucide-react";
import { Input } from "@/components/ui/input";

export function NavbarSearch() {
  const [query, setQuery] = useState("");
  const router = useRouter();

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!query.trim()) return;

    router.push(`/products?q=${encodeURIComponent(query)}`);
  };

  return (
    <form onSubmit={handleSubmit} className="w-full max-w-md flex items-center">
      <div className="relative w-full">
        <Search className="absolute left-3 top-2.5 h-4 w-4 text-muted-foreground" />
        <Input placeholder="Search products..." value={query} onChange={(e) => setQuery(e.target.value)} className="pl-9" />
      </div>
    </form>
  );
}
