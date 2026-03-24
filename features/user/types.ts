export type User = {
  id: number;
  email: string;
  displayName: string | null;
  role: string;
  status: string;
  hasPassword: boolean;
  defaultAddress: {
    id: number;
    recipientName: string;
    phone: string;
    addressLine: string;
    cityName: string;
    provinceName: string;
    postalCode: string;
  } | null;
  providers: {
    provider: string;
    provider_email: string;
    provider_display_name: string;
    provider_avatar_url: string | null;
  }[];
};
