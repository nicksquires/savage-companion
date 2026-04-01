import Image from "next/image";
import { User } from "next-auth";
import { CircleUserRound } from "lucide-react";

interface Props {
  user: User & { role?: string };
}

export default function DashboardBanner({ user }: Props) {
  return (
    <div className="bg-var(--theme-navbar) text-var(--theme-navbar-content) border-b border-base-300">
      <div className="max-w-7xl mx-auto px-6 py-6 flex flex-col md:flex-row items-start md:items-center gap-6">
        {/* Avatar */}
        <div className="shrink-0">
          <div className="w-20 h-20 rounded-2xl overflow-hidden ring-4 ring-primary/45 flex items-center justify-center">
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
          <h1 className="text-4xl font-bold tracking-tight font-header">
            {user.name || "Adventurer"}
          </h1>

          {/* Underline divider */}
          <div className="h-0.5 w-full bg-primary mt-2 mb-3" />

          {/* Subtext bar */}
          <div className="flex flex-wrap items-center gap-x-4 text-sm opacity-90">
            <span className="font-medium">{user.role || "FREE"}</span>
            <span className="text-base-400">•</span>
            <a
              href="/dashboard/subscription"
              className="hover:text-primary transition-colors"
            >
              Manage Subscription
            </a>
            <span className="text-base-400">•</span>
            <a
              href="/dashboard/settings"
              className="hover:text-primary transition-colors"
            >
              Account Settings
            </a>
            <span className="text-base-400">•</span>
            <a href="/help" className="hover:text-primary transition-colors">
              Help
            </a>
          </div>
        </div>
      </div>
    </div>
  );
}
