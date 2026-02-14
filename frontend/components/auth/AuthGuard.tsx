"use client";

import { useAppStore } from "@/store/useAppStore";
import { useEffect, useState } from "react";
import { useAuth, useUser, RedirectToSignIn, SignedIn, SignedOut } from "@clerk/nextjs";
import { api } from "@/lib/api";

export default function AuthGuard({ children }: { children: React.ReactNode }) {
    const { user: storeUser, login, checkSession, isLoading } = useAppStore();
    const { isLoaded: isAuthLoaded, userId } = useAuth();
    const { user: clerkUser, isLoaded: isUserLoaded } = useUser();
    const [isInternalLoading, setIsInternalLoading] = useState(true);

    useEffect(() => {
        checkSession();
    }, [checkSession]);

    useEffect(() => {
        const syncUser = async () => {
            if (isAuthLoaded && isUserLoaded && userId && clerkUser) {
                // DETECT ACCOUNT MISMATCH: 
                // If Clerk thinks we are User A, but the Store thinks we are User B
                // We MUST clear the store and re-sync.
                const isMismatch = storeUser && storeUser.clerkId !== userId;

                if (!storeUser || isMismatch) {
                    if (isMismatch) {
                        console.log("Account mismatch detected. Clearing store...");
                        // We could use logout() but it might redirect incorrectly
                        // Just clearing the user will trigger the sync logic below
                        useAppStore.setState({ user: null, entries: [], goals: [] });
                    }

                    try {
                        const fullName = clerkUser.fullName || clerkUser.username || "Agent";
                        const email = clerkUser.primaryEmailAddress?.emailAddress;

                        const syncedUser = await api.clerkSync(userId, fullName, email);
                        login(syncedUser);
                    } catch (e) {
                        console.error("User sync failed", e);
                    }
                }
            }
            if (isAuthLoaded && isUserLoaded) {
                setIsInternalLoading(false);
            }
        };
        syncUser();
    }, [isAuthLoaded, isUserLoaded, userId, clerkUser, storeUser, login]);

    if (!isAuthLoaded || !isUserLoaded || isInternalLoading || isLoading) {
        return (
            <div className="min-h-screen flex items-center justify-center bg-[#050505]">
                <div className="animate-pulse text-neon-cyan font-bold tracking-widest text-xl text-glow-cyan">
                    LOADING...
                </div>
            </div>
        );
    }

    return (
        <>
            <SignedIn>{children}</SignedIn>
            <SignedOut>
                <RedirectToSignIn />
            </SignedOut>
        </>
    );
}
