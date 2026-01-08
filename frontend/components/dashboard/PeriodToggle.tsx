"use client";

import { useAppStore } from "@/store/useAppStore";

export default function PeriodToggle() {
  const { period, setPeriod } = useAppStore();

  return (
    <div className="flex gap-2 bg-neutral-900 p-1 rounded-lg w-fit">
      {["monthly", "yearly"].map(p => (
        <button
          key={p}
          onClick={() => setPeriod(p as any)}
          className={`px-4 py-1 rounded ${
            period === p ? "bg-white text-black" : "text-neutral-400"
          }`}
        >
          {p.toUpperCase()}
        </button>
      ))}
    </div>
  );
}
