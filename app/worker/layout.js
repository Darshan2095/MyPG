"use client";

import WorkerSidebar from "@/components/WorkerSidebar";
import { User, Bell } from "lucide-react";

export default function WorkerLayout({ children }) {
  return (
    <div className="min-h-screen flex bg-gray-50/50">
      {/* --- DESKTOP SIDEBAR --- */}
      {/* Hidden on mobile, shown on md (768px) and up. 
          Sticky positioning is handled inside the Sidebar component itself.
      */}
      <div className="hidden md:block">
        <WorkerSidebar />
      </div>

      {/* --- MAIN CONTENT AREA --- */}
      <div className="flex-1 flex flex-col min-w-0 overflow-hidden">
        
        {/* --- MOBILE TOP HEADER --- */}
        {/* On mobile, we show a clean header with the brand name.
            Navigation links are hidden here because they are in the 
            Bottom Nav of our WorkerSidebar component.
        */}
        <header className="md:hidden bg-slate-950 text-white px-6 py-4 flex justify-between items-center sticky top-0 z-40 shadow-md">
          <div className="flex items-center gap-2">
            <div className="w-8 h-8 bg-blue-600 rounded-lg flex items-center justify-center">
              <User size={16} fill="white" />
            </div>
            <span className="font-black tracking-tighter text-lg">
              Worker<span className="text-blue-500">Hub</span>
            </span>
          </div>
          
          <div className="flex items-center gap-4">
            <button className="relative p-1 text-slate-400">
              <Bell size={20} />
              <span className="absolute top-0 right-0 w-2 h-2 bg-red-500 rounded-full border-2 border-slate-950"></span>
            </button>
            <div className="w-8 h-8 bg-slate-800 rounded-full border border-white/10 flex items-center justify-center text-[10px] font-bold">
              AS
            </div>
          </div>
        </header>

        {/* --- DYNAMIC MAIN CONTENT --- */}
        <main className="flex-1 overflow-y-auto outline-none">
          {/* Padding-bottom (pb-24) ensures content isn't hidden 
              behind the mobile bottom-nav.
          */}
          <div className="max-w-7xl mx-auto p-4 sm:p-8 md:p-10 pb-24 md:pb-10">
            {children}
          </div>
        </main>
      </div>

      {/* --- MOBILE BOTTOM NAV (Rendered inside Sidebar) --- */}
      {/* Ensure your WorkerSidebar component includes the fixed 
          mobile bottom navigation as provided in the previous step.
      */}
      <div className="md:hidden">
        <WorkerSidebar />
      </div>
    </div>
  );
}