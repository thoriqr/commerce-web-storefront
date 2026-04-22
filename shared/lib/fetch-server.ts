const STORE_URL = `${process.env.NEXT_PUBLIC_API_URL!}/store`;

export async function fetchServer<T>(path: string): Promise<T | null> {
  const res = await fetch(`${STORE_URL}${path}`);
  const json = await res.json().catch(() => null);

  if (!res.ok) {
    return null;
  }

  return json.data as T;
}
