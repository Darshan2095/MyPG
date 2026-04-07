"use client";

import React from "react";
import { 
  Star, 
  MapPin, 
  ShieldCheck, 
  MessageSquare, 
  Phone, 
  Mail, 
  Calendar, 
  Award, 
  CheckCircle2, 
  ArrowLeft,
  Share2,
  Clock
} from "lucide-react";

// --- SAMPLE STATIC DATA ---
const WORKER_DATA = {
  name: "Arjun Sharma",
  category: "Premium Electrician & Home Automation",
  rating: 4.9,
  totalReviews: 124,
  experience: "8+ Years",
  location: "Indiranagar, Bangalore",
  joined: "March 2021",
  bio: "Specialist in high-end home automation and industrial electrical systems. Certified professional with a focus on safety, precision, and smart home integration. I have successfully completed over 500+ projects across Bangalore.",
  skills: ["Smart Lighting", "Circuit Repair", "Home Theater Setup", "AC Wiring", "Industrial Panels"],
  stats: [
    { label: "Projects Done", value: "542" },
    { label: "Response Time", value: "< 2 hrs" },
    { label: "Repeat Clients", value: "85%" }
  ],
  reviews: [
    { id: 1, user: "Siddharth M.", date: "2 days ago", rating: 5, comment: "Arjun was extremely professional. He fixed our complex smart lighting issue in no time. Highly recommended!" },
    { id: 2, user: "Priya Rao", date: "1 week ago", rating: 4, comment: "Very punctual and knowledgeable. Cleaned up the workspace after finishing the job." },
    { id: 3, user: "Vikram Singh", date: "2 weeks ago", rating: 5, comment: "Best electrician I've hired through MyPG. Expert in his craft." }
  ]
};

export default function WorkerProfilePage() {
  return (
    <div className="min-h-screen bg-white">
      {/* --- TOP NAV --- */}
      <nav className="sticky top-0 z-50 bg-white/80 backdrop-blur-md border-b border-gray-100">
        <div className="max-w-7xl mx-auto px-6 py-4 flex justify-between items-center">
          <button className="flex items-center gap-2 text-gray-500 hover:text-black font-bold transition-all">
            <ArrowLeft size={20} /> Back
          </button>
          <div className="flex gap-4">
            <button className="p-2 hover:bg-gray-100 rounded-full transition-colors"><Share2 size={20} /></button>
          </div>
        </div>
      </nav>

      <main className="max-w-7xl mx-auto px-6 py-12">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12">
          
          {/* --- LEFT COLUMN: CONTENT (8 Cols) --- */}
          <div className="lg:col-span-8">
            
            {/* Header Info */}
            <div className="flex flex-col md:flex-row gap-8 items-start mb-12">
              <div className="w-32 h-32 md:w-40 md:h-40 bg-gray-900 rounded-[2.5rem] flex items-center justify-center text-5xl font-black text-white shadow-2xl shadow-blue-200">
                {WORKER_DATA.name[0]}
              </div>
              <div className="flex-1 pt-2">
                <div className="flex items-center gap-3 mb-2">
                  <h1 className="text-4xl md:text-5xl font-black text-gray-900 tracking-tighter">
                    {WORKER_DATA.name}
                  </h1>
                  <ShieldCheck className="text-blue-600" size={32} />
                </div>
                <p className="text-blue-600 font-black uppercase tracking-widest text-xs mb-4">
                  {WORKER_DATA.category}
                </p>
                <div className="flex flex-wrap gap-6 text-gray-500 font-bold text-sm">
                  <span className="flex items-center gap-1"><MapPin size={16} className="text-red-400" /> {WORKER_DATA.location}</span>
                  <span className="flex items-center gap-1"><Calendar size={16} className="text-blue-400" /> Joined {WORKER_DATA.joined}</span>
                  <span className="flex items-center gap-1"><Star size={16} className="text-yellow-500 fill-yellow-500" /> {WORKER_DATA.rating} ({WORKER_DATA.totalReviews} Reviews)</span>
                </div>
              </div>
            </div>

            {/* Quick Stats */}
            <div className="grid grid-cols-3 gap-4 mb-12">
              {WORKER_DATA.stats.map((stat, idx) => (
                <div key={idx} className="bg-gray-50 p-6 rounded-3xl border border-gray-100">
                  <p className="text-2xl font-black text-gray-900">{stat.value}</p>
                  <p className="text-[10px] uppercase font-black tracking-widest text-gray-400">{stat.label}</p>
                </div>
              ))}
            </div>

            {/* About & Bio */}
            <section className="mb-12">
              <h2 className="text-2xl font-black text-gray-900 mb-4">About Me</h2>
              <p className="text-gray-500 font-medium leading-relaxed text-lg">
                {WORKER_DATA.bio}
              </p>
            </section>

            {/* Skills */}
            <section className="mb-12">
              <h2 className="text-2xl font-black text-gray-900 mb-6">Expertise</h2>
              <div className="flex flex-wrap gap-3">
                {WORKER_DATA.skills.map((skill, idx) => (
                  <div key={idx} className="flex items-center gap-2 bg-white border-2 border-gray-100 px-5 py-3 rounded-2xl font-bold text-gray-700 hover:border-blue-600 transition-all cursor-default">
                    <CheckCircle2 size={18} className="text-blue-600" />
                    {skill}
                  </div>
                ))}
              </div>
            </section>

            {/* Reviews Section */}
            <section className="border-t border-gray-100 pt-12">
              <div className="flex items-center justify-between mb-8">
                <h2 className="text-2xl font-black text-gray-900">Recent Reviews</h2>
                <button className="text-blue-600 font-black text-xs uppercase tracking-widest hover:underline">View All</button>
              </div>
              
              <div className="space-y-8">
                {WORKER_DATA.reviews.map(review => (
                  <div key={review.id} className="bg-white rounded-3xl p-8 border border-gray-50 shadow-sm">
                    <div className="flex justify-between items-start mb-4">
                      <div>
                        <p className="font-black text-gray-900">{review.user}</p>
                        <p className="text-xs text-gray-400 font-bold uppercase tracking-widest mt-1">{review.date}</p>
                      </div>
                      <div className="flex items-center gap-1 bg-yellow-50 px-3 py-1 rounded-full text-yellow-700 text-xs font-black">
                        <Star size={12} fill="currentColor" /> {review.rating}.0
                      </div>
                    </div>
                    <p className="text-gray-500 font-medium leading-relaxed">{review.comment}</p>
                  </div>
                ))}
              </div>
            </section>
          </div>

          {/* --- RIGHT COLUMN: ACTION CARD (4 Cols) --- */}
          <div className="lg:col-span-4">
            <div className="sticky top-28 space-y-6">
              <div className="bg-gray-900 rounded-[2.5rem] p-8 text-white shadow-2xl shadow-blue-100">
                <div className="mb-8">
                  <p className="text-blue-400 font-black uppercase tracking-[0.2em] text-[10px] mb-2">Availability</p>
                  <div className="flex items-center gap-2">
                    <div className="w-3 h-3 bg-green-500 rounded-full animate-pulse"></div>
                    <span className="text-xl font-bold">Ready to Work</span>
                  </div>
                </div>

                <div className="space-y-4 mb-8">
                  <div className="flex items-center gap-4 bg-white/5 p-4 rounded-2xl border border-white/10">
                    <Clock size={20} className="text-blue-400" />
                    <div>
                      <p className="text-[10px] text-gray-400 uppercase font-black">Experience</p>
                      <p className="font-bold">{WORKER_DATA.experience}</p>
                    </div>
                  </div>
                  <div className="flex items-center gap-4 bg-white/5 p-4 rounded-2xl border border-white/10">
                    <Award size={20} className="text-blue-400" />
                    <div>
                      <p className="text-[10px] text-gray-400 uppercase font-black">Verified By</p>
                      <p className="font-bold">MyPG Safety Team</p>
                    </div>
                  </div>
                </div>

                <button className="w-full bg-blue-600 hover:bg-blue-500 text-white font-black py-5 rounded-2xl transition-all shadow-xl shadow-blue-600/20 active:scale-95 flex items-center justify-center gap-3 mb-4">
                  <MessageSquare size={20} /> REQUEST WORK
                </button>
                <button className="w-full bg-white/10 hover:bg-white/20 text-white font-black py-5 rounded-2xl transition-all flex items-center justify-center gap-3">
                  <Phone size={20} /> CALL PROFESSIONAL
                </button>
              </div>

              {/* Secure Booking Tip */}
              <div className="bg-blue-50 p-6 rounded-[2rem] border border-blue-100">
                <div className="flex gap-3">
                  <CheckCircle2 className="text-blue-600 shrink-0" size={20} />
                  <div>
                    <p className="text-sm font-black text-blue-900 mb-1">Secure Booking</p>
                    <p className="text-xs text-blue-700 font-medium leading-relaxed">Always pay through MyPG to ensure your service is insured and covered by our guarantee.</p>
                  </div>
                </div>
              </div>
            </div>
          </div>

        </div>
      </main>
    </div>
  );
}