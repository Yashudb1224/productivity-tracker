"use client";

import { useState, useEffect } from "react";
import { useAppStore } from "@/store/useAppStore";
import { useRouter } from "next/navigation";
import { User } from "@/types/user";
import GlassCard from "../ui/GlassCard";
import Input from "../ui/Input";
import NeonButton from "../ui/NeonButton";
import Link from "next/link";
import { api } from "@/lib/api";

export default function Login() {
    const [name, setName] = useState("");
    const [password, setPassword] = useState("");
    const [existingUsers, setExistingUsers] = useState<User[]>([]);

    const login = useAppStore((s) => s.login);
    const router = useRouter();

    useEffect(() => {
        api.getUsers().then(setExistingUsers);
    }, []);

    const handleLogin = async (e: React.FormEvent) => {
        e.preventDefault();
        if (!name.trim() || !password.trim()) return;

        try {
            const user = await api.login(name, password);
            login(user); // Updates store
            router.push("/dashboard");
        } catch (err) {
            alert("Invalid identifier or password.");
        }
    };

    const handleUserSelect = (user: User) => {
        // For quick login, we might still want password prompt if "remember me" isn't implemented fully
        // But the user just wants password auth.
        // Let's autofill name and focus password
        setName(user.name);
        setPassword("");
        // Or if we want strict security, we don't allow "click to login" without password.
        // I'll make it autofill.
    };

    return (
        <div className="min-h-screen flex items-center justify-center p-4 bg-black">
            <GlassCard className="w-full max-w-md p-8">
                <h1 className="text-3xl font-bold text-center mb-8 text-transparent bg-clip-text bg-gradient-to-r from-neon-cyan to-neon-purple text-glow-cyan">
                    WELCOME BACK
                </h1>

                {existingUsers.length > 0 && (
                    <div className="mb-8 space-y-3">
                        <p className="text-gray-400 text-sm uppercase tracking-wider mb-4 font-semibold text-center">
                            Select User
                        </p>
                        <div className="flex flex-col gap-2 max-h-40 overflow-y-auto pr-2 custom-scrollbar">
                            {existingUsers.map((u) => (
                                <button
                                    key={u.id}
                                    onClick={() => handleUserSelect(u)}
                                    className="w-full text-left px-4 py-3 rounded-xl bg-white/5 hover:bg-neon-cyan/10 hover:text-neon-cyan transition-all border border-transparent hover:border-neon-cyan/30 flex justify-between items-center group"
                                >
                                    <span className="font-medium">{u.name}</span>
                                    <span className="opacity-0 group-hover:opacity-100 transition-opacity text-xs">select &rarr;</span>
                                </button>
                            ))}
                        </div>
                        <div className="relative my-6 opacity-30">
                            <div className="absolute inset-0 flex items-center">
                                <div className="w-full border-t border-white"></div>
                            </div>
                        </div>
                    </div>
                )}

                <form onSubmit={handleLogin} className="space-y-6">
                    <Input
                        label="USERNAME"
                        placeholder="Enter your codename..."
                        value={name}
                        onChange={(e) => setName(e.target.value)}
                    />
                    <Input
                        label="PASSWORD"
                        type="password"
                        placeholder="Secret key..."
                        value={password}
                        onChange={(e) => setPassword(e.target.value)}
                    />

                    <NeonButton fullWidth variant="cyan" type="submit">
                        ACCESS DASHBOARD
                    </NeonButton>
                </form>

                <div className="mt-6 text-center">
                    <span className="text-gray-500 text-sm">New here? </span>
                    <Link href="/register" className="text-neon-purple hover:text-white text-sm font-bold transition-colors">
                        Create Identity
                    </Link>
                </div>
            </GlassCard>
        </div>
    );
}
