"use client";

import { UserProvider } from "@/lib/types";
import Image from "next/image";

const providerMeta = {
  GOOGLE: {
    label: "Google",
    icon: "/google-icon-logo.svg"
  },
  GITHUB: {
    label: "GitHub",
    icon: "/github.svg"
  }
} as const;

export default function ConnectedProviders({ providers }: { providers: UserProvider[] }) {
  if (!providers.length) return null;

  return (
    <div className="space-y-2">
      <p className="text-xs font-medium text-muted-foreground">Connected accounts</p>

      <div className="space-y-2">
        {providers.map((p) => {
          const meta = providerMeta[p.provider];

          return (
            <div key={p.provider} className="flex items-center gap-3 rounded-md border px-3 py-2 text-sm">
              <Image src={meta.icon} alt={meta.label} width={18} height={18} />

              <div className="flex flex-col leading-tight">
                <span className="font-medium">{meta.label}</span>

                {(p.displayName || p.email) && (
                  <span className="text-xs text-muted-foreground">
                    {p.displayName ?? p.email}
                    {p.displayName && p.email && ` • ${p.email}`}
                  </span>
                )}
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
}
