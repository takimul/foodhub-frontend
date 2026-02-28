import { serverFetch } from "@/src/services/fetch/serverFetch";

interface ApiResponse<T> {
  data: T[];
}

export default async function AdminDashboard() {
  const users = await serverFetch<ApiResponse<any>>("/users", undefined, true);
  const orders = await serverFetch<ApiResponse<any>>(
    "/orders/admin/all",
    undefined,
    true,
  );
  const meals = await serverFetch<ApiResponse<any>>("/meals", undefined, true);

  return (
    <div className="p-6 space-y-6">
      <h1 className="text-2xl font-bold">Admin Dashboard</h1>

      <div className="grid grid-cols-3 gap-6">
        <StatCard title="Total Users" value={users?.data?.length || 0} />
        <StatCard title="Total Orders" value={orders?.data?.length || 0} />
        <StatCard title="Total Meals" value={meals?.data?.length || 0} />
      </div>
    </div>
  );
}

function StatCard({ title, value }: { title: string; value: number }) {
  return (
    <div className="border rounded p-4">
      <p>{title}</p>
      <p className="text-2xl font-bold">{value}</p>
    </div>
  );
}
