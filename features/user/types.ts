export type User = {
  id: number;
  email: string;
  displayName: string | null;
  role: string;
  status: "ACTIVE" | "SUSPENDED";
  hasPassword: boolean;
  defaultAddress: {
    id: number;
    recipientName: string | null;
    phone: string | null;
    addressLine: string | null;
    cityName: string | null;
    provinceName: string | null;
    postalCode: string;
  } | null;
  providers: {
    provider: "GOOGLE" | "GITHUB";
    providerEmail: string;
    providerDisplayName: string | null;
    providerAvatarUrl: string | null;
  }[];
};
