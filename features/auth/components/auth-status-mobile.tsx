"use client";

import { useRouter } from "next/navigation";
import { Collapsible, CollapsibleContent, CollapsibleTrigger } from "@/components/ui/collapsible";
import { MeResponse } from "../types";
import { Button } from "@/components/ui/button";
import { ChevronDownIcon, LogOutIcon, Package, UserIcon } from "lucide-react";
import { getInitials } from "@/shared/utils/formatter";

type Props = {
  user: MeResponse;
  onClose?: () => void;
  onLogout: () => void;
};

export function AuthStatusMobile({ user, onClose, onLogout }: Props) {
  const router = useRouter();

  const name = user.displayName?.trim() || user.email || "User";

  return (
    <Collapsible defaultOpen>
      {/* TRIGGER */}
      <CollapsibleTrigger asChild>
        <Button variant="ghost" className="group w-full justify-start gap-3">
          <div className="flex h-8 w-8 items-center justify-center rounded-full border border-border bg-muted text-muted-foreground text-sm font-medium">
            {getInitials(name)}
          </div>

          <span className="truncate text-sm font-medium">{name}</span>

          <ChevronDownIcon className="ml-auto transition-transform group-data-[state=open]:rotate-180" />
        </Button>
      </CollapsibleTrigger>

      {/* CONTENT */}
      <CollapsibleContent className="mt-2 space-y-1">
        <Button
          variant="ghost"
          className="w-full justify-start gap-3"
          onClick={() => {
            router.push("/user");
            onClose?.();
          }}
        >
          <UserIcon className="h-4 w-4" />
          Profile
        </Button>

        <Button
          variant="ghost"
          className="w-full justify-start gap-3"
          onClick={() => {
            router.push("/user/orders");
            onClose?.();
          }}
        >
          <Package className="h-4 w-4" />
          Orders
        </Button>

        <Button
          variant="destructive"
          className="w-full justify-start gap-3"
          onClick={async () => {
            await onLogout();
            onClose?.();
          }}
        >
          <LogOutIcon className="h-4 w-4" />
          Log out
        </Button>
      </CollapsibleContent>
    </Collapsible>
  );
}
