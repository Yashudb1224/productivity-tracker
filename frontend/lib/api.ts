import { User } from "@/types/user";
import { DailyEntry } from "@/types/entry";

const API_URL = process.env.NEXT_PUBLIC_API_URL || "/api";

export const api = {
    getUsers: async (): Promise<User[]> => {
        return []; // Deprecated
    },

    register: async (name: string, id: string, password: string, recoveryKey?: string): Promise<User> => {
        const res = await fetch(`${API_URL}/auth/register`, {
            method: "POST",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify({ name, password, recoveryKey }),
        });
        if (!res.ok) {
            const err = await res.json();
            throw new Error(err.error || "Registration failed");
        }
        return res.json();
    },

    login: async (name: string, password: string): Promise<User> => {
        const res = await fetch(`${API_URL}/auth/login`, {
            method: "POST",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify({ name, password }),
        });
        if (!res.ok) {
            const err = await res.json();
            throw new Error(err.error || "Login failed");
        }
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
        await fetch(`${API_URL}/entries?userId=${userId}`, {
            method: "DELETE",
        });
    },

    deleteAccount: async (userId: string) => {
        await fetch(`${API_URL}/user/delete?userId=${userId}`, {
            method: "DELETE",
        });
    },

    getMe: async (userId: string): Promise<User> => {
        const res = await fetch(`${API_URL}/user/me?userId=${userId}`);
        if (!res.ok) throw new Error("Failed to fetch user");
        return res.json();
    },

    clerkSync: async (clerkId: string, name: string, email?: string): Promise<User> => {
        const res = await fetch(`${API_URL}/auth/clerk-sync`, {
            method: "POST",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify({ clerkId, name, email }),
        });
        if (!res.ok) throw new Error("Failed to sync Clerk user");
        return res.json();
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
        await fetch(`${API_URL}/habits?userId=${userId}&habitId=${habitId}`, {
            method: "DELETE",
        });
    },

    recover: async (name: string, recoveryKey: string, newPassword: string): Promise<{ message: string }> => {
        const res = await fetch(`${API_URL}/auth/recover`, {
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
