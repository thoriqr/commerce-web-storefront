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

type Props = {
  variant: "desktop" | "mobile";
  onClose?: () => void;
};

export function AuthStatus({ variant, onClose }: Props) {
  const router = useRouter();
  const { data: user, isLoading } = useMe();
  const logoutMutation = useLogout();

  const pathname = usePathname();

  async function handleLogout() {
    await logoutMutation.mutateAsync();

    const isProtectedRoute = pathname.startsWith("/user");

    if (isProtectedRoute) {
      router.replace("/login");
    } else {
      router.refresh(); // optional: refresh navbar state
    }
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
  const initial = name.charAt(0).toUpperCase();

  return (
    <>
      {variant === "desktop" && (
        <DropdownMenu>
          <DropdownMenuTrigger asChild>
            <Button variant="ghost" size="icon" className="rounded-full">
              <div className="flex h-8 w-8 items-center justify-center rounded-full bg-primary text-primary-foreground text-sm font-medium">
                {initial}
              </div>
            </Button>
          </DropdownMenuTrigger>

          <DropdownMenuContent align="end">
            <DropdownMenuItem onClick={() => router.push("/user")}>
              <UserIcon />
              Profile
            </DropdownMenuItem>

            <DropdownMenuItem onClick={() => router.push("/orders")}>
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
