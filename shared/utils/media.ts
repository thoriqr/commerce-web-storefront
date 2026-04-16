const BASE_URL = process.env.NEXT_PUBLIC_ASSET_BASE_URL!;

export function getImageUrl(key: string): string {
  return `${BASE_URL}/${key}`;
}
