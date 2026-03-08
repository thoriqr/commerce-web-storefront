import SearchHeader from "@/features/product/components/search-header";
import SearchProducts from "@/features/product/components/search-products";
import { Metadata } from "next";
import { notFound } from "next/navigation";

type Props = {
  searchParams: Promise<{ q?: string }>;
};

export async function generateMetadata({ searchParams }: Props): Promise<Metadata> {
  const { q } = await searchParams;

  if (!q) {
    return {
      title: "Search products",
      description: "Search products in our catalog."
    };
  }

  const keyword = q.trim();

  const title = `Search results for "${keyword}"`;
  const description = `Browse products matching "${keyword}".`;

  return {
    title,
    description,
    openGraph: {
      title,
      description
    }
  };
}

export default async function ProductsPage({ searchParams }: Props) {
  const { q } = await searchParams;

  if (!q) {
    notFound();
  }

  return (
    <div className="space-y-8">
      <SearchHeader query={q} />
      <SearchProducts query={q} />
    </div>
  );
}
