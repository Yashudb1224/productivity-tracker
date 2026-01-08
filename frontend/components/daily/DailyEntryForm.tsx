"use client";

import { useState } from "react";
import { useAppStore } from "@/store/useAppStore";
import GlassCard from "../ui/GlassCard";
import Input from "../ui/Input";
import NeonButton from "../ui/NeonButton";

export default function DailyEntryForm() {
  const addEntry = useAppStore((s) => s.addEntry);
  const selectedDate = useAppStore((s) => s.selectedDate);
  const [running, setRunning] = useState("");
  const [exercise, setExercise] = useState("");
  const [violin, setViolin] = useState("");

  const handleAdd = (activity: any, val: string, reset: () => void) => {
    if (!val) return;
    addEntry(activity, Number(val), selectedDate);
    reset();
  };

  const handleQuickAdjust = (setter: (v: string) => void, current: string, delta: number) => {
    const val = parseFloat(current || "0");
    const newVal = Math.max(0, val + delta);
    setter(newVal.toString());
  };

  return (
    <GlassCard className="h-full">
      <h2 className="text-2xl font-bold mb-6 text-glow-cyan text-neon-cyan tracking-wider">
        DAILY LOG
      </h2>
      <div className="space-y-6">
        {/* Running */}
        <div className="flex gap-2 items-end">
          <div className="flex-1 relative">
            <Input
              label="RUNNING (KM)"
              type="number"
              value={running}
              onChange={e => setRunning(e.target.value)}
              className="pr-20"
            />
            <div className="absolute right-2 top-8 flex gap-1">
              <button
                onClick={() => handleQuickAdjust(setRunning, running, -1)}
                className="w-6 h-6 rounded bg-white/10 hover:bg-white/20 text-xs flex items-center justify-center transition-colors"
              >
                -1
              </button>
              <button
                onClick={() => handleQuickAdjust(setRunning, running, 1)}
                className="w-6 h-6 rounded bg-aurora-cyan/20 hover:bg-aurora-cyan/40 text-aurora-cyan text-xs flex items-center justify-center transition-colors"
              >
                +1
              </button>
            </div>
          </div>
          <NeonButton onClick={() => handleAdd("running", running, () => setRunning(""))}>
            LOG
          </NeonButton>
        </div>

        {/* Exercise */}
        <div className="flex gap-2 items-end">
          <div className="flex-1 relative">
            <Input
              label="EXERCISE (HRS)"
              type="number"
              value={exercise}
              onChange={e => setExercise(e.target.value)}
              className="pr-20"
            />
            <div className="absolute right-2 top-8 flex gap-1">
              <button
                onClick={() => handleQuickAdjust(setExercise, exercise, -0.5)}
                className="w-8 h-6 rounded bg-white/10 hover:bg-white/20 text-[10px] flex items-center justify-center transition-colors"
              >
                -0.5
              </button>
              <button
                onClick={() => handleQuickAdjust(setExercise, exercise, 0.5)}
                className="w-8 h-6 rounded bg-aurora-purple/20 hover:bg-aurora-purple/40 text-aurora-purple text-[10px] flex items-center justify-center transition-colors"
              >
                +0.5
              </button>
            </div>
          </div>
          <NeonButton variant="purple" onClick={() => handleAdd("exercise", exercise, () => setExercise(""))}>
            LOG
          </NeonButton>
        </div>

        {/* Violin */}
        <div className="flex gap-2 items-end">
          <div className="flex-1 relative">
            <Input
              label="VIOLIN (HRS)"
              type="number"
              value={violin}
              onChange={e => setViolin(e.target.value)}
              className="pr-20"
            />
            <div className="absolute right-2 top-8 flex gap-1">
              <button
                onClick={() => handleQuickAdjust(setViolin, violin, -0.5)}
                className="w-8 h-6 rounded bg-white/10 hover:bg-white/20 text-[10px] flex items-center justify-center transition-colors"
              >
                -0.5
              </button>
              <button
                onClick={() => handleQuickAdjust(setViolin, violin, 0.5)}
                className="w-8 h-6 rounded bg-aurora-cyan/20 hover:bg-aurora-cyan/40 text-aurora-cyan text-[10px] flex items-center justify-center transition-colors"
              >
                +0.5
              </button>
            </div>
          </div>
          <NeonButton variant="cyan" onClick={() => handleAdd("violin", violin, () => setViolin(""))}>
            LOG
          </NeonButton>
        </div>

        <div className="pt-4 border-t border-white/10">
          <NeonButton
            fullWidth
            variant="green"
            onClick={() => addEntry("nojunk", 1, selectedDate)}
            className="tracking-widest font-bold"
          >
            NO JUNK FOOD CHECK-IN
          </NeonButton>
        </div>
      </div>
    </GlassCard>
  );
}
