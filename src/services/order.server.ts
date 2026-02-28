import { serverFetch } from "@/src/services/fetch/serverFetch";

export const orderServer = {
  getMyOrders: async () => {
    return serverFetch<{ success: boolean; data: any[] }>(
      "/orders",
      undefined,
      true,
    );
  },

  getOrderById: async (id: string) => {
    return serverFetch(`/orders/${id}`, undefined, true);
  },
};
