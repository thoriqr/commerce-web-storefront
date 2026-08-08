"use client";

import { useState } from "react";
import { CheckoutSession } from "../types";
import { Button } from "@/components/ui/button";
import { useAddresses } from "@/features/user/hooks/use-addresses";
import { Dialog, DialogClose, DialogContent, DialogDescription, DialogFooter, DialogHeader, DialogTitle } from "@/components/ui/dialog";
import { Loader2 } from "lucide-react";
import { cn } from "@/lib/utils";
import { useSetAddress } from "../hooks/use-set-address";
import { Badge } from "@/components/ui/badge";
import { useRouter } from "next/navigation";
import { useQueryClient } from "@tanstack/react-query";
import { QUERY_KEYS } from "../constants";
import { handleCheckoutError } from "../util";
import { CreateAddressDialog } from "./create-address-dialog";

type Props = {
  sessionId: number;
  address: CheckoutSession["address"];
  isLocked: boolean;
};

export function AddressSection({ sessionId, address, isLocked }: Props) {
  const router = useRouter();
  const queryClient = useQueryClient();
  const [open, setOpen] = useState(false);
  const [createOpen, setCreateOpen] = useState(false);
  const [selectedId, setSelectedId] = useState<number | null>(null);
  const { data, isLoading, error, refetch } = useAddresses(open);

  const setAddressMutation = useSetAddress({
    onSuccess: (_, variables) => {
      queryClient.invalidateQueries({
        queryKey: [QUERY_KEYS.CHECKOUT_SESSION, variables.sessionId]
      });
    },
    onError: (error) => handleCheckoutError(error, router)
  });

  return (
    <>
      <CreateAddressDialog
        open={createOpen}
        onOpenChange={setCreateOpen}
        onCreated={(addressId) => {
          setSelectedId(addressId);

          setAddressMutation.mutate({
            sessionId,
            addressId
          });
        }}
      />
      <div className="space-y-3">
        <h2 className="text-sm font-medium">Shipping Address</h2>

        {!address ? (
          <div className="space-y-3">
            {/* EMPTY STATE */}
            <div className="border border-dashed rounded-md p-4 text-sm text-center space-y-2">
              <p className="font-medium">No address selected</p>
              <p className="text-xs text-muted-foreground">Please select or create a shipping address to continue.</p>

              <div className="flex justify-center gap-2 pt-2">
                <Button size="sm" onClick={() => setOpen(true)} disabled={isLocked}>
                  Select Address
                </Button>

                <Button size="sm" variant="outline" onClick={() => setCreateOpen(true)} disabled={isLocked}>
                  Create New
                </Button>
              </div>
            </div>
          </div>
        ) : (
          <div className="border rounded-md p-3 text-sm space-y-2">
            {/* ADDRESS INFO */}
            <div className="space-y-1">
              <p className="font-medium">{address.recipientName}</p>
              <p className="text-xs text-muted-foreground">{address.phone}</p>

              <p className="text-xs text-muted-foreground leading-relaxed">
                {[address.addressLine, address.districtName, address.cityName, address.provinceName, address.postalCode].filter(Boolean).join(", ")}
              </p>
            </div>

            {/* ACTION */}
            <div className="pt-2 flex gap-2">
              <Button size="sm" variant="outline" disabled={isLocked} onClick={() => setOpen(true)}>
                Change Address
              </Button>

              <Button size="sm" variant="outline" disabled={isLocked} onClick={() => setCreateOpen(true)}>
                Create New
              </Button>
            </div>
          </div>
        )}
      </div>

      {/* SELECT ADDRESS DIALOG */}
      <Dialog open={open} onOpenChange={setOpen}>
        <DialogContent>
          <DialogHeader>
            <DialogTitle>Select shipping address</DialogTitle>
            <DialogDescription>Choose the address where you want your order to be delivered.</DialogDescription>
          </DialogHeader>

          <div className="max-h-[70vh] overflow-y-auto space-y-3">
            {isLoading ? (
              <div className="flex items-center justify-center min-h-50">
                <Loader2 className="h-6 w-6 animate-spin" />
              </div>
            ) : error ? (
              <div className="flex flex-col items-center justify-center gap-2 min-h-50 text-center">
                <p className="text-sm font-medium">Failed to load addresses</p>
                <p className="text-xs text-muted-foreground">Please try again.</p>

                <Button size="sm" variant="outline" onClick={() => refetch()}>
                  Retry
                </Button>
              </div>
            ) : data?.addresses.length === 0 ? (
              <div className="flex flex-col items-center justify-center gap-2 min-h-50 text-center">
                <p className="text-sm font-medium">No addresses found</p>
                <p className="text-xs text-muted-foreground">Please create a new address first.</p>
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
                  {/* HEADER */}
                  <div className="flex items-center gap-2 flex-wrap">
                    <p className="font-medium">{a.recipientName}</p>

                    {a.label?.trim() && <span className="text-[10px] px-2 py-0.5 rounded bg-muted text-muted-foreground">{a.label}</span>}

                    {a.isDefault && (
                      <Badge variant="secondary" className="text-[10px]">
                        Default
                      </Badge>
                    )}
                  </div>

                  {/* ADDRESS */}
                  <div className="mt-1 space-y-0.5">
                    <p className="text-xs text-muted-foreground leading-relaxed">{a.addressLine}</p>

                    <p className="text-xs text-muted-foreground">
                      {[a.districtName, a.cityName, a.provinceName, a.postalCode].filter(Boolean).join(", ")}
                    </p>
                  </div>

                  {/* PHONE */}
                  <p className="text-xs text-muted-foreground mt-1">{a.phone}</p>
                </div>
              ))
            )}
          </div>

          <DialogFooter>
            <DialogClose asChild>
              <Button variant="ghost">Close</Button>
            </DialogClose>

            <Button
              disabled={!selectedId || setAddressMutation.isPending}
              onClick={() => {
                setAddressMutation.mutate({
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
