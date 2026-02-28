// "use client";

// import { useState } from "react";
// import Link from "next/link";
// import { usePathname } from "next/navigation";
// import { AppRole } from "@/src/types/auth";
// import { Menu, X } from "lucide-react";

// interface Props {
//   role: AppRole;
// }

// export function DashboardSidebar({ role }: Props) {
//   const pathname = usePathname();
//   const [open, setOpen] = useState(false);

//   const navItems = {
//     ADMIN: [
//       { label: "Overview", href: "/admin/dashboard" },
//       { label: "Users", href: "/admin/users" },
//       { label: "Orders", href: "/admin/orders" },
//       { label: "Categories", href: "/admin/categories" },
//     ],
//     PROVIDER: [
//       { label: "Overview", href: "/provider/dashboard" },
//       { label: "My Meals", href: "/provider/meals" },
//       { label: "Orders", href: "/provider/orders" },
//       { label: "Profile", href: "/provider/profile" },
//     ],
//     CUSTOMER: [
//       { label: "Overview", href: "/customer" },
//       { label: "Cart", href: "/customer/cart" },
//       { label: "My Orders", href: "/customer/orders" },
//     ],
//   };

//   const links = navItems[role];

//   return (
//     <>
//       <div className="absolute md:fixed">
//         {/* Mobile Top Bar */}
//         <div className="lg:hidden flex items-center justify-between p-4 bg-white border-b h-fit">
//           <button onClick={() => setOpen(true)}>
//             <Menu size={22} />
//           </button>
//         </div>

//         {/* Overlay */}
//         {open && (
//           <div
//             onClick={() => setOpen(false)}
//             className="fixed inset-0 bg-black/40 z-40 lg:hidden"
//           />
//         )}

//         {/* Sidebar */}
//         <aside
//           className={`fixed lg:static  top-0 left-0 h-full w-64 bg-white border-r p-6 space-y-6 z-50 transform transition-transform duration-300
//         ${open ? "translate-x-0" : "-translate-x-full lg:translate-x-0"}`}
//         >
//           {/* Close button (mobile) */}
//           <div className="flex items-center justify-between lg:hidden">
//             <h2 className="font-bold text-lg">Dashboard</h2>
//             <button onClick={() => setOpen(false)}>
//               <X size={22} />
//             </button>
//           </div>

//           {/* Navigation */}
//           <nav className="flex flex-col gap-2">
//             {links.map((item) => {
//               const active = pathname === item.href;

//               return (
//                 <Link
//                   key={item.href}
//                   href={item.href}
//                   onClick={() => setOpen(false)}
//                   className={`px-4 py-2 rounded-lg transition-all text-sm font-medium
//                   ${
//                     active
//                       ? "bg-black text-white"
//                       : "text-gray-600 hover:bg-gray-100"
//                   }`}
//                 >
//                   {item.label}
//                 </Link>
//               );
//             })}
//           </nav>
//         </aside>
//       </div>
//     </>
//   );
// }

"use client";

import { useState } from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { AppRole } from "@/src/types/auth";
import { Menu, X } from "lucide-react";
import { Button } from "../ui/button";
import { toast } from "sonner";
import { authClient } from "@/src/lib/auth-client";
import { useRouter } from "next/navigation";

interface Props {
  role: AppRole;
}

export function DashboardSidebar({ role }: Props) {
  const pathname = usePathname();
  const [open, setOpen] = useState(false);
  const router = useRouter();

  const handleLogout = async () => {
    const toastId = toast.loading("Logging out...");

    try {
      await authClient.signOut();
      toast.success("Logged out successfully", {
        id: toastId,
      });
      router.refresh();
      router.push("/");
    } catch {
      toast.error("Logout failed", { id: toastId });
    }
  };

  const navItems = {
    ADMIN: [
      { label: "Overview", href: "/admin/dashboard" },
      { label: "Users", href: "/admin/users" },
      { label: "Orders", href: "/admin/orders" },
      { label: "Categories", href: "/admin/categories" },
    ],
    PROVIDER: [
      { label: "Overview", href: "/provider/dashboard" },
      { label: "My Meals", href: "/provider/meals" },
      { label: "Orders", href: "/provider/orders" },
      { label: "Profile", href: "/provider/profile" },
    ],
    CUSTOMER: [
      { label: "Overview", href: "/customer" },
      { label: "Cart", href: "/customer/cart" },
      { label: "My Orders", href: "/customer/orders" },
    ],
  };

  const links = navItems[role];

  return (
    <>
      {/* Mobile Header */}
      <div className="lg:hidden h-fit absolute w-full top-0 z-30 bg-white border-b p-4 flex items-center justify-between">
        <button onClick={() => setOpen(true)}>
          <Menu size={22} />
        </button>
        <p>{role}</p>
        <h1 className="font-bold text-lg">FoodHub</h1>
      </div>

      {/* Overlay */}
      {open && (
        <div
          className="fixed inset-0 bg-black/40 z-40 lg:hidden"
          onClick={() => setOpen(false)}
        />
      )}

      {/* Sidebar */}
      <aside
        className={`
          fixed lg:sticky top-0 left-0
          h-screen w-64
          bg-white border-r
          z-50
          transform transition-transform duration-300 ease-in-out
          flex flex-col
          ${open ? "translate-x-0" : "-translate-x-full lg:translate-x-0"}
        `}
      >
        {/* Mobile Close */}
        <div className="lg:hidden flex items-center justify-between p-4 border-b">
          <h2 className="font-semibold">Dashboard</h2>
          <button onClick={() => setOpen(false)}>
            <X size={22} />
          </button>
        </div>

        {/* Scrollable Nav */}
        <nav className="flex-1 overflow-y-auto p-4 space-y-2">
          {links.map((item) => {
            const active = pathname === item.href;

            return (
              <Link
                key={item.href}
                href={item.href}
                onClick={() => setOpen(false)}
                className={`
                  block px-4 py-2 rounded-lg text-sm font-medium transition
                  ${
                    active
                      ? "bg-black text-white"
                      : "text-gray-600 hover:bg-gray-100"
                  }
                `}
              >
                {item.label}
              </Link>
            );
          })}
        </nav>

        <div className="p-4">
          <Button variant="outline" onClick={() => router.push("/")}>
            Return to Home
          </Button>
        </div>
        <div className="p-4">
          <Button variant="outline" onClick={handleLogout}>
            Logout
          </Button>
        </div>

        {/* Bottom Section */}
        <div className="p-4 border-t text-xs text-gray-400">
          © {new Date().getFullYear()} Your Company
        </div>
      </aside>
    </>
  );
}
