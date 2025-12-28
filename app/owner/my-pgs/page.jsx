"use client";

import { useEffect, useState } from "react";
import Image from "next/image";

export default function MyPgsPage() {
  const [pgs, setPgs] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetch("/api/pg/owner")
      .then((res) => res.json())
      .then((data) => {
        setPgs(data);
        setLoading(false);
      });
  }, []);

  if (loading) {
    return (
      <div className="flex justify-center items-center min-h-[60vh]">
        <p className="text-gray-500">Loading your PGs...</p>
      </div>
    );
  }

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 py-6">
      <h1 className="text-2xl font-semibold mb-6">My PGs</h1>

      {pgs.length === 0 ? (
        <p className="text-gray-500">You haven’t added any PG yet.</p>
      ) : (
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
          {pgs.map((pg) => (
            <div
              key={pg._id}
              className="bg-white rounded-xl shadow hover:shadow-lg transition overflow-hidden"
            >
              {/* Image */}
              <div className="relative w-full h-44">
                <img
  src={pg.images[0]}
  alt={pg.pgName}
  className="w-full h-44 object-cover"
/>
              </div>

              {/* Content */}
              <div className="p-4 space-y-2">
                <h2 className="text-lg font-semibold">{pg.pgName}</h2>

                <p className="text-sm text-gray-500">
                  📍 {pg.location}
                </p>

                <p className="font-medium text-blue-600">
                  ₹ {pg.price} / month
                </p>

                <div className="flex flex-wrap gap-2 text-xs mt-2">
                  {pg.roomTypes.map((r) => (
                    <span
                      key={r}
                      className="bg-gray-100 px-2 py-1 rounded"
                    >
                      {r}
                    </span>
                  ))}
                </div>

                <div className="flex flex-wrap gap-2 text-xs">
                  {pg.facilities.slice(0, 4).map((f) => (
                    <span
                      key={f}
                      className="bg-green-100 text-green-700 px-2 py-1 rounded"
                    >
                      {f}
                    </span>
                  ))}
                </div>

                <div className="flex justify-between pt-4">
                  <button className="text-sm text-blue-600 hover:underline">
                    Edit
                  </button>
                  <button className="text-sm text-red-600 hover:underline">
                    Delete
                  </button>
                </div>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}
