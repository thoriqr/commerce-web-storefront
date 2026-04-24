const STORE_URL = `${process.env.NEXT_PUBLIC_API_URL!}/store`;

type FetchServerOptions = {
  cache?: RequestCache; // "no-store" | "force-cache"
  revalidate?: number; // ISR
};

export async function fetchServer<T>(path: string, options?: FetchServerOptions): Promise<T | null> {
  const fetchOptions: RequestInit & {
    next?: { revalidate?: number };
  } = {};

  // handle cache
  if (options?.cache) {
    fetchOptions.cache = options.cache;
  }

  // handle revalidate (Next.js specific)
  if (options?.revalidate !== undefined) {
    fetchOptions.next = { revalidate: options.revalidate };
  }

  const res = await fetch(`${STORE_URL}${path}`, fetchOptions);

  const json = await res.json().catch(() => null);

  if (!res.ok) {
    return null;
  }

  return json?.data as T;
}
