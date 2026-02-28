// import { serverFetch } from "@/src/services/fetch/serverFetch";
// import { notFound } from "next/navigation";

// interface Props {
//   params: { id: string };
// }

// export default async function OrderDetails({ params }: Props) {
//   const res = await serverFetch<any>(`/orders/${params.id}`, undefined, true);

//   if (!res?.success) {
//     notFound();
//   }

//   const order = res.data;

//   return (
//     <div className="max-w-4xl mx-auto py-10 space-y-6">
//       <h1 className="text-2xl font-bold">Order #{order.id}</h1>

//       <p>Status: {order.status}</p>
//       <p>Total: ${order.total}</p>

//       <div className="space-y-4">
//         {order.items.map((item: any) => (
//           <div key={item.id} className="border p-3 rounded">
//             <p>{item.meal.title}</p>
//             <p>
//               ${item.price} × {item.quantity}
//             </p>
//           </div>
//         ))}
//       </div>
//     </div>
//   );
// }

import { orderServer } from "@/src/services/order.server";
import { notFound } from "next/navigation";
import Link from "next/link";

interface Props {
  params: Promise<{ id: string }>;
}

export default async function OrderDetailsPage({ params }: Props) {
  const { id } = await params;

  const res = await orderServer.getOrderById(id);

  if (!res?.success || !res.data) {
    return notFound();
  }

  const order = res.data;

  const statusColor: Record<string, string> = {
    PLACED: "bg-yellow-100 text-yellow-800",
    PREPARING: "bg-blue-100 text-blue-800",
    READY: "bg-purple-100 text-purple-800",
    DELIVERED: "bg-green-100 text-green-800",
    CANCELLED: "bg-red-100 text-red-800",
  };

  return (
    <div className="max-w-4xl mx-auto p-8 space-y-10">
      {/* HEADER */}
      <div className="flex justify-between items-center">
        <div>
          <h1 className="text-2xl font-bold">
            Order #{order.id.slice(-6).toUpperCase()}
          </h1>
          <p className="text-sm text-gray-500">
            Placed on {new Date(order.createdAt).toLocaleDateString()}
          </p>
        </div>

        <span
          className={`px-4 py-2 rounded-full text-sm font-medium ${
            statusColor[order.status]
          }`}
        >
          {order.status}
        </span>
      </div>

      {/* DELIVERY INFO */}
      <div className="border rounded-xl p-6 space-y-2">
        <h2 className="font-semibold text-lg">Delivery Address</h2>
        <p className="text-gray-600">{order.address}</p>
      </div>

      {/* ITEMS */}
      <div className="border rounded-xl divide-y">
        {order.items.map((item) => (
          <div key={item.id} className="flex justify-between items-center p-6">
            <div className="flex gap-4 items-center">
              <div className="w-16 h-16 bg-gray-200 rounded-lg overflow-hidden">
                {item.meal.image && (
                  <img
                    src={item.meal.image}
                    className="w-full h-full object-cover"
                  />
                )}
              </div>

              <div>
                <Link
                  href={`/meals/${item.meal.id}`}
                  className="font-semibold hover:underline"
                >
                  {item.meal.title}
                </Link>
                <p className="text-sm text-gray-500">
                  ${item.price} × {item.quantity}
                </p>
              </div>
            </div>

            <div className="font-semibold">
              ${(item.price * item.quantity).toFixed(2)}
            </div>
          </div>
        ))}
      </div>

      {/* TOTAL */}
      <div className="flex justify-end text-lg font-bold">
        Total: ${order.total.toFixed(2)}
      </div>
    </div>
  );
}
