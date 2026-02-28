"use client";

import { useEffect, useState } from "react";
import { CartItem, cartService } from "@/src/services/cart.service";
import { orderClient } from "@/src/services/order.client";
import { Button } from "@/src/components/ui/button";
import { Input } from "@/src/components/ui/input";
import { toast } from "sonner";
import { useRouter } from "next/navigation";

export default function CheckoutPage() {
  const [address, setAddress] = useState("");
  const [hasItems, setHasItems] = useState(false);
  const router = useRouter();
  const [items, setItems] = useState<CartItem[]>([]);

  useEffect(() => {
    cartService.getCart().then((res) => {
      if (res?.success && res.data.length > 0) {
        setHasItems(true);
        setItems(res.data);
        console.log("Cart items:", res.data);
      }
    });
  }, []);

  const handleCheckout = async () => {
    if (!hasItems) {
      toast.error("Cart is empty");
      return;
    }

    if (!address) {
      toast.error("Address required");
      return;
    }

    const toastId = toast.loading("Placing order...");

    const res = await orderClient.createOrder(address);

    if (res?.success) {
      toast.success("Order placed successfully", {
        id: toastId,
      });
      router.push("/customer/orders");
    } else {
      toast.error("Failed to place order", {
        id: toastId,
      });
    }
  };

  return (
    <div className="max-w-lg mx-auto py-10 space-y-6">
      <h1 className="text-2xl font-bold">Checkout</h1>

      <Input
        placeholder="Delivery Address"
        value={address}
        onChange={(e) => setAddress(e.target.value)}
      />

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
        </div>
      ))}

      <Button onClick={handleCheckout} className="w-full">
        Confirm Order
      </Button>
    </div>
  );
}
