"use client";

import { useState, useEffect } from "react";
import { useAppStore } from "@/store/useAppStore";
import { createUser, getUsers } from "@/lib/storage";
import { useRouter } from "next/navigation";
import { User } from "@/types/user";
import GlassCard from "../ui/GlassCard";
import Input from "../ui/Input";
import NeonButton from "../ui/NeonButton";

export default function LoginForm() {
    const [isRegister, setIsRegister] = useState(false);
    const [name, setName] = useState("");
    const [existingUsers, setExistingUsers] = useState<User[]>([]);

    const login = useAppStore((s) => s.login);
    const router = useRouter();

    useEffect(() => {
        setExistingUsers(getUsers());
    }, []);

    const handleSubmit = (e: React.FormEvent) => {
        e.preventDefault();
        if (!name.trim()) return;

        if (isRegister) {
            const newUser = createUser(name);
            login(newUser);
            router.push("/");
        } else {
            // Simple name matching for "login" demo, or just create new if not found?
            // For a proper flow, let's just create new if registering.
            // If logging in, user usually picks from a list or enters exact name.
            // Let's assume for this "futuristic" demo, we just create a session.
        }
    };

    const handleUserSelect = (user: User) => {
        login(user); // Persistence is handled in store
        router.push("/");
    };

    return (
        <div className="min-h-screen flex items-center justify-center p-4">
            <GlassCard className="w-full max-w-md p-8">
                <h1 className="text-3xl font-bold text-center mb-8 text-transparent bg-clip-text bg-gradient-to-r from-neon-cyan to-neon-purple text-glow-cyan">
                    {isRegister ? "JOIN THE FUTURE" : "WELCOME BACK"}
                </h1>

                {!isRegister && existingUsers.length > 0 && (
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
                                    <span className="opacity-0 group-hover:opacity-100 transition-opacity text-xs">Login &rarr;</span>
                                </button>
                            ))}
                        </div>

                        <div className="relative my-6 opacity-30">
                            <div className="absolute inset-0 flex items-center">
                                <div className="w-full border-t border-white"></div>
                            </div>
                            <div className="relative flex justify-center text-xs uppercase">
                                <span className="bg-[#050505] px-2 text-white">Or create new</span>
                            </div>
                        </div>
                    </div>
                )}

                <form onSubmit={handleSubmit} className="space-y-6">
                    <Input
                        label="USERNAME"
                        placeholder="Enter your codename..."
                        value={name}
                        onChange={(e) => setName(e.target.value)}
                        onFocus={() => setIsRegister(true)}
                    />

                    <NeonButton fullWidth variant="cyan" type="submit">
                        {isRegister ? "INITIALIZE SYSTEM" : "ACCESS DASHBOARD"}
                    </NeonButton>
                </form>

                <div className="mt-6 text-center">
                    <button
                        onClick={() => setIsRegister(!isRegister)}
                        className="text-gray-500 hover:text-neon-purple text-sm transition-colors"
                    >
                        {isRegister ? "Already have an account?" : "Create a new identity"}
                    </button>
                </div>
            </GlassCard>
        </div>
    );
}
