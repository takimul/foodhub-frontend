import { cookies } from "next/headers";
import { redirect } from "next/navigation";
// import { apiFetch } from "@/services/api";
// import { Sidebar } from "@/components/layout/Sidebar";

export default async function DashboardLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const cookieStore = cookies();

  const res = await fetch("http://localhost:3000/api/auth/me", {
    headers: {
      Cookie: cookieStore.toString(),
    },
    cache: "no-store",
  });

  if (!res.ok) {
    redirect("/login");
  }

  const user = await res.json();

  return (
    <div className="flex min-h-screen">
      {/* <Sidebar role={user.role} /> */}
      <div className="flex-1 p-6">{children}</div>
    </div>
  );
}
