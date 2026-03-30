"use client";

import { useFormContext } from "react-hook-form";
import { AddressFormSchema } from "../schema";
import { useProvinces } from "../hooks/use-provinces";
import { useCities } from "../hooks/use-cities";
import { useDistricts } from "../hooks/use-districts";
import { Controller } from "react-hook-form";
import { Field, FieldError, FieldLabel } from "@/components/ui/field";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { useEffect } from "react";

type Props = {
  mutationIsPending: boolean;
};

export default function AddressSelectForm({ mutationIsPending }: Props) {
  const form = useFormContext<AddressFormSchema>();

  const provinceId = form.watch("shippingProvinceId");
  const cityId = form.watch("shippingCityId");

  const provinceIdNum = provinceId ? Number(provinceId) : undefined;
  const cityIdNum = cityId ? Number(cityId) : undefined;

  const { data: provinces, isLoading: provincesLoading } = useProvinces();
  const { data: cities, isLoading: citiesLoading } = useCities(provinceIdNum);
  const { data: districts, isLoading: districtsLoading } = useDistricts(cityIdNum);

  useEffect(() => {
    if (!cities?.length) return;

    const value = form.getValues("shippingCityId");
    if (value) {
      form.setValue("shippingCityId", value);
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [cities]);

  useEffect(() => {
    if (!districts?.length) return;

    const value = form.getValues("shippingDistrictId");
    if (value) {
      form.setValue("shippingDistrictId", value);
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [districts]);

  return (
    <>
      <Controller
        name="shippingProvinceId"
        control={form.control}
        render={({ field, fieldState }) => (
          <Field data-invalid={fieldState.invalid}>
            <FieldLabel htmlFor={field.name}>Province</FieldLabel>
            <Select
              name={field.name}
              value={field.value}
              onValueChange={(value) => {
                field.onChange(value);

                // reset
                form.setValue("shippingCityId", "");
                form.setValue("shippingDistrictId", "");
              }}
            >
              <SelectTrigger id={field.name} aria-invalid={fieldState.invalid} disabled={mutationIsPending || provincesLoading}>
                <SelectValue placeholder="Select province" />
              </SelectTrigger>
              <SelectContent>
                {provinces?.map((p) => (
                  <SelectItem key={p.id} value={String(p.id)}>
                    {p.name}
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>

            {fieldState.invalid && <FieldError errors={[fieldState.error]} />}
          </Field>
        )}
      />

      <Controller
        name="shippingCityId"
        control={form.control}
        render={({ field, fieldState }) => (
          <Field data-invalid={fieldState.invalid}>
            <FieldLabel htmlFor={field.name}>City</FieldLabel>
            <Select
              name={field.name}
              value={field.value}
              onValueChange={(value) => {
                field.onChange(value);

                // reset
                form.setValue("shippingDistrictId", "");
              }}
              key={provinceId}
            >
              <SelectTrigger id={field.name} aria-invalid={fieldState.invalid} disabled={mutationIsPending || citiesLoading || !provinceId}>
                <SelectValue placeholder="Select city" />
              </SelectTrigger>
              <SelectContent>
                {cities?.map((c) => (
                  <SelectItem key={c.id} value={String(c.id)}>
                    {c.name}
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>

            {fieldState.invalid && <FieldError errors={[fieldState.error]} />}
          </Field>
        )}
      />

      <Controller
        name="shippingDistrictId"
        control={form.control}
        render={({ field, fieldState }) => (
          <Field data-invalid={fieldState.invalid}>
            <FieldLabel htmlFor={field.name}>District</FieldLabel>
            <Select name={field.name} value={field.value} onValueChange={field.onChange} key={cityId}>
              <SelectTrigger id={field.name} aria-invalid={fieldState.invalid} disabled={mutationIsPending || districtsLoading || !cityId}>
                <SelectValue placeholder="Select district" />
              </SelectTrigger>
              <SelectContent>
                {districts?.map((d) => (
                  <SelectItem key={d.id} value={String(d.id)}>
                    {d.name}
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>

            {fieldState.invalid && <FieldError errors={[fieldState.error]} />}
          </Field>
        )}
      />
    </>
  );
}
