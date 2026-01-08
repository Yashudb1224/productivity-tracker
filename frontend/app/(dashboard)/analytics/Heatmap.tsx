"use client";

import { useAppStore } from "@/store/useAppStore";

export default function Heatmap() {
  const entries = useAppStore(s => s.entries);

  const map: Record<string, number> = {};
  entries.forEach(e => {
    map[e.date] = (map[e.date] || 0) + e.value;
  });

  const days = Array.from({ length: 365 }, (_, i) => {
    const d = new Date();
    d.setDate(d.getDate() - i);
    return d.toISOString().slice(0, 10);
  }).reverse();

  return (
    <div className="grid grid-cols-14 gap-1">
      {days.map(day => {
        const v = map[day] || 0;
        return (
          <div
            key={day}
            title={`${day}: ${v}`}
            className={`w-3 h-3 rounded ${
              v === 0 ? "bg-neutral-800"
              : v < 2 ? "bg-green-900"
              : v < 5 ? "bg-green-600"
              : "bg-green-400"
            }`}
          />
        );
      })}
    </div>
  );
}
