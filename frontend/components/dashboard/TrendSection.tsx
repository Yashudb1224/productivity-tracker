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
import { useMemo } from "react";

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
  const entries = useAppStore((s) => s.entries);

  // Get last 7 days data for trends
  const trendData = useMemo(() => {
    const labels = [];
    const runData = [];
    const exerciseData = [];
    const violinData = [];

    const today = new Date();
    for (let i = 6; i >= 0; i--) {
      const d = new Date(today);
      d.setDate(d.getDate() - i);
      const dateStr = d.toISOString().slice(0, 10);
      labels.push(d.toLocaleDateString("en-US", { weekday: "short" }));

      const dayEntries = entries.filter((e) => e.date === dateStr);
      runData.push(dayEntries.filter(e => e.activity === "running").reduce((a, b) => a + b.value, 0));
      exerciseData.push(dayEntries.filter(e => e.activity === "exercise").reduce((a, b) => a + b.value, 0));
      violinData.push(dayEntries.filter(e => e.activity === "violin").reduce((a, b) => a + b.value, 0));
    }

    return { labels, runData, exerciseData, violinData };
  }, [entries]);

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

  return (
    <div className="space-y-6">
      <h2 className="text-xl font-bold bg-clip-text text-transparent bg-gradient-to-r from-white to-white/60 tracking-wider">
        7-DAY TRENDS
      </h2>

      {/* Running */}
      <GlassCard className="p-4">
        <div className="flex justify-between items-center mb-4">
          <h3 className="text-sm font-bold text-aurora-cyan tracking-widest">RUNNING (KM)</h3>
        </div>
        <div className="h-32">
          <Line
            options={commonOptions}
            data={{
              labels: trendData.labels,
              datasets: [{
                data: trendData.runData,
                borderColor: "#22d3ee", // cyan-400
                backgroundColor: "#22d3ee",
                tension: 0.4,
                borderWidth: 2,
                pointRadius: 3
              }]
            }}
          />
        </div>
      </GlassCard>

      {/* Exercise */}
      <GlassCard className="p-4">
        <div className="flex justify-between items-center mb-4">
          <h3 className="text-sm font-bold text-aurora-purple tracking-widest">EXERCISE (HRS)</h3>
        </div>
        <div className="h-32">
          <Line
            options={commonOptions}
            data={{
              labels: trendData.labels,
              datasets: [{
                data: trendData.exerciseData,
                borderColor: "#c084fc", // purple-400
                backgroundColor: "#c084fc",
                tension: 0.4,
                borderWidth: 2,
                pointRadius: 3
              }]
            }}
          />
        </div>
      </GlassCard>

      {/* Violin */}
      <GlassCard className="p-4">
        <div className="flex justify-between items-center mb-4">
          <h3 className="text-sm font-bold text-aurora-green tracking-widest">VIOLIN (HRS)</h3>
        </div>
        <div className="h-32">
          <Line
            options={commonOptions}
            data={{
              labels: trendData.labels,
              datasets: [{
                data: trendData.violinData,
                borderColor: "#34d399", // emerald-400 (green)
                backgroundColor: "#34d399",
                tension: 0.4,
                borderWidth: 2,
                pointRadius: 3
              }]
            }}
          />
        </div>
      </GlassCard>
    </div>
  );
}
