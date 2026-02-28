import { serverFetch } from "@/src/services/fetch/serverFetch";
import AdminUsersTable from "@/src/components/admin/AdminUsersTable";

interface ApiResponse<T> {
  data: T[];
}
export default async function AdminUsersPage() {
  const res = await serverFetch<ApiResponse<any>>("/users", undefined, true);

  return (
    <div className="p-6">
      <AdminUsersTable users={res?.data || []} />
    </div>
  );
}
