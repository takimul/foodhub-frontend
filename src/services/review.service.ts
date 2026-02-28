import { clientFetch } from "@/src/services/fetch/clientFetch";

export const reviewService = {
  createReview: async (mealId: string, rating: number, comment: string) => {
    return clientFetch<{ success: boolean }>("/reviews", {
      method: "POST",
      body: JSON.stringify({ mealId, rating, comment }),
    });
  },
};
