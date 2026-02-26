"use client";

import { useAuth } from "@/src/hooks/useAuth";
// import { DashboardSidebar } from "@/src/components/layout/DashboardSidebar";
import { redirect } from "next/navigation";
import { DashboardSidebar } from "./DashboardSidebar";

interface Props {
  children: React.ReactNode;
}

export function DashboardLayout({ children }: Props) {
  const { user, isPending } = useAuth();

  if (isPending) {
    return <div className="p-10">Loading...</div>;
  }

  if (!user) {
    redirect("/login");
  }

  return (
    <div className="flex min-h-screen">
      <DashboardSidebar role={user.role} />

      <main className="flex-1 p-8 bg-muted/20">{children}</main>
    </div>
  );
}
