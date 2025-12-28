"use client";

import OwnerSidebar from "@/components/OwnerSidebar";
import Link from "next/link";

export default function OwnerLayout({ children }) {
  return (
    <div className="min-h-screen flex bg-gray-100">

      {/* Sidebar (desktop only) */}
      <div className="hidden md:block">
        <OwnerSidebar />
      </div>

      {/* Content */}
      <div className="flex-1 flex flex-col">

        {/* Mobile Header */}
        <div className="md:hidden bg-slate-900 text-white px-4 py-3 flex justify-between items-center">
          <span className="font-semibold">PG Owner</span>
          <div className="flex gap-3 text-sm">
            <Link href="/owner">Home</Link>
            <Link href="/owner/my-pgs">My PGs</Link>
            <Link href="/owner/add-pg">Add</Link>
          </div>
        </div>

        <main className="flex-1 p-4 sm:p-6">
          {children}
        </main>
      </div>
    </div>
  );
}
