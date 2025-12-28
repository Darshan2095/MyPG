import OwnerSidebar from "@/components/OwnerSidebar";
import DashboardStats from "@/components/DashboardStats";
import PgTable from "@/components/PgTable";

export default function OwnerDashboard() {
  return (
    <div className="flex flex-col md:flex-row bg-gray-100 min-h-screen">
     

      <main className="flex-1 p-6">
        <h1 className="text-2xl font-semibold mb-6">
          Dashboard Overview
        </h1>

        <DashboardStats />
        <PgTable />
      </main>
    </div>
  );
}
