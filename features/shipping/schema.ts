import z from "zod";
import { ADDRESS_SCHEMA } from "./constants";

export const addressSchema = z.object({
  label: z.string().max(ADDRESS_SCHEMA.MAX_LABEL),
  recipientName: z
    .string()
    .min(ADDRESS_SCHEMA.RECIPIENT_NAME_MIN, `Recipient name must be at least ${ADDRESS_SCHEMA.RECIPIENT_NAME_MIN} characters`)
    .max(ADDRESS_SCHEMA.RECIPIENT_NAME_MAX, `Recipient name must be at most ${ADDRESS_SCHEMA.RECIPIENT_NAME_MAX} characters`),

  phone: z
    .string()

    .min(ADDRESS_SCHEMA.PHONE_DIGITS_MIN, `Phone must be at least ${ADDRESS_SCHEMA.PHONE_DIGITS_MIN} digits`)
    .max(ADDRESS_SCHEMA.PHONE_DIGITS_MAX, `Phone must be at most ${ADDRESS_SCHEMA.PHONE_DIGITS_MAX} digits`)

    .regex(/^\d+$/, "Phone must contain only numbers"),

  addressLine: z
    .string()
    .min(ADDRESS_SCHEMA.ADDRESS_LINE_MIN, `Address line must be at least ${ADDRESS_SCHEMA.ADDRESS_LINE_MIN} characters`)
    .max(ADDRESS_SCHEMA.ADDRESS_LINE_MAX, `Address line must be at most ${ADDRESS_SCHEMA.ADDRESS_LINE_MAX} characters`),

  postalCode: z
    .string()
    .length(ADDRESS_SCHEMA.POSTAL_CODE_LENGTH, `Postal code must be exactly ${ADDRESS_SCHEMA.POSTAL_CODE_LENGTH} digits`)
    .regex(/^\d+$/, "Postal code must be numeric"),
  shippingProvinceId: z.string().min(1, "Province is required"),
  shippingCityId: z.string().min(1, "City is required"),
  shippingDistrictId: z.string().min(1, "District is required")
});

export type AddressFormSchema = z.infer<typeof addressSchema>;
