"use client";

import { useParams } from "next/navigation";
import { useEffect, useState } from "react";
import {
  Star, MapPin, Heart, Share2, Phone, Mail, CheckCircle, 
  Home, Users, Maximize, ArrowLeft, ShieldCheck, 
  Zap, Coffee, Car, Lock, Info, AlertTriangle
} from "lucide-react";
import Link from "next/link";

export default function PgDetailsPage() {
  const { id } = useParams();
  const [pg, setPg] = useState(null);
  const [activeImg, setActiveImg] = useState(0);

  useEffect(() => {
    fetch(`/api/pg/${id}`)
      .then((res) => res.json())
      .then(setPg);
  }, [id]);

  if (!pg) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-gray-50 text-blue-600">
        <div className="flex flex-col items-center gap-2">
           <div className="w-10 h-10 border-4 border-t-transparent border-blue-600 rounded-full animate-spin"></div>
           <span className="font-bold tracking-widest text-sm">LOADING PG...</span>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-[#F8FAFC] pb-24 lg:pb-12">
      {/* --- TOP NAVIGATION --- */}
      <nav className="bg-white/90 backdrop-blur-md border-b sticky top-0 z-50 px-6 py-4">
        <div className="max-w-7xl mx-auto flex justify-between items-center">
          <Link href="/pg" className="flex items-center gap-2 font-bold text-gray-800 hover:text-blue-600 transition-all">
            <ArrowLeft size={20} />
            <span className="hidden sm:inline">Back to Listings</span>
          </Link>
          <div className="flex gap-4">
            <button className="flex items-center gap-2 text-sm font-bold text-gray-500 hover:text-red-500 transition-colors">
               <Heart size={18} /> <span className="hidden sm:inline">Save</span>
            </button>
            <button className="flex items-center gap-2 text-sm font-bold text-gray-500 hover:text-blue-500 transition-colors">
               <Share2 size={18} /> <span className="hidden sm:inline">Share</span>
            </button>
          </div>
        </div>
      </nav>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-10 items-start">
          
          {/* ================= LEFT CONTENT AREA ================= */}
          <div className="lg:col-span-2 space-y-12">
            
            {/* 1. IMAGE SUITE */}
            <div className="space-y-4">
              <div className="relative aspect-video overflow-hidden rounded-[2.5rem] shadow-2xl border-4 border-white">
                <img
                  src={pg.images[activeImg] || "/api/placeholder/800/600"}
                  className="w-full h-full object-cover"
                  alt="Property view"
                />
                <div className="absolute top-6 left-6 flex gap-2">
                  <span className="bg-blue-600 text-white text-[10px] font-black px-3 py-1 rounded-full uppercase tracking-widest shadow-lg">
                    {pg.status || "Available"}
                  </span>
                </div>
              </div>
              
              {/* Thumbnails */}
              <div className="flex gap-3 overflow-x-auto pb-2 px-2 scrollbar-hide">
                {pg.images.map((img, i) => (
                  <button 
                    key={i} 
                    onClick={() => setActiveImg(i)}
                    className={`relative flex-shrink-0 transition-all duration-300 rounded-2xl overflow-hidden border-2 ${
                      activeImg === i ? "border-blue-600 ring-4 ring-blue-50" : "border-transparent opacity-60"
                    }`}
                  >
                    <img src={img} className="h-20 w-32 object-cover" />
                  </button>
                ))}
              </div>
            </div>

            {/* 2. CORE HEADER */}
            <div className="bg-white p-8 rounded-[2rem] shadow-sm border border-gray-100">
              <h1 className="text-4xl font-black text-gray-900 mb-2 leading-tight">{pg.pgName}</h1>
              <div className="flex items-center gap-2 text-gray-500 font-semibold mb-6">
                <MapPin size={18} className="text-red-500" />
                {pg.location}, {pg.city}
              </div>
              
              <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
                <FeatureBox icon={<Users />} label="Gender" value={pg.genderAllowed} color="bg-orange-50 text-orange-600" />
                <FeatureBox icon={<Home />} label="Room Type" value={pg.roomType} color="bg-blue-50 text-blue-600" />
                <FeatureBox icon={<Maximize />} label="Area" value={`${pg.area} sqft`} color="bg-green-50 text-green-600" />
                <FeatureBox icon={<Lock />} label="Furnishing" value={pg.furnishing} color="bg-purple-50 text-purple-600" />
              </div>
            </div>

            {/* 3. DESCRIPTION */}
            <Section title="About this PG" icon={<Info className="text-blue-600" />}>
              <div className="bg-white p-8 rounded-[2rem] border border-gray-100 leading-relaxed text-gray-600 text-lg shadow-sm">
                {pg.description}
              </div>
            </Section>

            {/* 4. AMENITIES & FEATURES */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
              <Section title="Amenities" icon={<Zap className="text-yellow-500" />}>
                <div className="grid grid-cols-1 gap-3">
                  {pg.amenities?.map((item, i) => (
                    <div key={i} className="flex items-center gap-3 bg-white p-4 rounded-2xl border border-gray-50 font-bold text-gray-700">
                      <CheckCircle size={20} className="text-green-500" /> {item}
                    </div>
                  ))}
                </div>
              </Section>

              <Section title="Property Features" icon={<Car className="text-indigo-500" />}>
                <div className="grid grid-cols-1 gap-3">
                  {pg.propertyFeatures?.map((item, i) => (
                    <div key={i} className="flex items-center gap-3 bg-white p-4 rounded-2xl border border-gray-50 font-bold text-gray-700">
                      <div className="w-2 h-2 rounded-full bg-indigo-500"></div> {item}
                    </div>
                  ))}
                </div>
              </Section>
            </div>

            {/* 5. HOUSE RULES */}
            <Section title="House Rules" icon={<AlertTriangle className="text-red-500" />}>
              <div className="bg-red-50/50 p-8 rounded-[2rem] border border-red-100">
                <ul className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  {pg.houseRules?.map((rule, i) => (
                    <li key={i} className="flex items-start gap-3 text-sm font-bold text-gray-700 italic">
                      <span className="text-red-500">•</span> {rule}
                    </li>
                  ))}
                </ul>
              </div>
            </Section>

            {/* 6. NEARBY PLACES */}
            <Section title="Nearby Landmarks" icon={<MapPin className="text-blue-500" />}>
               <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  {pg.nearbyPlaces?.map((p, i) => (
                    <div key={i} className="flex items-center justify-between bg-white p-5 rounded-2xl border border-gray-100 shadow-sm">
                       <span className="font-black text-gray-800">{p.name}</span>
                       <span className="text-xs bg-gray-100 px-3 py-1 rounded-full text-gray-500 font-bold">{p.distance}</span>
                    </div>
                  ))}
               </div>
            </Section>
          </div>

          {/* ================= RIGHT SIDEBAR ================= */}
          <div className="lg:sticky lg:top-28 space-y-6">
            
            {/* PRICING CARD */}
            <div className="bg-[#1E293B] text-white rounded-[2.5rem] p-8 shadow-2xl relative overflow-hidden group">
              <div className="absolute top-0 right-0 p-4 opacity-10 group-hover:rotate-12 transition-transform">
                <ShieldCheck size={100} />
              </div>

              <div className="relative z-10">
                <span className="text-blue-400 text-[10px] font-black tracking-[0.2em] uppercase mb-4 block">Monthly Membership</span>
                <div className="flex items-baseline gap-2 mb-8">
                  <span className="text-5xl font-black italic">₹{pg.pricing?.monthlyRent}</span>
                  <span className="text-gray-400 font-medium">/mo</span>
                </div>

                <div className="space-y-4 mb-10">
                   <div className="flex justify-between text-sm py-3 border-b border-white/10">
                      <span className="text-gray-400 font-bold">Security Deposit</span>
                      <span className="font-mono text-lg font-bold text-blue-300">₹{pg.pricing?.securityDeposit}</span>
                   </div>
                   <div className="flex justify-between text-sm py-3 border-b border-white/10">
                      <span className="text-gray-400 font-bold">Booking Amount</span>
                      <span className="font-mono text-lg font-bold text-blue-300">₹{pg.pricing?.totalInitialPayment}</span>
                   </div>
                </div>

                <div className="space-y-3">
                  <button className="w-full bg-blue-600 hover:bg-blue-500 text-white font-black py-5 rounded-2xl transition-all shadow-xl shadow-blue-600/20 active:scale-95 flex items-center justify-center gap-3">
                    <Phone size={20} fill="currentColor" /> CALL OWNER NOW
                  </button>
                  <button className="w-full bg-white/5 hover:bg-white/10 backdrop-blur-sm text-white font-black py-5 rounded-2xl transition-all flex items-center justify-center gap-3 border border-white/10">
                    <Mail size={20} /> SEND INQUIRY
                  </button>
                </div>
              </div>
            </div>

            {/* OWNER CARD */}
            <div className="bg-white border border-gray-100 rounded-[2.5rem] p-8 shadow-sm text-center">
               <div className="w-20 h-20 bg-gradient-to-br from-blue-600 to-blue-400 rounded-3xl mx-auto flex items-center justify-center text-3xl text-white font-black shadow-xl mb-4 rotate-3">
                 {pg.ownerName?.[0]}
               </div>
               <h3 className="text-xl font-black text-gray-900 mb-1">{pg.ownerName}</h3>
               <p className="text-gray-400 font-bold text-[10px] uppercase tracking-widest mb-4">Official Host</p>
               
               <div className="flex items-center justify-center gap-1 text-yellow-500 mb-4">
                  {[...Array(5)].map((_, i) => <Star key={i} size={14} fill="currentColor" />)}
               </div>

               <div className="text-xs text-gray-500 font-bold flex items-center justify-center gap-2">
                  <ShieldCheck size={14} className="text-green-500" />
                  ID VERIFIED
               </div>
            </div>
          </div>
        </div>
      </div>

      {/* MOBILE STICKY BUTTON */}
      <div className="lg:hidden fixed bottom-6 left-6 right-6 z-50">
         <div className="bg-[#1E293B] p-4 rounded-3xl shadow-2xl flex items-center justify-between border border-white/10 backdrop-blur-lg">
            <div>
              <p className="text-[10px] font-black text-blue-400 uppercase tracking-tighter">Starts From</p>
              <p className="text-2xl font-black text-white italic">₹{pg.pricing?.monthlyRent}</p>
            </div>
            <button className="bg-blue-600 text-white px-8 py-4 rounded-2xl font-black text-sm shadow-lg shadow-blue-600/40">
              CONTACT
            </button>
         </div>
      </div>
    </div>
  );
}

/* ================= UTILITY COMPONENTS ================= */

function Section({ title, icon, children }) {
  return (
    <div className="space-y-6">
      <h3 className="text-2xl font-black text-gray-900 flex items-center gap-3">
        {icon}
        {title}
      </h3>
      <div>{children}</div>
    </div>
  );
}

function FeatureBox({ icon, label, value, color }) {
  return (
    <div className={`p-5 rounded-[2rem] flex flex-col items-center text-center gap-2 transition-transform hover:scale-105 ${color}`}>
      <div className="opacity-80">{icon}</div>
      <div>
        <p className="text-[9px] uppercase font-black opacity-60 tracking-widest">{label}</p>
        <p className="text-sm font-black">{value || "N/A"}</p>
      </div>
    </div>
  );
}