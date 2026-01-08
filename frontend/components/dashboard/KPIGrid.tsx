"use client";

import StatCard from "../ui/StatCard";
import { useAppStore } from "@/store/useAppStore";
import {
  totalByActivity,
  noJunkDays,
  globalStreak,
} from "@/lib/calculations";

export default function KPIGrid() {
  const entries = useAppStore((s) => s.entries);

  const streak = globalStreak(entries);

  return (
    <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
      <StatCard label="Current Streak" value={`${streak} Days`} color="cyan" />
      <StatCard label="Total Run (KM)" value={totalByActivity(entries, "running").toString()} color="purple" />
      <StatCard label="Total Exercise (Hrs)" value={totalByActivity(entries, "exercise").toString()} color="green" />
      <StatCard label="No Junk Days" value={noJunkDays(entries).toString()} color="cyan" />
    </div>
  );
}
