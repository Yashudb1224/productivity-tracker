import { User } from "@/types/user";
import { DailyEntry } from "@/types/entry";

const API_URL = "http://localhost:3001/api";

export const api = {
    getUsers: async (): Promise<User[]> => {
        try {
            const res = await fetch(`${API_URL}/users`);
            return res.ok ? res.json() : [];
        } catch (e) {
            console.error("API Error", e);
            return [];
        }
    },

    register: async (name: string, id: string, password: string, recoveryKey?: string): Promise<User> => {
        const res = await fetch(`${API_URL}/register`, {
            method: "POST",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify({ name, id, password, recoveryKey }),
        });
        if (!res.ok) throw new Error("Registration failed");
        return res.json();
    },

    login: async (name: string, password: string): Promise<User> => {
        const res = await fetch(`${API_URL}/login`, {
            method: "POST",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify({ name, password }),
        });
        if (!res.ok) throw new Error("Login failed");
        return res.json();
    },

    getEntries: async (userId: string): Promise<DailyEntry[]> => {
        try {
            const res = await fetch(`${API_URL}/entries?userId=${userId}`);
            return res.ok ? res.json() : [];
        } catch (e) {
            return [];
        }
    },

    addEntry: async (entry: DailyEntry) => {
        await fetch(`${API_URL}/entries`, {
            method: "POST",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify(entry),
        });
    },

    clearData: async (userId: string) => {
        await fetch(`${API_URL}/clear`, {
            method: "POST",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify({ userId })
        });
    },

    deleteAccount: async (userId: string) => {
        await fetch(`${API_URL}/account`, {
            method: "DELETE",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify({ userId })
        });
    },

    addHabit: async (userId: string, habit: any) => {
        const res = await fetch(`${API_URL}/habits`, {
            method: "POST",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify({ userId, habit })
        });
        if (!res.ok) throw new Error("Failed to add habit");
        return res.json();
    },

    updateHabit: async (userId: string, habit: any) => {
        const res = await fetch(`${API_URL}/habits`, {
            method: "PUT",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify({ userId, habit })
        });
        if (!res.ok) throw new Error("Failed to update habit");
        return res.json();
    },

    removeHabit: async (userId: string, habitId: string) => {
        await fetch(`${API_URL}/habits`, {
            method: "DELETE",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify({ userId, habitId })
        });
    },

    recover: async (name: string, recoveryKey: string, newPassword: string): Promise<{ message: string }> => {
        const res = await fetch(`${API_URL}/recover`, {
            method: "POST",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify({ name, recoveryKey, newPassword })
        });
        if (!res.ok) {
            const err = await res.json();
            throw new Error(err.error || "Recovery failed");
        }
        return res.json();
    }
};
