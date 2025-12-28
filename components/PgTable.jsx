import { Edit, Trash2 } from "lucide-react";

const pgs = [
  {
    id: 1,
    name: "Premium PG - Koramangala",
    location: "Koramangala",
    rooms: 20,
    price: 18000
  },
  {
    id: 2,
    name: "Modern PG - HSR Layout",
    location: "HSR Layout",
    rooms: 15,
    price: 15000
  }
];

export default function PgTable() {
  return (
    <div className="bg-white rounded-xl shadow-sm overflow-x-auto">
      <table className="w-full text-sm">
        <thead className="bg-gray-100 text-gray-600">
          <tr>
            <th className="p-4 text-left">PG Name</th>
            <th className="p-4 text-left">Location</th>
            <th className="p-4 text-left">Rooms</th>
            <th className="p-4 text-left">Price</th>
            <th className="p-4 text-right">Actions</th>
          </tr>
        </thead>

        <tbody>
          {pgs.map((pg) => (
            <tr key={pg.id} className="border-t">
              <td className="p-4 font-medium">{pg.name}</td>
              <td className="p-4">{pg.location}</td>
              <td className="p-4">{pg.rooms}</td>
              <td className="p-4">₹{pg.price}</td>
              <td className="p-4 flex justify-end gap-3">
                <button className="text-blue-600 hover:text-blue-700">
                  <Edit size={18} />
                </button>
                <button className="text-red-500 hover:text-red-600">
                  <Trash2 size={18} />
                </button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}
