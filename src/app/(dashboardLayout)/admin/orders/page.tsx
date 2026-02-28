import { serverFetch } from "@/src/services/fetch/serverFetch";

interface ApiResponse<T> {
  success: boolean;
  data: T[];
}

export default async function AdminOrdersPage() {
  const res = await serverFetch<ApiResponse<any>>(
    "/orders/admin/all",
    undefined,
    true,
  );
  console.log("Orders response:", res);

  if (!res?.success) {
    return <div className="p-6">Failed to load orders</div>;
  }

  return (
    <div className="p-6 space-y-6">
      <h1 className="text-2xl font-bold">All Orders</h1>

      {res.data.map((order: any) => (
        <div key={order.id} className="border p-4 rounded space-y-2">
          <p>User: {order.user.email}</p>
          <p>Status: {order.status}</p>
          <p>Total: ${order.total}</p>
        </div>
      ))}
    </div>
  );
}
