import { User } from "next-auth";
import DashboardCard from "./DashboardCard";
import Widgets from "./Widgets";
import characters from "@/public/images/icons/delapouite/character.svg";
import campaigns from "@/public/images/icons/lorc/treasure-map.svg";
import compendium from "@/public/images/icons/lorc/book-cover.svg";
import homebrew from "@/public/images/icons/lorc/gear-hammer.svg";

interface Props {
  user: User & { role?: string };
}

export default function DashboardBody({ user }: Props) {
  return (
    <div className="max-w-7xl mx-auto px-6 py-10">
      {/* Welcome message */}
      <div className="mb-8">
        <p className="text-xl text-base-content/70 font-light">
          Welcome back,{" "}
          <span className="font-semibold text-primary">
            {user.name || "Adventurer"}
          </span>
        </p>
      </div>

      {/* Main Options Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-16">
        <DashboardCard
          title="Characters"
          description="Manage your Savage Worlds heroes"
          icon={characters}
          href="/characters"
          color="primary"
        />
        <DashboardCard
          title="Campaigns"
          description="Your active games & GM tools"
          icon={campaigns}
          href="/campaigns"
          color="secondary"
        />
        <DashboardCard
          title="Compendium"
          description="Core rules & unlocked content"
          icon={compendium}
          href="/compendium"
          color="accent"
        />
        <DashboardCard
          title="Homebrew"
          description="Create & share your own content"
          icon={homebrew}
          href="/homebrew"
          color="neutral"
        />
      </div>

      {/* Wildcard Widgets Section */}
      <Widgets />
    </div>
  );
}
