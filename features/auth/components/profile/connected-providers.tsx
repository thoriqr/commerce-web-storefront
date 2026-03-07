"use client";

import { UserProvider } from "@/lib/types";
import Image from "next/image";

export default function ConnectedProviders({ providers }: { providers: UserProvider[] }) {
  if (!providers.length) return null;

  return (
    <div className="space-y-2">
      <p className="text-xs font-medium text-muted-foreground">Connected accounts</p>

      <div className="flex gap-2">
        {providers.includes("GOOGLE") && (
          <div className="flex items-center gap-2 rounded-md border px-2 py-1 text-xs">
            <Image src="/google-icon-logo.svg" alt="google-icon" width={20} height={20} />
            Google
          </div>
        )}

        {providers.includes("GITHUB") && (
          <div className="flex items-center gap-2 rounded-md border px-2 py-1 text-xs">
            <Image src="/github.svg" alt="github-icon" width={20} height={20} />
            GitHub
          </div>
        )}
      </div>
    </div>
  );
}
