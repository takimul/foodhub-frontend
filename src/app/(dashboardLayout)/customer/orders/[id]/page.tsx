import { serverFetch } from "@/src/services/fetch/serverFetch";
import { notFound } from "next/navigation";

interface Props {
  params: { id: string };
}

export default async function OrderDetails({ params }: Props) {
  const res = await serverFetch<any>(`/orders/${params.id}`, undefined, true);

  if (!res?.success) {
    notFound();
  }

  const order = res.data;

  return (
    <div className="max-w-4xl mx-auto py-10 space-y-6">
      <h1 className="text-2xl font-bold">Order #{order.id}</h1>

      <p>Status: {order.status}</p>
      <p>Total: ${order.total}</p>

      <div className="space-y-4">
        {order.items.map((item: any) => (
          <div key={item.id} className="border p-3 rounded">
            <p>{item.meal.title}</p>
            <p>
              ${item.price} × {item.quantity}
            </p>
          </div>
        ))}
      </div>
    </div>
  );
}
