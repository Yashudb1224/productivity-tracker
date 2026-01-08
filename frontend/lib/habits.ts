import { Habit } from "@/types/habit";

export const DEFAULT_HABITS: Habit[] = [
  {
    id: "running",
    name: "Running",
    type: "numeric",
    unit: "km",
    color: "from-neon-blue to-neon-cyan"
  },
  {
    id: "exercise",
    name: "Exercise",
    type: "numeric",
    unit: "hrs",
    color: "from-neon-purple to-neon-pink"
  },
  {
    id: "violin",
    name: "Violin",
    type: "numeric",
    unit: "hrs",
    color: "from-neon-green to-emerald-400"
  },
  {
    id: "nojunk",
    name: "No Junk Food",
    type: "boolean",
    color: "from-orange-400 to-red-500"
  }
];
