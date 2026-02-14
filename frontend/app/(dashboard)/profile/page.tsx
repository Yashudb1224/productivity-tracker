"use client";

import { UserProfile } from "@clerk/nextjs";
import DashboardShell from "@/components/dashboard/DashboardShell";
import { useAppStore } from "@/store/useAppStore";

export default function ProfilePage() {
  const user = useAppStore((s) => s.user);

  return (
    <DashboardShell>
      <div className="max-w-4xl mx-auto space-y-12 pb-12">
        <div>
          <h1 className="text-4xl font-bold text-white mb-2">Profile Configuration</h1>
          <p className="text-gray-400">Manage your identity and data protocols.</p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
          {/* Clerk Profile */}
          <div className="order-2 lg:order-1">
            <UserProfile routing="hash" />
          </div>

          {/* Data Management */}
          <div className="order-1 lg:order-2 space-y-6">
            <div className="bg-white/5 border border-white/10 rounded-2xl p-6 backdrop-blur-xl">
              <h2 className="text-xl font-bold text-white mb-4">Data Management</h2>
              <p className="text-sm text-gray-400 mb-6">
                Exercise caution. These actions are irreversible and affect your mission history.
              </p>

              <div className="flex flex-col gap-4">
                <button
                  onClick={() => {
                    if (confirm("Are you sure? This will delete all your logs.")) {
                      useAppStore.getState().clearData();
                      alert("Data cleared.");
                    }
                  }}
                  className="w-full text-left px-4 py-3 rounded-xl bg-white/5 hover:bg-white/10 border border-white/5 transition-all text-sm font-medium text-gray-300"
                >
                  Clear Mission Logs
                </button>

                <button
                  onClick={() => {
                    const confirmName = prompt("This will permanently delete your account and all data. Type your name to confirm:");
                    if (confirmName === user?.name) {
                      useAppStore.getState().deleteAccount();
                      alert("Account deleted.");
                    }
                  }}
                  className="w-full text-left px-4 py-3 rounded-xl bg-red-500/10 hover:bg-red-500/20 border border-red-500/20 transition-all text-sm font-bold text-red-500"
                >
                  TERMINATE ACCOUNT
                </button>
              </div>
            </div>

            <div className="bg-aurora-purple/10 border border-aurora-purple/20 rounded-2xl p-6">
              <h3 className="text-aurora-purple font-bold text-sm uppercase tracking-widest mb-2">Status</h3>
              <p className="text-white font-medium">Linked to MongoDB Instance</p>
              <p className="text-xs text-gray-500 mt-1">Authenticated via Clerk Security Layer</p>
            </div>
          </div>
        </div>
      </div>
    </DashboardShell>
  );
}
