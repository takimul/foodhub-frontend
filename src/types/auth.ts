export type AppRole = "CUSTOMER" | "PROVIDER" | "ADMIN";

export interface AppUser {
  id: string;
  name: string | null;
  email: string;
  role: AppRole;
  isActive?: boolean;
  image?: string | null;
}
