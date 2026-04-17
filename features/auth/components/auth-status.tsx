"use client";

import Link from "next/link";
import { LogOutIcon, Package, User, UserIcon } from "lucide-react";
import { useMe } from "../hooks/use-me";
import { Button } from "@/components/ui/button";
import { Skeleton } from "@/components/ui/skeleton";
import { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuSeparator, DropdownMenuTrigger } from "@/components/ui/dropdown-menu";
import { useLogout } from "../hooks/use-logout";
import { usePathname, useRouter } from "next/navigation";
import { AuthStatusMobile } from "./auth-status-mobile";
import { useQueryClient } from "@tanstack/react-query";
import { clearUserScope } from "@/shared/utils/invalidate";
import { getInitials } from "@/shared/utils/formatter";

type Props = {
  variant: "desktop" | "mobile";
  onClose?: () => void;
};

export function AuthStatus({ variant, onClose }: Props) {
  const router = useRouter();
  const queryClient = useQueryClient();
  const { data: user, isLoading } = useMe();
  const pathname = usePathname();

  function handleAfterLogout() {
    const isProtectedRoute = pathname.startsWith("/user");

    clearUserScope(queryClient);

    if (isProtectedRoute) {
      router.replace("/login");
    } else {
      router.refresh();
    }
  }

  const logoutMutation = useLogout({
    onSuccess: handleAfterLogout,
    onError: handleAfterLogout
  });

  function handleLogout() {
    logoutMutation.mutate();
  }

  if (isLoading) {
    return variant === "desktop" ? <Skeleton className="h-9 w-9 rounded-full" /> : <Skeleton className="h-9 w-full rounded-md" />;
  }

  if (!user) {
    return variant === "desktop" ? (
      <Link href="/login">
        <Button variant="ghost" size="icon">
          <User className="h-5 w-5" />
        </Button>
      </Link>
    ) : (
      <Link href="/login">
        <Button variant="ghost" className="w-full justify-start gap-3 px-2">
          <User className="h-4 w-4" />
          <span>Account</span>
        </Button>
      </Link>
    );
  }

  const name = user.displayName?.trim() || user.email || "User";

  return (
    <>
      {variant === "desktop" && (
        <DropdownMenu>
          <DropdownMenuTrigger asChild>
            <Button variant="ghost" size="icon" className="rounded-full">
              <div className="flex h-8 w-8 items-center justify-center rounded-full border border-border bg-muted text-muted-foreground text-sm font-medium">
                {getInitials(name)}
              </div>
            </Button>
          </DropdownMenuTrigger>

          <DropdownMenuContent align="end">
            <DropdownMenuItem onClick={() => router.push("/user")}>
              <UserIcon />
              Profile
            </DropdownMenuItem>

            <DropdownMenuItem onClick={() => router.push("/user/orders")}>
              <Package />
              Orders
            </DropdownMenuItem>

            <DropdownMenuSeparator />

            <DropdownMenuItem variant="destructive" onClick={handleLogout}>
              <LogOutIcon />
              Log out
            </DropdownMenuItem>
          </DropdownMenuContent>
        </DropdownMenu>
      )}

      {variant === "mobile" && <AuthStatusMobile user={user} onClose={onClose} onLogout={handleLogout} />}
    </>
  );
}
