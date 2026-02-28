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
          <Link href="/admin">Overview</Link>
          <Link href="/admin/users">Users</Link>
          <Link href="/admin/orders">Orders</Link>
          <Link href="/admin/categories">Categories</Link>
        </>
      )}

      {role === "PROVIDER" && (
        <>
          <Link href="/provider/dashboard">Overview</Link>
          <Link href="/provider/meals">My Meals</Link>
          <Link href="/provider/orders">Orders</Link>
        </>
      )}

      {role === "CUSTOMER" && (
        <>
          <div className="flex flex-col gap-2">
            <Link href="/customer">Overview</Link>
            {/* <Link href="/customer/checkout">Checkout</Link> */}
            <Link href="/customer/cart">Cart</Link>
            <Link href="/customer/orders">My Orders</Link>
          </div>
        </>
      )}
    </aside>
  );
}
