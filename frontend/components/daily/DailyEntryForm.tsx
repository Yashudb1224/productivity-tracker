"use client";

import { useState, useEffect } from "react";
import { useAppStore } from "@/store/useAppStore";
import GlassCard from "../ui/GlassCard";
import Input from "../ui/Input";
import NeonButton from "../ui/NeonButton";

import { getHabitIcon } from "@/lib/habitIcons";

export default function DailyEntryForm() {
  const { user, addEntry, selectedDate } = useAppStore();
  const [mounted, setMounted] = useState(false);
  useEffect(() => setMounted(true), []);

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

  if (!mounted) return <div className="h-64 bg-white/5 rounded-3xl animate-pulse" />;

  return (
    <GlassCard className="h-full !p-8">
      <div className="flex justify-between items-center mb-10">
        <div>
          <h2 className="text-2xl font-black text-white tracking-widest uppercase italic">
            DAILY LOG <span className="text-aurora-cyan text-glow-cyan">.</span>
          </h2>
          <p className="text-[9px] font-black text-gray-500 uppercase tracking-[0.3em] mt-1">Status: Operational // Entry Sync Active</p>
        </div>
        <div className="flex flex-col items-end">
          <span className="text-[10px] text-white font-black uppercase tracking-widest px-3 py-1 bg-white/5 border border-white/10 rounded-full">
            {new Date(selectedDate).toLocaleDateString("en-US", { weekday: 'short', month: 'short', day: 'numeric' })}
          </span>
        </div>
      </div>

      <div className="space-y-8">
        {habits.length === 0 && (
          <div className="text-center py-16 border border-dashed border-white/10 rounded-3xl bg-white/[0.01]">
            <div className="mb-4 flex justify-center opacity-20">
              <svg className="w-10 h-10" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1} d="M12 9v3m0 0v3m0-3h3m-3 0H9m12 0a9 9 0 11-18 0 9 9 0 0118 0z" />
              </svg>
            </div>
            <p className="text-xs font-black text-gray-500 uppercase tracking-widest">No primary protocols initialized</p>
            <br />
            <a href="/habits" className="inline-block px-5 py-2 rounded-full bg-aurora-cyan/10 border border-aurora-cyan/20 text-aurora-cyan text-[10px] font-black uppercase tracking-widest hover:bg-aurora-cyan/20 transition-all">
              Access Protocol Core
            </a>
          </div>
        )}

        {habits.map(habit => (
          <div key={habit.id} className="group/item">
            {habit.type === "numeric" ? (
              <div className="flex gap-4 items-end">
                <div className="flex-1 relative">
                  <div className="flex items-center gap-3 mb-2.5">
                    <div className="p-1.5 rounded-lg bg-white/5 text-gray-400 group-hover/item:text-white transition-colors">
                      {getHabitIcon(habit.icon, "w-5 h-5", habit.name)}
                    </div>
                    <span className="text-[10px] font-black tracking-widest text-gray-500 uppercase">
                      {habit.name} {habit.unit ? `[${habit.unit}]` : ''}
                    </span>
                    <div className="h-px flex-1 bg-white/5 group-hover/item:bg-white/10 transition-colors" />
                  </div>
                  <Input
                    type="number"
                    placeholder="VALUE"
                    value={values[habit.id] || ""}
                    onChange={e => handleChange(habit.id, e.target.value)}
                    className="!pt-3.5 !pb-3.5 bg-white/[0.02] border-white/5 focus:border-aurora-cyan/50 transition-all font-mono text-lg"
                  />
                  <div className="absolute right-3 bottom-[12px] flex gap-2">
                    <button
                      onClick={() => handleQuickAdjust(habit.id, values[habit.id], -1)}
                      className="w-8 h-8 rounded-lg bg-black/40 hover:bg-white/10 text-gray-500 flex items-center justify-center transition-all border border-white/5"
                    >
                      －
                    </button>
                    <button
                      onClick={() => handleQuickAdjust(habit.id, values[habit.id], 1)}
                      className="w-8 h-8 rounded-lg bg-aurora-cyan/10 hover:bg-aurora-cyan/20 text-aurora-cyan flex items-center justify-center transition-all border border-aurora-cyan/10"
                    >
                      ＋
                    </button>
                  </div>
                </div>
                <button
                  onClick={() => handleAdd(habit.id)}
                  className="px-6 h-[54px] rounded-2xl bg-white text-black font-black text-xs tracking-tighter hover:scale-105 active:scale-95 transition-all flex items-center gap-2 shadow-xl shadow-white/5"
                >
                  LOG
                  <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={3} d="M5 13l4 4L19 7" />
                  </svg>
                </button>
              </div>
            ) : (
              <button
                onClick={() => addEntry(habit.id, 1, selectedDate)}
                className="w-full relative overflow-hidden group/btn px-6 py-6 rounded-2xl bg-[#080808] border border-white/5 hover:border-aurora-cyan/30 transition-all flex items-center justify-between shadow-xl"
              >
                <div className="flex items-center gap-5 relative z-10">
                  <div className={`p-3 rounded-xl bg-gradient-to-br ${habit.color} text-black/60 group-hover/btn:scale-110 transition-transform shadow-lg`}>
                    {getHabitIcon(habit.icon, "w-8 h-8", habit.name)}
                  </div>
                  <div className="text-left">
                    <div className="text-sm font-black tracking-tight text-white uppercase">{habit.name}</div>
                    <div className="text-[9px] text-gray-500 font-black tracking-widest uppercase mt-0.5">Execution Required // {habit.type}</div>
                  </div>
                </div>
                <div className="text-[10px] font-black tracking-widest text-aurora-cyan bg-aurora-cyan/5 px-4 py-2 rounded-full border border-aurora-cyan/10 relative z-10 group-hover/btn:bg-aurora-cyan group-hover/btn:text-black transition-all">
                  COMPLETE
                </div>
                {/* Visual Accent */}
                <div className={`absolute top-0 right-0 w-64 h-full bg-gradient-to-l opacity-0 group-hover/btn:opacity-10 transition-opacity pointer-events-none ${habit.color}`} />
              </button>
            )}
          </div>
        ))}
      </div>
    </GlassCard>
  );
}
