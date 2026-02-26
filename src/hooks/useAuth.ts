"use client";

import { authClient } from "@/src/lib/auth-client";
import type { AppUser } from "@/src/types/auth";

export const useAuth = () => {
  const session = authClient.useSession();

  return {
    ...session,
    user: session.data?.user as AppUser | undefined,
  };
};
