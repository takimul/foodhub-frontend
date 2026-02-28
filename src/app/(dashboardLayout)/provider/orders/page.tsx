"use client";

import { useEffect, useState } from "react";
import { clientFetch } from "@/src/services/fetch/clientFetch";
import { Button } from "@/src/components/ui/button";

export default function ProviderOrdersPage() {
  const [orders, setOrders] = useState<any[]>([]);

  const loadOrders = async () => {
    const res = await clientFetch<{ success: boolean; data: any[] }>(
      "/orders/provider/orders",
    );
    if (res?.success) setOrders(res.data);
  };

  useEffect(() => {
    loadOrders();
  }, []);

  const updateStatus = async (id: string, status: string) => {
    await clientFetch(`/orders/provider/${id}/status`, {
      method: "PATCH",
      body: JSON.stringify({ status }),
    });
    loadOrders();
  };

  return (
    <div className="p-6 space-y-6">
      <h1 className="text-2xl font-bold">Incoming Orders</h1>

      {orders.map((order) => (
        <div key={order.id} className="border p-4 rounded space-y-2">
          <p>Status: {order.status}</p>
          <p>Total: ${order.total}</p>

          <div className="space-x-2">
            <Button onClick={() => updateStatus(order.id, "PREPARING")}>
              Prepare
            </Button>

            <Button onClick={() => updateStatus(order.id, "READY")}>
              Ready
            </Button>

            <Button onClick={() => updateStatus(order.id, "DELIVERED")}>
              Delivered
            </Button>
          </div>
        </div>
      ))}
    </div>
  );
}
