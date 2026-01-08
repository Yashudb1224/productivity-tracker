import { DailyEntry } from "@/types/entry";
import { Activity } from "@/types/habit";

export const dateStats = (entries: DailyEntry[], date: string) => {
  const targetEntries = entries.filter(e => e.date === date);

  return {
    completed: targetEntries.length,
    score: targetEntries.reduce((a, b) => a + b.value, 0),
  };
};

export const totalByActivity = (
  entries: DailyEntry[],
  activity: DailyEntry["activity"]
) =>
  entries
    .filter(e => e.activity === activity)
    .reduce((a, b) => a + b.value, 0);

export const noJunkDays = (entries: DailyEntry[]) =>
  new Set(
    entries.filter(e => e.activity === "nojunk").map(e => e.date)
  ).size;

export const streakForActivity = (entries: DailyEntry[], activity: Activity) => {
  const days = new Set(
    entries.filter(e => e.activity === activity).map(e => e.date)
  );

  let streak = 0;
  let d = new Date();

  while (true) {
    const key = d.toISOString().slice(0, 10);
    // If today has no entry, check yesterday (allow skip if today isn't over?)
    // Basic logic: if current day missing, check if it's "today" and skip? 
    // Simplified: Just break if missing.
    if (!days.has(key)) {
      // Allow streak to persist if today is missing but yesterday existed
      if (key === new Date().toISOString().slice(0, 10)) {
        d.setDate(d.getDate() - 1);
        continue;
      }
      break;
    }
    streak++;
    d.setDate(d.getDate() - 1);
  }
  return streak;
};

export const globalStreak = (entries: DailyEntry[]) => {
  const days = new Set(entries.map(e => e.date)); // Any entry counts

  let streak = 0;
  let d = new Date(); // Start from today

  while (true) {
    const key = d.toISOString().slice(0, 10);
    if (!days.has(key)) {
      // If today has no entry yet, don't break streak immediately, check yesterday
      if (key === new Date().toISOString().slice(0, 10)) {
        d.setDate(d.getDate() - 1);
        continue;
      }
      break;
    }
    streak++;
    d.setDate(d.getDate() - 1);
  }
  return streak;
};
