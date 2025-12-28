"use client";

import { useEffect, useState } from "react";
import { useParams, useRouter } from "next/navigation";
import { ArrowLeft } from "lucide-react";

export default function CityPage() {
    const { city } = useParams();
    const router = useRouter();
    const [pgs, setPgs] = useState([]);

    useEffect(() => {
        fetch(`/api/pg/city/${city}`)
            .then((res) => res.json())
            .then(setPgs);
    }, [city]);

    const areas = [...new Set(pgs.map((pg) => pg.location))];

    return (
        <div className="min-h-screen bg-white">

            {/* TOP BAR */}
            <div className="border-b px-4 py-3 flex items-center gap-3">
                <button
                    onClick={() => router.back()}
                    className="flex items-center gap-1 text-sm"
                >
                    <ArrowLeft size={16} /> Back
                </button>
                <h2 className="flex-1 text-center font-semibold capitalize">
                    {city} Areas
                </h2>
            </div>

            {/* HERO */}
            <section
                className="relative bg-cover bg-center text-white"
                style={{
                    backgroundImage:
                        "url(https://images.unsplash.com/photo-1505765050516-f72dcac9c60e)"
                }}
            >
                <div className="bg-black/40">
                    <div className="max-w-6xl mx-auto px-6 py-20 text-center">
                        <h1 className="text-2xl sm:text-3xl font-semibold">
                            Discover Premium PGs in {city}
                        </h1>
                        <p className="text-sm mt-2 opacity-90">
                            Find your perfect stay across top localities
                        </p>
                    </div>
                </div>
            </section>

            {/* STATS */}
            <section className="max-w-6xl mx-auto px-4 py-6 grid grid-cols-3 text-center border-b">
                <Stat label="Properties" value={`${pgs.length}+`} />
                <Stat label="Areas" value={areas.length} />
                <Stat label="Starting From" value="₹12,000+" />
            </section>

            {/* AREA CARDS */}
            <section className="max-w-6xl mx-auto px-4 py-8 space-y-6">
                {areas.map((area) => {
                    const areaPgs = pgs.filter((pg) => pg.location === area);

                    const startingPrice = Math.min(
                        ...areaPgs
                            .map((pg) => pg.pricing?.monthlyRent)
                            .filter(Boolean)
                    );

                    const facilities = Array.from(
                        new Set(areaPgs.flatMap((pg) => pg.amenities || []))
                    ).slice(0, 4);

                    return (
                        <div
                            key={area}
                            className="bg-white rounded-2xl border p-4 sm:p-6 flex flex-col sm:flex-row gap-4 items-start sm:items-center"
                        >
                            {/* IMAGE */}
                            <div className="w-full sm:w-28 h-28 rounded-xl overflow-hidden bg-gray-100">
                                <img
                                    src={areaPgs[0]?.images?.[0] || "/placeholder.jpg"}
                                    alt={area}
                                    className="w-full h-full object-cover"
                                />
                            </div>

                            {/* INFO */}
                            <div className="flex-1">
                                <h3 className="text-lg font-semibold capitalize">
                                    {area}
                                </h3>
                                <p className="text-sm text-gray-500 mb-2">
                                    Popular PG location in {city}
                                </p>

                                {/* FACILITIES */}
                                <div className="flex flex-wrap gap-2 text-xs mb-2">
                                    {facilities.map((f) => (
                                        <span
                                            key={f}
                                            className="px-3 py-1 bg-gray-100 rounded-full"
                                        >
                                            {f}
                                        </span>
                                    ))}
                                </div>

                                {/* META */}
                                <div className="text-sm text-gray-600 flex gap-4">
                                    <span>🏠 {areaPgs.length} PGs</span>
                                    {startingPrice && (
                                        <span>💰 From ₹{startingPrice}</span>
                                    )}
                                </div>
                            </div>

                            {/* BUTTON */}
                            <button
                                onClick={() => router.push(`/pg/${areaPgs[0]._id}`)}
                                className="mt-2 sm:mt-0 px-4 py-2 border rounded-lg text-sm hover:bg-gray-100"
                            >
                                View PG
                            </button>
                        </div>
                    );
                })}
            </section>
        </div>
    );
}

/* STAT COMPONENT */
function Stat({ label, value }) {
    return (
        <div>
            <p className="text-lg font-semibold">{value}</p>
            <p className="text-xs text-gray-500">{label}</p>
        </div>
    );
}
