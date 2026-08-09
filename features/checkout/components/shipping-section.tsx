"use client";

import { useState } from "react";
import { Button } from "@/components/ui/button";
import { useShippingCost } from "../hooks/use-shipping-cost";
import { COURIERS, QUERY_KEYS } from "../constants";
import { Skeleton } from "@/components/ui/skeleton";
import { useSetShipping } from "../hooks/use-set-shipping";
import { cn } from "@/lib/utils";
import { formatRupiah } from "@/shared/utils/formatter";
import { useQueryClient } from "@tanstack/react-query";
import { useRouter } from "next/navigation";
import { handleCheckoutError } from "../util";
import { handleSessionError } from "@/shared/lib/session-error";

type Props = {
  sessionId: number;
  disabled?: boolean;
  isLocked: boolean;
};

function isValidService(opt: { service: string; cost: number; etd: string }) {
  return opt.service && opt.cost > 0 && opt.etd && opt.etd.trim() !== "";
}

export function ShippingSection({ sessionId, disabled, isLocked }: Props) {
  const router = useRouter();
  const queryClient = useQueryClient();
  const [courier, setCourier] = useState<string | null>(null);
  const [selectedService, setSelectedService] = useState<string | null>(null);

  const shippingMutation = useShippingCost({
    onError: (error) => {
      if (handleSessionError(error, queryClient)) {
        return;
      }

      handleCheckoutError(error, router);
    }
  });

  const setShippingMutation = useSetShipping({
    onSuccess: () => {
      queryClient.invalidateQueries({
        queryKey: [QUERY_KEYS.CHECKOUT_SESSION, sessionId]
      });
    },
    onError: (error) => {
      if (handleSessionError(error, queryClient)) {
        return;
      }

      handleCheckoutError(error, router);
    }
  });

  const data = shippingMutation.data;
  const isLoadingShipping = shippingMutation.isPending;
  const isCourierDisabled = disabled || isLoadingShipping || isLocked;
  const isServiceDisabled = setShippingMutation.isPending || isLocked;

  function handleSelectCourier(code: string) {
    if (isCourierDisabled) {
      return;
    }
    setCourier(code);
    setSelectedService(null);

    shippingMutation.mutate({
      sessionId,
      courier: code
    });
  }

  const services = data?.services ?? [];

  return (
    <div className="space-y-3">
      <h2 className="text-sm font-medium">Shipping Method</h2>

      {/* DISABLED MESSAGE */}
      {disabled && <div className="text-xs text-muted-foreground border border-dashed rounded-md p-3">Please select a shipping address first.</div>}

      {/* COURIER SELECT */}
      <div className="flex gap-2 flex-wrap">
        {COURIERS.map((c) => (
          <Button
            key={c.value}
            size="sm"
            variant={courier === c.value ? "default" : "outline"}
            onClick={() => handleSelectCourier(c.value)}
            disabled={isCourierDisabled}
          >
            {c.label}
          </Button>
        ))}
      </div>

      {/* EMPTY STATE (Courier not yet selected) */}
      {!isLoadingShipping && courier === null && !disabled && (
        <div className="text-xs text-muted-foreground border border-dashed rounded-md p-3">Choose a courier to see available shipping options.</div>
      )}

      {/* LOADING */}
      {isLoadingShipping && (
        <div className="space-y-2">
          {Array.from({ length: 2 }).map((_, i) => (
            <div key={i} className="border rounded-md p-3">
              <div className="flex justify-between text-sm">
                <div className="space-y-2">
                  <Skeleton className="h-4 w-40" />
                  <Skeleton className="h-3 w-28" />
                </div>

                <Skeleton className="h-4 w-16" />
              </div>
            </div>
          ))}
        </div>
      )}

      {/* SERVICES */}
      {!isLoadingShipping && services.length > 0 && (
        <div className="space-y-2">
          {services.map((opt) => {
            const isValid = isValidService(opt);
            const isSelected = selectedService === opt.service;

            return (
              <div
                key={opt.service}
                onClick={async () => {
                  if (!isValid || !courier || isLocked || setShippingMutation.isPending) return;

                  setSelectedService(opt.service);

                  try {
                    await setShippingMutation.mutateAsync({
                      sessionId,
                      payload: {
                        courierCode: courier,
                        courierService: opt.service
                      }
                    });
                  } catch {
                    setSelectedService(null);
                  }
                }}
                className={cn(
                  "border rounded-md p-3 transition",
                  isValid ? "cursor-pointer hover:border-primary" : "opacity-50 cursor-not-allowed",
                  isSelected && isValid && "border-primary bg-primary/5",
                  isServiceDisabled && "opacity-60 pointer-events-none"
                )}
              >
                <div className="flex justify-between text-sm gap-3">
                  <div className="space-y-1">
                    <p className="font-medium">
                      {opt.name} - {opt.service}
                    </p>

                    <p className="text-xs text-muted-foreground">
                      {opt.description} • {opt.etd || "No estimation"}
                    </p>

                    {!isValid && <p className="text-[11px] text-destructive">This shipping option is currently unavailable</p>}
                  </div>

                  <p className="font-medium shrink-0">{formatRupiah(opt.cost)}</p>
                </div>
              </div>
            );
          })}
        </div>
      )}

      {/* NO RESULT */}
      {!isLoadingShipping && courier && data?.services?.length === 0 && (
        <div className="text-xs text-muted-foreground border border-dashed rounded-md p-3">No shipping options available for this courier.</div>
      )}
    </div>
  );
}
