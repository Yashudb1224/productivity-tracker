"use client";

import { useState } from "react";
import { useAppStore } from "@/store/useAppStore";
import { useRouter } from "next/navigation";
import GlassCard from "../ui/GlassCard";
import Input from "../ui/Input";
import NeonButton from "../ui/NeonButton";
import Link from "next/link";
import { nanoid } from "nanoid";
import { api } from "@/lib/api";

export default function Register() {
    const [name, setName] = useState("");
    const [password, setPassword] = useState("");
    const login = useAppStore((s) => s.login);
    const router = useRouter();

    const handleRegister = async (e: React.FormEvent) => {
        e.preventDefault();
        if (!name.trim() || !password.trim()) return;

        try {
            const newUser = await api.register(name, nanoid(), password);
            login(newUser);
            router.push("/dashboard");
        } catch (e) {
            alert("Registration failed. Try a different name.");
        }
    };

    return (
        <div className="min-h-screen flex items-center justify-center p-4 bg-black">
            <GlassCard className="w-full max-w-md p-8">
                <Link href="/" className="text-gray-400 hover:text-white mb-6 block text-sm">&larr; Back</Link>

                <h1 className="text-3xl font-bold text-center mb-8 text-transparent bg-clip-text bg-gradient-to-r from-neon-purple to-neon-cyan text-glow-purple">
                    NEW AGENT IDENTITY
                </h1>

                <form onSubmit={handleRegister} className="space-y-6">
                    <Input
                        label="CODENAME"
                        placeholder="Choose your identifier..."
                        value={name}
                        onChange={(e) => setName(e.target.value)}
                    />
                    <Input
                        label="SECURE KEY"
                        type="password"
                        placeholder="Create a password..."
                        value={password}
                        onChange={(e) => setPassword(e.target.value)}
                    />

                    <NeonButton fullWidth variant="purple" type="submit">
                        INITIALIZE SYSTEM
                    </NeonButton>
                </form>

                <div className="mt-6 text-center">
                    <span className="text-gray-500 text-sm">Already initialized? </span>
                    <Link href="/login" className="text-neon-cyan hover:text-white text-sm font-bold transition-colors">
                        Login
                    </Link>
                </div>
            </GlassCard>
        </div>
    );
}
