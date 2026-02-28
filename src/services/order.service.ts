import { serverFetch } from "@/src/services/fetch/serverFetch";
import { clientFetch } from "@/src/services/fetch/clientFetch";

export const orderService = {
  getMyOrdersServer: async () => {
    return serverFetch<{ success: boolean; data: any[] }>(
      "/orders",
      undefined,
      true,
    );
  },

  createOrderClient: async (address: string) => {
    return clientFetch<{ success: boolean }>("/orders", {
      method: "POST",
      body: JSON.stringify({ address }),
    });
  },
};
