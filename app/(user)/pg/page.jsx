"use client";

import { useEffect, useState } from "react";
import {
  MapPin,
  ArrowRight,
  Users,
  Sparkles,
  ArrowLeft,
  Search,
  BedDouble,
  CircleDollarSign,
  Eraser,
  XCircle
} from "lucide-react";
import { useRouter } from "next/navigation";

export default function LatestPgs() {
  const router = useRouter();

  const [allPgs, setAllPgs] = useState([]);
  const [pgs, setPgs] = useState([]);
  const [loading, setLoading] = useState(true);

  const [filters, setFilters] = useState({
    city: "",
    gender: "",
    roomType: "",
    minPrice: "",
    maxPrice: ""
  });

  /* FETCH DATA */
  useEffect(() => {
    fetch("/api/pg/latest")
      .then((res) => res.json())
      .then((data) => {
        setAllPgs(data);
        setPgs(data);
        setLoading(false);
      })
      .catch(() => setLoading(false));
  }, []);

  /* FILTER LOGIC */
  useEffect(() => {
    let filtered = allPgs.filter((pg) => {
      if (filters.city && pg.city !== filters.city) return false;
      if (filters.gender && pg.genderAllowed !== filters.gender) return false;
      if (filters.roomType && pg.roomType !== filters.roomType) return false;
      if (filters.minPrice && pg.pricing?.monthlyRent < Number(filters.minPrice)) return false;
      if (filters.maxPrice && pg.pricing?.monthlyRent > Number(filters.maxPrice)) return false;
      return true;
    });
    setPgs(filtered);
  }, [filters, allPgs]);

  if (loading) return <LatestPgsSkeleton />;

  return (
    <section className="min-h-screen max-w-7xl mx-auto px-4 sm:px-6 py-12 bg-white">
      
      {/* --- TOP BAR --- */}
      <div className="flex items-center justify-between mb-8">
        <button
          onClick={() => router.push("/")}
          className="group flex items-center gap-2 text-gray-400 hover:text-blue-600 font-bold transition-all"
        >
          <div className="p-2 rounded-full group-hover:bg-blue-50 transition-colors">
            <ArrowLeft size={20} />
          </div>
          <span>Back to Home</span>
        </button>
        
        <div className="hidden sm:flex items-center gap-2 bg-blue-50 text-blue-600 px-4 py-1.5 rounded-full text-[10px] font-black uppercase tracking-widest">
          <Sparkles size={14} />
          {pgs.length} Properties Found
        </div>
      </div>

      {/* --- HEADER --- */}
      <div className="mb-12">
        <h2 className="text-4xl md:text-6xl font-black text-gray-900 tracking-tighter mb-4">
          Find Your <span className="text-blue-600">Perfect Stay</span>
        </h2>
        <p className="text-gray-500 font-medium text-lg">Browse through our handpicked collection of premium PGs.</p>
      </div>

      {/* --- PREMIUM FILTER BAR --- */}
      <div className="sticky top-24 z-40 bg-white/80 backdrop-blur-xl border border-gray-100 rounded-[2.5rem] p-3 shadow-[0_20px_50px_rgba(0,0,0,0.05)] mb-16">
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-6 gap-2">
          
          <FilterWrapper icon={<MapPin size={18}/>}>
            <select
              className="filter-select"
              value={filters.city}
              onChange={(e) => setFilters({ ...filters, city: e.target.value })}
            >
              <option value="">All Cities</option>
              {[...new Set(allPgs.map(pg => pg.city))].map(city => (
                <option key={city} value={city}>{city}</option>
              ))}
            </select>
          </FilterWrapper>

          <FilterWrapper icon={<Users size={18}/>}>
            <select
              className="filter-select"
              value={filters.gender}
              onChange={(e) => setFilters({ ...filters, gender: e.target.value })}
            >
              <option value="">Any Gender</option>
              <option value="Male">Male</option>
              <option value="Female">Female</option>
              <option value="Any">Any</option>
            </select>
          </FilterWrapper>

          <FilterWrapper icon={<BedDouble size={18}/>}>
            <select
              className="filter-select"
              value={filters.roomType}
              onChange={(e) => setFilters({ ...filters, roomType: e.target.value })}
            >
              <option value="">Any Room</option>
              <option value="Single">Single</option>
              <option value="Double">Double</option>
              <option value="Triple">Triple</option>
            </select>
          </FilterWrapper>

          <FilterWrapper icon={<CircleDollarSign size={18}/>}>
            <input
              type="number"
              placeholder="Min Price"
              className="filter-select no-spinner"
              value={filters.minPrice}
              onChange={(e) => setFilters({ ...filters, minPrice: e.target.value })}
            />
          </FilterWrapper>

          <FilterWrapper icon={<CircleDollarSign size={18}/>}>
            <input
              type="number"
              placeholder="Max Price"
              className="filter-select no-spinner"
              value={filters.maxPrice}
              onChange={(e) => setFilters({ ...filters, maxPrice: e.target.value })}
            />
          </FilterWrapper>

          <button
            onClick={() => setFilters({ city: "", gender: "", roomType: "", minPrice: "", maxPrice: "" })}
            className="flex items-center justify-center gap-2 bg-gray-900 hover:bg-blue-600 text-white rounded-[1.5rem] font-black text-xs tracking-widest transition-all h-[54px] active:scale-95"
          >
            <Eraser size={16} /> CLEAR
          </button>
        </div>
      </div>

      {/* --- CONTENT GRID --- */}
      {pgs.length > 0 ? (
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-10">
          {pgs.map((pg) => (
            <PgCard key={pg._id} pg={pg} router={router} />
          ))}
        </div>
      ) : (
        <div className="flex flex-col items-center justify-center py-24 text-center">
          <div className="bg-gray-50 p-6 rounded-full mb-6">
            <XCircle size={48} className="text-gray-300" />
          </div>
          <h3 className="text-2xl font-black text-gray-900 mb-2">No Matching PGs</h3>
          <p className="text-gray-400 font-medium">Try adjusting your filters to find more properties.</p>
        </div>
      )}

      {/* --- CUSTOM STYLES --- */}
      <style jsx>{`
        .filter-select {
          width: 100%;
          background: transparent;
          border: none;
          outline: none;
          font-size: 14px;
          font-weight: 700;
          color: #111827;
          appearance: none;
        }
        .filter-select::placeholder {
          color: #9ca3af;
        }
        .no-spinner::-webkit-inner-spin-button, 
        .no-spinner::-webkit-outer-spin-button { 
          -webkit-appearance: none; 
          margin: 0; 
        }
      `}</style>
    </section>
  );
}

/* --- REUSABLE COMPONENTS --- */

function FilterWrapper({ icon, children }) {
  return (
    <div className="flex items-center gap-3 bg-gray-50 border border-gray-100 px-4 py-3 rounded-2xl hover:bg-white hover:border-blue-200 transition-all focus-within:ring-2 focus-within:ring-blue-100">
      <div className="text-blue-500 opacity-70">{icon}</div>
      <div className="flex-grow">{children}</div>
    </div>
  );
}

function PgCard({ pg, router }) {
  return (
    <div
      onClick={() => router.push(`/pg/${pg._id}`)}
      className="group cursor-pointer bg-white rounded-[2.5rem] overflow-hidden border border-gray-100 shadow-sm hover:shadow-2xl hover:shadow-blue-100/40 transition-all duration-500 hover:-translate-y-2"
    >
      <div className="relative h-72 overflow-hidden">
        <img
          src={pg.images?.[0] || "/placeholder.jpg"}
          alt={pg.pgName}
          className="h-full w-full object-cover transition-transform duration-700 group-hover:scale-110"
        />
        <div className="absolute top-5 left-5">
          <span className="bg-white/90 backdrop-blur-md text-gray-900 text-[10px] font-black px-4 py-1.5 rounded-full shadow-lg flex items-center gap-1">
            <Users size={12} /> {pg.genderAllowed || "Any"}
          </span>
        </div>
        <div className="absolute bottom-5 right-5 bg-gray-900/95 backdrop-blur-md text-white px-5 py-3 rounded-2xl border border-white/10 shadow-2xl transform transition-transform group-hover:scale-105">
          <p className="text-[9px] uppercase font-black text-blue-400 tracking-widest mb-0.5">Rent</p>
          <p className="text-xl font-black italic">₹{pg.pricing?.monthlyRent}</p>
        </div>
      </div>

      <div className="p-8">
        <h3 className="text-2xl font-black text-gray-900 mb-2 line-clamp-1 group-hover:text-blue-600 transition-colors">
          {pg.pgName}
        </h3>
        <div className="flex items-center gap-1.5 text-gray-400 font-bold text-sm mb-6">
          <MapPin size={16} className="text-red-400" />
          <span className="line-clamp-1">{pg.location}, {pg.city}</span>
        </div>

        <div className="flex items-center justify-between pt-6 border-t border-gray-50">
          <div className="flex items-center gap-2">
            <div className="w-8 h-8 rounded-full bg-blue-50 flex items-center justify-center text-blue-600 text-xs font-black">V</div>
            <span className="text-[10px] font-black text-gray-400 uppercase tracking-widest">Verified Host</span>
          </div>
          <div className="w-12 h-12 rounded-full bg-gray-900 text-white flex items-center justify-center group-hover:bg-blue-600 transition-colors shadow-lg shadow-gray-200">
            <ArrowRight size={22} />
          </div>
        </div>
      </div>
    </div>
  );
}

function LatestPgsSkeleton() {
  return (
    <div className="max-w-7xl mx-auto px-6 py-16">
      <div className="h-4 w-24 bg-gray-100 rounded-full mb-6 animate-pulse" />
      <div className="h-12 w-64 bg-gray-100 rounded-xl mb-12 animate-pulse" />
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-10">
        {[1, 2, 3].map((i) => (
          <div key={i} className="h-[500px] bg-gray-50 rounded-[2.5rem] animate-pulse" />
        ))}
      </div>
    </div>
  );
}