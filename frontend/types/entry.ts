import { Activity } from "./habit";

export interface DailyEntry {
  id: string;
  userId: string;
  date: string; // ISO 8601 YYYY-MM-DD
  activity: Activity;
  value: number; // km, hours, etc.
}
