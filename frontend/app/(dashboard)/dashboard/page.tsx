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
  const hasHabits = user?.habits && user.habits.length > 0;

  return (
    <DashboardShell>
      <div id="dashboard-content" className="flex flex-col gap-10">

        {/* Header: Welcome & Date Selection side-by-side */}
        <div className="flex flex-col md:flex-row justify-between items-center gap-6 border-b border-white/5 pb-8">
          <div>
            <h1 className="text-4xl md:text-6xl font-black bg-clip-text text-transparent bg-gradient-to-r from-white via-white to-white/40 mb-2 tracking-tighter">
              WELCOME, {user?.name?.split(' ')[0] || "OPERATOR"}
            </h1>
            <p className="text-aurora-cyan font-mono text-sm tracking-[0.2em] opacity-80 uppercase">
              Mission Status: {hasHabits ? "Operational" : "Awaiting Protocol Initialization"} // Identity Verified
            </p>
          </div>
          <div className="w-full md:w-auto">
            <DateSelector />
          </div>
        </div>

        {!hasHabits && (
          <div className="relative group">
            <div className="absolute -inset-1 bg-gradient-to-r from-aurora-cyan/20 to-neon-purple/20 rounded-[2rem] blur opacity-25 group-hover:opacity-50 transition duration-1000 group-hover:duration-200"></div>
            <div className="relative p-10 bg-black/40 border border-white/5 rounded-[2rem] backdrop-blur-3xl overflow-hidden">
              <div className="absolute top-0 right-0 p-10 opacity-5">
                <svg className="w-64 h-64" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={0.5} d="M13 10V3L4 14h7v7l9-11h-7z" />
                </svg>
              </div>

              <div className="max-w-3xl">
                <h2 className="text-3xl font-black text-white tracking-tighter mb-4 italic uppercase">
                  INITIALIZE YOUR RITUAL <span className="text-aurora-cyan">.</span>
                </h2>
                <div className="space-y-6 text-gray-400 font-medium leading-relaxed">
                  <p>
                    Welcome to the <span className="text-white font-black">PRODUCTIVITY CORE</span>. To begin your mission, you need to define your <span className="text-aurora-cyan font-black italic">PROTOCOLS</span>.
                  </p>

                  <div className="grid grid-cols-1 md:grid-cols-2 gap-8 pt-4">
                    <div className="space-y-2">
                      <div className="text-[10px] font-black text-white uppercase tracking-[0.3em]">Step 01 // Define</div>
                      <p className="text-sm">Identify activities that drive your progress. We call these "Protocols".</p>
                    </div>
                    <div className="space-y-2">
                      <div className="text-[10px] font-black text-white uppercase tracking-[0.3em]">Step 02 // Execute</div>
                      <p className="text-sm">Log your daily adherence. Every execution strengthens your neural streak.</p>
                    </div>
                  </div>
                </div>

                <div className="mt-10">
                  <Link
                    href="/habits"
                    className="inline-flex items-center gap-4 px-8 py-4 bg-white text-black rounded-2xl font-black text-xs tracking-[0.2em] hover:scale-105 active:scale-95 transition-all shadow-xl shadow-white/10"
                  >
                    CONFIGURE PRIMARY PROTOCOLS
                    <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={3} d="M17 8l4 4m0 0l-4 4m4-4H3" />
                    </svg>
                  </Link>
                </div>
              </div>
            </div>
          </div>
        )}

        {/* Top Section: KPIs across the full width for impact */}
        <div className="w-full">
          <KPIGrid />
        </div>

        {/* Heatmap Section - Expanded to full width to avoid scrolling */}
        <div className="w-full">
          <Heatmap />
        </div>

        {/* Middle Section: Secondary Grid */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-10 items-start">
          <DailyEntryForm />
          <TrendSection />
        </div>
      </div>
    </DashboardShell>
  );
}
