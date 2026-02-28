import { orderServer } from "@/src/services/order.server";
import Link from "next/link";

export default async function OrdersPage() {
  const res = await orderServer.getMyOrders();

  if (!res?.success) {
    return <div className="p-6">Failed to load orders</div>;
  }

  const orders = res.data;

  return (
    <div className="p-6 max-w-4xl mx-auto space-y-6">
      <h1 className="text-2xl font-bold">My Orders</h1>

      {orders.length === 0 && <p>No orders yet.</p>}

      {orders.map((order) => (
        <div key={order.id} className="border p-4 rounded-lg space-y-2">
          <p>
            <strong>Status:</strong> {order.status}
          </p>
          <p>
            <strong>Total:</strong> ${order.total}
          </p>
          <p>
            <strong>Address:</strong> {order.address}
          </p>
          <Link href={`/customer/orders/${order.id}`}> View Details</Link>
        </div>
      ))}
    </div>
  );
}
