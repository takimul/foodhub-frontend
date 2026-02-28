"use client";

import { useState } from "react";
import { clientFetch } from "@/src/services/fetch/clientFetch";
import { Input } from "@/src/components/ui/input";
import { Button } from "@/src/components/ui/button";
import { toast } from "sonner";
import { useRouter } from "next/navigation";

export default function EditMealForm({ meal }: any) {
  const router = useRouter();

  const [form, setForm] = useState({
    title: meal.title,
    description: meal.description,
    price: meal.price,
    image: meal.image || "",
    isAvailable: meal.isAvailable,
  });

  const handleUpdate = async () => {
    const toastId = toast.loading("Updating meal...");

    const res = (await clientFetch(`/meals/${meal.id}`, {
      method: "PATCH",
      body: JSON.stringify(form),
    })) as { success?: boolean; message?: string };

    if (res?.success) {
      toast.success("Updated", { id: toastId });
      router.push("/provider/meals");
    } else {
      toast.error("Failed", { id: toastId });
    }
  };

  const handleDelete = async () => {
    await clientFetch(`/meals/${meal.id}`, {
      method: "DELETE",
    });

    toast.success("Meal deleted");
    router.push("/provider/meals");
  };

  return (
    <div className="max-w-lg space-y-4">
      <Input
        value={form.title}
        onChange={(e) => setForm({ ...form, title: e.target.value })}
      />

      <Input
        value={form.description}
        onChange={(e) => setForm({ ...form, description: e.target.value })}
      />

      <Input
        type="number"
        value={form.price}
        onChange={(e) => setForm({ ...form, price: Number(e.target.value) })}
      />

      <Input
        value={form.image}
        onChange={(e) => setForm({ ...form, image: e.target.value })}
      />

      {form.image && (
        <img src={form.image} className="w-full h-40 object-cover rounded" />
      )}

      <Button onClick={handleUpdate} className="w-full">
        Update Meal
      </Button>

      <Button variant="destructive" onClick={handleDelete} className="w-full">
        Delete Meal
      </Button>
    </div>
  );
}
