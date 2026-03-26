"use client";

import { Select, SelectTrigger, SelectValue, SelectContent, SelectItem } from "@/components/ui/select";
import { useProvinces } from "../hooks/use-provinces";
import { useCities } from "../hooks/use-cities";
import { useDistricts } from "../hooks/use-districts";

type Value = {
  provinceId: string;
  cityId: string;
  districtId: string;
};

type Errors = {
  province?: string;
  city?: string;
  district?: string;
};

type Props = {
  value: Value;
  onChange: (value: Value) => void;
  errors?: Errors;
};

export function AddressSelect({ value, onChange, errors }: Props) {
  const { provinceId, cityId, districtId } = value;

  // convert to number
  const provinceIdNum = provinceId ? Number(provinceId) : undefined;
  const cityIdNum = cityId ? Number(cityId) : undefined;

  const { data: provinces, isLoading: provincesLoading } = useProvinces();
  const { data: cities, isLoading: citiesLoading } = useCities(provinceIdNum);
  const { data: districts, isLoading: districtsLoading } = useDistricts(cityIdNum);

  return (
    <div className="space-y-4">
      {/* PROVINCE */}
      <div className="space-y-1">
        <Select
          value={provinceId}
          onValueChange={(val) => {
            onChange({
              provinceId: val,
              cityId: "",
              districtId: ""
            });
          }}
          disabled={provincesLoading}
        >
          <SelectTrigger aria-invalid={!!errors?.province} className="w-full">
            <SelectValue placeholder={provincesLoading ? "Loading provinces..." : "Select province"} />
          </SelectTrigger>

          <SelectContent>
            {provinces?.map((p) => (
              <SelectItem key={p.id} value={String(p.id)}>
                {p.name}
              </SelectItem>
            ))}
          </SelectContent>
        </Select>

        {errors?.province && <p className="text-sm text-red-500">{errors.province}</p>}
      </div>

      {/* CITY */}
      <div className="space-y-1">
        <Select
          value={cityId}
          onValueChange={(val) => {
            onChange({
              provinceId,
              cityId: val,
              districtId: ""
            });
          }}
          disabled={!provinceId || citiesLoading}
        >
          <SelectTrigger aria-invalid={!!errors?.city} className="w-full">
            <SelectValue placeholder={!provinceId ? "Select province first" : citiesLoading ? "Loading cities..." : "Select city"} />
          </SelectTrigger>

          <SelectContent>
            {cities?.map((c) => (
              <SelectItem key={c.id} value={String(c.id)}>
                {c.name}
              </SelectItem>
            ))}
          </SelectContent>
        </Select>

        {errors?.city && <p className="text-sm text-red-500">{errors.city}</p>}
      </div>

      {/* DISTRICT */}
      <div className="space-y-1">
        <Select
          value={districtId}
          onValueChange={(val) => {
            onChange({
              provinceId,
              cityId,
              districtId: val
            });
          }}
          disabled={!cityId || districtsLoading}
        >
          <SelectTrigger aria-invalid={!!errors?.district} className="w-full">
            <SelectValue placeholder={!cityId ? "Select city first" : districtsLoading ? "Loading districts..." : "Select district"} />
          </SelectTrigger>

          <SelectContent>
            {districts?.map((d) => (
              <SelectItem key={d.id} value={String(d.id)}>
                {d.name}
              </SelectItem>
            ))}
          </SelectContent>
        </Select>

        {errors?.district && <p className="text-sm text-red-500">{errors.district}</p>}
      </div>
    </div>
  );
}
