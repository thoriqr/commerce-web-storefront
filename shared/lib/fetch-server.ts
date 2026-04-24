const STORE_URL = `${process.env.NEXT_PUBLIC_API_URL!}/store`;

type FetchOptions = {
  revalidate?: number;
  noStore?: boolean;
};

export async function fetchServer<T>(path: string, options?: FetchOptions): Promise<T | null> {
  const fetchOptions: RequestInit & {
    next?: { revalidate?: number };
    cache?: RequestCache;
  } = {};

  if (options?.noStore) {
    fetchOptions.cache = "no-store";
  } else if (options?.revalidate) {
    fetchOptions.next = { revalidate: options.revalidate };
  }

  const res = await fetch(`${STORE_URL}${path}`, fetchOptions);

  const json = await res.json().catch(() => null);

  if (!res.ok) return null;

  return json.data as T;
}
