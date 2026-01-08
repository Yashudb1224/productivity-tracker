export default function KPICard({
  title,
  value,
}: {
  title: string;
  value: string;
}) {
  return (
    <div className="rounded-2xl bg-neutral-900 border border-neutral-800 p-6">
      <p className="text-sm text-neutral-400">{title}</p>
      <p className="text-3xl font-semibold mt-2">{value}</p>
    </div>
  );
}
