export interface DailyEntry {
  id: string;
  userId: string;
  date: string; // ISO 8601 YYYY-MM-DD
  activity: "running" | "exercise" | "violin" | "nojunk";
  value: number; // km, hours, etc.
}
