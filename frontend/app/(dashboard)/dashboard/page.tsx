"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import DashboardShell from "@/components/dashboard/DashboardShell";
import KPIGrid from "@/components/dashboard/KPIGrid";
import Heatmap from "@/components/analytics/Heatmap";
import DailyEntryForm from "@/components/daily/DailyEntryForm";
import TrendSection from "@/components/dashboard/TrendSection";
import ExportButton from "@/components/dashboard/ExportButton";
import DateSelector from "@/components/dashboard/DateSelector";

import { useAppStore } from "@/store/useAppStore";

export default function DashboardPage() {
  const user = useAppStore(s => s.user);

  return (
    <DashboardShell>
      <div id="dashboard-content" className="flex flex-col gap-8">

        {/* Header Section */}
        <div className="flex flex-col md:flex-row justify-between items-end gap-4 border-b border-white/5 pb-6">
          <div>
            <h1 className="text-4xl md:text-5xl font-bold bg-clip-text text-transparent bg-gradient-to-r from-white to-white/50 mb-2">
              Welcome back, {user?.name?.split(' ')[0] || "Agent"}
            </h1>
            <p className="text-aurora-purple font-medium tracking-wide">
              Your mission status is active.
            </p>
          </div>
          <div className="flex gap-4 items-center">
            <DateSelector />
            <ExportButton />
          </div>
        </div>

        {/* Hero: Daily Entry */}
        <div className="w-full">
          <DailyEntryForm />
        </div>

        {/* Stats Grid */}
        <KPIGrid />

        {/* Heatmap Section - Full Width */}
        <Heatmap />

        {/* Trends Section */}
        <TrendSection />

      </div>
    </DashboardShell>
  );
}
