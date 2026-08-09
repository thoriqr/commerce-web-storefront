"use client";

import SessionExpiredDialog from "@/features/auth/components/session-expired-dialog";
import { useSessionStore } from "@/shared/stores/session-store";

export default function SessionExpiredDialogProvider() {
  const sessionExpired = useSessionStore((state) => state.sessionExpired);

  const hideSessionExpired = useSessionStore((state) => state.hideSessionExpired);

  if (!sessionExpired) {
    return null;
  }

  return (
    <SessionExpiredDialog
      onLogin={() => {
        hideSessionExpired();
      }}
    />
  );
}
