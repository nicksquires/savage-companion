import Image from "next/image";
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
    <Link
      href={href}
      className="group block rounded-4xl hover:scale-105 brightness-80 hover:brightness-90"
    >
      <div
        className={`card shadow-xl hover:shadow-2xl transition-all duration-150 rounded-4xl
          border border-transparent hover:border-${color}/30 h-full`}
      >
        <div className="w-full h-full inset-0 absolute bg-[url('/images/textures/glass.png')] bg-cover mix-blend-soft-light rounded-4xl" />
        <div className="card-body rounded-4xl backdrop-blur-[0.03em]">
          <div
            className={`w-full sm:w-20 rounded-2xl flex items-center justify-center text-3xl mb-2 transition-transform`}
          >
            <Image
              src={icon}
              alt={`${title} + icon.`}
              className="opacity-90 sm:w-full sm:h-full w-20 h-20"
            />
          </div>
          <h3 className="card-title text-sm sm:text-2xl font-header">
            {title}
          </h3>
          <p className="text-base-content/90 text-xs md:text-md">
            {description}
          </p>
        </div>
      </div>
    </Link>
  );
}
