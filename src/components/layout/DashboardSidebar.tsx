"use client";

import Link from "next/link";
import { AppRole } from "@/src/types/auth";

interface Props {
  role: AppRole;
}

export function DashboardSidebar({ role }: Props) {
  return (
    <aside className="w-64 border-r p-6 space-y-4 bg-white">
      <h2 className="text-lg font-bold">Dashboard</h2>

      {role === "ADMIN" && (
        <>
          <Link href="/dashboard/admin">Overview</Link>
          <Link href="/dashboard/admin/users">Users</Link>
          <Link href="/dashboard/admin/orders">Orders</Link>
          <Link href="/dashboard/admin/categories">Categories</Link>
        </>
      )}

      {role === "PROVIDER" && (
        <>
          <Link href="/dashboard/provider">Overview</Link>
          <Link href="/dashboard/provider/menu">My Meals</Link>
          <Link href="/dashboard/provider/orders">Orders</Link>
        </>
      )}

      {role === "CUSTOMER" && (
        <>
          <Link href="/dashboard/customer">Overview</Link>
          <Link href="/dashboard/customer/orders">My Orders</Link>
        </>
      )}
    </aside>
  );
}
