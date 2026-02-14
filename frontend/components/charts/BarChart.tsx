"use client";

import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  BarElement,
  Tooltip,
} from "chart.js";
import { Bar } from "react-chartjs-2";
import { useState, useEffect } from "react";

ChartJS.register(CategoryScale, LinearScale, BarElement, Tooltip);

export default function BarChart({
  labels,
  data,
}: {
  labels: string[];
  data: number[];
}) {
  const [mounted, setMounted] = useState(false);
  useEffect(() => setMounted(true), []);

  if (!mounted) return <div className="w-full h-full bg-white/5 rounded-lg animate-pulse" />;
  return (
    <Bar
      data={{
        labels,
        datasets: [
          {
            data,
            backgroundColor: "#ffffff",
            borderRadius: 8,
          },
        ],
      }}
      options={{
        plugins: { legend: { display: false } },
        scales: {
          x: { ticks: { color: "#aaa" } },
          y: { ticks: { color: "#aaa" } },
        },
      }}
    />
  );
}
