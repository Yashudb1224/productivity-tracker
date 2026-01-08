import DashboardShell from "@/components/dashboard/DashboardShell";
import DailyEntryForm from "@/components/daily/DailyEntryForm";

export default function DailyPage() {
  return (
    <DashboardShell>
      <h1 className="text-2xl font-semibold mb-6">Daily Entry</h1>
      <DailyEntryForm />
    </DashboardShell>
  );
}
