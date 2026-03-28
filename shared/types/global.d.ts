import type { Snap } from "./midtrans";

declare global {
  interface Window {
    snap?: Snap;
  }
}

export {};
