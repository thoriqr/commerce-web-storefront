"use client";

import { Empty, EmptyContent, EmptyDescription, EmptyHeader, EmptyTitle } from "@/components/ui/empty";
import { InputGroup, InputGroupAddon, InputGroupInput } from "@/components/ui/input-group";
import { SearchIcon } from "lucide-react";
import { useState } from "react";

const SUGGESTIONS = ["shoes", "hoodie", "jacket", "t-shirt"];

export default function NotFound() {
  const [query, setQuery] = useState("");

  function navigate(q: string) {
    const value = q.trim();
    if (!value) return;

    window.location.replace(`/products?q=${encodeURIComponent(value)}`);
  }

  function handleSubmit(e: React.SubmitEvent<HTMLFormElement>) {
    e.preventDefault();
    navigate(query);
  }

  function handleSuggestion(value: string) {
    navigate(value);
  }

  return (
    <Empty>
      <EmptyHeader>
        <EmptyTitle>Search products</EmptyTitle>
        <EmptyDescription>Enter a keyword to find products in our catalog.</EmptyDescription>
      </EmptyHeader>

      <EmptyContent>
        <form onSubmit={handleSubmit} className="w-full flex flex-col items-center gap-4">
          <InputGroup className="sm:w-3/4">
            <InputGroupInput placeholder="Search products..." value={query} onChange={(e) => setQuery(e.target.value)} autoFocus />
            <InputGroupAddon>
              <button type="submit">
                <SearchIcon className="h-4 w-4" />
              </button>
            </InputGroupAddon>
          </InputGroup>

          <div className="text-sm text-muted-foreground flex flex-wrap justify-center gap-2">
            <span>Try:</span>
            {SUGGESTIONS.map((item) => (
              <button key={item} type="button" onClick={() => handleSuggestion(item)} className="underline hover:text-foreground">
                {item}
              </button>
            ))}
          </div>
        </form>
      </EmptyContent>
    </Empty>
  );
}
