"use client";

import { Button } from "@/src/components/ui/button";
import { cartService } from "@/src/services/cart.service";
import { toast } from "sonner";
// import { cartService } from "@/src/services/cart.service";

interface Props {
  mealId: string;
}

export function AddToCartButton({ mealId }: Props) {
  const handleAdd = async () => {
    try {
      await cartService.addToCart(mealId, 1);
      toast.success("Added to cart");
    } catch {
      toast.error("Failed to add to cart");
    }
  };

  return (
    <Button className="w-full mt-6" onClick={handleAdd}>
      Add to Cart
    </Button>
  );
}
