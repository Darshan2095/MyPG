"use client";

import Link from "next/link";
import { Home, Building2, PlusCircle, LogOut } from "lucide-react";
import { signOut } from "next-auth/react";

export default function OwnerSidebar() {
  return (
    <aside className="w-full md:w-64 bg-slate-900 text-white min-h-screen p-6">
      <h2 className="text-xl font-bold mb-8">PG Owner</h2>

      <nav className="space-y-4 text-sm">
        <Link href="/owner" className="flex items-center gap-3 hover:text-blue-400">
          <Home size={18} /> Dashboard
        </Link>

        <Link href="/owner/my-pgs" className="flex items-center gap-3 hover:text-blue-400">
          <Building2 size={18} /> My PGs
        </Link>

        <Link href="/owner/add-pg" className="flex items-center gap-3 hover:text-blue-400">
          <PlusCircle size={18} /> Add New PG
        </Link>

        <button
          onClick={() => signOut({ callbackUrl: "/login" })}
          className="flex items-center gap-3 text-red-400 hover:text-red-500 mt-10"
        >
          <LogOut size={18} /> Logout
        </button>
        <Link
  href="/"
  className="flex items-center gap-3 text-red-400 hover:text-red-500 mt-10"
>
Back
</Link>
      </nav>
    </aside>
  );
}
