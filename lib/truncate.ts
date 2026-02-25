export function truncate(text: string, max = 160) {
  if (!text) return "";

  if (text.length <= max) return text;

  return text.slice(0, max).trimEnd() + "…";
}
