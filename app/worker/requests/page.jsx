"use client";

import React from "react";
import { 
  User, 
  Building2, 
  MapPin, 
  Clock, 
  Calendar, 
  Phone, 
  MessageSquare, 
  AlertCircle, 
  CheckCircle2, 
  ArrowRight,
  ShieldCheck,
  Tag
} from "lucide-react";

// --- SAMPLE STATIC DATA ---
const REQUESTS_DATA = [
  {
    id: "REQ-8821",
    ownerName: "Rajesh Malhotra",
    pgName: "Starlight Premium Living",
    pgType: "Boys PG",
    location: "Koramangala 4th Block, Bangalore",
    issue: "Full Electrical Maintenance",
    description: "Need a complete check-up of the main circuit breaker and individual room switchboards before the new batch arrives.",
    urgency: "High",
    date: "Oct 24, 2023",
    status: "Pending"
  },
  {
    id: "REQ-8790",
    ownerName: "Anjali Gupta",
    pgName: "Greenwood Residency",
    pgType: "Girls PG",
    location: "HSR Layout Sector 2, Bangalore",
    issue: "Smart Lock Installation",
    description: "Installation of 12 biometric locks for the main entrance and premium suite rooms.",
    urgency: "Medium",
    date: "Oct 22, 2023",
    status: "In Discussion"
  }
];

export default function WorkRequestsPage() {
  return (
    <div className="min-h-screen bg-gray-50/50 py-12">
      <div className="max-w-5xl mx-auto px-6">
        
        {/* --- HEADER --- */}
        <div className="flex flex-col md:flex-row md:items-center justify-between mb-10 gap-6">
          <div>
            <div className="flex items-center gap-2 text-blue-600 font-bold text-xs uppercase tracking-[0.2em] mb-2">
              <Clock size={16} /> Incoming Opportunities
            </div>
            <h1 className="text-4xl font-black text-gray-900 tracking-tight">
              Work <span className="text-blue-600">Requests</span>
            </h1>
          </div>
          <div className="flex gap-3">
            <div className="bg-white border border-gray-200 px-6 py-3 rounded-2xl shadow-sm text-center">
              <p className="text-2xl font-black text-gray-900">{REQUESTS_DATA.length}</p>
              <p className="text-[10px] font-black text-gray-400 uppercase tracking-widest">New Requests</p>
            </div>
          </div>
        </div>

        {/* --- REQUESTS LIST --- */}
        <div className="space-y-6">
          {REQUESTS_DATA.map((req) => (
            <div 
              key={req.id} 
              className="bg-white border border-gray-100 rounded-[2.5rem] p-8 shadow-sm hover:shadow-xl transition-all duration-300 group"
            >
              <div className="flex flex-col lg:flex-row gap-8">
                
                {/* 1. Request ID & Status Sidebar (Visual Accent) */}
                <div className="lg:w-1/4 border-r border-gray-50 pr-6">
                  <div className="flex items-center gap-2 mb-4">
                    <span className="text-[10px] font-black text-blue-600 bg-blue-50 px-3 py-1 rounded-full uppercase tracking-tighter">
                      {req.id}
                    </span>
                    <span className={`text-[10px] font-black px-3 py-1 rounded-full uppercase tracking-tighter ${
                      req.urgency === 'High' ? 'bg-red-50 text-red-600' : 'bg-orange-50 text-orange-600'
                    }`}>
                      {req.urgency} Priority
                    </span>
                  </div>
                  <h3 className="text-xl font-black text-gray-900 leading-tight mb-2">
                    {req.issue}
                  </h3>
                  <p className="text-xs font-bold text-gray-400 flex items-center gap-1">
                    <Calendar size={14} /> Posted {req.date}
                  </p>
                </div>

                {/* 2. Core Details Grid */}
                <div className="lg:w-2/4 grid grid-cols-1 md:grid-cols-2 gap-y-6 gap-x-4">
                  <DetailItem 
                    icon={<User size={18} className="text-blue-500" />} 
                    label="Owner" 
                    value={req.ownerName} 
                  />
                  <DetailItem 
                    icon={<Building2 size={18} className="text-purple-500" />} 
                    label="Property Name" 
                    value={req.pgName} 
                  />
                  <DetailItem 
                    icon={<Tag size={18} className="text-orange-500" />} 
                    label="PG Type" 
                    value={req.pgType} 
                  />
                  <DetailItem 
                    icon={<MapPin size={18} className="text-red-500" />} 
                    label="Location" 
                    value={req.location} 
                  />
                  
                  <div className="md:col-span-2 pt-2">
                    <p className="text-[10px] font-black text-gray-400 uppercase tracking-widest mb-2">Work Description</p>
                    <p className="text-sm font-medium text-gray-600 leading-relaxed bg-gray-50 p-4 rounded-2xl border border-gray-100">
                      {req.description}
                    </p>
                  </div>
                </div>

                {/* 3. Action Side */}
                <div className="lg:w-1/4 flex flex-col justify-center gap-3">
                  <button className="w-full bg-gray-900 hover:bg-blue-600 text-white font-black py-4 rounded-2xl transition-all shadow-lg shadow-gray-200 active:scale-95 flex items-center justify-center gap-2 uppercase tracking-widest text-xs">
                    Accept Task <CheckCircle2 size={18} />
                  </button>
                  <button className="w-full bg-white border-2 border-gray-100 hover:border-gray-900 text-gray-900 font-black py-4 rounded-2xl transition-all flex items-center justify-center gap-2 uppercase tracking-widest text-xs">
                    View Details <ArrowRight size={18} />
                  </button>
                  <div className="flex items-center justify-center gap-2 pt-2">
                    <ShieldCheck size={14} className="text-green-500" />
                    <span className="text-[10px] font-black text-gray-400 uppercase tracking-widest">Verified Request</span>
                  </div>
                </div>

              </div>
            </div>
          ))}
        </div>

        {/* --- BOTTOM TIP --- */}
        <div className="mt-12 flex items-center justify-center gap-3 bg-blue-50/50 border border-blue-100 p-6 rounded-[2rem] text-center">
          <AlertCircle className="text-blue-600" size={20} />
          <p className="text-sm font-bold text-blue-900">
            Accepting a request shares your contact details with the PG owner.
          </p>
        </div>

      </div>
    </div>
  );
}

/* --- HELPER COMPONENT --- */
function DetailItem({ icon, label, value }) {
  return (
    <div className="flex items-start gap-3">
      <div className="p-2 rounded-xl bg-gray-50 border border-gray-100 group-hover:bg-white transition-colors">
        {icon}
      </div>
      <div>
        <p className="text-[10px] font-black text-gray-400 uppercase tracking-[0.1em]">{label}</p>
        <p className="text-sm font-bold text-gray-900">{value}</p>
      </div>
    </div>
  );
}