"use client";

import { useState, useEffect } from "react";
import StatCard from "../ui/StatCard";
import { useAppStore } from "@/store/useAppStore";
import {
  totalByActivity,
  noJunkDays,
  globalStreak,
} from "@/lib/calculations";

import { getHabitIcon, habitIcons } from "@/lib/habitIcons";

export default function KPIGrid() {
  const { entries, user } = useAppStore();
  const [mounted, setMounted] = useState(false);
  useEffect(() => setMounted(true), []);

  const streak = globalStreak(entries);
  const habits = user?.habits || [];

  if (!mounted) {
    return (
      <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
        {[1, 2, 3, 4].map(i => (
          <div key={i} className="h-32 bg-white/5 rounded-3xl animate-pulse" />
        ))}
      </div>
    );
  }

  return (
    <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
      <StatCard
        label="Operational Streak"
        value={`${streak} Days`}
        icon={habitIcons.streak("w-8 h-8 icon-glow")}
        color="cyan"
      />

      {habits.map(habit => {
        if (habit.type === "numeric") {
          const total = totalByActivity(entries, habit.id);
          return (
            <StatCard
              key={habit.id}
              label={`Total ${habit.name}`}
              value={`${total}`}
              subtext={habit.unit?.toUpperCase()}
              icon={getHabitIcon(habit.icon, "w-8 h-8", habit.name)}
              color="purple"
            />
          );
        } else {
          const days = noJunkDays(entries, habit.id);
          return (
            <StatCard
              key={habit.id}
              label={`${habit.name} Mastery`}
              value={days.toString()}
              subtext="DAYS COMPLETED"
              icon={getHabitIcon(habit.icon, "w-6 h-6", habit.name)}
              color="green"
            />
          );
        }
      })}
    </div>
  );
}
