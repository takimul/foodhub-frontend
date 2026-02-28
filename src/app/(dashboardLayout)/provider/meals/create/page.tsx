// "use client";

// import { useState } from "react";
// import { clientFetch } from "@/src/services/fetch/clientFetch";
// import { Input } from "@/src/components/ui/input";
// import { Button } from "@/src/components/ui/button";
// import { toast } from "sonner";
// import { useRouter } from "next/navigation";

// export default function CreateMealPage() {
//   const [form, setForm] = useState({
//     title: "",
//     description: "",
//     price: "",
//     image: "",
//   });

//   const router = useRouter();

//   const handleSubmit = async () => {
//     const toastId = toast.loading("Creating meal...");

//     const res = (await clientFetch("/meals", {
//       method: "POST",
//       body: JSON.stringify({
//         ...form,
//         price: Number(form.price),
//       }),
//     })) as { success: boolean };

//     if (res?.success) {
//       toast.success("Meal created", { id: toastId });
//       router.push("/provider/meals");
//     } else {
//       toast.error("Failed", { id: toastId });
//     }
//   };

//   return (
//     <div className="max-w-lg mx-auto py-10 space-y-4">
//       <h1 className="text-2xl font-bold">Create Meal</h1>

//       <Input
//         placeholder="Title"
//         value={form.title}
//         onChange={(e) => setForm({ ...form, title: e.target.value })}
//       />

//       <Input
//         placeholder="Description"
//         value={form.description}
//         onChange={(e) => setForm({ ...form, description: e.target.value })}
//       />

//       <Input
//         type="number"
//         placeholder="Price"
//         value={form.price}
//         onChange={(e) => setForm({ ...form, price: e.target.value })}
//       />

//       <Input
//         placeholder="Image URL (paste link)"
//         value={form.image}
//         onChange={(e) => setForm({ ...form, image: e.target.value })}
//       />

//       {form.image && (
//         <img
//           src={form.image}
//           alt="Preview"
//           className="w-full h-40 object-cover rounded"
//         />
//       )}

//       <Button onClick={handleSubmit} className="w-full">
//         Create Meal
//       </Button>
//     </div>
//   );
// }

import { categoryService } from "@/src/services/category.service";
import CreateMealForm from "@/src/components/provider/CreateMealForm";

export default async function CreateMealPage() {
  const res = await categoryService.getCategories();

  return (
    <div className="p-6">
      <CreateMealForm categories={res?.data || []} />
    </div>
  );
}
