import { OrderListing } from "../../types";
import { formatRupiah } from "@/shared/utils/formatter";
import { getImageUrl } from "@/lib/media";
import Image from "next/image";
import { OrderStatusBadge } from "../badge/order-status-badge";
import { Button } from "@/components/ui/button";
import Link from "next/link";

export function OrderRow({ order }: { order: OrderListing["items"][number] }) {
  const imageUrl = order.previewItem.imageKey ? getImageUrl(order.previewItem.imageKey) : null;

  return (
    <div className="rounded-md border p-3 hover:bg-muted/50 transition space-y-3">
      {/* TOP */}
      <div className="flex gap-3">
        {/* IMAGE */}
        <div className="relative w-16 h-16 rounded-md overflow-hidden bg-muted shrink-0">
          {imageUrl ? (
            <Image src={imageUrl} alt={order.previewItem.name} fill sizes="64px" className="object-cover" />
          ) : (
            <div className="w-full h-full flex items-center justify-center text-xs text-muted-foreground">No Image</div>
          )}
        </div>

        {/* INFO */}
        <div className="flex-1 min-w-0 space-y-1">
          <p className="text-sm font-medium line-clamp-2">{order.previewItem.name}</p>

          <p className="text-[11px] text-muted-foreground">#{order.orderCode}</p>

          <p className="text-xs text-muted-foreground">
            {order.itemCount} item{order.itemCount > 1 ? "s" : ""} • {new Date(order.createdAt).toLocaleDateString("id-ID")}
          </p>
        </div>
      </div>

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
          <Button
            size="sm"
            className="flex-1"
            onClick={(e) => {
              e.stopPropagation();
              console.log("confirm delivered:", order.id); // placeholder
            }}
          >
            Confirm
          </Button>
        )}
      </div>
    </div>
  );
}
