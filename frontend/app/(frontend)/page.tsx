"use client";

import Link from "next/link";
import { useUser } from "@clerk/nextjs";
import NeonButton from "@/components/ui/NeonButton";
import GlassCard from "@/components/ui/GlassCard";

export default function LandingPage() {
  const { user, isLoaded } = useUser();

  if (!isLoaded) return null;

  return (
    <div className="min-h-screen flex flex-col items-center justify-center p-4 bg-black relative overflow-hidden">
      {/* Background Effects */}
      <div className="absolute top-0 left-1/4 w-96 h-96 bg-aurora-purple/20 rounded-full blur-[128px]" />
      <div className="absolute bottom-0 right-1/4 w-96 h-96 bg-aurora-cyan/20 rounded-full blur-[128px]" />

      <GlassCard className="max-w-4xl w-full p-12 text-center relative z-10 border-white/5">
        <h1 className="text-6xl md:text-8xl font-black mb-6 tracking-tight">
          <span className="text-transparent bg-clip-text bg-gradient-to-r from-white to-gray-500">
            TRACK
          </span>
          <br />
          <span className="text-transparent bg-clip-text bg-gradient-to-r from-aurora-cyan to-aurora-purple text-glow-cyan">
            EVERYTHING.
          </span>
        </h1>

        <p className="text-xl text-gray-400 mb-10 max-w-2xl mx-auto leading-relaxed">
          The ultimate productivity system for the high-performance individual.
          Monitor habits, visualize consistency, and master your time.
        </p>

        <div className="flex flex-col sm:flex-row gap-4 justify-center items-center">
          {user ? (
            <Link href="/dashboard">
              <NeonButton variant="cyan" className="!px-10 !py-4 text-lg">
                ENTER DASHBOARD
              </NeonButton>
            </Link>
          ) : (
            <>
              <Link href="/login">
                <NeonButton variant="cyan" className="!px-8 !py-3">
                  LOGIN
                </NeonButton>
              </Link>
              <Link href="/register">
                <NeonButton variant="ghost" className="!px-8 !py-3">
                  INITIALIZE IDENTITY
                </NeonButton>
              </Link>
            </>
          )}
        </div>
      </GlassCard>

      <div className="mt-12 text-xs text-gray-600 tracking-widest uppercase">
        System Version 2.0 // AURA Interface
      </div>
    </div>
  );
}
