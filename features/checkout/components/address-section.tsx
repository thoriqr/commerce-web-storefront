"use client";

import { useState } from "react";
import { CheckoutSession } from "../types";
import { Button } from "@/components/ui/button";
import { useAddresses } from "@/features/user/hooks/use-addresses";
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
import { Loader2 } from "lucide-react";
import { cn } from "@/lib/utils";
import { useSetAddress } from "../hooks/use-set-address";
import { Badge } from "@/components/ui/badge";
import AddressForm from "@/features/shipping/components/address-form";

type Props = {
  sessionId: number;
  address: CheckoutSession["address"];
};

export function AddressSection({ sessionId, address }: Props) {
  const [open, setOpen] = useState(false);
  const [createOpen, setCreateOpen] = useState(false);
  const [selectedId, setSelectedId] = useState<number | null>(null);
  const { data, isLoading, error, refetch } = useAddresses(open);
  const setAddressMutation = useSetAddress();

  return (
    <>
      <div className="space-y-3">
        <h2 className="text-sm font-medium">Shipping Address</h2>

        {!address ? (
          <div className="flex gap-2">
            <Button size="sm" onClick={() => setOpen(true)}>
              Select Address
            </Button>

            <Dialog open={createOpen} onOpenChange={setCreateOpen}>
              <DialogTrigger asChild>
                <Button size="sm" variant="outline">
                  Create New Address
                </Button>
              </DialogTrigger>
              <DialogContent className="sm:max-w-lg" onOpenAutoFocus={(e) => e.preventDefault()}>
                <DialogHeader>
                  <DialogTitle>Add New Address</DialogTitle>
                  <DialogDescription>Enter your shipping details below. This address will be used for delivery.</DialogDescription>
                </DialogHeader>

                <div className="max-h-[70vh] overflow-y-auto pr-2">
                  <AddressForm
                    key="create"
                    onCancel={() => {
                      setCreateOpen(false);
                    }}
                  />
                </div>
              </DialogContent>
            </Dialog>
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
      </div>

      <Dialog open={open} onOpenChange={setOpen}>
        <DialogContent>
          <DialogHeader>
            <DialogTitle>Select shipping address</DialogTitle>
            <DialogDescription>Choose the address where you want your order to be delivered.</DialogDescription>
          </DialogHeader>
          <div className="max-h-[70vh] overflow-y-auto space-y-3">
            {isLoading ? (
              <div className="flex items-center justify-center min-h-75">
                <Loader2 className="h-6 w-6 animate-spin" />
              </div>
            ) : error ? (
              <div className="flex flex-col items-center justify-center gap-2 min-h-75 text-center">
                <p className="text-sm font-medium">Failed to load address</p>
                <p className="text-xs text-muted-foreground">Please try again or reopen the dialog.</p>

                <Button
                  size="sm"
                  variant="outline"
                  onClick={() => {
                    refetch();
                  }}
                >
                  Retry
                </Button>
              </div>
            ) : (
              data?.addresses.map((a) => (
                <div
                  key={a.id}
                  onClick={() => setSelectedId(a.id)}
                  className={cn(
                    "border rounded-md p-3 cursor-pointer text-sm transition-colors",
                    selectedId === a.id ? "border-primary bg-primary/5" : "hover:border-muted-foreground/40"
                  )}
                >
                  {/* Top row */}
                  <div className="flex items-center justify-between gap-2">
                    <div className="flex items-center gap-2 flex-wrap">
                      <p className="font-medium">{a.recipientName}</p>

                      {/* Label (Home, Office, etc) */}
                      {a.label?.trim() && <span className="text-[10px] px-2 py-0.5 rounded bg-muted text-muted-foreground">{a.label}</span>}

                      {/* Default badge */}
                      {a.isDefault && (
                        <Badge variant="secondary" className="text-[10px]">
                          Default
                        </Badge>
                      )}
                    </div>
                  </div>

                  {/* Address */}
                  <p className="text-xs text-muted-foreground mt-1 leading-relaxed">
                    {a.addressLine}, {a.cityName}
                  </p>
                </div>
              ))
            )}
          </div>

          <DialogFooter className="flex justify-end">
            <DialogClose asChild>
              <Button type="button">Close</Button>
            </DialogClose>
            <Button
              disabled={!selectedId || setAddressMutation.isPending}
              onClick={async () => {
                await setAddressMutation.mutateAsync({
                  sessionId,
                  addressId: selectedId!
                });

                setOpen(false);
              }}
            >
              {setAddressMutation.isPending ? "Saving..." : "Confirm"}
            </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>
    </>
  );
}
