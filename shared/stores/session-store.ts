import { create } from "zustand";

type SessionStore = {
  sessionExpired: boolean;
  showSessionExpired: () => void;
  hideSessionExpired: () => void;
};

export const useSessionStore = create<SessionStore>((set) => ({
  sessionExpired: false,

  showSessionExpired: () => {
    set({ sessionExpired: true });
  },

  hideSessionExpired: () => {
    set({ sessionExpired: false });
  }
}));
