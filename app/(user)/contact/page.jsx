"use client";

import React, { useState } from "react";
import { 
  Mail, 
  Phone, 
  MapPin, 
  Send, 
  MessageSquare, 
  Clock, 
  CheckCircle2,
  Instagram,
  Twitter,
  Linkedin
} from "lucide-react";

export default function ContactPage() {
  const [formState, setFormState] = useState("idle"); // idle, sending, success

  const handleSubmit = (e) => {
    e.preventDefault();
    setFormState("sending");
    // Simulate API call
    setTimeout(() => setFormState("success"), 1500);
  };

  return (
    <main className="min-h-screen bg-white pb-20">
      {/* --- HERO HEADER --- */}
      <section className="relative pt-20 pb-16 overflow-hidden">
        <div className="absolute top-0 left-1/2 -translate-x-1/2 w-full h-full -z-10 opacity-30">
          <div className="absolute top-[-10%] left-[-10%] w-[40%] h-[40%] rounded-full bg-blue-200 blur-[120px]"></div>
          <div className="absolute bottom-0 right-0 w-[30%] h-[30%] rounded-full bg-indigo-200 blur-[100px]"></div>
        </div>

        <div className="max-w-7xl mx-auto px-6 text-center">
          <h1 className="text-4xl md:text-7xl font-black text-gray-900 tracking-tighter mb-6">
            Let&apos;s <span className="text-blue-600 italic">Connect.</span>
          </h1>
          <p className="max-w-2xl mx-auto text-gray-500 text-lg md:text-xl font-medium">
            Have questions about a property or need help with your booking? 
            Our team is here to help you find your home away from home.
          </p>
        </div>
      </section>

      <section className="max-w-7xl mx-auto px-6">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-stretch">
          
          {/* --- LEFT COLUMN: INFO --- */}
          <div className="lg:col-span-5 space-y-8">
            <div className="bg-gray-900 rounded-[2.5rem] p-10 text-white h-full shadow-2xl relative overflow-hidden">
              <div className="relative z-10">
                <h2 className="text-3xl font-black mb-8">Contact Information</h2>
                
                <div className="space-y-8">
                  <ContactInfoItem 
                    icon={<Phone className="text-blue-400" />} 
                    title="Call us anytime" 
                    value="+91 98765 43210" 
                  />
                  <ContactInfoItem 
                    icon={<Mail className="text-blue-400" />} 
                    title="Email Support" 
                    value="hello@mypg.com" 
                  />
                  <ContactInfoItem 
                    icon={<MapPin className="text-blue-400" />} 
                    title="Visit our HQ" 
                    value="12, Residency Road, Bangalore, KA 560025" 
                  />
                  <ContactInfoItem 
                    icon={<Clock className="text-blue-400" />} 
                    title="Business Hours" 
                    value="Mon - Sat: 9:00 AM - 8:00 PM" 
                  />
                </div>

                <div className="mt-16 pt-8 border-t border-white/10 flex gap-6">
                  <SocialIcon icon={<Instagram />} />
                  <SocialIcon icon={<Twitter />} />
                  <SocialIcon icon={<Linkedin />} />
                </div>
              </div>

              {/* Decorative Circle */}
              <div className="absolute -bottom-20 -right-20 w-64 h-64 bg-blue-600/20 rounded-full blur-3xl"></div>
            </div>
          </div>

          {/* --- RIGHT COLUMN: FORM --- */}
          <div className="lg:col-span-7">
            <div className="bg-white border border-gray-100 rounded-[2.5rem] p-8 md:p-12 shadow-[0_20px_50px_rgba(0,0,0,0.04)] h-full">
              {formState === "success" ? (
                <div className="flex flex-col items-center justify-center h-full text-center py-12">
                  <div className="w-20 h-20 bg-green-50 text-green-500 rounded-full flex items-center justify-center mb-6 animate-bounce">
                    <CheckCircle2 size={40} />
                  </div>
                  <h3 className="text-3xl font-black text-gray-900 mb-2">Message Sent!</h3>
                  <p className="text-gray-500 font-medium mb-8">We&apos;ll get back to you within 24 hours.</p>
                  <button 
                    onClick={() => setFormState("idle")}
                    className="text-blue-600 font-black tracking-widest text-xs uppercase underline underline-offset-8"
                  >
                    Send another message
                  </button>
                </div>
              ) : (
                <form onSubmit={handleSubmit} className="space-y-6">
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                    <div className="space-y-2">
                      <label className="text-xs font-black uppercase tracking-widest text-gray-400 ml-2">Full Name</label>
                      <input required type="text" placeholder="John Doe" className="contact-input" />
                    </div>
                    <div className="space-y-2">
                      <label className="text-xs font-black uppercase tracking-widest text-gray-400 ml-2">Email Address</label>
                      <input required type="email" placeholder="john@example.com" className="contact-input" />
                    </div>
                  </div>

                  <div className="space-y-2">
                    <label className="text-xs font-black uppercase tracking-widest text-gray-400 ml-2">Subject</label>
                    <select className="contact-input bg-white cursor-pointer">
                      <option>General Inquiry</option>
                      <option>Property Listing Help</option>
                      <option>Booking Issue</option>
                      <option>Partnership</option>
                    </select>
                  </div>

                  <div className="space-y-2">
                    <label className="text-xs font-black uppercase tracking-widest text-gray-400 ml-2">Your Message</label>
                    <textarea 
                      required 
                      rows={5} 
                      placeholder="How can we help you today?" 
                      className="contact-input resize-none"
                    ></textarea>
                  </div>

                  <button 
                    disabled={formState === "sending"}
                    className="w-full bg-blue-600 hover:bg-gray-900 text-white font-black py-5 rounded-2xl transition-all duration-300 shadow-xl shadow-blue-200 active:scale-95 flex items-center justify-center gap-3 disabled:opacity-70 disabled:cursor-not-allowed"
                  >
                    {formState === "sending" ? (
                      <div className="w-6 h-6 border-4 border-white/30 border-t-white rounded-full animate-spin"></div>
                    ) : (
                      <>
                        <Send size={18} />
                        SEND MESSAGE
                      </>
                    )}
                  </button>
                </form>
              )}
            </div>
          </div>
        </div>
      </section>

      <style jsx>{`
        .contact-input {
          width: 100%;
          padding: 1rem 1.5rem;
          border-radius: 1.25rem;
          background: #f8fafc;
          border: 1px solid #e2e8f0;
          font-weight: 600;
          transition: all 0.3s ease;
          outline: none;
        }
        .contact-input:focus {
          background: white;
          border-color: #2563eb;
          box-shadow: 0 0 0 4px rgba(37, 99, 235, 0.1);
        }
      `}</style>
    </main>
  );
}

/* --- HELPER COMPONENTS --- */

function ContactInfoItem({ icon, title, value }) {
  return (
    <div className="flex items-start gap-5 group">
      <div className="p-4 rounded-2xl bg-white/5 border border-white/10 group-hover:bg-blue-600 group-hover:border-blue-600 transition-all duration-300">
        {React.cloneElement(icon, { size: 20 })}
      </div>
      <div>
        <p className="text-[10px] uppercase font-black tracking-widest text-gray-400 mb-1">{title}</p>
        <p className="text-lg font-bold">{value}</p>
      </div>
    </div>
  );
}

function SocialIcon({ icon }) {
  return (
    <a href="#" className="w-12 h-12 rounded-xl bg-white/5 border border-white/10 flex items-center justify-center hover:bg-white hover:text-gray-900 transition-all duration-300">
      {React.cloneElement(icon, { size: 20 })}
    </a>
  );
}