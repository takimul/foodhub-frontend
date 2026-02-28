// import { serverFetch } from "@/src/services/fetch/serverFetch";

// export interface Meal {
//   id: string;
//   title: string;
//   description: string;
//   price: number;
//   image?: string | null;
//   averageRating: number;
//   isAvailable: boolean;
//   category?: { name: string };
//   provider?: { name: string };
//   reviews?: any[];
// }

// export const mealService = {
//   getMeals: async () => {
//     return serverFetch<{ success: boolean; data: Meal[] }>("/meals");
//   },

//   getMealById: async (id: string) => {
//     return serverFetch<{ success: boolean; data: Meal }>(`/meals/${id}`);
//   },
// };

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
  providerId?: string;
  reviews?: any[];
}

export interface GetMealsParams {
  search?: string;
  categoryId?: string;
  minPrice?: number;
  maxPrice?: number;
  page?: number;
  limit?: number;
}

export interface MealsResponse {
  success: boolean;
  meta?: {
    page: number;
    limit: number;
    total: number;
  };
  data: Meal[];
}

export const mealService = {
  getMeals: async (params?: GetMealsParams) => {
    const query = new URLSearchParams();

    if (params) {
      Object.entries(params).forEach(([key, value]) => {
        if (value !== undefined && value !== null) {
          query.append(key, String(value));
        }
      });
    }

    const endpoint =
      query.toString().length > 0 ? `/meals?${query.toString()}` : "/meals";

    return serverFetch<MealsResponse>(endpoint);
  },

  getMealById: async (id: string) => {
    return serverFetch<{ success: boolean; data: Meal }>(`/meals/${id}`);
  },
};
