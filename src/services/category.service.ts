import { serverFetch } from "@/src/services/fetch/serverFetch";

export const categoryService = {
  getCategories: async () => {
    return serverFetch<{ success: boolean; data: any[] }>("/categories");
  },
};
