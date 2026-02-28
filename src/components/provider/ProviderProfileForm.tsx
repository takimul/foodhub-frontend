"use client";

import { useState } from "react";
import { clientFetch } from "@/src/services/fetch/clientFetch";
import { Input } from "@/src/components/ui/input";
import { Button } from "@/src/components/ui/button";
import { toast } from "sonner";

interface Props {
  profile: any;
}

interface UpdateResponse {
  success?: boolean;
}

export default function ProviderProfileForm({ profile }: Props) {
  const [form, setForm] = useState({
    businessName: profile?.businessName || "",
    address: profile?.address || "",
    phone: profile?.phone || "",
  });

  const handleUpdate = async () => {
    const toastId = toast.loading("Updating profile...");

    const res = await clientFetch<UpdateResponse>("/providers/me", {
      method: "PATCH",
      body: JSON.stringify(form),
    });

    if (res?.success) {
      toast.success("Profile updated", { id: toastId });
    } else {
      toast.error("Failed", { id: toastId });
    }
  };

  return (
    <div className="max-w-lg space-y-4">
      <h1 className="text-2xl font-bold">Provider Profile</h1>
      <label htmlFor="">Business Name</label>
      <Input
        placeholder="Business Name"
        value={form.businessName}
        onChange={(e) =>
          setForm({
            ...form,
            businessName: e.target.value,
          })
        }
      />
      <label htmlFor="">address</label>
      <Input
        placeholder="Address"
        value={form.address}
        onChange={(e) => setForm({ ...form, address: e.target.value })}
      />
      <label htmlFor="">Phone</label>
      <Input
        placeholder="Phone"
        value={form.phone}
        onChange={(e) => setForm({ ...form, phone: e.target.value })}
      />

      <Button onClick={handleUpdate} className="w-full">
        Update Profile
      </Button>
    </div>
  );
}
