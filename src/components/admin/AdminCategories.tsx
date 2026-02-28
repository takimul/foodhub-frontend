"use client";

import { useState } from "react";
import { clientFetch } from "@/src/services/fetch/clientFetch";
import { Button } from "@/src/components/ui/button";
import { Input } from "@/src/components/ui/input";
import { toast } from "sonner";
import { useRouter } from "next/navigation";

interface ApiResponse<T> {
  success: boolean;
  data: T[];
}
export default function AdminCategories({ categories }: any) {
  const [name, setName] = useState("");
  const router = useRouter();

  const createCategory = async () => {
    const res = await clientFetch<ApiResponse<any>>("/categories", {
      method: "POST",
      body: JSON.stringify({ name }),
    });

    if (res?.success) {
      toast.success("Created");
      router.refresh();
    }
  };

  const deleteCategory = async (id: string) => {
    await clientFetch(`/categories/${id}`, {
      method: "DELETE",
    });

    toast.success("Deleted");
    router.refresh();
  };

  return (
    <div className="space-y-4">
      <h1 className="text-2xl font-bold">Categories</h1>

      <div className="flex gap-2">
        <Input
          placeholder="New category"
          value={name}
          onChange={(e) => setName(e.target.value)}
        />
        <Button onClick={createCategory}>Add</Button>
      </div>

      {categories.map((cat: any) => (
        <div key={cat.id} className="border p-3 rounded flex justify-between">
          <p>{cat.name}</p>
          <Button variant="destructive" onClick={() => deleteCategory(cat.id)}>
            Delete
          </Button>
        </div>
      ))}
    </div>
  );
}
