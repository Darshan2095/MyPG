"use client";

import Link from "next/link";
import { Home, Facebook, Instagram, Linkedin, Twitter, Mail, ArrowRight } from "lucide-react";

export default function Footer() {
  return (
    <footer className="bg-slate-950 text-slate-300 border-t border-white/5">
      <div className="max-w-7xl mx-auto px-6 pt-20 pb-10">
        
        {/* --- TOP SECTION: NEWSLETTER --- */}
        <div className="flex flex-col lg:flex-row justify-between items-center mb-16 p-8 md:p-12 rounded-[2.5rem] bg-gradient-to-br from-slate-900 to-slate-950 border border-white/5 shadow-2xl">
          <div className="mb-8 lg:mb-0 text-center lg:text-left">
            <h2 className="text-2xl md:text-3xl font-black text-white tracking-tight mb-2">
              Stay in the <span className="text-blue-500">Loop.</span>
            </h2>
            <p className="text-slate-400 font-medium">Subscribe for new property alerts and exclusive offers.</p>
          </div>
          <div className="w-full lg:w-auto">
            <form className="flex flex-col sm:flex-row gap-3">
              <div className="relative flex-grow min-w-[300px]">
                <Mail className="absolute left-4 top-1/2 -translate-y-1/2 text-slate-500" size={18} />
                <input 
                  type="email" 
                  placeholder="Enter your email" 
                  className="w-full bg-white/5 border border-white/10 rounded-2xl py-4 pl-12 pr-4 focus:outline-none focus:border-blue-500 transition-all font-medium text-white"
                />
              </div>
              <button className="bg-blue-600 hover:bg-blue-500 text-white font-black px-8 py-4 rounded-2xl transition-all flex items-center justify-center gap-2 group shadow-lg shadow-blue-600/20 active:scale-95">
                JOIN NOW <ArrowRight size={18} className="group-hover:translate-x-1 transition-transform" />
              </button>
            </form>
          </div>
        </div>

        {/* --- MIDDLE SECTION: LINKS --- */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-12 mb-16">
          {/* Brand & Bio */}
          <div className="space-y-6">
            <Link href="/" className="flex items-center gap-2 text-2xl font-black text-white tracking-tighter">
              <div className="bg-blue-600 p-1 rounded-lg">
                <Home size={20} fill="white" stroke="white" />
              </div>
              <span>My<span className="text-blue-500">PG</span></span>
            </Link>
            <p className="text-sm leading-relaxed text-slate-400 font-medium">
              India's most trusted premium PG network. We connect you with verified accommodations that feel like home.
            </p>
            <div className="flex gap-4 pt-2">
              <SocialLink icon={<Facebook size={18} />} />
              <SocialLink icon={<Instagram size={18} />} />
              <SocialLink icon={<Twitter size={18} />} />
              <SocialLink icon={<Linkedin size={18} />} />
            </div>
          </div>

          {/* Quick Links */}
          <FooterColumn title="Explore">
            <FooterLink href="/pgs">Find a PG</FooterLink>
            <FooterLink href="/cities">Explore Cities</FooterLink>
            <FooterLink href="/about">How it Works</FooterLink>
            <FooterLink href="/blog">Living Tips</FooterLink>
          </FooterColumn>

          {/* Business */}
          <FooterColumn title="For Owners">
            <FooterLink href="/owner/add-pg">List Your Property</FooterLink>
            <FooterLink href="/owner">Dashboard</FooterLink>
            <FooterLink href="/login">Owner Login</FooterLink>
            <FooterLink href="/advertise">Advertise with Us</FooterLink>
          </FooterColumn>

          {/* Legals */}
          <FooterColumn title="Company">
            <FooterLink href="/contact">Support Center</FooterLink>
            <FooterLink href="/terms">Terms of Service</FooterLink>
            <FooterLink href="/privacy">Privacy Policy</FooterLink>
            <FooterLink href="/careers">Careers</FooterLink>
          </FooterColumn>
        </div>

        {/* --- BOTTOM SECTION --- */}
        <div className="border-t border-white/5 pt-8 flex flex-col md:flex-row justify-between items-center gap-4">
          <p className="text-xs font-bold text-slate-500 uppercase tracking-widest">
            © {new Date().getFullYear()} MyPG Technologies Pvt Ltd.
          </p>
          <div className="flex gap-8">
            <Link href="/sitemap" className="text-xs font-bold text-slate-500 hover:text-white transition-colors uppercase tracking-widest">Sitemap</Link>
            <Link href="/cookies" className="text-xs font-bold text-slate-500 hover:text-white transition-colors uppercase tracking-widest">Cookies</Link>
          </div>
        </div>
      </div>
    </footer>
  );
}

/* --- HELPER COMPONENTS --- */

function FooterColumn({ title, children }) {
  return (
    <div className="space-y-6">
      <h3 className="text-[10px] font-black uppercase tracking-[0.2em] text-blue-500">{title}</h3>
      <ul className="space-y-4">{children}</ul>
    </div>
  );
}

function FooterLink({ href, children }) {
  return (
    <li>
      <Link 
        href={href} 
        className="text-sm font-semibold text-slate-400 hover:text-white hover:translate-x-1 transition-all inline-block"
      >
        {children}
      </Link>
    </li>
  );
}

function SocialLink({ icon }) {
  return (
    <a 
      href="#" 
      className="w-10 h-10 rounded-xl bg-white/5 border border-white/10 flex items-center justify-center hover:bg-blue-600 hover:border-blue-600 hover:text-white transition-all duration-300"
    >
      {icon}
    </a>
  );
}