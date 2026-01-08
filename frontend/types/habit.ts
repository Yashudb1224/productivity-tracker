export type Activity = "running" | "exercise" | "violin" | "nojunk";

export interface Goal {
  activity: Activity;
  target: number;
  period: "weekly" | "monthly";
}

export interface Habit {
  id: Activity;
  name: string;
  type: "numeric" | "boolean";
  unit: string;
}
