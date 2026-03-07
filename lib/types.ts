export type UserProvider = "GOOGLE" | "GITHUB";

export type MeResponse = {
  id: string;
  email: string;
  hasPassword: boolean;
  displayName: string | null;
  providers: UserProvider[];
};
