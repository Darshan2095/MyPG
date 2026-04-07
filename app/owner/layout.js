"use client";

import OwnerSidebar from "@/components/OwnerSidebar";
import { Building2, Bell } from "lucide-react";

export default function OwnerLayout({ children }) {
  return (
    <div className="min-h-screen flex bg-gray-50/50">
      
      {/* --- DESKTOP SIDEBAR --- */}
      <div className="hidden md:block">
        <OwnerSidebar />
      </div>

      {/* --- MAIN CONTENT AREA --- */}
      <div className="flex-1 flex flex-col min-w-0">
        
        {/* --- MOBILE TOP HEADER --- */}
        {/* We keep this minimal since navigation is at the bottom */}
        <header className="md:hidden bg-slate-950 text-white px-6 py-4 flex justify-between items-center sticky top-0 z-40 shadow-lg">
          <div className="flex items-center gap-2">
            <div className="w-8 h-8 bg-blue-600 rounded-lg flex items-center justify-center">
              <Building2 size={16} className="text-white" />
            </div>
            <span className="font-black tracking-tighter text-lg">
              Owner<span className="text-blue-500">Pro</span>
            </span>
          </div>
          
          <div className="flex items-center gap-4">
            <button className="relative p-1 text-slate-400">
              <Bell size={20} />
              <span className="absolute top-0 right-0 w-2 h-2 bg-red-500 rounded-full border-2 border-slate-950"></span>
            </button>
            <div className="w-8 h-8 bg-slate-800 rounded-full border border-white/10 flex items-center justify-center text-[10px] font-bold">
              OP
            </div>
          </div>
        </header>

        {/* --- DYNAMIC PAGE CONTENT --- */}
        <main className="flex-1 overflow-y-auto">
          {/* max-w-7xl: Prevents content from stretching too wide on 4K monitors.
              pb-24: Crucial padding to ensure content isn't hidden by the mobile bottom nav.
          */}
          <div className="max-w-7xl mx-auto p-4 sm:p-8 md:p-10 pb-24 md:pb-10">
            {children}
          </div>
        </main>
      </div>

      {/* --- MOBILE SIDEBAR RENDERER --- */}
      {/* This renders the Bottom Nav defined in OwnerSidebar on mobile devices */}
      <div className="md:hidden">
        <OwnerSidebar />
      </div>
    </div>
  );
}