"use client";

import StatCard from "../ui/StatCard";
import { useAppStore } from "@/store/useAppStore";
import {
  totalByActivity,
  noJunkDays,
  globalStreak,
} from "@/lib/calculations";

export default function KPIGrid() {
  const { entries, user } = useAppStore();
  const streak = globalStreak(entries);
  const habits = user?.habits || [];

  return (
    <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
      <StatCard label="Activity Streak" value={`${streak} Days 🔥`} color="cyan" />

      {habits.map(habit => {
        if (habit.type === "numeric") {
          const total = totalByActivity(entries, habit.id);
          return (
            <StatCard
              key={habit.id}
              label={`Total ${habit.name}`}
              value={`${total} ${habit.unit}`}
              // Cheap way to map gradient string to simple color name for StatCard if needed, 
              // or update StatCard to accept full class
              color="purple"
            />
          );
        } else {
          const days = noJunkDays(entries, habit.id); // utilizing generalized noJunkDays
          return (
            <StatCard
              key={habit.id}
              label={`${habit.name} Days`}
              value={days.toString()}
              color="green"
            />
          );
        }
      })}
    </div>
  );
}
