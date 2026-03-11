export type Provider = "GOOGLE" | "GITHUB";

export type UserProvider = {
  provider: Provider;
  email: string | null;
  displayName: string | null;
  avatarUrl: string | null;
};

export type MeResponse = {
  id: number;
  email: string;
  hasPassword: boolean;
  displayName: string | null;
  providers: UserProvider[];
};
