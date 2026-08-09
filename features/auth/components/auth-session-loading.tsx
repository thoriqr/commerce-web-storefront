"use client";

import { Loader2 } from "lucide-react";

export default function AuthSessionLoading() {
  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-muted">
      <Loader2 className="size-6 animate-spin" />
    </div>
  );
}
