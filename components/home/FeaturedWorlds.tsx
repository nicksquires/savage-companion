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
    <section className="py-24 bg-base-200">
      <div className="max-w-7xl mx-auto px-6 text-center">
        <h2 className="text-4xl font-bold text-base-content mb-12">
          Jump Into Any Setting
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
                className={`w-72 h-96 rounded-3xl border border-${world.accent}/50 bg-linear-to-br from-${world.accent}/30 to-base-100/80 
                  flex items-center justify-center p-8 cursor-pointer shadow-xl`}
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
