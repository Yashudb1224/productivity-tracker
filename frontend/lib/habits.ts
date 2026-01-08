import { Habit } from "@/types/habit";

export const HABITS: Habit[] = [
  {
    id: "running",
    name: "Running",
    type: "numeric",
    unit: "km",
  },
  {
    id: "exercise",
    name: "Exercise",
    type: "numeric",
    unit: "hours",
  },
  {
    id: "violin",
    name: "Violin Practice",
    type: "numeric",
    unit: "hours",
  },
  {
    id: "nojunk",
    name: "No Junk Food",
    type: "boolean",
    unit: "days",
  },
];
