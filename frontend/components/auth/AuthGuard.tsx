"use client";

import { useAppStore } from "@/store/useAppStore";
import { useRouter, usePathname } from "next/navigation";
import { useEffect, useState } from "react";

export default function AuthGuard({ children }: { children: React.ReactNode }) {
    const user = useAppStore((s) => s.user);
    const isLoading = useAppStore((s) => s.isLoading);
    const checkSession = useAppStore((s) => s.checkSession);
    const router = useRouter();
    const pathname = usePathname();
    const [mounted, setMounted] = useState(false);

    useEffect(() => {
        setMounted(true);
        checkSession();
    }, [checkSession]);

    useEffect(() => {
        if (!isLoading && !user) {
            router.push("/login");
        }
    }, [user, isLoading, router, pathname]);

    if (!mounted || isLoading) {
        return (
            <div className="min-h-screen flex items-center justify-center bg-[#050505]">
                <div className="animate-pulse text-neon-cyan font-bold tracking-widest text-xl text-glow-cyan">
                    LOADING...
                </div>
            </div>
        );
    }

    if (!user && pathname !== "/login") {
        return null; // Will redirect
    }

    return <>{children}</>;
}
