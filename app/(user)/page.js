"use client";

import { useRouter } from "next/navigation";
import { Search, MapPin, Sparkles, Building2, BellRing } from "lucide-react";
import LatestPgs from "@/components/LatestPgs";

export default function HomePage() {
  const router = useRouter();

  return (
    <main className="bg-white min-h-screen font-sans selection:bg-blue-100 selection:text-blue-900">
      {/* --- HERO SECTION --- */}
      <section className="relative overflow-hidden pt-24 pb-20 lg:pt-32 lg:pb-32">
        {/* Background Mesh Gradient */}
        <div className="absolute top-0 left-1/2 -translate-x-1/2 w-full h-full -z-10 opacity-40">
           <div className="absolute top-[-10%] left-[-10%] w-[40%] h-[40%] rounded-full bg-blue-200 blur-[120px]"></div>
           <div className="absolute bottom-[-10%] right-[-10%] w-[40%] h-[40%] rounded-full bg-indigo-100 blur-[120px]"></div>
        </div>

        <div className="max-w-6xl mx-auto px-6 text-center">
          <div className="inline-flex items-center gap-2 bg-blue-50 border border-blue-100 text-blue-700 px-4 py-1.5 rounded-full text-xs font-black uppercase tracking-widest mb-6 animate-fade-in">
            <Sparkles size={14} />
            <span>Premium PG Network</span>
          </div>
          
          <h1 className="text-4xl sm:text-6xl lg:text-7xl font-black text-gray-900 leading-[1.1] tracking-tight mb-6">
            Find Your <span className="text-transparent bg-clip-text bg-gradient-to-r from-blue-600 to-indigo-600">Second Home</span>
          </h1>
          
          <p className="max-w-2xl mx-auto text-gray-500 text-lg md:text-xl font-medium leading-relaxed">
            Curated premium accommodations designed for modern professionals and students. 
            Experience luxury living without the hotel price tag.
          </p>

          {/* SEARCH COMPONENT */}
          <div className="mt-12 max-w-3xl mx-auto group">
            <div className="flex flex-col sm:flex-row items-center gap-3 bg-white p-2 sm:p-3 rounded-3xl shadow-[0_20px_50px_rgba(0,0,0,0.08)] border border-gray-100 group-hover:shadow-[0_20px_60px_rgba(59,130,246,0.12)] transition-all duration-500">
              <div className="flex items-center gap-3 bg-gray-50 w-full px-5 py-4 rounded-2xl">
                <MapPin size={22} className="text-blue-500" />
                <input
                  placeholder="Where do you want to stay?"
                  className="bg-transparent outline-none text-gray-700 font-semibold placeholder:text-gray-400 w-full"
                />
              </div>

              <button className="w-full sm:w-auto flex items-center justify-center gap-2 bg-gray-900 text-white px-10 py-4 rounded-2xl font-black hover:bg-blue-600 transition-all duration-300 shadow-lg active:scale-95">
                <Search size={20} />
                <span>SEARCH</span>
              </button>
            </div>
            
            <div className="mt-4 flex flex-wrap justify-center gap-4 text-sm font-bold text-gray-400">
               <span className="flex items-center gap-1"><Building2 size={14}/> 2,500+ Verified PGs</span>
               <span className="flex items-center gap-1"><Sparkles size={14}/> 100% Secure Booking</span>
            </div>
          </div>
        </div>
      </section>

      {/* --- CITY SELECTION SECTION --- */}
      <section className="max-w-7xl mx-auto px-6 pb-32">
        <div className="text-center mb-16">
          <h2 className="text-3xl md:text-5xl font-black text-gray-900 tracking-tight">
            Explore <span className="text-blue-600">Top Cities</span>
          </h2>
          <div className="w-20 h-1.5 bg-blue-600 mx-auto mt-4 rounded-full"></div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-10">
          <CityCard
            city="Hyderabad"
            subtitle="The Silicon Valley"
            image="https://images.unsplash.com/photo-1596176530529-78163a4f7af2"
            areas={["Koramangala", "HSR Layout", "Indiranagar"]}
            active
          />
          <CityCard
            city="Ahmedabad"
            subtitle="The Heritage Hub"
            image="https://www.justahotels.com/wp-content/uploads/2024/10/Places-To-Explore-In-Ahmedabad.png"
            areas={["Motera", "Thaltej", "Satellite"]}
            active
          />
          <CityCard
            city="Delhi"
            tag="Upcoming"
            subtitle="The Capital Region"
            image="https://cdn.britannica.com/37/189837-050-F0AF383E/New-Delhi-India-War-Memorial-arch-Sir.jpg"
            areas={["Hauz Khas", "Noida", "Gurgaon"]}
            active={false}
          />
        </div>

        <div className="mt-24">
            <LatestPgs />
        </div>
      </section>
    </main>
  );
}

function CityCard({ city, subtitle, image, areas, active, tag }) {
  const router = useRouter();
  
  return (
    <div className="group relative bg-white rounded-[2.5rem] overflow-hidden shadow-sm hover:shadow-2xl transition-all duration-500 border border-gray-100 flex flex-col h-full">
      {/* IMAGE CONTAINER */}
      <div className="relative h-64 overflow-hidden">
        <img
          src={image}
          className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-110"
          alt={city}
        />
        <div className="absolute inset-0 bg-gradient-to-t from-gray-900 via-transparent to-transparent opacity-60"></div>
        
        {tag && (
            <span className="absolute top-5 right-5 bg-white/20 backdrop-blur-md border border-white/30 text-white text-[10px] font-black px-4 py-1.5 rounded-full uppercase tracking-widest">
                {tag}
            </span>
        )}

        <div className="absolute bottom-6 left-6 text-white">
          <p className="text-[10px] font-black uppercase tracking-[0.2em] opacity-80 mb-1">{subtitle}</p>
          <h3 className="text-3xl font-black italic">{city}</h3>
        </div>
      </div>

      {/* CONTENT CONTAINER */}
      <div className="p-8 flex flex-col flex-grow">
        <div className="mb-8">
          <p className="text-[10px] font-black text-gray-400 uppercase tracking-widest mb-4">Prime Locations</p>
          <div className="flex flex-wrap gap-2">
            {areas.map((area) => (
              <span
                key={area}
                className="text-xs font-bold text-gray-600 bg-gray-50 border border-gray-100 px-4 py-2 rounded-xl"
              >
                {area}
              </span>
            ))}
          </div>
        </div>

        <div className="mt-auto">
          {active ? (
            <button
              onClick={() => router.push(`/city/${city}`)}
              className="w-full bg-gray-900 text-white py-5 rounded-2xl font-black tracking-widest text-xs flex items-center justify-center gap-2 group-hover:bg-blue-600 transition-all duration-300 shadow-xl shadow-gray-200 group-hover:shadow-blue-200"
            >
              EXPLORE PROPERTIES
            </button>
          ) : (
            <button className="w-full py-5 rounded-2xl bg-gray-50 text-gray-400 font-black text-xs tracking-widest border border-gray-100 flex items-center justify-center gap-2 cursor-not-allowed">
              <BellRing size={16} /> NOTIFY ME
            </button>
          )}
        </div>
      </div>
    </div>
  );
}