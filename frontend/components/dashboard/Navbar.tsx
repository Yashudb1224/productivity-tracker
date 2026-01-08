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
            <GlassCard className="!rounded-full px-6 py-3 flex items-center justify-between shadow-2xl shadow-aurora-purple/20 border-white/10 backdrop-blur-2xl bg-black/40">
                <Link href="/dashboard" className="font-bold text-transparent bg-clip-text bg-gradient-to-r from-aurora-cyan to-aurora-purple tracking-widest mr-4">
                    AURA
                </Link>

                <nav className="flex items-center gap-1">
                    {links.map((link) => (
                        <Link
                            key={link.href}
                            href={link.href}
                            className={`px-4 py-2 rounded-full text-sm font-medium transition-all duration-300 ${pathname === link.href
                                ? "bg-white/10 text-white shadow-lg shadow-white/5"
                                : "text-gray-400 hover:text-white hover:bg-white/5"
                                }`}
                        >
                            {link.name}
                        </Link>
                    ))}
                </nav>

                {user && (
                    <div className="w-8 h-8 rounded-full bg-gradient-to-br from-aurora-purple to-aurora-pink ml-4 hidden sm:block opacity-80" />
                )}
            </GlassCard>
        </div>
    );
}
