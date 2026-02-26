import { createAuthClient } from "better-auth/react";
import type { AppRole } from "@/src/types/auth";

export const authClient = createAuthClient({
  baseURL: "http://localhost:3000",

  user: {
    additionalFields: {
      role: {
        type: "string" as const,
      },
      isActive: {
        type: "boolean" as const,
      },
    },
  },
});
