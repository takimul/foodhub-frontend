"use client";

import { clientFetch } from "@/src/services/fetch/clientFetch";
import { Button } from "@/src/components/ui/button";
import { toast } from "sonner";
import { useRouter } from "next/navigation";

interface ApiResponse {
  success: boolean;
  [key: string]: any;
}

export default function AdminUsersTable({ users }: any) {
  const router = useRouter();

  const toggleStatus = async (id: string, isActive: boolean) => {
    const toastId = toast.loading("Updating...");

    const res = await clientFetch(`/users/${id}`, {
      method: "PATCH",
      body: JSON.stringify({ isActive: !isActive }),
    }) as ApiResponse;

    if (res?.success) {
      toast.success("Updated", { id: toastId });
      router.refresh();
    } else {
      toast.error("Failed", { id: toastId });
    }
  };

  return (
    <div className="space-y-4">
      <h1 className="text-2xl font-bold">Users</h1>

      {users.map((user: any) => (
        <div
          key={user.id}
          className="border p-4 rounded flex justify-between"
        >
          <div>
            <p className="font-semibold">{user.name}</p>
            <p>{user.email}</p>
            <p>{user.role}</p>
          </div>

          <Button
            variant={user.isActive ? "destructive" : "default"}
            onClick={() => toggleStatus(user.id, user.isActive)}
          >
            {user.isActive ? "Suspend" : "Activate"}
          </Button>
        </div>
      ))}
    </div>
  );
}