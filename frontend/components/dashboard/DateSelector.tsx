"use client";

import { useAppStore } from "@/store/useAppStore";
import NeonButton from "../ui/NeonButton";
import GlassCard from "../ui/GlassCard";

export default function DateSelector() {
    const selectedDate = useAppStore((s) => s.selectedDate);
    const setSelectedDate = useAppStore((s) => s.setSelectedDate);

    const handlePrev = () => {
        const d = new Date(selectedDate);
        d.setDate(d.getDate() - 1);
        setSelectedDate(d.toISOString().slice(0, 10));
    };

    const handleNext = () => {
        const d = new Date(selectedDate);
        d.setDate(d.getDate() + 1);
        const newDate = d.toISOString().slice(0, 10);

        // Prevent going into future
        const today = new Date().toLocaleDateString("en-CA");
        if (newDate > today) return;

        setSelectedDate(newDate);
    };

    const isToday = selectedDate === new Date().toLocaleDateString("en-CA");

    return (
        <GlassCard className="flex items-center gap-4 px-4 py-2 !rounded-full">
            <button
                onClick={handlePrev}
                className="p-2 hover:bg-white/10 rounded-full transition-colors text-aurora-cyan"
            >
                ←
            </button>

            <div className="flex flex-col items-center min-w-[100px]">
                <span className="text-sm font-bold tracking-wider text-white">
                    {new Date(selectedDate).toLocaleDateString("en-US", { month: "short", day: "numeric" })}
                </span>
                <span className="text-[10px] text-gray-400 font-medium uppercase tracking-widest">
                    {isToday ? "Today" : new Date(selectedDate).toLocaleDateString("en-US", { weekday: "long" })}
                </span>
            </div>

            <button
                onClick={handleNext}
                disabled={isToday}
                className={`p-2 rounded-full transition-colors ${isToday
                    ? "opacity-30 cursor-not-allowed text-gray-500"
                    : "hover:bg-white/10 text-aurora-cyan"
                    }`}
            >
                →
            </button>
        </GlassCard>
    );
}
