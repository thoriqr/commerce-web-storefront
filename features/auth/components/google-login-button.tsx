"use client";

import { GoogleLogin } from "@react-oauth/google";
import { useGoogleLogin } from "../hooks/use-google-login";
import { useRouter } from "next/navigation";
import { FetchError } from "@/shared/types/api-error";
import { toast } from "sonner";
import { useQueryClient } from "@tanstack/react-query";
import { invalidateUserScope } from "@/shared/utils/invalidate";

export default function GoogleLoginButton() {
  const queryClient = useQueryClient();
  const router = useRouter();

  const googleLoginMutation = useGoogleLogin({
    onError: (err) => {
      if (err instanceof FetchError) {
        toast.error(err.message);
      } else {
        toast.error("Something went wrong");
      }
    },
    onSuccess: () => {
      invalidateUserScope(queryClient);
      router.replace("/");
    }
  });

  return (
    <div className="w-full space-y-2 relative">
      <GoogleLogin
        theme="outline"
        size="large"
        text="continue_with"
        onSuccess={(credentialResponse) => {
          const idToken = credentialResponse.credential;
          if (!idToken) return;
          googleLoginMutation.mutate(idToken);
        }}
        onError={() => {
          console.error("Google Login Failed");
        }}
      />
    </div>
  );
}
