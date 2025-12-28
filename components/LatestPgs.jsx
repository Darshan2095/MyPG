"use client";

import { useEffect, useState } from "react";
import { MapPin, ArrowRight, Sparkles, Navigation } from "lucide-react";
import { useRouter } from "next/navigation";

export default function LatestPgs() {
  const [pgs, setPgs] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const router = useRouter();

  useEffect(() => {
    fetch("/api/pg/latest")
      .then((res) => res.json())
      .then((data) => {
        setPgs(data);
        setIsLoading(false);
      })
      .catch(() => setIsLoading(false));
  }, []);

  if (isLoading) return <LoadingSkeleton />;

  return (
    <section className="max-w-7xl mx-auto px-6 py-20 bg-white">
      {/* SECTION HEADER */}
      <div className="flex flex-col md:flex-row md:items-end justify-between mb-12 gap-6">
        <div className="space-y-3">
          <div className="flex items-center gap-2 text-blue-600 font-black text-[10px] uppercase tracking-[0.2em]">
            <Sparkles size={14} />
            <span>New Additions</span>
          </div>
          <h2 className="text-3xl md:text-5xl font-black text-gray-900 tracking-tight">
            Latest <span className="text-transparent bg-clip-text bg-gradient-to-r from-blue-600 to-indigo-600">Premium Listings</span>
          </h2>
        </div>
        
        <button 
          onClick={() => router.push("/pg")}
          className="group hidden md:flex items-center gap-2 text-gray-400 font-bold hover:text-gray-900 transition-all"
        >
          EXPLORE ALL <ArrowRight size={18} className="group-hover:translate-x-1 transition-transform" />
        </button>
      </div>

      {/* GRID */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-10">
        {pgs.slice(0, 3).map((pg) => (
          <div
            key={pg._id}
            onClick={() => router.push(`/pg/${pg._id}`)}
            className="group cursor-pointer bg-white rounded-[2.5rem] overflow-hidden border border-gray-100 shadow-sm hover:shadow-2xl hover:shadow-blue-100/30 transition-all duration-500 hover:-translate-y-2"
          >
            {/* IMAGE AREA */}
            <div className="relative h-64 overflow-hidden">
              <img
                src={pg.images?.[0] || "/placeholder.jpg"}
                className="h-full w-full object-cover transition-transform duration-700 group-hover:scale-110"
                alt={pg.pgName}
              />
              
              {/* Badges on Image */}
              <div className="absolute top-5 left-5 flex gap-2">
                <span className="bg-white/90 backdrop-blur-md text-gray-900 text-[10px] font-black px-4 py-1.5 rounded-full shadow-sm flex items-center gap-1">
                  {pg.genderAllowed}
                </span>
                {pg.pricing?.monthlyRent < 10000 && (
                   <span className="bg-green-500 text-white text-[10px] font-black px-4 py-1.5 rounded-full shadow-sm">
                     BUDGET FRIENDLY
                   </span>
                )}
              </div>

              {/* Price Tag Overlay */}
              <div className="absolute bottom-5 right-5 bg-gray-900/90 backdrop-blur-md text-white px-5 py-3 rounded-2xl border border-white/10 shadow-2xl">
                <p className="text-[9px] uppercase font-black text-blue-400 tracking-widest mb-0.5">Monthly</p>
                <p className="text-xl font-black italic tracking-tight">₹{pg.pricing?.monthlyRent}</p>
              </div>
            </div>

            {/* CONTENT AREA */}
            <div className="p-8">
              <div className="flex items-center gap-1.5 text-blue-600 font-bold text-[10px] uppercase tracking-widest mb-2">
                <Navigation size={12} fill="currentColor" />
                {pg.location}
              </div>
              
              <h3 className="text-2xl font-black text-gray-900 mb-2 line-clamp-1 group-hover:text-blue-600 transition-colors">
                {pg.pgName}
              </h3>
              
              <p className="text-gray-400 font-medium text-sm mb-6 flex items-center gap-1">
                <MapPin size={14} /> {pg.city}
              </p>

              <div className="flex items-center justify-between pt-6 border-t border-gray-50">
                <div className="flex -space-x-2">
                   {/* Decorative icons for "verified" feel */}
                   <div className="w-8 h-8 rounded-full bg-blue-50 border-2 border-white flex items-center justify-center text-blue-600 font-bold text-[10px]">V</div>
                   <div className="w-8 h-8 rounded-full bg-indigo-50 border-2 border-white flex items-center justify-center text-indigo-600 font-bold text-[10px]">★</div>
                </div>
                <span className="text-xs font-black text-gray-900 group-hover:underline flex items-center gap-1">
                  VIEW DETAILS <ArrowRight size={14} />
                </span>
              </div>
            </div>
          </div>
        ))}
      </div>

      {/* MOBILE VIEW ALL BUTTON */}
      <div className="mt-16 flex justify-center md:hidden">
        <button
          onClick={() => router.push("/pg")}
          className="w-full bg-gray-900 text-white py-5 rounded-2xl font-black tracking-[0.2em] text-xs shadow-xl active:scale-95 transition-all"
        >
          VIEW ALL PROPERTIES
        </button>
      </div>
    </section>
  );
}

// PREMIUM LOADING SKELETON
function LoadingSkeleton() {
    return (
      <div className="max-w-7xl mx-auto px-6 py-20">
        <div className="h-10 w-64 bg-gray-100 rounded-full mb-12 animate-pulse" />
        <div className="grid grid-cols-1 md:grid-cols-3 gap-10">
          {[1, 2, 3].map((n) => (
            <div key={n} className="h-[450px] bg-gray-50 rounded-[2.5rem] animate-pulse border border-gray-100" />
          ))}
        </div>
      </div>
    );
}