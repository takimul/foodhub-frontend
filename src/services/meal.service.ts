import { apiFetch } from "./api";

export const mealService = {
  getMeals: async () => {
    return apiFetch("/meals", {
      next: { revalidate: 30 },
    });
  },

  getMealById: async (id: string) => {
    return apiFetch(`/meals/${id}`, {
      next: { revalidate: 30 },
    });
  },
};
