import { Building2, Users, Star } from "lucide-react";

export default function DashboardStats() {
  const stats = [
    { label: "Total PGs", value: 3, icon: Building2 },
    { label: "Total Rooms", value: 48, icon: Users },
    { label: "Avg Rating", value: "4.7", icon: Star }
  ];

  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 mb-8">
      {stats.map((stat) => (
        <div
          key={stat.label}
          className="bg-white p-6 rounded-xl shadow-sm flex items-center gap-4"
        >
          <stat.icon className="text-blue-600" size={28} />
          <div>
            <p className="text-sm text-gray-500">{stat.label}</p>
            <h3 className="text-xl font-semibold">{stat.value}</h3>
          </div>
        </div>
      ))}
    </div>
  );
}

