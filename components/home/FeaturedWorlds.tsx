"use client";

import Tilt from "react-parallax-tilt";
import { motion } from "framer-motion";

const worlds = [
  { name: "Savage Worlds Core", accent: "primary" },
  { name: "Weird West", accent: "secondary" },
  { name: "Deep Space", accent: "accent" },
];

export default function FeaturedWorlds() {
  return (
    <section className="py-24 bg-[url('/images/textures/paper_361.png')] bg-cover mix-blend-color-dodge">
      <div className="max-w-7xl mx-auto px-10 sm:px-6 text-center">
        <h2 className="text-5xl md:text-6xl font-builder-header tracking-wider text-base-content mb-12 opacity-70">
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
                className={`w-72 h-96 rounded-3xl border border-${world.accent}/50 bg-[url('/images/textures/parchment.png')] mix-blend-normal opacity-55
                  flex items-center justify-center p-8 cursor-pointer shadow-xl border-l-8 border-l-white/40`}
              >
                <h3 className="text-3xl font-header font-black text-center drop-shadow-sm">
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
