import { serverFetch } from "@/src/services/fetch/serverFetch";

export interface OrderItem {
  id: string;
  quantity: number;
  price: number;
  meal: {
    id: string;
    title: string;
    image?: string | null;
  };
}

export interface OrderDetails {
  id: string;
  status: string;
  total: number;
  address: string;
  createdAt: string;
  items: OrderItem[];
}

export const orderServer = {
  getMyOrders: async () => {
    return serverFetch<{ success: boolean; data: any[] }>(
      "/orders",
      undefined,
      true,
    );
  },

  getOrderById: async (id: string) => {
    return serverFetch<{
      success: boolean;
      data: OrderDetails;
    }>(`/orders/${id}`, undefined, true);
  },
};
