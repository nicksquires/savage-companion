import { User } from "next-auth";
import DashboardCard from "./DashboardCard";
import Widgets from "./Widgets";
import characters from "@/public/images/icons/delapouite/meeple-group.svg";
import campaigns from "@/public/images/icons/lorc/treasure-map.svg";
import compendium from "@/public/images/icons/lorc/book-cover.svg";
import homebrew from "@/public/images/icons/lorc/gear-hammer.svg";

interface Props {
  user: User & { role?: string };
}

export default function DashboardBody({ user }: Props) {
  return (
    <>
      <div className="relative w-full mask-y-from-95% bg-base-100 flex justify-center">
        <div className="absolute inset-0 bg-[url('/images/textures/darkpaper.png')] mix-blend-normal bg-cover opacity-20 pointer-events-none z-0" />

        <div className="relative z-1 w-4/5 pt-20 pb-15 text-center">
          <p
            className="text-3xl md:text-4xl lg:text-5xl uppercase tracking-widest text-base-content/80 
          font-header font-medium border-b-2 border-b-base-content pb-2 px-6 lg:px-2.5 text-center md:text-left"
          >
            Dashboard
          </p>
          {/* Welcome message */}
          <div className="my-12 md:my-20 mx-2 text-2xl sm:text-3xl opacity-95">
            Welcome back,{" "}
            <span className="font-semibold text-primary drop-shadow-xs drop-shadow-primary">
              {user.name || "Adventurer"}
            </span>
          </div>

          {/* Main Options Grid */}
          <div
            className="min-w-80 grid grid-cols-2 sm:grid-cols-4 gap-y-10 gap-x-0 gap-2 sm:gap-12 lg:gap-24 
            mb-24 items-center justify-center"
          >
            <DashboardCard
              title="Characters"
              description="Manage your heroes"
              icon={characters}
              href="/characters"
              color="primary"
            />
            <DashboardCard
              title="Campaigns"
              description="Active games and GM tools"
              icon={campaigns}
              href="/campaigns"
              color="secondary"
            />
            <DashboardCard
              title="Compendium"
              description="Browse rules and unlocked content"
              icon={compendium}
              href="/compendium"
              color="accent"
            />
            <DashboardCard
              title="Homebrew"
              description="Create and Share custom content"
              icon={homebrew}
              href="/homebrew"
              color="neutral"
            />
          </div>

          {/* Wildcard Widgets Section */}
          <Widgets />
        </div>
      </div>
    </>
  );
}
