export type Activity = string;

export interface Habit {
  id: string;
  name: string;
  type: "numeric" | "boolean";
  unit?: string;
  color: string; // e.g. "from-neon-blue to-neon-cyan"
  icon?: string; // Icon ID for mapping
}

export interface Goal {
  habitId: string;
  target: number;
  period: "weekly" | "monthly" | "yearly";
}
