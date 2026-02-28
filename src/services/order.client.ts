import { clientFetch } from "@/src/services/fetch/clientFetch";

export const orderClient = {
  createOrder: async (address: string) => {
    return clientFetch<{ success: boolean }>("/orders", {
      method: "POST",
      body: JSON.stringify({ address }),
    });
  },
};
