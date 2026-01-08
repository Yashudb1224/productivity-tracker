"use client";

import { useState } from "react";
import { useAppStore } from "@/store/useAppStore";
import GlassCard from "../ui/GlassCard";
import Input from "../ui/Input";
import NeonButton from "../ui/NeonButton";

export default function DailyEntryForm() {
  const { user, addEntry, selectedDate } = useAppStore();
  const [values, setValues] = useState<Record<string, string>>({});

  const handleAdd = (habitId: string) => {
    const val = values[habitId];
    if (!val) return;

    addEntry(habitId, Number(val), selectedDate);
    setValues(prev => ({ ...prev, [habitId]: "" }));
  };

  const handleChange = (id: string, val: string) => {
    setValues(prev => ({ ...prev, [id]: val }));
  };

  const handleQuickAdjust = (id: string, current: string, delta: number) => {
    const val = parseFloat(current || "0");
    const newVal = Math.max(0, val + delta);
    handleChange(id, newVal.toString());
  };

  const habits = user?.habits || [];

  return (
    <GlassCard className="h-full">
      <div className="flex justify-between items-center mb-6">
        <h2 className="text-2xl font-bold text-glow-cyan text-neon-cyan tracking-wider">
          DAILY LOG
        </h2>
        <span className="text-xs text-gray-500 uppercase tracking-widest px-2 py-1 border border-white/10 rounded">
          {new Date(selectedDate).toLocaleDateString("en-US", { weekday: 'short', month: 'short', day: 'numeric' })}
        </span>
      </div>

      <div className="space-y-6">
        {habits.length === 0 && (
          <div className="text-center py-8 text-gray-500">
            No protocols defined.
            <br />
            Go to <a href="/habits" className="text-neon-cyan hover:underline">Habits</a> to setup.
          </div>
        )}

        {habits.map(habit => (
          <div key={habit.id}>
            {habit.type === "numeric" ? (
              <div className="flex gap-2 items-end">
                <div className="flex-1 relative">
                  <Input
                    label={`${habit.name} ${habit.unit ? `(${habit.unit.toUpperCase()})` : ''}`}
                    type="number"
                    value={values[habit.id] || ""}
                    onChange={e => handleChange(habit.id, e.target.value)}
                    className="pr-20"
                  />
                  <div className="absolute right-2 top-8 flex gap-1">
                    <button
                      onClick={() => handleQuickAdjust(habit.id, values[habit.id], -1)}
                      className="w-6 h-6 rounded bg-white/10 hover:bg-white/20 text-xs flex items-center justify-center transition-colors"
                    >
                      -
                    </button>
                    <button
                      onClick={() => handleQuickAdjust(habit.id, values[habit.id], 1)}
                      className="w-6 h-6 rounded bg-aurora-cyan/20 hover:bg-aurora-cyan/40 text-aurora-cyan text-xs flex items-center justify-center transition-colors"
                    >
                      +
                    </button>
                  </div>
                </div>
                <NeonButton onClick={() => handleAdd(habit.id)}>
                  LOG
                </NeonButton>
              </div>
            ) : (
              <NeonButton
                fullWidth
                variant="green" // Could use habit.color mapping if complex
                onClick={() => addEntry(habit.id, 1, selectedDate)}
                className="tracking-widest font-bold"
              >
                {habit.name.toUpperCase()} CHECK-IN
              </NeonButton>
            )}
          </div>
        ))}
      </div>
    </GlassCard>
  );
}
