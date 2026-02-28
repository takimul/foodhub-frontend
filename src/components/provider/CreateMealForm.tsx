"use client";

import { useState } from "react";
import { clientFetch } from "@/src/services/fetch/clientFetch";
import { Input } from "@/src/components/ui/input";
import { Button } from "@/src/components/ui/button";
import { toast } from "sonner";
import { useRouter } from "next/navigation";

interface Props {
  categories: any[];
}

export default function CreateMealForm({ categories }: Props) {
  const router = useRouter();

  const [form, setForm] = useState({
    title: "",
    description: "",
    price: "",
    categoryId: "",
    image: "",
  });

  const handleSubmit = async () => {
    const toastId = toast.loading("Creating meal...");

    const res = await clientFetch("/meals", {
      method: "POST",
      body: JSON.stringify({
        ...form,
        price: Number(form.price),
      }),
    }) as { success?: boolean; message?: string };

    if (res?.success) {
      toast.success("Meal created", { id: toastId });
      router.push("/provider/meals");
    } else {
      toast.error(res?.message || "Failed", { id: toastId });
    }
  };

  return (
    <div className="max-w-lg space-y-4">
      <Input
        placeholder="Title"
        value={form.title}
        onChange={(e) =>
          setForm({ ...form, title: e.target.value })
        }
      />

      <Input
        placeholder="Description"
        value={form.description}
        onChange={(e) =>
          setForm({ ...form, description: e.target.value })
        }
      />

      <Input
        type="number"
        placeholder="Price"
        value={form.price}
        onChange={(e) =>
          setForm({ ...form, price: e.target.value })
        }
      />

      <select
        className="w-full border rounded-md p-2"
        value={form.categoryId}
        onChange={(e) =>
          setForm({ ...form, categoryId: e.target.value })
        }
      >
        <option value="">Select Category</option>
        {categories.map((cat) => (
          <option key={cat.id} value={cat.id}>
            {cat.name}
          </option>
        ))}
      </select>

      <Input
        placeholder="Image URL"
        value={form.image}
        onChange={(e) =>
          setForm({ ...form, image: e.target.value })
        }
      />

      {form.image && (
        <img
          src={form.image}
          className="w-full h-40 object-cover rounded"
        />
      )}

      <Button onClick={handleSubmit} className="w-full">
        Create Meal
      </Button>
    </div>
  );
}