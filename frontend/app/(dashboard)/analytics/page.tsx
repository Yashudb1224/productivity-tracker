"use client";

import DashboardShell from "@/components/dashboard/DashboardShell";
import BarChart from "@/components/charts/BarChart";
import { useAppStore } from "@/store/useAppStore";

export default function AnalyticsPage() {
  const entries = useAppStore((s) => s.entries);

  const months = [
    "Jan","Feb","Mar","Apr","May","Jun",
    "Jul","Aug","Sep","Oct","Nov","Dec",
  ];

  const monthlyRunning = Array(12).fill(0);

  entries.forEach((e) => {
    if (e.activity === "running") {
      const m = new Date(e.date).getMonth();
      monthlyRunning[m] += e.value;
    }
  });

  return (
    <DashboardShell>
      <h1 className="text-2xl font-semibold mb-6">Analytics</h1>

      <div className="bg-neutral-900 p-6 rounded-xl border border-neutral-800">
        <h2 className="mb-4 text-lg">Monthly Running Distance</h2>
        <BarChart labels={months} data={monthlyRunning} />
      </div>
    </DashboardShell>
  );
}
