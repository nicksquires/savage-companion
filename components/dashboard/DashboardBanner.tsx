import Image from "next/image";
import { User } from "next-auth";
import { CircleUserRound } from "lucide-react";

interface Props {
  user: User & { role?: string };
}

export default function DashboardBanner({ user }: Props) {
  return (
    <div className="bg-base-200/50 text-var(--theme-navbar-content) border-b-2 border-primary mask-b-from-96%">
      <div className="max-w-7xl mx-auto px-6 py-6 flex flex-col md:flex-row items-start md:items-center gap-6">
        <div className="flex flex-row w-full">
          {/* Avatar */}
          <div className="shrink-0 mr-4">
            <div className="w-24 h-24 rounded-2xl overflow-hidden border-4 border-primary mask-y-from-90% mask-x-from-90% flex items-center justify-center">
              {user.image ? (
                <Image
                  src={user.image}
                  alt={user.name || "User"}
                  width={80}
                  height={80}
                  className="w-full h-full object-cover"
                />
              ) : (
                <CircleUserRound className="w-full h-auto p-1 text-base-content/85" />
              )}
            </div>
          </div>

          {/* Name + Sub-bar */}
          <div className="flex-1 min-w-0">
            <h1 className="text-2xl md:text-4xl font-bold tracking-tight font-header pl-1">
              {user.name || "Adventurer"}
            </h1>

            {/* Underline divider */}
            <div className="h-0.5 w-full bg-primary/60 mt-2 mb-1.5 md:mb-3" />

            {/* Subtext bar */}
            <div className="flex flex-wrap items-center pl-1 gap-x-1.5 md:gap-x-4 text-xs md:text-sm opacity-90">
              <span className="font-medium text-success">
                {user.role || "FREE"}
              </span>
              <span className="text-base-400">•</span>
              <a
                href="/dashboard/subscription"
                className="hover:text-primary transition-colors pointer-events-none opacity-60"
              >
                Manage Subscription
              </a>
              <span className="text-base-400">•</span>
              <a
                href="/dashboard/settings"
                className="hover:text-primary transition-colors pointer-events-none opacity-60"
              >
                Account Settings
              </a>
              <span className="text-base-400">•</span>
              <a
                href="/help"
                className="hover:text-primary transition-colors pointer-events-none opacity-60"
              >
                Help
              </a>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
