import AdminCategories from "@/src/components/admin/AdminCategories";
import { serverFetch } from "@/src/services/fetch/serverFetch";

interface ApiResponse<T> {
  success: boolean;
  data: T[];
}
export default async function AdminCategoriesPage() {
  const res = await serverFetch<ApiResponse<any>>(
    "/categories",
    undefined,
    true,
  );

  return (
    <div className="p-6">
      <AdminCategories categories={res?.data || []} />
    </div>
  );
}
