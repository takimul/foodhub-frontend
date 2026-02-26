// import { Navbar } from "@/components/layout/Navbar";

import { Navbar } from "@/src/components/layout/Navbar";

export default function CommonLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <>
      <Navbar />
      <main className="min-h-screen container mx-auto p-6">{children}</main>
    </>
  );
}
