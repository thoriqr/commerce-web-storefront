import ConfirmEmailChange from "@/features/auth/components/confirm-email-change";
import { notFound } from "next/navigation";

type Props = {
  searchParams: Promise<{ token?: string }>;
};

export default async function ConfirmEmailChangePage({ searchParams }: Props) {
  const { token } = await searchParams;

  if (!token) {
    notFound();
  }

  return <ConfirmEmailChange token={token} />;
}
