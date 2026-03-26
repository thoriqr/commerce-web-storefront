"use client";

import { Button } from "@/components/ui/button";
import { Field, FieldGroup, FieldLabel } from "@/components/ui/field";
import { Input } from "@/components/ui/input";
import { useState } from "react";
import { AddressSelect } from "./address-select";
import { AddressDetail } from "@/features/user/types";
import { useUpdateAddress } from "@/features/user/hooks/use-update-address";
import { useCreateAddress } from "@/features/user/hooks/use-create-address";

type Props = {
  onCancel?: () => void;
  initialData?: AddressDetail;
  addressId?: number;
};

export default function AddressForm({ onCancel, initialData, addressId }: Props) {
  const isEdit = !!addressId;
  const [label, setLabel] = useState(initialData?.label ?? "");
  const [recipientName, setRecipientName] = useState(initialData?.recipientName ?? "");
  const [phone, setPhone] = useState(initialData?.phone ?? "");
  const [addressLine, setAddressLine] = useState(initialData?.addressLine ?? "");
  const [postalCode, setPostalCode] = useState(initialData?.postalCode ?? "");

  const updateMutation = useUpdateAddress();
  const createMutation = useCreateAddress();

  const [address, setAddress] = useState({
    provinceId: initialData?.shippingProvinceId ?? "",
    cityId: initialData?.shippingCityId ?? "",
    districtId: initialData?.shippingDistrictId ?? ""
  });

  const [errors, setErrors] = useState<{
    province?: string;
    city?: string;
    district?: string;
  }>({});

  const mutationIsPending = updateMutation.isPending || createMutation.isPending;

  const buttonDisabled =
    !recipientName || !phone || !addressLine || !address.provinceId || !address.cityId || !address.districtId || mutationIsPending;

  async function handleSubmit(e: React.SubmitEvent<HTMLFormElement>) {
    e.preventDefault();

    const newErrors: typeof errors = {};

    if (!address.provinceId) newErrors.province = "Province is required";
    if (!address.cityId) newErrors.city = "City is required";
    if (!address.districtId) newErrors.district = "District is required";

    if (Object.keys(newErrors).length > 0) {
      setErrors(newErrors);
      return;
    }

    const payload = {
      label,
      recipientName,
      phone,
      addressLine,
      postalCode,
      shippingProvinceId: Number(address.provinceId),
      shippingCityId: Number(address.cityId),
      shippingDistrictId: Number(address.districtId)
    };

    const result = isEdit ? await updateMutation.mutateAsync({ addressId, payload }) : await createMutation.mutateAsync(payload);

    if (!result.ok) return;

    onCancel?.();
  }

  return (
    <form onSubmit={handleSubmit}>
      <FieldGroup>
        <Field>
          <FieldLabel htmlFor="label">Label (optional)</FieldLabel>
          <Input
            id="label"
            autoFocus={false}
            type="text"
            placeholder="e.g. Home, Office"
            value={label}
            onChange={(e) => {
              if (e.target.value.length > 50) return;
              setLabel(e.target.value);
            }}
            disabled={mutationIsPending}
          />

          <p className="text-xs text-muted-foreground text-right">{label.length}/50</p>
        </Field>

        <Field>
          <FieldLabel htmlFor="recipient-name">Recipient Name</FieldLabel>
          <Input
            id="recipient-name"
            type="text"
            autoFocus={!isEdit}
            autoComplete="name"
            placeholder="Full name (e.g. John Doe)"
            value={recipientName}
            onChange={(e) => {
              if (e.target.value.length > 120) return;
              setRecipientName(e.target.value);
            }}
            disabled={mutationIsPending}
            required
          />

          <p className="text-xs text-muted-foreground text-right">{recipientName.length}/120</p>
        </Field>
        <Field>
          <FieldLabel htmlFor="phone">Phone</FieldLabel>
          <Input
            id="phone"
            type="text"
            placeholder="Phone number (e.g. 08123456789)"
            inputMode="numeric"
            autoFocus={false}
            value={phone}
            onChange={(e) => {
              let val = e.target.value;

              val = val.replace(/\D/g, "");

              if (val.length > 30) return;

              setPhone(val);
            }}
            disabled={mutationIsPending}
            required
          />
        </Field>

        <Field>
          <FieldLabel htmlFor="address-line">Address Line</FieldLabel>
          <Input
            id="address-line"
            type="text"
            autoFocus={false}
            placeholder="Street address (e.g. Jl. Sudirman No. 10)"
            value={addressLine}
            onChange={(e) => {
              if (e.target.value.length > 255) return;
              setAddressLine(e.target.value);
            }}
            disabled={mutationIsPending}
            required
          />

          <p className="text-xs text-muted-foreground text-right">{addressLine.length}/255</p>
        </Field>

        <Field>
          <FieldLabel htmlFor="postal-code">Postal Code</FieldLabel>
          <Input
            id="postal-code"
            type="text"
            autoFocus={false}
            inputMode="numeric"
            placeholder="Postal code (e.g. 60123)"
            value={postalCode}
            onChange={(e) => {
              let val = e.target.value;

              val = val.replace(/\D/g, "");

              if (val.length > 5) return;

              setPostalCode(val);
            }}
            disabled={mutationIsPending}
          />
        </Field>

        <Field>
          <FieldLabel>Address Location</FieldLabel>

          <AddressSelect
            value={address}
            onChange={(val) => {
              setAddress(val);

              // clear error
              setErrors((prev) => {
                const next = { ...prev };

                if (val.provinceId) delete next.province;
                if (val.cityId) delete next.city;
                if (val.districtId) delete next.district;

                return next;
              });
            }}
            errors={errors}
          />
        </Field>

        <Field>
          <div className="flex gap-2 justify-end">
            <Button type="button" variant="outline" onClick={onCancel} disabled={mutationIsPending}>
              Cancel
            </Button>

            <Button type="submit" disabled={buttonDisabled}>
              {mutationIsPending ? "Saving..." : "Save"}
            </Button>
          </div>
        </Field>
      </FieldGroup>
    </form>
  );
}
