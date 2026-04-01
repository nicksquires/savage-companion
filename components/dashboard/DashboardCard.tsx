import Link from "next/link";

interface Props {
  title: string;
  description: string;
  icon: string;
  href: string;
  color?: string;
}

export default function DashboardCard({
  title,
  description,
  icon,
  href,
  color = "primary",
}: Props) {
  return (
    <Link href={href} className="group block">
      <div
        className={`card bg-base-300 shadow-xl hover:shadow-2xl hover:bg-base-200 transition-all duration-150 
          border border-transparent hover:border-${color}/30 h-full`}
      >
        <div className="card-body">
          <div
            className={`w-12 h-12 rounded-2xl bg-${color}/10 flex items-center justify-center text-3xl mb-4 group-hover:scale-110 transition-transform`}
          >
            {icon}
          </div>
          <h3 className="card-title text-2xl font-header">{title}</h3>
          <p className="text-base-content/70">{description}</p>
        </div>
      </div>
    </Link>
  );
}
