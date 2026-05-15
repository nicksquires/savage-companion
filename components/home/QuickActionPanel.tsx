"use client";

import { motion } from "framer-motion";
import { Map, Users, Coins, HammerIcon } from "lucide-react";

const actions = [
  // { label: "Create Character", icon: UserPlus, color: "primary" },
  { label: "Start Campaign", icon: Map, color: "accent" },
  { label: "Browse Marketplace", icon: Coins, color: "warning" },
  { label: "Build Homebrew", icon: HammerIcon, color: "secondary" },
  { label: "Join Table", icon: Users, color: "error" },
  // { label: "Random Encounter", icon: Swords, color: "error" },
];

export default function QuickActionPanel() {
  return (
    <section className="relative -mt-12 max-w-7xl mx-auto px-6 z-10 pb-8">
      <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-6">
        {actions.map((action, i) => (
          <motion.button
            key={action.label}
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ delay: i * 0.05 }}
            whileHover={{ y: -6, scale: 1.03 }}
            className={`group flex flex-col items-center justify-center p-10 rounded-3xl border border-base-300 bg-base-100 hover:bg-base-200 hover:border-${action.color} transition-all`}
          >
            <action.icon
              className={`w-11 h-11 text-${action.color} mb-6 transition-transform group-hover:scale-110`}
            />
            <span className="font-medium text-base-content text-center text-lg">
              {action.label}
            </span>
          </motion.button>
        ))}
      </div>
    </section>
  );
}
