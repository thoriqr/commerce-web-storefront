"use client";

import { useState } from "react";
import { Button } from "@/components/ui/button";
import { useShippingCost } from "../hooks/use-shipping-cost";
import { COURIERS } from "../constants";
import { Skeleton } from "@/components/ui/skeleton";
import { useSetShipping } from "../hooks/use-set-shipping";
import { cn } from "@/lib/utils";

type Props = {
  sessionId: number;
  disabled?: boolean;
};

function isValidService(opt: { service: string; cost: number; etd: string }) {
  return opt.service && opt.cost > 0 && opt.etd && opt.etd.trim() !== "";
}

export function ShippingSection({ sessionId, disabled }: Props) {
  const [courier, setCourier] = useState<string | null>(null);
  const [selectedService, setSelectedService] = useState<string | null>(null);

  const shippingMutation = useShippingCost();
  const setShippingMutation = useSetShipping();

  const data = shippingMutation.data;
  const loading = shippingMutation.isPending;

  async function handleSelectCourier(code: string) {
    setCourier(code);
    setSelectedService(null);

    await shippingMutation.mutateAsync({
      sessionId,
      courier: code
    });
  }

  return (
    <div className="space-y-3">
      <h2 className="text-sm font-medium">Shipping Method</h2>
      {/* COURIER SELECT */}
      <div className="flex gap-2 flex-wrap">
        {COURIERS.map((c) => (
          <Button
            key={c.value}
            size="sm"
            variant={courier === c.value ? "default" : "outline"}
            onClick={() => handleSelectCourier(c.value)}
            disabled={disabled || loading}
          >
            {c.label}
          </Button>
        ))}
      </div>

      {loading ? (
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
      ) : data?.services?.length ? (
        <div className="space-y-2">
          {data.services.map((opt) => {
            const isValid = isValidService(opt);

            return (
              <div
                key={opt.service}
                onClick={async () => {
                  if (!isValid || !courier || setShippingMutation.isPending) return;

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
                  selectedService === opt.service && isValid && "border-primary bg-primary/5",
                  setShippingMutation.isPending && "opacity-60 pointer-events-none"
                )}
              >
                <div className="flex justify-between text-sm">
                  <div>
                    <p className="font-medium">
                      {opt.name} - {opt.service}
                    </p>

                    <p className="text-xs text-muted-foreground">
                      {opt.description} • {opt.etd || "No estimation"}
                    </p>

                    {!isValid && <p className="text-[11px] text-destructive mt-1">This shipping option is currently unavailable</p>}
                  </div>

                  <p className="font-medium">Rp {opt.cost.toLocaleString("id-ID")}</p>
                </div>
              </div>
            );
          })}
        </div>
      ) : null}
    </div>
  );
}
