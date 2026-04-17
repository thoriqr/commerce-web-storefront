"use client";

import { OrderListing } from "../../types";
import { formatRupiah } from "@/shared/utils/formatter";
import { getImageUrl } from "@/shared/utils/media";
import Image from "next/image";
import { OrderStatusBadge } from "../badge/order-status-badge";
import { Button } from "@/components/ui/button";
import Link from "next/link";
import { useConfirmDeliver } from "../../hooks/use-confirm-deliver";
import {
  Dialog,
  DialogClose,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger
} from "@/components/ui/dialog";
import { useState } from "react";
import { useQueryClient } from "@tanstack/react-query";
import { QUERY_KEYS } from "../../constants";
import { FetchError } from "@/shared/types/api-error";
import { toast } from "sonner";
import { navigateProductPage } from "@/shared/utils/navigate-product-page";

export function OrderRow({ order }: { order: OrderListing["items"][number] }) {
  const queryClient = useQueryClient();
  const [open, setOpen] = useState(false);
  const imageUrl = order.previewItem.imageKey ? getImageUrl(order.previewItem.imageKey) : null;

  const confirmDeliverMutation = useConfirmDeliver({
    onSuccess: () => {
      toast.success("Thanks! Order marked as received 📦");
      // refetch order
      queryClient.invalidateQueries({
        queryKey: [QUERY_KEYS.ORDER, order.orderCode]
      });

      queryClient.invalidateQueries({
        queryKey: [QUERY_KEYS.ORDERS]
      });

      setOpen(false);
    },

    onError: (error) => {
      if (error instanceof FetchError) {
        // generic API error
        toast.error("Request failed", {
          description: error.message,
          duration: 5000
        });

        return;
      }

      // fallback
      toast.error("Something went wrong", {
        duration: 5000
      });
    }
  });

  return (
    <div className="rounded-md border p-3 hover:bg-muted/50 transition space-y-3">
      {/* TOP */}
      <div className="flex gap-3 w-fit">
        {/* IMAGE */}
        <Link href={navigateProductPage(order.productId, order.slug)} className="relative w-16 h-16 rounded-md overflow-hidden bg-muted shrink-0">
          {imageUrl ? (
            <Image src={imageUrl} alt={order.previewItem.name} fill sizes="64px" className="object-cover" />
          ) : (
            <div className="w-full h-full flex items-center justify-center text-xs text-muted-foreground">No Image</div>
          )}
        </Link>
        {/* INFO */}
        <div className="flex-1 min-w-0 space-y-1">
          <Link href={navigateProductPage(order.productId, order.slug)} className="text-sm font-medium line-clamp-2">
            {order.previewItem.name}
          </Link>

          <p className="text-[11px] text-muted-foreground">#{order.orderCode}</p>

          <p className="text-xs text-muted-foreground">
            {order.itemCount} item{order.itemCount > 1 ? "s" : ""} • {new Date(order.createdAt).toLocaleDateString("id-ID")}
          </p>
        </div>
      </div>
      <div className="flex gap-3"></div>

      {/* STATUS + PRICE */}
      <div className="flex items-center justify-between">
        <OrderStatusBadge status={order.status} />

        <p className="text-sm font-semibold">{formatRupiah(order.total)}</p>
      </div>

      {/* ACTIONS */}
      <div className="flex gap-2">
        {/* VIEW DETAIL */}
        <Link target="_blank" rel="noopener noreferrer" href={`/order/${order.orderCode}`} className="flex-1">
          <Button size="sm" variant="outline" className="w-full">
            View Details
          </Button>
        </Link>

        {/* CONFIRM */}
        {order.canConfirm && (
          <Dialog open={open} onOpenChange={setOpen}>
            <DialogTrigger asChild>
              <Button size="sm">Mark as Received</Button>
            </DialogTrigger>

            <DialogContent>
              <DialogHeader>
                <DialogTitle>Mark this order as received?</DialogTitle>
                <DialogDescription>Make sure you have received the package before confirming.</DialogDescription>
              </DialogHeader>

              <DialogFooter>
                {/* CLOSE */}
                <DialogClose asChild>
                  <Button variant="ghost">Not yet</Button>
                </DialogClose>

                {/* CONFIRM */}
                <Button size="sm" disabled={confirmDeliverMutation.isPending} onClick={() => confirmDeliverMutation.mutate(order.orderCode)}>
                  {confirmDeliverMutation.isPending ? "Processing..." : "Yes, I've received it"}
                </Button>
              </DialogFooter>
            </DialogContent>
          </Dialog>
        )}
      </div>
    </div>
  );
}
