"use client";

import Tilt from "react-parallax-tilt";
import { motion } from "framer-motion";
import { Anchor, BowArrow, Rocket } from "lucide-react";

const worlds = [
  {
    name: "Fantasy Companion",
    accent: "primary",
    icon: <BowArrow className="w-30 h-30 mb-10 text-primary" />,
  },
  {
    name: "Pirates of the Spanish Main",
    accent: "info",
    icon: <Anchor className="w-30 h-30 mb-10 text-info" />,
  },
  {
    name: "Science Fiction Companion",
    accent: "accent",
    icon: <Rocket className="w-30 h-30 mb-10 text-accent" />,
  },
];

export default function FeaturedWorlds() {
  return (
    <section className="max-w-screen md:py-22 py-14 mask-t-from-90% bg-base-100/60 mask-b-from-99%">
      <div className=" mx-auto px-10 sm:px-6 pt-12 text-center">
        <h2 className="text-6xl md:text-7xl font-builder-header tracking-tighter text-base-content/90 mb-12 opacity-90">
          Wield Any Setting
        </h2>

        <div className="flex flex-col md:flex-row gap-8 justify-center items-center">
          {worlds.map((world, i) => (
            <motion.div
              key={world.name}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ delay: i * 0.15 }}
            >
              <Tilt
                glareEnable
                glareMaxOpacity={0.25}
                scale={1.05}
                className={`w-62 sm:w-48 lg:w-72 h-82 sm:h-72 lg:h-96 flex flex-col rounded-3xl border-2 border-${world.accent}/30 
                  bg-[url('/images/textures/parchment.png')] mix-blend-normal opacity-85 
                  mask-l-from-67 mask-r-from-98%
                  items-center justify-center p-8 cursor-pointer shadow-xl border-l-8 border-l-white/40`}
              >
                {world.icon}
                <h3 className="text-3xl sm:text-xl lg:text-4xl font-builder-body font-black text-center drop-shadow-sm">
                  {world.name}
                </h3>
              </Tilt>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
