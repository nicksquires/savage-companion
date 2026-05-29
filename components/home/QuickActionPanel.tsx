"use client";

import { motion } from "framer-motion";
import { Map, Users, Coins, HammerIcon, BookCopy } from "lucide-react";

const actions = [
  // { label: "Create Character", icon: UserPlus, color: "primary" },
  { label: "Campaigns", icon: Map, color: "success" },
  { label: "Marketplace", icon: BookCopy, color: "warning" },
  { label: "Homebrew", icon: HammerIcon, color: "secondary" },
  { label: "Characters", icon: Users, color: "error" },
  // { label: "Random Encounter", icon: Swords, color: "error" },
];

export default function QuickActionPanel() {
  return (
    <section className="relative max-w-full z-0 flex flex-row justify-center bg-linear-to-b from-primary/5 to-background via-background overflow-hidden">
      <div className="grid grid-cols-2 md:grid-cols-4 my-8 gap-2 md:gap-4 lg:gap-6 xl:gap-12 mx-0 md:mx-4 xl:mx-0">
        {actions.map((action, i) => (
          <motion.button
            key={action.label}
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ delay: i * 0.04 }}
            whileHover={{ y: -6 }}
            className={`group mb-0.5 md:mb-0 z-2 flex flex-col items-center justify-center px-6 py-2 md:px-8 md:py-4 xl:px-10 lg:py-7 rounded-3xl border-3
              bg-base-200 hover:bg-base-300 border-${action.color} transition-all mask-x-from-94% mask-y-from-93%`}
          >
            <div
              className="absolute w-full h-full bg-[url('/images/textures/glass.png')] 
            mix-blend-overlay opacity-30 bg-center"
            />
            <action.icon
              className={`w-11 sm:w-15 h-11 sm:h-15 text-${action.color} mb-2 md:mb-6 opacity-80
                transition-transform group-hover:opacity-100 drop-shadow-${action.color} drop-shadow-sm`}
            />
            <span
              className={`font-medium text-base-content/90 uppercase text-center text-lg`}
            >
              {action.label}
            </span>
          </motion.button>
        ))}
      </div>
    </section>
  );
}
