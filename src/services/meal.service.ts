import { serverFetch } from "@/src/services/fetch/serverFetch";

export interface Meal {
  id: string;
  title: string;
  description: string;
  price: number;
  image?: string | null;
  averageRating: number;
  isAvailable: boolean;
  category?: { name: string };
  provider?: { name: string };
  reviews?: any[];
}

export const mealService = {
  getMeals: async () => {
    return serverFetch<{ success: boolean; data: Meal[] }>("/meals");
  },

  getMealById: async (id: string) => {
    return serverFetch<{ success: boolean; data: Meal }>(`/meals/${id}`);
  },
};
