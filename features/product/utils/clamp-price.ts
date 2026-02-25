import { PRICE_MAX_LIMIT } from "../constants";

export function clampPrice(value: string) {
  if (!value) return "";

  const num = Number(value);
  if (isNaN(num)) return "";

  if (num > PRICE_MAX_LIMIT) {
    return String(PRICE_MAX_LIMIT);
  }

  if (num < 0) return "0";

  return String(num);
}
