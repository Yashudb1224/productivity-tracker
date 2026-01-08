"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { useAppStore } from "@/store/useAppStore";
import { api } from "@/lib/api";
import { nanoid } from "nanoid";
import GlassCard from "../ui/GlassCard";
import Input from "../ui/Input";
import NeonButton from "../ui/NeonButton";
import Link from "next/link";
import { customAlphabet } from "nanoid";

export default function Register() {
    const [name, setName] = useState("");
    const [password, setPassword] = useState("");
    const [error, setError] = useState("");
    const [recoveryKey, setRecoveryKey] = useState("");
    const [step, setStep] = useState<"form" | "success">("form");

    const router = useRouter();
    const login = useAppStore((state) => state.login);

    const handleRegister = async (e: React.FormEvent) => {
        e.preventDefault();
        setError("");

        if (!name.trim() || !password.trim()) {
            setError("Please fill in all fields");
            return;
        }

        try {
            const id = nanoid();
            // Generate readable recovery key: 3 blocks of 4 chars
            const alphabet = '23456789ABCDEFGHJKLMNPQRSTUVWXYZ';
            const nanoidReadable = customAlphabet(alphabet, 12);
            const rawKey = nanoidReadable();
            const formattedKey = `${rawKey.slice(0, 4)}-${rawKey.slice(4, 8)}-${rawKey.slice(8, 12)}`;

            setRecoveryKey(formattedKey);

            const user = await api.register(name, id, password, formattedKey); // Pass formattedKey to be hashed

            // Don't login yet. Show Key.
            // But we need the user object to login later?
            // Actually we can just auto-login after they click "I saved it".
            // Let's store user temporarily or just re-fetch?
            // api.register returns the user object (without password).

            // Store user in a temp variable or state?
            // Better: Just login immediately in background to update store, but BLOCK navigation.
            login(user);
            setStep("success");

        } catch (err: any) {
            setError(err.message || "Registration failed");
        }
    };

    const handleComplete = () => {
        router.push("/habits"); // Redirect to habits setup for new users!
    };

    if (step === "success") {
        return (
            <div className="min-h-screen flex items-center justify-center p-4 bg-black">
                <GlassCard className="p-8 max-w-md w-full border-neon-green/50 shadow-[0_0_30px_rgba(34,197,94,0.2)]">
                    <div className="text-center space-y-6">
                        <div className="text-4xl">🔐</div>
                        <h2 className="text-2xl font-bold text-white">Account Created!</h2>

                        <div className="bg-red-500/10 border border-red-500/30 p-4 rounded-xl text-left">
                            <p className="text-red-400 text-xs font-bold uppercase tracking-wider mb-2">
                                Emergency Recovery Key
                            </p>
                            <p className="text-white font-mono text-xl tracking-widest text-center select-all cursor-text bg-black/30 p-2 rounded">
                                {recoveryKey}
                            </p>
                            <p className="text-gray-400 text-xs mt-2">
                                Save this key safely. It is the <strong>ONLY</strong> way to recover your account if you forget your password.
                            </p>
                        </div>

                        <NeonButton variant="green" onClick={handleComplete} fullWidth>
                            I Have Saved My Key
                        </NeonButton>
                    </div>
                </GlassCard>
            </div>
        );
    }

    return (
        <div className="min-h-screen flex items-center justify-center p-4 bg-black">
            <GlassCard className="p-8 max-w-md w-full">
                <h2 className="text-2xl font-bold text-center mb-6 text-transparent bg-clip-text bg-gradient-to-r from-neon-cyan to-neon-purple">
                    JOIN THE MISSION
                </h2>

                {error && (
                    <div className="mb-4 p-3 bg-red-500/20 border border-red-500/50 rounded-lg text-red-200 text-sm text-center">
                        {error}
                    </div>
                )}

                <form onSubmit={handleRegister} className="space-y-6">
                    <Input
                        label="Codename"
                        placeholder="Enter alias..."
                        value={name}
                        onChange={(e) => setName(e.target.value)}
                    />
                    <Input
                        label="Password"
                        placeholder="Create password..."
                        type="password"
                        value={password}
                        onChange={(e) => setPassword(e.target.value)}
                    />

                    <NeonButton fullWidth variant="cyan">
                        INITIALIZE
                    </NeonButton>
                </form>

                <div className="mt-6 text-center text-sm text-gray-400">
                    Already an agent?{" "}
                    <Link href="/login" className="text-neon-cyan hover:text-white transition-colors">
                        Login here
                    </Link>
                </div>
            </GlassCard>
        </div>
    );
}
