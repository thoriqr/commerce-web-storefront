import { OrderDetail } from "../types";

export default function ShippingAddress({ data }: { data: OrderDetail }) {
  return (
    <div className="space-y-4 text-sm">
      <h2 className="text-sm font-medium">Shipping</h2>

      <div>
        <p className="font-medium">
          {data.shipping.courierName} ({data.shipping.courierService})
        </p>
        <p className="text-xs text-muted-foreground">Estimation: {data.shipping.etd}</p>
      </div>

      <div>
        <p className="font-medium">{data.address.recipientName}</p>
        <p className="text-xs text-muted-foreground">{data.address.phone}</p>

        <p className="text-xs text-muted-foreground leading-relaxed">
          {[data.address.addressLine, data.address.districtName, data.address.cityName, data.address.provinceName, data.address.postalCode]
            .filter(Boolean)
            .join(", ")}
        </p>
      </div>
    </div>
  );
}
