import { Habit } from "@/types/habit";

export interface User {
  id: string;
  name: string;
  createdAt: string;
  habits: Habit[];
}
