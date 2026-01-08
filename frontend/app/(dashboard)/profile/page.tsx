"use client";

import DashboardShell from "@/components/dashboard/DashboardShell";
import { useAppStore } from "@/store/useAppStore";

export default function ProfilePage() {
  const user = useAppStore((s) => s.user);
  const logout = useAppStore((s) => s.logout);

  return (
    <DashboardShell>
      <div className="max-w-xl space-y-6">
        <h1 className="text-2xl font-semibold">Profile</h1>

        <div className="card p-6">
          <p className="text-neutral-400 text-sm">Name</p>
          <p className="text-xl font-medium mt-1">
            {user?.name}
          </p>

          <div className="flex gap-4 mt-6">
            <button
              onClick={logout}
              className="bg-neutral-800 hover:bg-neutral-700 px-4 py-2 rounded text-white transition-colors"
            >
              Logout
            </button>

            <button
              onClick={() => {
                if (confirm("Are you sure? This will delete all your logs.")) {
                  useAppStore.getState().clearData();
                  alert("Data cleared.");
                }
              }}
              className="bg-neutral-800 hover:bg-neutral-700 hover:text-red-400 text-neutral-400 px-4 py-2 rounded transition-colors"
            >
              Clear Logs
            </button>

            <button
              onClick={() => {
                const confirmName = prompt("This will permanently delete your account and all data. Type your name to confirm:");
                if (confirmName === user?.name) {
                  useAppStore.getState().deleteAccount();
                  alert("Account deleted.");
                }
              }}
              className="bg-red-500/10 hover:bg-red-500/20 text-red-500 border border-red-500/20 px-4 py-2 rounded transition-colors font-bold"
            >
              DELETE ACCOUNT
            </button>
          </div>
        </div>
      </div>
    </DashboardShell>
  );
}
