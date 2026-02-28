// "use client";

// import { useAuth } from "@/src/hooks/useAuth";
// import { redirect } from "next/navigation";
// import { DashboardSidebar } from "./DashboardSidebar";

// interface Props {
//   children: React.ReactNode;
// }

// export function DashboardLayout({ children }: Props) {
//   const { user, isPending } = useAuth();

//   if (isPending) {
//     return <div className="p-10">Loading...</div>;
//   }

//   if (!user) {
//     redirect("/login");
//   }

//   return (
//     <div className="flex min-h-screen">
//       <DashboardSidebar role={user.role} />

//       <main className="flex-1 p-8 bg-muted/20">{children}</main>
//     </div>
//   );
// }

"use client";

import { useAuth } from "@/src/hooks/useAuth";
import { useRouter } from "next/navigation";
import { useEffect } from "react";
import { DashboardSidebar } from "./DashboardSidebar";
import { Navbar } from "./Navbar";

interface Props {
  children: React.ReactNode;
}

export function DashboardLayout({ children }: Props) {
  const { user, isPending } = useAuth();
  const router = useRouter();

  // Redirect safely on client
  useEffect(() => {
    if (!isPending && !user) {
      router.replace("/login");
    }
  }, [user, isPending, router]);

  // Full-screen loading state
  if (isPending) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-gray-50">
        <div className="animate-pulse text-gray-500 text-sm">
          Loading dashboard...
        </div>
      </div>
    );
  }

  if (!user) return null;

  return (
    <div className="min-h-screen  bg-gray-50 flex">
      <div className="py-2 w-full z-50 text-center left-0 hidden md:block fixed h-fit border top-0">
        <p>{user.role} DASHBOARD</p>
      </div>
      {/* Sidebar */}
      <DashboardSidebar role={user.role} />

      {/* Content Area */}
      <main className="flex-1 p-6 sm:p-8 lg:p-10 overflow-x-hidden">
        <div className="max-w-7xl mx-auto">{children}</div>
      </main>
    </div>
  );
}
