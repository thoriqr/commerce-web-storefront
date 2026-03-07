"use client";

import { GoogleLogin } from "@react-oauth/google";
import { useGoogleLogin } from "../hooks/use-google-login";
import { useRouter } from "next/navigation";

export default function GoogleLoginButton() {
  const router = useRouter();
  const googleLogin = useGoogleLogin();

  const apiError = googleLogin.data && !googleLogin.data.ok ? googleLogin.data.error.message : undefined;

  return (
    <div className="w-full space-y-2">
      <GoogleLogin
        theme="outline"
        size="large"
        text="continue_with"
        onSuccess={async (credentialResponse) => {
          const idToken = credentialResponse.credential;

          if (!idToken) return;

          const result = await googleLogin.mutateAsync(idToken);

          if (!result.ok) return;

          router.replace("/");
        }}
        onError={() => {
          console.error("Google Login Failed");
        }}
      />

      {apiError && <p className="text-sm text-destructive text-center">{apiError}</p>}
    </div>
  );
}
