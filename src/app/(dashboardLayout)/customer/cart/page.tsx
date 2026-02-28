"use client";

import { useEffect, useState } from "react";
import { cartService, CartItem } from "@/src/services/cart.service";
import { Button } from "@/src/components/ui/button";
import { toast } from "sonner";
import Link from "next/link";

export default function CartPage() {
  const [items, setItems] = useState<CartItem[]>([]);
  const [loading, setLoading] = useState(true);

  const loadCart = async () => {
    const res = await cartService.getCart();

    if (res?.success) {
      setItems(res.data);
    }

    setLoading(false);
  };

  useEffect(() => {
    loadCart();
  }, []);

  const removeItem = async (id: string) => {
    const toastId = toast.loading("Removing...");

    const res = await cartService.removeFromCart(id);

    if (res?.success) {
      toast.success("Removed", { id: toastId });
      loadCart();
    } else {
      toast.error("Failed", { id: toastId });
    }
  };

  const total = items.reduce(
    (sum, item) => sum + item.quantity * item.meal.price,
    0,
  );

  if (loading) return <div className="p-6">Loading...</div>;

  return (
    <div className="p-6 space-y-6 max-w-3xl mx-auto">
      <h1 className="text-2xl font-bold">My Cart</h1>

      {items.length === 0 && <p>Your cart is empty.</p>}

      {items.map((item) => (
        <div
          key={item.id}
          className="flex justify-between items-center border p-4 rounded-lg"
        >
          <div>
            <p className="font-semibold">{item.meal.title}</p>
            <p>
              ${item.meal.price} × {item.quantity}
            </p>
          </div>

          <Button variant="destructive" onClick={() => removeItem(item.id)}>
            Remove
          </Button>
        </div>
      ))}

      {items.length > 0 && (
        <>
          <div className="text-xl font-bold">Total: ${total.toFixed(2)}</div>

          <Link href="/customer/checkout">
            <Button className="w-full">Proceed to Checkout</Button>
          </Link>
        </>
      )}
    </div>
  );
}
