"use client";

import { useState } from "react";
import { CheckoutSession } from "../types";
import { Button } from "@/components/ui/button";

type Props = {
  address: CheckoutSession["address"];
};

export function AddressSection({ address }: Props) {
  const [open, setOpen] = useState(false);

  return (
    <div className="space-y-3">
      <h2 className="text-sm font-medium">Shipping Address</h2>

      {!address ? (
        <div className="flex gap-2">
          <Button size="sm" onClick={() => setOpen(true)}>
            Select Address
          </Button>

          <Button size="sm" variant="outline" onClick={() => setOpen(true)}>
            Create New Address
          </Button>
        </div>
      ) : (
        <div className="border rounded-md p-3 text-sm space-y-1">
          <p className="font-medium">{address.recipientName}</p>
          <p>{address.phone}</p>
          <p>
            {address.addressLine}, {address.districtName}, {address.cityName}, {address.provinceName} {address.postalCode}
          </p>

          <div className="pt-2">
            <Button size="sm" variant="outline" onClick={() => setOpen(true)}>
              Change Address
            </Button>
          </div>
        </div>
      )}

      {/* dialog address list */}
    </div>
  );
}
