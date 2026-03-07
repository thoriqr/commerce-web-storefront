import { notFound } from "next/navigation";

type Props = {
  searchParams: Promise<{ q?: string }>;
};

export default async function ProductsPage({ searchParams }: Props) {
  const { q } = await searchParams;

  if (!q) {
    notFound();
  }

  return <div></div>;
}
