"use client";

import { Button } from "@/components/ui/button";

type Props = {
  variant: "desktop" | "mobile";
  initial: string;
  name: string;
  onClick: () => void;
};

export default function AccountAvatarButton({ variant, initial, name, onClick }: Props) {
  return (
    <>
      {variant === "desktop" ? (
        <Button variant="ghost" size="icon" className="rounded-full" onClick={onClick}>
          <div className="flex h-8 w-8 items-center justify-center rounded-full bg-primary text-primary-foreground text-sm font-medium">
            {initial}
          </div>
        </Button>
      ) : (
        <Button variant="ghost" className="w-full justify-start gap-3 px-2" onClick={onClick}>
          <div className="flex h-7 w-7 items-center justify-center rounded-full bg-primary text-primary-foreground text-xs font-medium">
            {initial}
          </div>
          <span className="truncate text-sm font-medium">{name}</span>
        </Button>
      )}
    </>
  );
}
