"use client";

import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Pagination, PaginationContent, PaginationItem, PaginationLink, PaginationNext, PaginationPrevious } from "@/components/ui/pagination";
import { Tabs, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { OrderRow } from "@/features/order/components/order-list/order-row";
import OrderRowSkeleton from "@/features/order/components/order-list/order-row-skeleton";
import { OrdersEmpty } from "@/features/order/components/order-list/orders-empty";
import { OrdersError } from "@/features/order/components/order-list/orders-error";
import { useOrders } from "@/features/order/hooks/use-orders";
import { OrderListingQueryParams } from "@/features/order/types";
import { getPaginationRange } from "@/features/order/utils";
import { usePathname, useRouter, useSearchParams } from "next/navigation";

export default function OrdersTab() {
  const router = useRouter();
  const pathname = usePathname();
  const searchParams = useSearchParams();

  const status = searchParams.get("status") ?? "ongoing";
  const page = Number(searchParams.get("page") ?? 1);

  const { data, isLoading, isError } = useOrders({
    page,
    limit: 10,
    status: status as OrderListingQueryParams["status"]
  });

  function setStatus(newStatus: string) {
    const params = new URLSearchParams(searchParams.toString());

    params.set("status", newStatus);
    params.set("page", "1");

    router.push(`${pathname}?${params.toString()}`);
  }

  function setPage(newPage: number) {
    const params = new URLSearchParams(searchParams.toString());

    params.set("page", String(newPage));

    router.push(`${pathname}?${params.toString()}`);
  }

  const pages = data ? getPaginationRange(page, data.meta.totalPages) : [];

  return (
    <Card>
      <CardHeader className="space-y-4">
        <CardTitle>Orders</CardTitle>

        {/* TABS (ALWAYS RENDER) */}
        <Tabs value={status} onValueChange={setStatus} className="flex place-self-end">
          <TabsList>
            <TabsTrigger value="ongoing">Ongoing</TabsTrigger>
            <TabsTrigger value="completed">Completed</TabsTrigger>
            <TabsTrigger value="cancelled">Cancelled</TabsTrigger>
          </TabsList>
        </Tabs>
      </CardHeader>

      <CardContent className="space-y-4">
        {isLoading && <OrderRowSkeleton />}

        {isError && <OrdersError />}

        {!isLoading && !isError && data?.items.length === 0 && <OrdersEmpty />}

        {!isLoading && !isError && data && data.items.length > 0 && data.items.map((order) => <OrderRow key={order.id} order={order} />)}

        {!isLoading && !isError && data && data.meta.totalPages > 1 && (
          <div className="flex justify-center pt-4">
            <Pagination>
              <PaginationContent>
                {/* PREV */}
                <PaginationItem>
                  <PaginationPrevious
                    onClick={() => data.meta.hasPrev && setPage(page - 1)}
                    className={!data.meta.hasPrev ? "pointer-events-none opacity-50" : "cursor-pointer"}
                  />
                </PaginationItem>

                {/* PAGE NUMBERS */}
                {pages.map((p, i) => {
                  if (p === "...") {
                    return (
                      <PaginationItem key={`ellipsis-${i}`}>
                        <span className="px-2 text-muted-foreground">...</span>
                      </PaginationItem>
                    );
                  }

                  return (
                    <PaginationItem key={p}>
                      <PaginationLink isActive={p === page} onClick={() => setPage(p)} className="cursor-pointer">
                        {p}
                      </PaginationLink>
                    </PaginationItem>
                  );
                })}

                {/* NEXT */}
                <PaginationItem>
                  <PaginationNext
                    onClick={() => data.meta.hasNext && setPage(page + 1)}
                    className={!data.meta.hasNext ? "pointer-events-none opacity-50" : "cursor-pointer"}
                  />
                </PaginationItem>
              </PaginationContent>
            </Pagination>
          </div>
        )}
      </CardContent>
    </Card>
  );
}
