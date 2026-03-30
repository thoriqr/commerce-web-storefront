export type User = {
  id: number;
  email: string;
  displayName: string | null;
  role: string;
  status: "ACTIVE" | "SUSPENDED";
  hasPassword: boolean;
  defaultAddress: {
    id: number;
    label: string;
    recipientName: string;
    phone: string;
    addressLine: string;
    cityName: string;
    provinceName: string;
    districtName: string;
    postalCode: string;
  } | null;
  providers: {
    provider: "GOOGLE" | "GITHUB";
    providerEmail: string;
    providerDisplayName: string;
    providerAvatarUrl: string;
  }[];
};

export type UserAddresses = {
  addresses: {
    id: number;
    label: string;
    recipientName: string;
    phone: string;
    addressLine: string;
    provinceName: string;
    cityName: string;
    districtName: string;
    postalCode: string;
    isDefault: boolean;
  }[];
  limit: number;
};

export type UpsertAddressPayload = {
  recipientName: string;
  label: string;
  phone: string;
  addressLine: string;
  shippingProvinceId: number;
  shippingCityId: number;
  shippingDistrictId: number;
  postalCode: string;
};

export type AddressDetail = {
  recipientName: string;
  label: string;
  phone: string;
  addressLine: string;
  shippingProvinceId: string;
  shippingCityId: string;
  shippingDistrictId: string;
  isDefault: boolean;
  postalCode: string;
};
