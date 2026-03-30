"use client";

import { Button } from "@/components/ui/button";
import { Field, FieldError, FieldGroup, FieldLabel } from "@/components/ui/field";
import { Input } from "@/components/ui/input";
import { AddressDetail } from "@/features/user/types";
import { useUpdateAddress } from "@/features/user/hooks/use-update-address";
import { useCreateAddress } from "@/features/user/hooks/use-create-address";
import { Controller, FormProvider, useForm } from "react-hook-form";
import { standardSchemaResolver } from "@hookform/resolvers/standard-schema";
import { handleFormError } from "@/shared/utils/form";
import { AddressFormSchema, addressSchema } from "../schema";
import AddressSelectForm from "./address-select-form";

type Props = {
  onCancel?: () => void;
  initialData?: AddressDetail;
  addressId?: number;
};

export default function AddressForm({ onCancel, initialData, addressId }: Props) {
  const isEdit = !!addressId;
  const updateMutation = useUpdateAddress();
  const createMutation = useCreateAddress();
  const mutationIsPending = updateMutation.isPending || createMutation.isPending;

  const form = useForm<AddressFormSchema>({
    resolver: standardSchemaResolver(addressSchema),
    defaultValues: {
      label: initialData?.label ?? "",
      recipientName: initialData?.recipientName ?? "",
      phone: initialData?.phone ?? "",
      addressLine: initialData?.addressLine ?? "",
      postalCode: initialData?.postalCode ?? "",
      shippingProvinceId: initialData?.shippingProvinceId ?? "",
      shippingCityId: initialData?.shippingCityId ?? "",
      shippingDistrictId: initialData?.shippingDistrictId ?? ""
    }
  });

  async function onSubmit(values: AddressFormSchema) {
    const payload = {
      ...values,
      shippingProvinceId: Number(values.shippingProvinceId),
      shippingCityId: Number(values.shippingCityId),
      shippingDistrictId: Number(values.shippingDistrictId)
    };

    try {
      if (isEdit) {
        await updateMutation.mutateAsync({ addressId, payload });
      } else {
        await createMutation.mutateAsync(payload);
      }

      onCancel?.();
    } catch (err) {
      handleFormError(err, form);
    }
  }

  return (
    <FormProvider {...form}>
      <form onSubmit={form.handleSubmit(onSubmit)}>
        <FieldGroup>
          <Controller
            name="label"
            control={form.control}
            render={({ field, fieldState }) => (
              <Field data-invalid={fieldState.invalid}>
                <FieldLabel htmlFor={field.name}>Label</FieldLabel>
                <Input {...field} id={field.name} aria-invalid={fieldState.invalid} placeholder="e.g. Home, Office" disabled={mutationIsPending} />
                {fieldState.invalid && <FieldError errors={[fieldState.error]} />}
              </Field>
            )}
          />

          <Controller
            name="recipientName"
            control={form.control}
            render={({ field, fieldState }) => (
              <Field data-invalid={fieldState.invalid}>
                <FieldLabel htmlFor={field.name}>Recipient Name</FieldLabel>
                <Input
                  {...field}
                  id={field.name}
                  autoFocus={!isEdit}
                  autoComplete="name"
                  aria-invalid={fieldState.invalid}
                  placeholder="Full name (e.g. John Doe)"
                  disabled={mutationIsPending}
                />
                {fieldState.invalid && <FieldError errors={[fieldState.error]} />}
              </Field>
            )}
          />

          <Controller
            name="phone"
            control={form.control}
            render={({ field, fieldState }) => (
              <Field data-invalid={fieldState.invalid}>
                <FieldLabel htmlFor={field.name}>Phone</FieldLabel>
                <Input
                  {...field}
                  id={field.name}
                  aria-invalid={fieldState.invalid}
                  placeholder="Phone number (e.g. 08123456789)"
                  inputMode="numeric"
                  disabled={mutationIsPending}
                />
                {fieldState.invalid && <FieldError errors={[fieldState.error]} />}
              </Field>
            )}
          />

          <Controller
            name="addressLine"
            control={form.control}
            render={({ field, fieldState }) => (
              <Field data-invalid={fieldState.invalid}>
                <FieldLabel htmlFor={field.name}>Address Line</FieldLabel>
                <Input
                  {...field}
                  id={field.name}
                  aria-invalid={fieldState.invalid}
                  placeholder="Street address (e.g. Jl. Sudirman No. 10)"
                  disabled={mutationIsPending}
                />
                {fieldState.invalid && <FieldError errors={[fieldState.error]} />}
              </Field>
            )}
          />

          <Controller
            name="postalCode"
            control={form.control}
            render={({ field, fieldState }) => (
              <Field data-invalid={fieldState.invalid}>
                <FieldLabel htmlFor={field.name}>Postal Code</FieldLabel>
                <Input
                  {...field}
                  id={field.name}
                  aria-invalid={fieldState.invalid}
                  inputMode="numeric"
                  placeholder="Postal code (e.g. 60123)"
                  disabled={mutationIsPending}
                />
                {fieldState.invalid && <FieldError errors={[fieldState.error]} />}
              </Field>
            )}
          />

          <AddressSelectForm mutationIsPending={mutationIsPending} />

          {form.formState.errors.root && <p className="text-sm text-destructive">{form.formState.errors.root.message}</p>}

          <Field>
            <div className="flex gap-2 justify-end">
              <Button type="button" variant="outline" onClick={onCancel} disabled={mutationIsPending}>
                Cancel
              </Button>

              <Button type="submit" disabled={mutationIsPending}>
                {mutationIsPending ? "Saving..." : "Save"}
              </Button>
            </div>
          </Field>
        </FieldGroup>
      </form>
    </FormProvider>
  );
}
