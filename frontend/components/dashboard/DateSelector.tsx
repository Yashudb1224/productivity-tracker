"use client";

import { useState, useEffect } from "react";
import { useAppStore } from "@/store/useAppStore";
import NeonButton from "../ui/NeonButton";
import GlassCard from "../ui/GlassCard";

export default function DateSelector() {
    const selectedDate = useAppStore((s) => s.selectedDate);
    const setSelectedDate = useAppStore((s) => s.setSelectedDate);

    const [mounted, setMounted] = useState(false);
    useEffect(() => setMounted(true), []);

    const handlePrev = () => {
        const d = new Date(selectedDate);
        d.setDate(d.getDate() - 1);
        setSelectedDate(d.toISOString().split('T')[0]);
    };

    const handleNext = () => {
        const d = new Date(selectedDate);
        d.setDate(d.getDate() + 1);
        const newDate = d.toISOString().split('T')[0];

        // Prevent going into future
        const today = new Date().toISOString().split('T')[0];
        if (newDate > today) return;

        setSelectedDate(newDate);
    };

    const isToday = selectedDate === new Date().toISOString().split('T')[0];

    if (!mounted) return <div className="w-32 h-10 bg-white/5 rounded-full animate-pulse" />;

    return (
        <GlassCard className="flex items-center gap-6 px-4 py-2 !rounded-full border-white/5 bg-white/[0.02]">
            <button
                onClick={handlePrev}
                className="p-2 hover:bg-white/10 rounded-full transition-all text-aurora-cyan group"
            >
                <svg className="w-5 h-5 group-hover:-translate-x-1 transition-transform" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2.5} d="M15 19l-7-7 7-7" />
                </svg>
            </button>

            <div className="flex flex-col items-center min-w-[120px]">
                <span className="text-sm font-black tracking-widest text-white uppercase italic">
                    {new Date(selectedDate).toLocaleDateString("en-US", { month: "short", day: "numeric" })}
                </span>
                <span className="text-[9px] text-aurora-cyan/60 font-black uppercase tracking-[0.2em] mt-0.5">
                    {isToday ? "Status: Live" : new Date(selectedDate).toLocaleDateString("en-US", { weekday: "long" })}
                </span>
            </div>

            <button
                onClick={handleNext}
                disabled={isToday}
                className={`p-2 rounded-full transition-all group ${isToday
                    ? "opacity-10 cursor-not-allowed text-gray-600"
                    : "hover:bg-white/10 text-aurora-cyan"
                    }`}
            >
                <svg className="w-5 h-5 group-hover:translate-x-1 transition-transform" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2.5} d="M9 5l7 7-7 7" />
                </svg>
            </button>
        </GlassCard>
    );
}
