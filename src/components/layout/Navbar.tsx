"use client";

import Link from "next/link";
import { useAuth } from "@/src/hooks/useAuth";
import { authClient } from "@/src/lib/auth-client";
import { Button } from "@/src/components/ui/button";
import { toast } from "sonner";
import { useRouter } from "next/navigation";

export function Navbar() {
  const { user, isPending } = useAuth();
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

  return (
    <nav className="border-b p-4 flex justify-between items-center">
      <Link href="/" className="text-xl font-bold">
        FoodHub 🍱
      </Link>

      <div className="flex gap-4 items-center">
        <Link href="/meals">Meals</Link>

        {!user && !isPending && (
          <>
            <Link href="/login">Login</Link>
            <Link href="/register">Register</Link>
          </>
        )}

        {user && (
          <>
            {user.role === "ADMIN" && <Link href="/admin">Admin</Link>}

            {user.role === "PROVIDER" && (
              <Link href="/provider">Dashboard</Link>
            )}

            {user.role === "CUSTOMER" && (
              <Link href="/customer">My Orders</Link>
            )}

            <Button variant="outline" onClick={handleLogout}>
              Logout
            </Button>
          </>
        )}
      </div>
    </nav>
  );
}
