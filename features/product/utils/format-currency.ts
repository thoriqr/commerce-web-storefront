import { PRICE_MAX_LIMIT } from "../constants";

export function formatCurrency(value: string | number | undefined) {
  if (!value && value !== 0) return "";

  const number = Number(value);
  if (isNaN(number)) return "";

  return new Intl.NumberFormat("id-ID").format(number);
}

export function sanitizeNumber(value: string) {
  const cleaned = value.replace(/\D/g, "");

  if (!cleaned) return "";

  const num = Number(cleaned);

  if (num > PRICE_MAX_LIMIT) {
    return String(PRICE_MAX_LIMIT);
  }

  return String(num);
}
