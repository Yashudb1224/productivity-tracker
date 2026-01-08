"use client";

import { useAppStore } from "@/store/useAppStore";
import { useEffect, useState, useMemo } from "react";
import GlassCard from "../ui/GlassCard";

export default function Heatmap() {
    const entries = useAppStore((s) => s.entries);
    const selectedDate = useAppStore((s) => s.selectedDate);
    const setSelectedDate = useAppStore((s) => s.setSelectedDate);

    // Fixed Calendar for 2026
    const calendarData = useMemo(() => {
        const year = 2026;
        const startDate = new Date(year, 0, 1); // Jan 1, 2026
        const endDate = new Date(year, 11, 31); // Dec 31, 2026

        const weeks = [];
        let currentDate = new Date(startDate);

        // Align to Sunday. If Jan 1 is not Sunday, we go back to find the Sunday.
        // BUT we must render those days as invisible/empty if they are in 2025.
        // GitHub style: Rows are days (Mon-Sun or Sun-Sat), Columns are weeks.
        // Vertical list of days in a week column? Structure here is week[] -> day[].

        // Go back to previous Sunday
        while (currentDate.getDay() !== 0) {
            currentDate.setDate(currentDate.getDate() - 1);
        }

        // Loop until we cover all of 2026
        // We stop when the week's first day is after Dec 31? Or when we complete the week covering Dec 31.
        while (true) {
            const week = [];
            let weekHas2026 = false;

            for (let i = 0; i < 7; i++) {
                const dateStr = currentDate.toISOString().slice(0, 10);
                const dayDate = new Date(currentDate);
                const is2026 = dayDate.getFullYear() === year;
                if (is2026) weekHas2026 = true;

                // Future check relative to TODAY (real world today, not 2026 unless truly in 2026)
                // Assuming we are treating "Today" as the current real date.
                const realToday = new Date();
                // Normalize realToday to start of day for comparison
                realToday.setHours(0, 0, 0, 0);
                dayDate.setHours(0, 0, 0, 0); // Normalize dayDate as well
                const isFuture = dayDate > realToday;

                // Get entries
                const dayEntries = entries.filter((e) => e.date === dateStr);
                const count = dayEntries.length;

                // Tooltip
                let tooltip = `${dateStr}`;
                if (count > 0) {
                    const details: string[] = [];
                    const habits = useAppStore.getState().user?.habits || [];

                    habits.forEach(habit => {
                        const entry = dayEntries.find(e => e.activity === habit.id);
                        if (entry) {
                            if (habit.type === "numeric") {
                                details.push(`${entry.value}${habit.unit || ''} ${habit.name}`);
                            } else {
                                details.push(`${habit.name}`);
                            }
                        }
                    });

                    // Fallback if we have entries but no matching habits (e.g. legacy data)
                    if (details.length === 0 && dayEntries.length > 0) {
                        details.push(`${dayEntries.length} activities`);
                    }

                    if (details.length > 0) tooltip += `: ${details.join(", ")}`;
                    else tooltip += `: ${count} activities`;
                } else {
                    tooltip += ": No activity";
                }

                week.push({
                    date: dateStr,
                    value: count,
                    dayIndex: i,
                    monthIndex: dayDate.getMonth(),
                    isCurrentYear: is2026,
                    isFuture,
                    tooltip
                });

                currentDate.setDate(currentDate.getDate() + 1);
            }

            // Only add week if it contains at least one day of 2026 (or if we want full grid)
            // But we specifically want the grid to "start" Jan 1. 
            // Standard practice: Show the full week containing Jan 1.
            weeks.push(week);

            // If the *next* start of week is after Dec 31 2026, stop.
            // currentDate is already at next Sunday.
            if (currentDate.getFullYear() > year) break;
        }
        return weeks;
    }, [entries]);

    // Generate Month Labels
    const monthLabels = useMemo(() => {
        const labels: { text: string; weekIndex: number }[] = [];

        calendarData.forEach((week, index) => {
            // Check if this week contains the 1st of any month
            const firstOfMonth = week.find(day => day.date.endsWith("-01"));

            if (firstOfMonth && firstOfMonth.isCurrentYear) {
                // Determine month name
                const date = new Date(firstOfMonth.date);
                const text = date.toLocaleDateString("en-US", { month: "short" });

                labels.push({
                    text,
                    weekIndex: index
                });
            }
        });
        return labels;
    }, [calendarData]);

    const getColor = (value: number) => {
        if (value === 0) return "bg-white/5";
        if (value <= 1) return "bg-aurora-cyan/30";
        if (value <= 3) return "bg-aurora-cyan/60";
        if (value <= 5) return "bg-aurora-cyan/80";
        return "bg-aurora-cyan";
    };

    return (
        <GlassCard className="w-full overflow-hidden">
            <div className="flex items-center justify-between mb-6">
                <h3 className="text-lg font-bold text-transparent bg-clip-text bg-gradient-to-r from-aurora-cyan to-white tracking-wider">
                    CONSISTENCY
                </h3>
                <div className="flex gap-2 items-center text-xs text-gray-500">
                    <span>Less</span>
                    <div className="w-4 h-4 bg-white/5 rounded-sm" />
                    <div className="w-4 h-4 bg-aurora-cyan/30 rounded-sm" />
                    <div className="w-4 h-4 bg-aurora-cyan/60 rounded-sm" />
                    <div className="w-4 h-4 bg-aurora-cyan rounded-sm" />
                    <span>More</span>
                </div>
            </div>

            <div className="flex flex-col w-full overflow-x-auto custom-scrollbar pb-2">
                {/* Month Labels row */}
                <div className="flex mb-3 ml-8 relative h-5">
                    {monthLabels.map((lbl, i) => (
                        <div
                            key={i}
                            className="absolute text-xs text-gray-400 font-medium whitespace-nowrap"
                            style={{ left: `${lbl.weekIndex * 20}px` }}
                        >
                            {lbl.text}
                        </div>
                    ))}
                </div>

                <div className="flex">
                    {/* Weekday Labels */}
                    <div className="flex flex-col gap-[3px] mr-3 mt-[20px]">
                        {["", "Mon", "", "Wed", "", "Fri", ""].map((day, i) => (
                            <div key={i} className="h-4 text-[10px] text-gray-500 leading-4 text-right w-6">
                                {day}
                            </div>
                        ))}
                    </div>

                    {/* The Grid (Weeks as columns) */}
                    <div className="flex gap-[3px] flex-1">
                        {calendarData.map((week, wIndex) => (
                            <div key={wIndex} className="flex flex-col gap-[3px]">
                                {week.map((day) => {
                                    const isSelected = day.date === selectedDate;
                                    // Interactive logic: Disable if NOT 2026 or Future
                                    const isInteractive = day.isCurrentYear && !day.isFuture;

                                    return (
                                        <div
                                            key={day.date}
                                            onClick={() => {
                                                if (isInteractive) setSelectedDate(day.date);
                                            }}
                                            className={`
                                        w-4 h-4 rounded-sm transition-all duration-200 
                                        ${!isInteractive ? "opacity-30 cursor-not-allowed" : "cursor-pointer"}
                                        ${day.isCurrentYear ? getColor(day.value) : "opacity-0 pointer-events-none"}
                                        ${day.isCurrentYear && isSelected ? "ring-2 ring-white z-10 scale-110" : ""}
                                        ${isInteractive && !isSelected ? "hover:scale-110 hover:brightness-125" : ""}
                                    `}
                                            title={day.tooltip}
                                        />
                                    );
                                })}
                            </div>
                        ))}
                    </div>
                </div>
            </div>
        </GlassCard>
    );
}
