import { clientFetch } from "@/src/services/fetch/clientFetch";

export interface CartItem {
  id: string;
  quantity: number;
  meal: {
    id: string;
    title: string;
    price: number;
    image?: string | null;
  };
}

export const cartService = {
  getCart: async () => {
    return clientFetch<{ success: boolean; data: CartItem[] }>("/cart");
  },

  addToCart: async (mealId: string, quantity: number) => {
    return clientFetch<{ success: boolean }>("/cart", {
      method: "POST",
      body: JSON.stringify({ mealId, quantity }),
    });
  },

  removeFromCart: async (id: string) => {
    return clientFetch<{ success: boolean }>(`/cart/${id}`, {
      method: "DELETE",
    });
  },
};
