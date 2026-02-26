import { env } from "@/env";
import { cookies } from "next/headers";

const API_URL = env.API_URL;

export const apiFetch = async (
  endpoint: string,
  options?: RequestInit,
  withAuth = false,
) => {
  const headers: Record<string, string> = {
    "Content-Type": "application/json",
    ...(typeof options?.headers === "object" && !Array.isArray(options.headers)
      ? (options.headers as Record<string, string>)
      : {}),
  };

  if (withAuth) {
    const cookieStore = cookies();
    headers["Cookie"] = cookieStore.toString();
  }

  const res = await fetch(`${API_URL}${endpoint}`, {
    ...options,
    headers,
  });

  return res.json();
};
