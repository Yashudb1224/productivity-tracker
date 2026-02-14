"use client";

import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  Title,
  Tooltip,
  Legend,
} from "chart.js";
import { Line } from "react-chartjs-2";
import { useAppStore } from "@/store/useAppStore";
import GlassCard from "../ui/GlassCard";
import { useMemo, useState, useEffect } from "react";
import { getHabitIcon } from "@/lib/habitIcons";

ChartJS.register(
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  Title,
  Tooltip,
  Legend
);

export default function TrendSection() {
  const { entries, user } = useAppStore();
  const [mounted, setMounted] = useState(false);
  useEffect(() => setMounted(true), []);

  const habits = user?.habits || [];
  const numericHabits = habits.filter(h => h.type === "numeric");

  // Get last 7 days data for trends
  const trendData = useMemo(() => {
    if (!mounted) return { labels: [], dataMaps: {} };

    const labels: string[] = [];
    const dataMaps: Record<string, number[]> = {};

    numericHabits.forEach(h => {
      dataMaps[h.id] = [];
    });

    const today = new Date();
    for (let i = 6; i >= 0; i--) {
      const d = new Date(today);
      d.setDate(d.getDate() - i);
      const dateStr = d.toISOString().split('T')[0];
      labels.push(d.toLocaleDateString("en-US", { weekday: "short" }));

      const dayEntries = entries.filter((e) => e.date === dateStr);
      // ...

      numericHabits.forEach(h => {
        const val = dayEntries.filter(e => e.activity === h.id).reduce((a, b) => a + b.value, 0);
        dataMaps[h.id].push(val);
      });
    }

    return { labels, dataMaps };
  }, [entries, numericHabits]);

  const commonOptions = {
    responsive: true,
    scales: {
      x: { grid: { display: false } }, // Hide x grid
      y: {
        grid: { color: "rgba(255,255,255,0.05)" },
        beginAtZero: true
      },
    },
    plugins: {
      legend: { display: false } // Hide legend for cleaner look
    }
  };

  if (!mounted) return <div className="h-64 bg-white/5 rounded-2xl animate-pulse" />;
  if (numericHabits.length === 0) return null;

  const getChartColor = (gradientClass?: string) => {
    if (!gradientClass) return "#22d3ee"; // default cyan

    // Map Tailwind classes to approximations for the chart
    if (gradientClass.includes("purple")) return "#c084fc";
    if (gradientClass.includes("blue")) return "#60a5fa";
    if (gradientClass.includes("neon-blue")) return "#22d3ee";
    if (gradientClass.includes("green")) return "#34d399";
    if (gradientClass.includes("emerald")) return "#34d399";
    if (gradientClass.includes("orange")) return "#fb923c";
    if (gradientClass.includes("yellow")) return "#facc15";
    if (gradientClass.includes("pink")) return "#f472b6";
    if (gradientClass.includes("rose")) return "#fb7185";
    if (gradientClass.includes("indigo")) return "#818cf8";
    if (gradientClass.includes("gray")) return "#9ca3af";
    if (gradientClass.includes("teal")) return "#2dd4bf";
    if (gradientClass.includes("fuchsia")) return "#e879f9";
    if (gradientClass.includes("cyan")) return "#22d3ee";

    return "#22d3ee";
  };

  return (
    <div className="space-y-6">
      <h2 className="text-xl font-bold bg-clip-text text-transparent bg-gradient-to-r from-white to-white/60 tracking-wider">
        7-DAY TRENDS
      </h2>

      {numericHabits.map(habit => {
        const color = getChartColor(habit.color);
        return (
          <GlassCard key={habit.id} className="p-4">
            <div className="flex justify-between items-center mb-4">
              <div className="flex items-center gap-3">
                <div className="p-1.5 rounded-lg bg-white/5">
                  {getHabitIcon(habit.icon, "w-4 h-4", habit.name)}
                </div>
                <h3 className="text-sm font-bold tracking-widest uppercase" style={{ color: color }}>
                  {habit.name} ({habit.unit})
                </h3>
              </div>
            </div>
            <div className="h-32">
              <Line
                options={commonOptions}
                data={{
                  labels: trendData.labels,
                  datasets: [{
                    data: trendData.dataMaps[habit.id],
                    borderColor: color,
                    backgroundColor: color,
                    tension: 0.4,
                    borderWidth: 2,
                    pointRadius: 3
                  }]
                }}
              />
            </div>
          </GlassCard>
        );
      })}
    </div>
  );
}
