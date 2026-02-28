import { serverFetch } from "@/src/services/fetch/serverFetch";

export default async function ProviderDashboard() {
  const res = await serverFetch<any>("/orders/provider/stats", undefined, true);

  if (!res?.success) {
    return <div className="p-6">Failed to load stats</div>;
  }

  const stats = res.data;

  return (
    <div className="p-6 space-y-6">
      <h1 className="text-2xl font-bold">Provider Dashboard</h1>

      <div className="grid grid-cols-3 gap-6">
        <div className="border p-4 rounded">
          <p>Total Meals</p>
          <p className="text-xl font-bold">{stats.mealsCount}</p>
        </div>

        <div className="border p-4 rounded">
          <p>Total Orders</p>
          <p className="text-xl font-bold">{stats.totalOrders}</p>
        </div>

        <div className="border p-4 rounded">
          <p>Total Revenue</p>
          <p className="text-xl font-bold">${stats.totalRevenue}</p>
        </div>
      </div>
    </div>
  );
}
