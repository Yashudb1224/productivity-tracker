import { User } from "@/types/user";
import { DailyEntry } from "@/types/entry";
import { nanoid } from "nanoid";

const USERS_KEY = "pd_users";
const CURRENT_USER_KEY = "pd_current_user";
const ENTRIES_KEY = "pd_entries";

/* -------------------- USERS -------------------- */

export const getUsers = (): User[] => {
  if (typeof window === "undefined") return [];
  const raw = localStorage.getItem(USERS_KEY);
  return raw ? JSON.parse(raw) : [];
};

export const saveUsers = (users: User[]) => {
  localStorage.setItem(USERS_KEY, JSON.stringify(users));
};

export const createUser = (name: string): User => {
  const newUser: User = {
    id: nanoid(),
    name,
    habits: [],
    createdAt: new Date().toISOString(),
  };

  const users = getUsers();
  saveUsers([...users, newUser]);
  setCurrentUser(newUser.id);

  return newUser;
};

export const setCurrentUser = (userId: string) => {
  localStorage.setItem(CURRENT_USER_KEY, userId);
};

export const getCurrentUser = (): User | null => {
  const userId = localStorage.getItem(CURRENT_USER_KEY);
  if (!userId) return null;

  return getUsers().find(u => u.id === userId) || null;
};

/* -------------------- ENTRIES -------------------- */

export const getEntries = (): DailyEntry[] => {
  if (typeof window === "undefined") return [];
  const raw = localStorage.getItem(ENTRIES_KEY);
  return raw ? JSON.parse(raw) : [];
};

export const saveEntries = (entries: DailyEntry[]) => {
  localStorage.setItem(ENTRIES_KEY, JSON.stringify(entries));
};

export const upsertEntry = (entry: DailyEntry) => {
  const entries = getEntries();

  const index = entries.findIndex(
    e =>
      e.userId === entry.userId &&
      e.date === entry.date &&
      e.activity === entry.activity
  );

  if (index >= 0) {
    entries[index] = entry;
  } else {
    entries.push(entry);
  }

  saveEntries(entries);
};

export const getEntriesForUser = (userId: string) =>
  getEntries().filter(e => e.userId === userId);
