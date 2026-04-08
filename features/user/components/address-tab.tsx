"use client";

import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { useAddresses } from "../hooks/use-addresses";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { useState } from "react";
import { Dialog, DialogContent, DialogDescription, DialogHeader, DialogTitle } from "@/components/ui/dialog";
import AddressForm from "@/features/shipping/components/address-form";
import { AddressTabSkeleton } from "./skeletons/address-tab-skeleton";
import { useAddress } from "../hooks/use-address";
import { Loader2, Plus } from "lucide-react";
import { useDeleteAddress } from "../hooks/use-delete-address";
import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
  AlertDialogTrigger
} from "@/components/ui/alert-dialog";
import { useSetDefaultAddress } from "../hooks/use-set-default-address";

export default function AddressTab() {
  const [open, setOpen] = useState(false);
  const [editingId, setEditingId] = useState<number | null>(null);
  const { data, isLoading } = useAddresses();
  const deleteMutation = useDeleteAddress();
  const setDefaultMutation = useSetDefaultAddress();
  const { data: address, isLoading: addressIsLoading, error: addressError, refetch: addressRefetch } = useAddress(editingId);

  if (isLoading) return <AddressTabSkeleton />;

  if (!data) return null;

  const { addresses, limit } = data;
  const isLimitReached = addresses.length >= limit;

  return (
    <>
      <Card>
        <CardHeader className="flex flex-row items-center justify-between">
          <CardTitle>Addresses</CardTitle>

          <Button size="sm" disabled={isLimitReached} onClick={() => setOpen(true)}>
            <Plus />
            Add Address
          </Button>
        </CardHeader>

        <CardContent>
          {/* EMPTY STATE */}
          {addresses.length === 0 ? (
            <div className="text-sm text-muted-foreground space-y-3">
              <p>No address yet</p>

              <Button size="sm" onClick={() => setOpen(true)}>
                Create your first address
              </Button>
            </div>
          ) : (
            <div className="space-y-3">
              {addresses.map((addr) => (
                <div key={addr.id} className="border rounded-md p-4 space-y-3">
                  {/* HEADER */}
                  <div className="flex items-center justify-between">
                    <div className="flex items-center gap-2 flex-wrap">
                      {addr.label && (
                        <Badge variant="secondary" className="font-normal">
                          {addr.label}
                        </Badge>
                      )}

                      <p className="font-medium">{addr.recipientName}</p>

                      {addr.isDefault && <Badge>Default</Badge>}
                    </div>
                  </div>

                  {/* BODY */}
                  <div className="text-sm text-muted-foreground space-y-1">
                    <p>{addr.phone}</p>

                    <p>
                      {addr.addressLine}, {addr.districtName}, {addr.cityName}, {addr.provinceName}
                      {addr.postalCode && ` ${addr.postalCode}`}
                    </p>
                  </div>

                  {/* ACTIONS */}
                  <div className="flex gap-2 pt-2 flex-wrap">
                    {!addr.isDefault && (
                      <Button size="sm" variant="outline" onClick={() => setDefaultMutation.mutate(addr.id)}>
                        Set as default
                      </Button>
                    )}

                    <Button
                      size="sm"
                      variant="ghost"
                      onClick={() => {
                        setEditingId(addr.id);
                        setOpen(true);
                      }}
                    >
                      Edit
                    </Button>

                    <AlertDialog>
                      <AlertDialogTrigger asChild>
                        <Button size="sm" variant="destructive" disabled={deleteMutation.isPending}>
                          Delete
                        </Button>
                      </AlertDialogTrigger>

                      <AlertDialogContent>
                        <AlertDialogHeader>
                          <AlertDialogTitle>Delete address?</AlertDialogTitle>
                          <AlertDialogDescription>This action cannot be undone. This address will be permanently removed.</AlertDialogDescription>
                        </AlertDialogHeader>

                        <AlertDialogFooter>
                          <AlertDialogCancel>Cancel</AlertDialogCancel>

                          <AlertDialogAction onClick={() => deleteMutation.mutate(addr.id)} className="bg-destructive text-destructive-foreground">
                            {deleteMutation.isPending ? "Deleting..." : "Delete"}
                          </AlertDialogAction>
                        </AlertDialogFooter>
                      </AlertDialogContent>
                    </AlertDialog>
                  </div>
                </div>
              ))}
            </div>
          )}
        </CardContent>
      </Card>

      <Dialog
        open={open}
        onOpenChange={(val) => {
          setOpen(val);

          if (!val) {
            setEditingId(null);
          }
        }}
      >
        <DialogContent className="sm:max-w-lg" onOpenAutoFocus={(e) => e.preventDefault()}>
          <DialogHeader>
            <DialogTitle>{editingId ? "Update Address" : "Add New Address"}</DialogTitle>
            <DialogDescription>Enter your shipping details below. This address will be used for delivery.</DialogDescription>
          </DialogHeader>

          <div className="max-h-[70vh] overflow-y-auto pr-2">
            {editingId && addressIsLoading ? (
              <div className="flex items-center justify-center min-h-75">
                <Loader2 className="h-6 w-6 animate-spin" />
              </div>
            ) : editingId && addressError ? (
              <div className="flex flex-col items-center justify-center gap-2 min-h-75 text-center">
                <p className="text-sm font-medium">Failed to load address</p>
                <p className="text-xs text-muted-foreground">Please try again or reopen the dialog.</p>

                <Button
                  size="sm"
                  variant="outline"
                  onClick={() => {
                    addressRefetch();
                  }}
                >
                  Retry
                </Button>
              </div>
            ) : (
              <AddressForm
                key={editingId ?? "create"}
                initialData={editingId ? address : undefined}
                addressId={editingId ?? undefined}
                onCancel={() => {
                  setOpen(false);
                  setEditingId(null);
                }}
              />
            )}
          </div>
        </DialogContent>
      </Dialog>
    </>
  );
}
