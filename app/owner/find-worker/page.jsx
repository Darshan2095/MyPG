"use client";

import { useEffect, useState } from "react";
import { Star, MapPin, Briefcase, ChevronRight, Search, ShieldCheck } from "lucide-react";

// --- STATIC SAMPLE DATA ---
const STATIC_WORKERS = [
  {
    _id: "1",
    name: "Arjun Sharma",
    location: "Koramangala, Bangalore",
    rating: "4.9",
    skills: ["Electrician", "Home Automation", "AC Repair"],
  },
  {
    _id: "2",
    name: "Suresh Kumar",
    location: "Indiranagar, Bangalore",
    rating: "4.7",
    skills: ["Plumbing", "Water Purifier", "Drainage"],
  },
  {
    _id: "3",
    name: "Priya Singh",
    location: "HSR Layout, Bangalore",
    rating: "4.8",
    skills: ["Professional Cleaning", "Deep Clean", "Sanitization"],
  },
  {
    _id: "4",
    name: "Vikram Rathore",
    location: "Whitefield, Bangalore",
    rating: "4.6",
    skills: ["Carpentry", "Furniture Assembly", "Door Repair"],
  },
  {
    _id: "5",
    name: "Amit Verma",
    location: "Jayanagar, Bangalore",
    rating: "4.9",
    skills: ["Painting", "Wall Decor", "Waterproofing"],
  },
  {
    _id: "6",
    name: "Rahul M.",
    location: "Electronic City, Bangalore",
    rating: "4.5",
    skills: ["CCTV Installation", "Security Systems", "Networking"],
  }
];

export default function FindWorker() {
  const [workers, setWorkers] = useState([]);
  const [loading, setLoading] = useState(true);

  const handleRequestWork = async (workerId) => {
    // We'll simulate the request for the static demo
    const applicantName = window.prompt("Enter your name");
    if (!applicantName) return;

    const applicantPhone = window.prompt("Enter your phone number");
    if (!applicantPhone) return;

    alert(`Request sent to ${workers.find(w => w._id === workerId)?.name}!`);
  };

  useEffect(() => {
    // Simulating a network delay for the loading state
    const timer = setTimeout(() => {
      setWorkers(STATIC_WORKERS);
      setLoading(false);
    }, 800);

    return () => clearTimeout(timer);
  }, []);

  return (
    <div className="min-h-screen bg-gray-50/50 py-12 px-4 sm:px-6">
      <div className="max-w-7xl mx-auto">
        
        {/* --- HEADER --- */}
        <div className="mb-10 flex flex-col md:flex-row md:items-end justify-between gap-4">
          <div>
            <div className="inline-flex items-center gap-2 bg-blue-50 text-blue-600 px-3 py-1 rounded-full text-[10px] font-black uppercase tracking-widest mb-3">
              <ShieldCheck size={12} /> Verified Network
            </div>
            <h1 className="text-4xl font-black text-gray-900 tracking-tight mb-2">
              Find Skilled <span className="text-blue-600">Professionals</span>
            </h1>
            <p className="text-gray-500 font-medium">
              Connect with verified workers for your PG maintenance and services.
            </p>
          </div>
          
          {/* SEARCH BAR */}
          <div className="relative group">
            <Search className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-400 group-focus-within:text-blue-500 transition-colors" size={20} />
            <input 
              type="text" 
              placeholder="Search by skill or location..." 
              className="pl-12 pr-4 py-3 bg-white border border-gray-200 rounded-2xl w-full md:w-80 shadow-sm outline-none focus:ring-2 focus:ring-blue-100 focus:border-blue-500 transition-all font-medium"
            />
          </div>
        </div>

        {/* --- GRID --- */}
        {loading ? (
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
            {[1, 2, 3, 4, 5, 6].map((i) => (
              <div key={i} className="h-72 bg-white rounded-[2rem] animate-pulse border border-gray-100" />
            ))}
          </div>
        ) : (
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
            {workers.map((worker) => (
              <div
                key={worker._id}
                className="group bg-white rounded-[2rem] p-6 border border-gray-100 shadow-sm hover:shadow-xl hover:-translate-y-1 transition-all duration-500 relative overflow-hidden"
              >
                {/* DECORATIVE ACCENT */}
                <div className="absolute top-0 right-0 w-24 h-24 bg-blue-50 rounded-bl-[4rem] -z-0 group-hover:bg-blue-600 transition-colors duration-500 opacity-20 group-hover:opacity-10" />

                <div className="relative z-10">
                  <div className="flex justify-between items-start mb-4">
                    <div className="w-14 h-14 bg-gray-900 rounded-2xl flex items-center justify-center text-white shadow-lg group-hover:bg-blue-600 transition-colors duration-300">
                      <Briefcase size={24} />
                    </div>
                    <div className="flex items-center gap-1 bg-yellow-50 text-yellow-700 px-3 py-1 rounded-full text-xs font-black border border-yellow-100">
                      <Star size={14} fill="currentColor" />
                      {worker.rating}
                    </div>
                  </div>

                  <div className="mb-4">
                    <div className="flex items-center gap-2 mb-1">
                      <h2 className="text-xl font-black text-gray-900 group-hover:text-blue-600 transition-colors">
                        {worker.name}
                      </h2>
                      <ShieldCheck size={18} className="text-blue-500" />
                    </div>
                    <p className="text-sm text-gray-400 font-bold flex items-center gap-1 uppercase tracking-widest">
                      <MapPin size={14} className="text-blue-500" />
                      {worker.location}
                    </p>
                  </div>

                  {/* SKILLS */}
                  <div className="flex flex-wrap gap-2 mb-8 h-16 content-start">
                    {(worker.skills || []).map((skill) => (
                      <span
                        key={skill}
                        className="px-3 py-1.5 bg-gray-50 text-gray-600 border border-gray-100 rounded-xl text-[10px] font-black uppercase tracking-tighter group-hover:border-blue-100 group-hover:bg-blue-50/30 transition-all"
                      >
                        {skill}
                      </span>
                    ))}
                  </div>

                  {/* BUTTON */}
                  <button
                    onClick={() => handleRequestWork(worker._id)}
                    className="w-full flex items-center justify-center gap-2 bg-gray-900 text-white font-black py-4 rounded-2xl group-hover:bg-blue-600 transition-all duration-300 shadow-lg shadow-gray-200 group-hover:shadow-blue-200 active:scale-[0.98] uppercase tracking-widest text-xs"
                  >
                    Request Work
                    <ChevronRight size={18} />
                  </button>
                </div>
              </div>
            ))}
          </div>
        )}

        {/* --- NO WORKERS STATE --- */}
        {!loading && workers.length === 0 && (
          <div className="text-center py-20 bg-white rounded-[3rem] border-2 border-dashed border-gray-100">
            <p className="text-gray-400 font-bold">No professionals found in your area yet.</p>
          </div>
        )}
      </div>
    </div>
  );
}