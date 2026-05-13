export const StatBadge = ({
  icon,
  label,
  value,
  color,
}: {
  icon?: React.ReactNode;
  label: string;
  value: string | number;
  color: string;
}) => (
  <div
    className={`flex items-center gap-1.5 bg-${color}/10 px-2 py-1 rounded border border-base-500/30`}
  >
    {icon && <span className={`text-${color} opacity-70 w-4 h-4`}>{icon}</span>}
    <span className="text-[11px] uppercase tracking-widest text-base-content/60">
      {label}
    </span>
    <span className="text-sm font-mono uppercase font-bold text-base-content">
      {value}
    </span>
  </div>
);
