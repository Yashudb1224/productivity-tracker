"use client";

import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  BarElement,
  Tooltip,
} from "chart.js";
import { Bar } from "react-chartjs-2";

ChartJS.register(CategoryScale, LinearScale, BarElement, Tooltip);

export default function BarChart({
  labels,
  data,
}: {
  labels: string[];
  data: number[];
}) {
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
