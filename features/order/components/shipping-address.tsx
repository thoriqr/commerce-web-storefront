import { OrderDetail } from "../types";

export default function ShippingAddress({ data }: { data: OrderDetail }) {
  const { shipping, address } = data;

  return (
    <div className="space-y-4 text-sm">
      <h2 className="text-sm font-medium">Shipping</h2>

      {/* COURIER */}
      <div className="space-y-1">
        <p className="text-xs text-muted-foreground">Courier</p>

        <p className="font-medium">
          {shipping.courierName} ({shipping.courierService})
        </p>

        <p className="text-xs text-muted-foreground">Estimation: {shipping.etd}</p>

        {shipping.trackingNumber && (
          <p className="text-xs text-muted-foreground">
            Tracking: <span className="font-medium text-foreground">{shipping.trackingNumber}</span>
          </p>
        )}
      </div>

      <div className="border-t" />

      {/* ADDRESS */}
      <div className="space-y-1">
        <p className="text-xs text-muted-foreground">Delivery Address</p>

        <p className="font-medium">{address.recipientName}</p>
        <p className="text-xs text-muted-foreground">{address.phone}</p>

        <p className="text-xs text-muted-foreground leading-relaxed">
          {[address.addressLine, address.districtName, address.cityName, address.provinceName, address.postalCode].filter(Boolean).join(", ")}
        </p>
      </div>
    </div>
  );
}
