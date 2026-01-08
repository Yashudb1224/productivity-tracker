"use client";

import DashboardShell from "@/components/dashboard/DashboardShell";
import BarChart from "@/components/charts/BarChart";
import { useAppStore } from "@/store/useAppStore";
import GlassCard from "@/components/ui/GlassCard";

export default function AnalyticsPage() {
  const { entries, user } = useAppStore();
  const habits = user?.habits || [];
  const numericHabits = habits.filter(h => h.type === "numeric");

  const months = [
    "Jan", "Feb", "Mar", "Apr", "May", "Jun",
    "Jul", "Aug", "Sep", "Oct", "Nov", "Dec",
  ];

  if (numericHabits.length === 0) {
    return (
      <DashboardShell>
        <div className="flex flex-col items-center justify-center h-[50vh] text-gray-500">
          <h2 className="text-xl mb-2">No Data Available</h2>
          <p>Create some numeric habits (e.g. Reading, Running) to see analytics.</p>
        </div>
      </DashboardShell>
    )
  }

  return (
    <DashboardShell>
      <h1 className="text-3xl font-bold mb-8 text-transparent bg-clip-text bg-gradient-to-r from-neon-cyan to-neon-purple">
        Deep Analysis
      </h1>

      <div className="grid grid-cols-1 gap-8">
        {numericHabits.map(habit => {
          // Aggregate data by month
          const monthlyData = Array(12).fill(0);
          entries.forEach(e => {
            if (e.activity === habit.id) {
              const d = new Date(e.date);
              // Ensure we are using local month if possible, but Date object is okay for month index 
              // if string is YYYY-MM-DD.
              // new Date("2026-01-09") is UTC 00:00 usually? 
              // No, new Date("YYYY-MM-DD") is parsed as UTC.
              // If we want local month, we should use getUTCMonth if the string is YYYY-MM-DD?
              // "2026-01-09" -> 9th Jan UTC.
              // Correct: .getMonth() on "2026-01-09" might be Jan or *Dec* depending on timezone offset if processed wrong?
              // Actually new Date("2026-01-09") is UTC midnight. 
              // In a -timezone (US), getMonth() might be prev month?
              // Safe parsing:
              const parts = e.date.split("-");
              const monthIndex = parseInt(parts[1], 10) - 1; // 01 -> 0
              if (monthIndex >= 0 && monthIndex < 12) {
                monthlyData[monthIndex] += e.value;
              }
            }
          });

          return (
            <GlassCard key={habit.id} className="p-6">
              <h2 className="mb-6 text-xl font-bold tracking-wider uppercase text-white flex items-center gap-3">
                <div className={`w-3 h-3 rounded-full bg-gradient-to-br ${habit.color}`} />
                {habit.name} <span className="text-gray-500 text-sm normal-case">/ {habit.unit}</span>
              </h2>
              {/* 
                         We reuse BarChart but it might need styling props to match habit color?
                         The component likely uses hardcoded colors. 
                         For now, standard look is fine.
                     */}
              <div className="h-64">
                <BarChart labels={months} data={monthlyData} />
              </div>
            </GlassCard>
          )
        })}
      </div>
    </DashboardShell>
  );
}
