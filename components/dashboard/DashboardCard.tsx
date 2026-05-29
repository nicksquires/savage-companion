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
      className="group block rounded-4xl hover:scale-102 hover:brightness-105 mx-auto drop-shadow-2xl"
    >
      <div
        className={`card shadow-xl hover:shadow-2xl transition-all duration-150 rounded-4xl opacity-90
           border-2 border-base-300/80 hover:brightness-110 hover:border-${color}/30 w-42 h-64 sm:w-36 sm:h-46 md:w-42 md:h-54 lg:w-58 lg:h-70
           mask-y-from-98% mask-x-from-98%`}
      >
        <div className="w-full h-full inset-0 absolute bg-[url('/images/textures/darkparchment.png')] brightness-80 bg-cover rounded-4xl z-0 backdrop-blur-[1px]" />
        <div className="w-full h-full inset-0 absolute bg-primary/20 bg-cover rounded-4xl z-0 backdrop-blur-[1px]" />

        <div className="lg:pb-6 lg:pt-4 lg:px-8 sm:pt-4 sm:pb-6 sm:px-1 pt-7 px-1 rounded-4xl z-1">
          <div
            className={`rounded-2xl flex text-3xl mb-2 transition-transform`}
          >
            <Image
              src={icon}
              alt={`${title} + icon.`}
              className="h-32 sm:h-22 md:h-28 lg:h-auto opacity-85 drop-shadow-lg drop-shadow-base-100/90"
            />
          </div>
          <h3
            className="text-2xl sm:text-lg md:text-2xl lg:text-3xl font-builder-body 
          text-base-content/95 drop-shadow-base-100/70 drop-shadow-xs"
          >
            {title}
          </h3>
          <div className="text-base-content/75 text-xs lg:text-sm px-4">
            {description}
          </div>
        </div>
      </div>
    </Link>
  );
}
