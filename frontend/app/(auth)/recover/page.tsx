"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { api } from "@/lib/api";
import GlassCard from "@/components/ui/GlassCard";
import Input from "@/components/ui/Input";
import NeonButton from "@/components/ui/NeonButton";
import Link from "next/link";

export default function Recover() {
    const [name, setName] = useState("");
    const [recoveryKey, setRecoveryKey] = useState("");
    const [newPassword, setNewPassword] = useState("");
    const [error, setError] = useState("");
    const [success, setSuccess] = useState(false);
    const router = useRouter();

    const handleRecover = async (e: React.FormEvent) => {
        e.preventDefault();
        setError("");

        if (!name.trim() || !recoveryKey.trim() || !newPassword.trim()) {
            setError("Please fill in all fields");
            return;
        }

        try {
            await api.recover(name, recoveryKey, newPassword);
            setSuccess(true);
        } catch (err: any) {
            setError(err.message || "Recovery failed. Check your key.");
        }
    };

    if (success) {
        return (
            <div className="min-h-screen flex items-center justify-center p-4 bg-black">
                <GlassCard className="p-8 max-w-md w-full border-neon-cyan/50 shadow-[0_0_30px_rgba(34,211,238,0.2)]">
                    <div className="text-center space-y-6">
                        <div className="text-4xl">✅</div>
                        <h2 className="text-2xl font-bold text-white">Access Restored</h2>
                        <p className="text-gray-400">
                            Your password has been reset. You may now login with your new credentials.
                        </p>
                        <Link href="/login" className="block">
                            <NeonButton variant="cyan" fullWidth>
                                Return to Login
                            </NeonButton>
                        </Link>
                    </div>
                </GlassCard>
            </div>
        );
    }

    return (
        <div className="min-h-screen flex items-center justify-center p-4 bg-black">
            <GlassCard className="p-8 max-w-md w-full">
                <Link href="/login" className="text-gray-500 hover:text-white mb-6 block text-sm">&larr; Back to Login</Link>

                <h2 className="text-2xl font-bold text-center mb-6 text-white tracking-widest uppercase">
                    Emergency Recovery
                </h2>

                {error && (
                    <div className="mb-4 p-3 bg-red-500/20 border border-red-500/50 rounded-lg text-red-200 text-sm text-center">
                        {error}
                    </div>
                )}

                <form onSubmit={handleRecover} className="space-y-6">
                    <Input
                        label="Codename"
                        placeholder="Enter alias..."
                        value={name}
                        onChange={(e) => setName(e.target.value)}
                    />

                    <div className="space-y-2">
                        <label className="text-xs font-bold text-red-400 uppercase tracking-wider block">Recovery Key</label>
                        <Input
                            value={recoveryKey}
                            onChange={(e) => setRecoveryKey(e.target.value)}
                            placeholder="XXXX-XXXX-XXXX"
                            className="font-mono text-center tracking-widest text-lg"
                        />
                    </div>

                    <Input
                        label="New Password"
                        placeholder="Set new password..."
                        type="password"
                        value={newPassword}
                        onChange={(e) => setNewPassword(e.target.value)}
                    />

                    <NeonButton fullWidth variant="purple">
                        OVERRIDE PROTOCOLS
                    </NeonButton>
                </form>
            </GlassCard>
        </div>
    );
}
