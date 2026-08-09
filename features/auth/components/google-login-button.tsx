"use client";

import { GoogleLogin } from "@react-oauth/google";
import { useGoogleLogin } from "../hooks/use-google-login";
import { useRouter, useSearchParams } from "next/navigation";
import { FetchError } from "@/shared/types/api-error";
import { toast } from "sonner";
import { useQueryClient } from "@tanstack/react-query";
import { invalidateUserScope } from "@/shared/utils/invalidate";
import { getSafeRedirect } from "@/shared/utils/get-safe-redirect";
import { cn } from "@/lib/utils";

type Props = {
  isLocked?: boolean;
  onLockChange?: (locked: boolean) => void;
};

export default function GoogleLoginButton({ isLocked, onLockChange }: Props) {
  const queryClient = useQueryClient();
  const router = useRouter();
  const searchParams = useSearchParams();

  const googleLoginMutation = useGoogleLogin({
    onMutate() {
      onLockChange?.(true);
    },

    onError(err) {
      onLockChange?.(false);

      if (err instanceof FetchError) {
        toast.error(err.message);
        return;
      }

      toast.error("Something went wrong");
    },

    onSuccess() {
      invalidateUserScope(queryClient);

      const redirect = searchParams.get("redirect");
      const safeRedirect = getSafeRedirect(redirect);

      if (redirect?.startsWith("/cart")) {
        toast.success("You're back! Continue your checkout");
      }

      router.replace(safeRedirect);
    }
  });

  return (
    <div className="relative">
      <div className={cn(isLocked && "opacity-50")}>
        <GoogleLogin
          theme="outline"
          size="large"
          text="continue_with"
          onSuccess={(credentialResponse) => {
            if (isLocked) return;

            const idToken = credentialResponse.credential;
            if (!idToken) return;

            googleLoginMutation.mutate(idToken);
          }}
          onError={() => {
            console.error("Google Login Failed");
          }}
        />
      </div>

      {isLocked && <div aria-hidden="true" className="absolute inset-0 z-10 cursor-not-allowed" />}
    </div>
  );
}
