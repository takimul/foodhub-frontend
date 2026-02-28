// import { cookies } from "next/headers";

// const API_URL = process.env.NEXT_PUBLIC_API_URL!;

// export async function serverFetch<T>(
//   endpoint: string,
//   options?: RequestInit,
//   withAuth = false,
// ): Promise<T> {
//   const headers: Record<string, string> = {
//     "Content-Type": "application/json",
//   };

//   if (withAuth) {
//     const cookieStore = cookies();
//     headers["Cookie"] = cookieStore.toString();
//   }

//   const res = await fetch(`${API_URL}${endpoint}`, {
//     ...options,
//     headers,
//     cache: "no-store",
//   });

//   const data = await res.json();

//   if (!res.ok) {
//     throw new Error(data?.message || "Server Error");
//   }

//   return data;
// }

import { cookies } from "next/headers";

const API_URL = process.env.NEXT_PUBLIC_API_URL!;

export const serverFetch = async <T>(
  endpoint: string,
  options?: RequestInit,
  withAuth = false,
): Promise<T> => {
  const headers: Record<string, string> = {
    "Content-Type": "application/json",
    ...(options?.headers as Record<string, string>),
  };

  if (withAuth) {
    const cookieStore = await cookies(); // 🔥 must await

    const cookieString = cookieStore
      .getAll()
      .map((c) => `${c.name}=${c.value}`)
      .join("; ");

    headers["Cookie"] = cookieString;
  }

  const res = await fetch(`${API_URL}${endpoint}`, {
    ...options,
    headers,
    cache: "no-store",
  });

  return res.json();
};
