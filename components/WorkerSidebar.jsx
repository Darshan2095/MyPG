"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { 
  UserPlus, 
  User, 
  ClipboardList, 
  LogOut, 
  LayoutDashboard, 
  Settings,
  Bell,
  ChevronRight
} from "lucide-react";
import { signOut } from "next-auth/react";

export default function WorkerSidebar() {
  const pathname = usePathname();

  const menuItems = [
    { label: "Dashboard", href: "/worker/dashboard", icon: LayoutDashboard },
    { label: "My Profile", href: "/worker/profile", icon: User },
    { label: "Job Requests", href: "/worker/requests", icon: ClipboardList },
  ];

  return (
    <>
      {/* --- DESKTOP SIDEBAR --- */}
      <aside className="hidden md:flex flex-col w-72 bg-slate-950 text-slate-400 h-screen sticky top-0 border-r border-white/5 p-6">
        
        {/* Brand/Logo Section */}
        <div className="flex items-center gap-3 px-2 mb-10">
          <div className="w-10 h-10 bg-blue-600 rounded-xl flex items-center justify-center text-white shadow-lg shadow-blue-600/20">
            <User size={22} fill="currentColor" />
          </div>
          <div>
            <h2 className="text-white font-black tracking-tighter text-xl leading-none">
              Worker<span className="text-blue-500">Hub</span>
            </h2>
            <p className="text-[10px] font-black uppercase tracking-widest text-slate-500 mt-1">Professional Panel</p>
          </div>
        </div>

        {/* Navigation */}
        <nav className="flex-1 space-y-2">
          <p className="px-3 text-[10px] font-black uppercase tracking-[0.2em] text-slate-600 mb-4">Main Menu</p>
          
          {menuItems.map((item) => {
            const isActive = pathname === item.href;
            return (
              <Link
                key={item.href}
                href={item.href}
                className={`flex items-center justify-between group px-4 py-3.5 rounded-2xl transition-all duration-300 font-bold text-sm ${
                  isActive 
                    ? "bg-blue-600 text-white shadow-xl shadow-blue-600/20" 
                    : "hover:bg-white/5 hover:text-white"
                }`}
              >
                <div className="flex items-center gap-3">
                  <item.icon size={20} className={isActive ? "text-white" : "text-slate-500 group-hover:text-blue-400"} />
                  {item.label}
                </div>
                {isActive && <ChevronRight size={16} className="opacity-50" />}
              </Link>
            );
          })}
        </nav>

        {/* Bottom Section: Profile & Logout */}
        <div className="mt-auto pt-6 border-t border-white/5 space-y-4">
          <button className="w-full flex items-center gap-3 px-4 py-3 rounded-2xl hover:bg-white/5 transition-all text-sm font-bold group">
            <div className="relative">
              <div className="w-10 h-10 bg-slate-800 rounded-full flex items-center justify-center text-white">A</div>
              <div className="absolute bottom-0 right-0 w-3 h-3 bg-green-500 border-2 border-slate-950 rounded-full"></div>
            </div>
            <div className="text-left flex-1">
              <p className="text-white text-xs font-black truncate">Arjun Sharma</p>
              <p className="text-[10px] text-slate-500 uppercase tracking-wider font-bold">Electrician</p>
            </div>
            <Bell size={18} className="text-slate-600 group-hover:text-blue-400" />
          </button>

          <button
            onClick={() => signOut({ callbackUrl: "/" })}
            className="w-full flex items-center gap-3 px-4 py-4 rounded-2xl text-red-400 hover:bg-red-500/10 transition-all text-xs font-black uppercase tracking-widest"
          >
            <LogOut size={18} /> Exit
          </button>
        </div>
      </aside>

      {/* --- MOBILE BOTTOM NAV --- */}
      <nav className="md:hidden fixed bottom-0 left-0 right-0 bg-slate-950 border-t border-white/5 px-6 py-3 flex justify-between items-center z-50 backdrop-blur-xl bg-slate-950/90">
        {menuItems.slice(0, 4).map((item) => {
          const isActive = pathname === item.href;
          return (
            <Link 
              key={item.href} 
              href={item.href} 
              className={`p-3 rounded-xl flex flex-col items-center gap-1 transition-all ${
                isActive ? "text-blue-500" : "text-slate-500"
              }`}
            >
              <item.icon size={22} />
              <span className="text-[10px] font-black uppercase tracking-tighter">{item.label.split(' ')[0]}</span>
            </Link>
          );
        })}
        <button 
          onClick={() => signOut({ callbackUrl: "/" })}
          className="p-3 text-red-400"
        >
          <LogOut size={22} />
        </button>
      </nav>
    </>
  );
}