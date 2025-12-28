"use client";

import Link from "next/link";
import { useState, useEffect, useRef } from "react";
import {
  Menu,
  X,
  ChevronDown,
  Home,
  Search,
  PlusCircle,
  LogOut,
  User,
  LayoutDashboard,
  Settings,
  PhoneCall
} from "lucide-react";
import { useSession, signOut } from "next-auth/react";

export default function Navbar() {
  const { data: session, status } = useSession();
  const isLoggedIn = !!session;

  const [mobileOpen, setMobileOpen] = useState(false);
  const [dropdownOpen, setDropdownOpen] = useState(false);
  const dropdownRef = useRef(null);

  // Close dropdown when clicking outside
  useEffect(() => {
    function handleClickOutside(event) {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target)) {
        setDropdownOpen(false);
      }
    }
    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  const NavLink = ({ href, children, icon: Icon }) => (
    <Link
      href={href}
      className="flex items-center gap-2 px-3 py-2 rounded-lg transition-all hover:bg-white/10 font-medium"
    >
      {Icon && <Icon size={18} />}
      {children}
    </Link>
  );

  return (
    <nav className="w-full bg-slate-950/80 backdrop-blur-md text-white sticky top-0 z-[100] border-b border-white/10">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 py-3 flex items-center justify-between">
        
        {/* LOGO */}
        <Link href="/" className="flex items-center gap-2 text-2xl font-black tracking-tighter group">
          <div className="bg-blue-600 p-1.5 rounded-lg group-hover:rotate-6 transition-transform">
            <Home size={22} fill="white" />
          </div>
          <span>My<span className="text-blue-500">PG</span></span>
        </Link>

        {/* DESKTOP MENU */}
        <div className="hidden md:flex items-center gap-2">
          <NavLink href="/">Home</NavLink>
          <NavLink href="/pg">Find PG</NavLink>
          <NavLink href="/">Cities</NavLink>

          {/* SERVICES CLICK DROPDOWN */}
          <div className="relative" ref={dropdownRef}>
            <button
              onClick={() => setDropdownOpen(!dropdownOpen)}
              className={`flex items-center gap-1 px-4 py-2 rounded-lg transition-all font-medium ${
                dropdownOpen ? "bg-white/10 text-blue-400" : "hover:bg-white/10"
              }`}
            >
              Services <ChevronDown size={14} className={`transition-transform ${dropdownOpen ? "rotate-180" : ""}`} />
            </button>

            {dropdownOpen && (
              <div className="absolute top-[calc(100%+8px)] right-0 w-64 bg-slate-900 border border-white/10 rounded-2xl shadow-2xl p-2 animate-in fade-in zoom-in duration-200">
                <DropdownItem href="/pg" icon={Search} label="PG Booking" desc="Browse verified listings" />
                <DropdownItem href="/owner/add-pg" icon={PlusCircle} label="Register PG" desc="List your property today" />
                <DropdownItem href="/contact" icon={PhoneCall} label="Support" desc="Get help 24/7" />
              </div>
            )}
          </div>
        </div>

        {/* AUTH DESKTOP */}
        <div className="hidden md:flex items-center gap-3">
          {status !== "loading" && (
            isLoggedIn ? (
              <div className="flex items-center gap-4 pl-4 border-l border-white/10">
                <div className="flex flex-col items-end">
                  <span className="text-xs font-bold text-slate-400 uppercase tracking-widest">Welcome</span>
                  <span className="text-sm font-bold">{session.user.name}</span>
                </div>
                
                {/* Profile Circle */}
                <div className="relative group cursor-pointer">
                  <div className="w-10 h-10 rounded-full bg-gradient-to-tr from-blue-600 to-indigo-600 flex items-center justify-center font-bold border-2 border-white/20">
                    {session.user.name[0]}
                  </div>
                  
                  {/* Mini Hover Menu */}
                  <div className="absolute top-full right-0 mt-2 w-48 bg-slate-900 border border-white/10 rounded-xl opacity-0 invisible group-hover:opacity-100 group-hover:visible transition-all p-1 shadow-2xl">
                    {session.user.role === "PG_OWNER" && (
                      <Link href="/owner" className="flex items-center gap-2 px-3 py-2 hover:bg-white/10 rounded-lg text-sm">
                        <LayoutDashboard size={16} /> Dashboard
                      </Link>
                    )}
                    <button 
                      onClick={() => signOut({ callbackUrl: "/login" })}
                      className="w-full flex items-center gap-2 px-3 py-2 hover:bg-red-500/20 text-red-400 rounded-lg text-sm"
                    >
                      <LogOut size={16} /> Logout
                    </button>
                  </div>
                </div>
              </div>
            ) : (
              <div className="flex items-center gap-2">
                <Link href="/login" className="px-5 py-2 hover:text-blue-400 transition-colors font-bold text-sm">
                  Login
                </Link>
                <Link
                  href="/signin"
                  className="bg-blue-600 hover:bg-blue-500 text-white px-6 py-2.5 rounded-xl font-bold text-sm shadow-lg shadow-blue-600/20 transition-all active:scale-95"
                >
                  Sign up
                </Link>
              </div>
            )
          )}
        </div>

        {/* MOBILE MENU BUTTON */}
        <button
          className="md:hidden p-2 hover:bg-white/10 rounded-lg transition-colors"
          onClick={() => setMobileOpen(!mobileOpen)}
        >
          {mobileOpen ? <X size={28} /> : <Menu size={28} />}
        </button>
      </div>

      {/* MOBILE MENU PANEL */}
      {mobileOpen && (
        <div className="md:hidden absolute top-full left-0 w-full bg-slate-950 border-b border-white/10 px-6 py-8 space-y-6 animate-in slide-in-from-top duration-300">
          <div className="flex flex-col gap-4">
            <MobileLink href="/" onClick={() => setMobileOpen(false)}>Home</MobileLink>
            <MobileLink href="/pg" onClick={() => setMobileOpen(false)}>Find PG</MobileLink>
            <MobileLink href="/" onClick={() => setMobileOpen(false)}>Cities</MobileLink>
            <MobileLink href="/owner/add-pg" onClick={() => setMobileOpen(false)}>List Property</MobileLink>
          </div>

          <div className="pt-6 border-t border-white/10">
            {isLoggedIn ? (
              <div className="space-y-4">
                <div className="flex items-center gap-3 mb-6">
                   <div className="w-12 h-12 rounded-full bg-blue-600 flex items-center justify-center text-xl font-bold">
                     {session.user.name[0]}
                   </div>
                   <div>
                     <p className="font-bold text-lg">{session.user.name}</p>
                     <p className="text-xs text-slate-400">Personal Account</p>
                   </div>
                </div>
                {session.user.role === "PG_OWNER" && (
                  <Link href="/owner" className="block w-full text-center py-3 border border-white/20 rounded-xl font-bold">
                    Owner Dashboard
                  </Link>
                )}
                <button
                  onClick={() => signOut({ callbackUrl: "/login" })}
                  className="w-full bg-red-600/10 text-red-500 py-3 rounded-xl font-bold border border-red-500/20"
                >
                  Logout
                </button>
              </div>
            ) : (
              <div className="grid grid-cols-2 gap-4">
                <Link href="/login" onClick={() => setMobileOpen(false)} className="text-center py-3 border border-white/20 rounded-xl font-bold">
                  Login
                </Link>
                <Link href="/signin" onClick={() => setMobileOpen(false)} className="text-center py-3 bg-blue-600 rounded-xl font-bold">
                  Sign up
                </Link>
              </div>
            )}
          </div>
        </div>
      )}
    </nav>
  );
}

/* HELPER COMPONENTS */

function DropdownItem({ href, icon: Icon, label, desc }) {
  return (
    <Link href={href} className="flex items-center gap-3 p-3 rounded-xl hover:bg-white/5 transition-colors group">
      <div className="bg-slate-800 p-2 rounded-lg group-hover:bg-blue-600 transition-colors">
        <Icon size={20} className="text-blue-400 group-hover:text-white" />
      </div>
      <div>
        <p className="text-sm font-bold text-white leading-none mb-1">{label}</p>
        <p className="text-[10px] text-slate-400 font-medium tracking-tight uppercase">{desc}</p>
      </div>
    </Link>
  );
}

function MobileLink({ href, children, onClick }) {
  return (
    <Link href={href} onClick={onClick} className="text-2xl font-black tracking-tight text-white hover:text-blue-500 transition-colors">
      {children}
    </Link>
  );
}