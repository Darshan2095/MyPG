"use client";

import { useEffect, useState } from "react";
import { 
  Star, 
  Phone, 
  MapPin, 
  Briefcase, 
  Plus, 
  User, 
  Mail, 
  ChevronRight, 
  Sparkles,
  CheckCircle2
} from "lucide-react";

export default function FindWorker() {
  const [workers, setWorkers] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const [newWorker, setNewWorker] = useState({
    name: "",
    phone: "",
    email: "",
    skills: "",
    experience: "",
    city: "",
    location: "",
  });

  const fetchWorkers = () => {
    setIsLoading(true);
    fetch("/api/worker")
      .then(res => res.json())
      .then(data => {
        setWorkers(data);
        setIsLoading(false);
      })
      .catch(() => setIsLoading(false));
  };

  const handleRequestWork = async (workerId) => {
    const applicantName = window.prompt("Enter your name");
    if (!applicantName) return;

    const applicantPhone = window.prompt("Enter your phone number");
    if (!applicantPhone) return;

    const res = await fetch("/api/worker/apply", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ workerId, applicantName, applicantPhone }),
    });

    if (res.ok) {
      alert("Request sent successfully");
      return;
    }
    alert("Failed to send request");
  };

  const handleCreateWorker = async (e) => {
    e.preventDefault();
    const payload = {
      ...newWorker,
      skills: newWorker.skills.split(",").map((s) => s.trim()).filter(Boolean),
    };

    const res = await fetch("/api/worker", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(payload),
    });

    if (res.ok) {
      setNewWorker({ name: "", phone: "", email: "", skills: "", experience: "", city: "", location: "" });
      fetchWorkers();
      alert("Worker profile created");
    }
  };

  useEffect(() => {
    fetchWorkers();
  }, []);

  return (
    <div className="min-h-screen bg-gray-50/50 pb-20">
      {/* --- HERO SECTION & FORM --- */}
      <section className="bg-white border-b border-gray-100 pt-16 pb-12">
        <div className="max-w-7xl mx-auto px-6">
          <div className="flex flex-col lg:flex-row justify-between items-start gap-12">
            
            <div className="lg:w-1/3">
              <div className="inline-flex items-center gap-2 bg-blue-50 text-blue-600 px-4 py-1.5 rounded-full text-[10px] font-black uppercase tracking-[0.2em] mb-6">
                <Plus size={14} /> Join the Network
              </div>
              <h1 className="text-4xl md:text-5xl font-black text-gray-900 tracking-tighter mb-4">
                Register as a <span className="text-blue-600">Professional</span>
              </h1>
              <p className="text-gray-500 font-medium leading-relaxed">
                Offer your services to PG owners and residents. Create a profile in seconds and start getting work requests.
              </p>
            </div>

            <div className="lg:w-2/3 w-full">
              <form onSubmit={handleCreateWorker} className="bg-white border border-gray-100 shadow-2xl shadow-gray-200/50 rounded-[2.5rem] p-8 md:p-10">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-5 mb-6">
                  <FormInput icon={<User size={18}/>} placeholder="Full Name" value={newWorker.name} onChange={(val) => setNewWorker({ ...newWorker, name: val })} />
                  <FormInput icon={<Phone size={18}/>} placeholder="Phone Number" value={newWorker.phone} onChange={(val) => setNewWorker({ ...newWorker, phone: val })} />
                  <FormInput icon={<Mail size={18}/>} placeholder="Email (Optional)" value={newWorker.email} onChange={(val) => setNewWorker({ ...newWorker, email: val })} />
                  <FormInput icon={<Briefcase size={18}/>} placeholder="Skills (Plumbing, Cleaning...)" value={newWorker.skills} onChange={(val) => setNewWorker({ ...newWorker, skills: val })} />
                  <FormInput icon={<Star size={18}/>} placeholder="Experience (e.g. 5 Years)" value={newWorker.experience} onChange={(val) => setNewWorker({ ...newWorker, experience: val })} />
                  <FormInput icon={<MapPin size={18}/>} placeholder="City" value={newWorker.city} onChange={(val) => setNewWorker({ ...newWorker, city: val })} />
                  <div className="md:col-span-2">
                    <FormInput icon={<MapPin size={18}/>} placeholder="Full Work Location Address" value={newWorker.location} onChange={(val) => setNewWorker({ ...newWorker, location: val })} />
                  </div>
                </div>
                <button className="w-full bg-gray-900 hover:bg-blue-600 text-white font-black py-4 rounded-2xl transition-all shadow-xl active:scale-95 flex items-center justify-center gap-2 uppercase tracking-widest text-xs">
                  Create Professional Profile <ChevronRight size={18} />
                </button>
              </form>
            </div>
          </div>
        </div>
      </section>

      {/* --- WORKERS GRID --- */}
      <section className="max-w-7xl mx-auto px-6 py-20">
        <div className="flex items-center justify-between mb-12">
          <div>
            <h2 className="text-3xl font-black text-gray-900 tracking-tight">Available Professionals</h2>
            <p className="text-gray-400 font-bold text-sm mt-1 uppercase tracking-widest">Verified service providers in your city</p>
          </div>
          <div className="hidden sm:block text-right">
            <span className="text-4xl font-black text-blue-600">{workers.length}</span>
            <p className="text-[10px] font-black text-gray-400 uppercase tracking-[0.2em]">Active Workers</p>
          </div>
        </div>

        {isLoading ? (
          <div className="grid md:grid-cols-3 gap-8">
            {[1,2,3].map(i => <div key={i} className="h-64 bg-gray-100 animate-pulse rounded-[2rem]" />)}
          </div>
        ) : (
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
            {workers.map(worker => (
              <div key={worker._id} className="group bg-white border border-gray-100 rounded-[2rem] p-8 shadow-sm hover:shadow-2xl hover:shadow-blue-100/30 transition-all duration-500 hover:-translate-y-2 relative overflow-hidden">
                {/* Decorative background element */}
                <div className="absolute -top-10 -right-10 w-32 h-32 bg-blue-50 rounded-full group-hover:scale-150 transition-transform duration-700 -z-0 opacity-50" />
                
                <div className="relative z-10">
                  <div className="flex justify-between items-start mb-6">
                    <div className="w-14 h-14 bg-gray-900 text-white rounded-2xl flex items-center justify-center text-xl font-black">
                      {worker.name[0]}
                    </div>
                    <div className="flex items-center gap-1 bg-yellow-50 text-yellow-700 px-3 py-1 rounded-full text-xs font-black">
                      <Star size={14} fill="currentColor" /> {worker.rating || "5.0"}
                    </div>
                  </div>

                  <h3 className="text-2xl font-black text-gray-900 mb-1 group-hover:text-blue-600 transition-colors">{worker.name}</h3>
                  <div className="flex items-center gap-1 text-gray-400 font-bold text-xs mb-4">
                    <MapPin size={14} className="text-blue-500" /> {worker.city}
                  </div>

                  <div className="flex flex-wrap gap-2 mb-8">
                    {(worker.skills || []).map(skill => (
                      <span key={skill} className="px-3 py-1 bg-gray-50 border border-gray-100 text-gray-600 rounded-lg text-[10px] font-black uppercase tracking-wider">
                        {skill}
                      </span>
                    ))}
                  </div>

                  <div className="flex items-center justify-between pt-6 border-t border-gray-50">
                    <div className="flex items-center gap-2">
                       <CheckCircle2 size={16} className="text-green-500" />
                       <span className="text-[10px] font-black text-gray-400 uppercase tracking-widest">Available</span>
                    </div>
                    <button
                      onClick={() => handleRequestWork(worker._id)}
                      className="bg-blue-600 hover:bg-gray-900 text-white px-6 py-2.5 rounded-xl text-xs font-black transition-all active:scale-95 shadow-lg shadow-blue-100"
                    >
                      REQUEST WORK
                    </button>
                  </div>
                </div>
              </div>
            ))}
          </div>
        )}
      </section>
    </div>
  );
}

/* --- HELPER SUB-COMPONENT --- */
function FormInput({ icon, placeholder, value, onChange }) {
  return (
    <div className="relative">
      <div className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-400">
        {icon}
      </div>
      <input
        required
        className="w-full pl-12 pr-4 py-4 bg-gray-50 border border-gray-100 rounded-2xl focus:outline-none focus:ring-2 focus:ring-blue-100 focus:bg-white transition-all font-bold text-sm text-gray-900 placeholder:text-gray-400"
        placeholder={placeholder}
        value={value}
        onChange={(e) => onChange(e.target.value)}
      />
    </div>
  );
}