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
      className="group block rounded-4xl hover:scale-105 brightness-95 hover:brightness-100 mx-auto drop-shadow-2xl"
    >
      <div
        className={`card shadow-xl hover:shadow-2xl transition-all duration-150 rounded-4xl
          border border-transparent hover:brightness-110 hover:border-${color}/30 w-42 h-64 sm:w-36 sm:h-46 md:w-42 md:h-54 lg:w-58 lg:h-70`}
      >
        <div className="w-full h-full mask-y-from-97% mask-x-from-97% inset-0 absolute bg-[url('/images/textures/glass.png')] bg-cover mix-blend-soft-light rounded-4xl" />
        <div className="lg:pb-6 lg:pt-4 lg:px-8 sm:pt-4 sm:pb-6 sm:px-1 pt-7 px-1 rounded-4xl backdrop-blur-[0.03em]">
          <div
            className={`rounded-2xl flex text-3xl mb-2 transition-transform`}
          >
            <Image
              src={icon}
              alt={`${title} + icon.`}
              className="h-32 sm:h-22 md:h-28 lg:h-auto opacity-85 drop-shadow-2xl drop-shadow-base-content mask-x-from-80% mask-y-from-80%"
            />
          </div>
          <h3
            className="text-2xl sm:text-lg md:text-2xl lg:text-3xl font-builder-body 
          text-base-content/95 drop-shadow-base-content drop-shadow-xs"
          >
            {title}
          </h3>
          <p className="text-base-content/80 text-sm sm:text-[10px] md:text-xs px-4 lg:text-md">
            {description}
          </p>
        </div>
      </div>
    </Link>
  );
}
