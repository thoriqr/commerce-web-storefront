"use client";

import { useState } from "react";
import { Button } from "@/components/ui/button";
import { useShippingCost } from "../hooks/use-shipping-cost";
import { COURIERS } from "../constants";

type Props = {
  sessionId: number;
  disabled?: boolean;
};

export function ShippingSection({ sessionId, disabled }: Props) {
  const [courier, setCourier] = useState<string | null>(null);
  const [selectedService, setSelectedService] = useState<string | null>(null);

  const shippingMutation = useShippingCost();

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

      {/* LOADING */}
      {loading && <p className="text-sm text-muted-foreground">Calculating shipping...</p>}
      {/* SERVICES */}
      {data?.services?.length ? (
        <div className="space-y-2">
          {data.services.map((opt) => (
            <div
              key={opt.service}
              onClick={() => setSelectedService(opt.service)}
              className={`border rounded-md p-3 cursor-pointer transition
                ${selectedService === opt.service ? "border-primary " : "hover:border-primary"}`}
            >
              <div className="flex justify-between text-sm">
                <div>
                  <p className="font-medium">
                    {opt.name} - {opt.service}
                  </p>

                  <p className="text-xs text-muted-foreground">
                    {opt.description} • {opt.etd}
                  </p>
                </div>

                <p className="font-medium">Rp {opt.cost.toLocaleString("id-ID")}</p>
              </div>
            </div>
          ))}
        </div>
      ) : null}
    </div>
  );
}
