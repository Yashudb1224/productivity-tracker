export default function ActivityCard({
  name,
  stat,
  sub,
}: {
  name: string;
  stat: string;
  sub: string;
}) {
  return (
    <div className="rounded-xl bg-neutral-900 border border-neutral-800 p-5">
      <p className="text-neutral-400 text-sm">{name}</p>
      <p className="text-2xl font-semibold mt-1">{stat}</p>
      <p className="text-xs text-neutral-500 mt-1">{sub}</p>
    </div>
  );
}
