"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";

export default function AddPgPage() {
  const router = useRouter();

  const [form, setForm] = useState({
    pgName: "",
    city: "",
    location: "",
    address: "",
    description: "",
    roomType: "",
    furnishing: "",
    propertyType: "",
    area: "",
    genderAllowed: "",
    images: [""],
    amenities: [""],
    propertyFeatures: [""],
    houseRules: [""],
    nearbyPlaces: [{ name: "", distance: "" }],
    pricing: {
      monthlyRent: "",
      securityDeposit: "",
      totalInitialPayment: ""
    },
    ownerName: "",
    ownerPhone: "",
    ownerEmail: ""
  });

  const updateField = (key, value) => setForm({ ...form, [key]: value });

  const updateArray = (key, index, value) => {
    const updated = [...form[key]];
    updated[index] = value;
    setForm({ ...form, [key]: updated });
  };

  const addField = (key, value) => setForm({ ...form, [key]: [...form[key], value] });

  const handleSubmit = async (e) => {
    e.preventDefault();
    const res = await fetch("/api/pg/add", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(form)
    });

    if (res.ok) {
      router.push("/owner");
    } else {
      alert("Failed to add PG");
    }
  };

  return (
    <div className="min-h-screen bg-gray-50 py-12 px-4 sm:px-6 lg:px-8">
      <div className="max-w-4xl mx-auto bg-white rounded-2xl shadow-sm border border-gray-100 overflow-hidden">
        <div className="bg-white border-b border-gray-100 p-6">
          <h1 className="text-3xl font-bold text-gray-900">Add New PG</h1>
          <p className="mt-1 text-sm text-gray-500">Fill in the details below to list your property.</p>
        </div>

        <form onSubmit={handleSubmit} className="p-6 md:p-8 space-y-10">
          
          {/* BASIC INFO */}
          <Section title="Basic Information">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <Input label="PG Name" onChange={(v) => updateField("pgName", v)} />
              <Input label="City" onChange={(v) => updateField("city", v)} />
              <div className="md:col-span-2">
                <Input label="Location / Area" onChange={(v) => updateField("location", v)} />
              </div>
              <div className="md:col-span-2">
                <Input label="Full Address" onChange={(v) => updateField("address", v)} />
              </div>
              <div className="md:col-span-2">
                <Textarea label="Description" onChange={(v) => updateField("description", v)} />
              </div>
            </div>
          </Section>

          {/* PROPERTY DETAILS */}
          <Section title="Property Details">
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
              <Select label="Room Type" options={["Single", "Double", "Triple"]} onChange={(v) => updateField("roomType", v)} />
              <Select label="Furnishing" options={["Fully Furnished", "Semi Furnished", "Unfurnished"]} onChange={(v) => updateField("furnishing", v)} />
              <Select label="Property Type" options={["Independent House", "Apartment", "Villa"]} onChange={(v) => updateField("propertyType", v)} />
              <Input label="Area (sq ft)" type="number" onChange={(v) => updateField("area", v)} />
              <Select label="Gender Allowed" options={["Male", "Female", "Any"]} onChange={(v) => updateField("genderAllowed", v)} />
            </div>
          </Section>

          {/* LIST INPUTS */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            <DynamicInput title="Images (URLs)" values={form.images} placeholder="https://..." onAdd={() => addField("images", "")} onChange={(i, v) => updateArray("images", i, v)} />
            <DynamicInput title="Amenities" values={form.amenities} placeholder="WiFi, AC, etc." onAdd={() => addField("amenities", "")} onChange={(i, v) => updateArray("amenities", i, v)} />
            <DynamicInput title="Property Features" values={form.propertyFeatures} placeholder="Gym, Parking..." onAdd={() => addField("propertyFeatures", "")} onChange={(i, v) => updateArray("propertyFeatures", i, v)} />
            <DynamicInput title="House Rules" values={form.houseRules} placeholder="No smoking..." onAdd={() => addField("houseRules", "")} onChange={(i, v) => updateArray("houseRules", i, v)} />
          </div>

          {/* NEARBY PLACES */}
          <Section title="Nearby Places">
            {form.nearbyPlaces.map((p, i) => (
              <div key={i} className="flex flex-col sm:flex-row gap-3 mb-3">
                <input
                  className="flex-1 rounded-lg border-gray-300 border p-2.5 text-sm focus:ring-2 focus:ring-blue-500 focus:border-blue-500 outline-none transition-all"
                  placeholder="Place Name (e.g. Metro Station)"
                  onChange={(e) => {
                    const updated = [...form.nearbyPlaces];
                    updated[i].name = e.target.value;
                    setForm({ ...form, nearbyPlaces: updated });
                  }}
                />
                <input
                  className="w-full sm:w-40 rounded-lg border-gray-300 border p-2.5 text-sm focus:ring-2 focus:ring-blue-500 focus:border-blue-500 outline-none transition-all"
                  placeholder="0.5 km"
                  onChange={(e) => {
                    const updated = [...form.nearbyPlaces];
                    updated[i].distance = e.target.value;
                    setForm({ ...form, nearbyPlaces: updated });
                  }}
                />
              </div>
            ))}
            <button type="button" className="text-blue-600 hover:text-blue-700 text-sm font-medium flex items-center gap-1" onClick={() => setForm({ ...form, nearbyPlaces: [...form.nearbyPlaces, { name: "", distance: "" }] })}>
              <span className="text-lg">+</span> Add Nearby Place
            </button>
          </Section>

          {/* PRICING */}
          <Section title="Pricing & Payment">
            <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 bg-blue-50 p-4 rounded-xl border border-blue-100">
              <Input label="Monthly Rent" type="number" onChange={(v) => setForm({ ...form, pricing: { ...form.pricing, monthlyRent: v } })} />
              <Input label="Security Deposit" type="number" onChange={(v) => setForm({ ...form, pricing: { ...form.pricing, securityDeposit: v } })} />
              <Input label="Initial Payment" type="number" onChange={(v) => setForm({ ...form, pricing: { ...form.pricing, totalInitialPayment: v } })} />
            </div>
          </Section>

          {/* OWNER */}
          <Section title="Owner Details">
            <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
              <Input label="Name" onChange={(v) => updateField("ownerName", v)} />
              <Input label="Phone" onChange={(v) => updateField("ownerPhone", v)} />
              <Input label="Email" onChange={(v) => updateField("ownerEmail", v)} />
            </div>
          </Section>

          <div className="pt-6">
            <button className="w-full bg-blue-600 hover:bg-blue-700 text-white font-bold py-4 rounded-xl shadow-lg transition-colors text-lg">
              Publish Listing
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}

/* ---------- REUSABLE UI COMPONENTS ---------- */

function Section({ title, children }) {
  return (
    <div className="space-y-4">
      <h3 className="text-lg font-bold text-gray-800 border-l-4 border-blue-600 pl-3">{title}</h3>
      <div className="bg-white">{children}</div>
    </div>
  );
}

function Input({ label, onChange, type = "text" }) {
  return (
    <div className="flex flex-col gap-1.5">
      <label className="text-xs font-semibold text-gray-600 uppercase tracking-wider">{label}</label>
      <input
        type={type}
        className="w-full rounded-lg border-gray-300 border p-2.5 text-sm focus:ring-2 focus:ring-blue-500 focus:border-blue-500 outline-none transition-all"
        onChange={(e) => onChange(e.target.value)}
      />
    </div>
  );
}

function Textarea({ label, onChange }) {
  return (
    <div className="flex flex-col gap-1.5">
      <label className="text-xs font-semibold text-gray-600 uppercase tracking-wider">{label}</label>
      <textarea
        className="w-full rounded-lg border-gray-300 border p-2.5 text-sm focus:ring-2 focus:ring-blue-500 focus:border-blue-500 outline-none transition-all"
        rows={3}
        onChange={(e) => onChange(e.target.value)}
      />
    </div>
  );
}

function Select({ label, options, onChange }) {
  return (
    <div className="flex flex-col gap-1.5">
      <label className="text-xs font-semibold text-gray-600 uppercase tracking-wider">{label}</label>
      <select
        className="w-full rounded-lg border-gray-300 border p-2.5 text-sm focus:ring-2 focus:ring-blue-500 focus:border-blue-500 outline-none bg-white transition-all"
        onChange={(e) => onChange(e.target.value)}
      >
        <option value="">Select Option</option>
        {options.map((opt) => <option key={opt} value={opt}>{opt}</option>)}
      </select>
    </div>
  );
}

function DynamicInput({ title, values, placeholder, onAdd, onChange }) {
  return (
    <div className="flex flex-col gap-3">
      <h3 className="text-sm font-bold text-gray-700">{title}</h3>
      {values.map((val, i) => (
        <input
          key={i}
          className="w-full rounded-lg border-gray-300 border p-2.5 text-sm focus:ring-2 focus:ring-blue-500 focus:border-blue-500 outline-none transition-all"
          placeholder={placeholder}
          value={val}
          onChange={(e) => onChange(i, e.target.value)}
        />
      ))}
      <button type="button" className="text-blue-600 hover:text-blue-700 text-xs font-bold w-fit" onClick={onAdd}>
        + ADD MORE
      </button>
    </div>
  );
}