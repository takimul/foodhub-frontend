import { serverFetch } from "@/src/services/fetch/serverFetch";
import { Meal } from "./meal.service";

export const providerService = {
  getProviderById: async (id: string) => {
    return serverFetch<{
      success: boolean;
      data: {
        profile: any;
        meals: Meal[];
      };
    }>(`/providers/${id}`);
  },
};
