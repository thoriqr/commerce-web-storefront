"use client";

import { GoogleLogin } from "@react-oauth/google";
import { useGoogleLogin } from "../hooks/use-google-login";
import { useRouter } from "next/navigation";
import { FetchError } from "@/shared/types/api-error";
import { toast } from "sonner";

export default function GoogleLoginButton() {
  const router = useRouter();
  const googleLogin = useGoogleLogin();

  return (
    <div className="w-full space-y-2 relative">
      <GoogleLogin
        theme="outline"
        size="large"
        text="continue_with"
        onSuccess={async (credentialResponse) => {
          const idToken = credentialResponse.credential;

          if (!idToken) return;

          try {
            await googleLogin.mutateAsync(idToken);
            router.replace("/");
          } catch (err) {
            if (err instanceof FetchError) {
              toast.error(err.message);
            } else {
              toast.error("Something went wrong");
            }
          }
        }}
        onError={() => {
          console.error("Google Login Failed");
        }}
      />
    </div>
  );
}
