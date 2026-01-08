"use client";

import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  Tooltip,
} from "chart.js";
import { Line } from "react-chartjs-2";

ChartJS.register(
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  Tooltip
);

export default function LineChart({
  labels,
  data,
}: {
  labels: string[];
  data: number[];
}) {
  return (
    <Line
      data={{
        labels,
        datasets: [
          {
            data,
            borderColor: "#ffffff",
            tension: 0.4,
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
