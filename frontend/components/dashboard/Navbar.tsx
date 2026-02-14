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

import { UserButton } from "@clerk/nextjs";

export default function Navbar() {
    const pathname = usePathname();

    const navLinks = [
        {
            name: "Home",
            href: "/dashboard",
            icon: (
                <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 12l2-2m0 0l7-7 7 7M5 10v10a1 1 0 001 1h3m10-11l2 2m-2-2v10a1 1 0 01-1 1h-3m-6 0a1 1 0 001-1v-4a1 1 0 011-1h2a1 1 0 011 1v4a1 1 0 001 1m-6 0h6" />
                </svg>
            )
        },
        {
            name: "Habits",
            href: "/habits",
            icon: (
                <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5H7a2 2 0 00-2 2v12a2 2 0 002 2h10a2 2 0 002-2V7a2 2 0 00-2-2h-2M9 5a2 2 0 002 2h2a2 2 0 002-2M9 5a2 2 0 012-2h2a2 2 0 012 2m-3 7h3m-3 4h3m-6-4h.01M9 16h.01" />
                </svg>
            )
        },
        {
            name: "Analysis",
            href: "/analytics",
            icon: (
                <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 19v-6a2 2 0 00-2-2H5a2 2 0 00-2 2v6a2 2 0 01-2 2h22a2 2 0 01-2-2v-6a2 2 0 00-2-2h-2a2 2 0 00-2 2v6" />
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 19V5a2 2 0 012-2h2a2 2 0 012 2v14" />
                </svg>
            )
        },
    ];

    return (
        <header className="fixed top-0 left-0 w-full z-50 border-b border-white/5 bg-black/40 backdrop-blur-xl">
            <div className="max-w-[1600px] mx-auto px-6 md:px-12 h-16 flex items-center justify-between">
                <div className="flex items-center gap-10">
                    <nav className="flex items-center gap-8">
                        {navLinks.map((link) => {
                            const isActive = pathname === link.href;
                            return (
                                <Link
                                    key={link.href}
                                    href={link.href}
                                    className={`flex items-center gap-2 text-sm font-medium transition-all duration-300 ${isActive ? 'text-white' : 'text-gray-400 hover:text-white'}`}
                                >
                                    <span className={`${isActive ? 'text-aurora-cyan' : 'text-gray-500'}`}>{link.icon}</span>
                                    {link.name}
                                </Link>
                            );
                        })}
                    </nav>
                </div>
                <div className="flex items-center gap-6">
                    <div className="h-6 w-px bg-white/10 mx-2" />
                    <UserButton
                        appearance={{
                            elements: {
                                avatarBox: "w-9 h-9 border-2 border-aurora-cyan/20 hover:border-aurora-cyan transition-all"
                            }
                        }}
                        afterSignOutUrl="/login"
                    />
                </div>
            </div>
        </header>
    );
}
