"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { useAppStore } from "@/store/useAppStore";
import GlassCard from "../ui/GlassCard";

const links = [
    { name: "Home", href: "/dashboard" },
    { name: "Analytics", href: "/analytics" },
    { name: "Profile", href: "/profile" },
];

export default function Navbar() {
    const pathname = usePathname();
    const user = useAppStore((s) => s.user);

    return (
        <div className="fixed bottom-6 left-1/2 -translate-x-1/2 z-50 w-full max-w-lg px-4">
            <GlassCard className="!rounded-full px-6 py-3 flex items-center justify-center shadow-2xl shadow-aurora-purple/20 border-white/10 backdrop-blur-2xl bg-black/40">
                <nav className="flex items-center gap-6">
                    <Link href="/dashboard" className="text-gray-400 hover:text-white transition-colors text-sm font-medium">Home</Link>
                    <Link href="/habits" className="text-gray-400 hover:text-white transition-colors text-sm font-medium">Habits</Link>
                    <Link href="/analytics" className="text-gray-400 hover:text-white transition-colors text-sm font-medium">Analysis</Link>
                    <Link href="/profile" className="text-gray-400 hover:text-white transition-colors text-sm font-medium">Profile</Link>
                </nav>
            </GlassCard>
        </div>
    );
}
