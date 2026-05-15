"use client";

import { useEffect, useState } from "react";
import { motion } from "framer-motion";
import { Play, Dices, User, UserPlus, BookOpen } from "lucide-react";
import Particles from "@tsparticles/react";
import { initParticlesEngine } from "@tsparticles/react";
import { loadFull } from "tsparticles"; // ← correct import for v3 full bundle
import Link from "next/link";

export default function HeroSection() {
  const [init, setInit] = useState(false);

  // Preload the engine once (runs only on mount)
  useEffect(() => {
    initParticlesEngine(async (engine) => {
      await loadFull(engine); // loads the full tsparticles bundle
    }).then(() => {
      setInit(true);
    });
  }, []);

  return (
    <section className="relative h-185 flex pt-40 justify-center overflow-hidden">
      {/* Background Image */}
      <div className="absolute inset-0 bg-[url('/images/textures/builder_bg.png')] mix-blend-color-dodge bg-cover bg-center" />

      {/* Gentle ember / dust particles */}
      {init && (
        <Particles
          id="tsparticles"
          options={{
            background: { color: { value: "transparent" } },
            fpsLimit: 60,
            particles: {
              color: {}, // --color-primary
              number: { value: 70 },
              opacity: { value: { min: 0.3, max: 0.7 } },
              size: { value: { min: 1, max: 4 } },
              move: {
                enable: true,
                speed: 0.8,
                direction: "none",
                random: true,
                outModes: "out",
              },
            },
            detectRetina: true,
          }}
          className="absolute inset-0 z-0"
        />
      )}

      {/* Dark gradient overlay for readability */}
      {/* <div className="absolute inset-0 bg-linear-to-b from-base-300/70 via-base-300/90 to-base-300" /> */}

      {/* Content */}
      <div className="relative z-10 text-center px-6 max-w-5xl mx-auto">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 1 }}
        >
          {/* <span className="text-primary/75 font-semibold tracking-widest uppercase text-sm mb-4 block drop-shadow-accent">
            Fast! Furious! Fun!
          </span> */}
          <span className="text-primary font-semibold tracking-widest uppercase text-sm mb-4 block drop-shadow-[0_0_8px_rgba(245,158,11,0.7)]">
            Fast! Furious! Fun!
          </span>

          <h1 className="font-header text-6xl md:text-7xl font-black tracking-tighter text-base-content mb-6">
            Build Worlds.
            <br />
            <span className="text-transparent bg-clip-text bg-linear-to-r from-primary to-accent/90">
              Roll Bold.
            </span>
          </h1>
          <p className="text-lg md:text-xl text-base-content/90 max-w-2xl mx-auto mb-10">
            The ultimate Savage Worlds VTT. Exploding dice, custom rules, and
            character sheets - lightning fast.
          </p>
        </motion.div>

        <motion.div
          className="flex flex-col sm:flex-row gap-4 justify-center items-center"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.4, duration: 0.5 }}
        >
          <Link href="/campaigns">
            <button
              className="btn border-none text-primary-content font-bold text-lg h-14 px-8 transition-all w-70
                bg-primary/85 shadow-[0_0_20px_rgba(217,119,6,0.4)] 
                hover:bg-primary hover:shadow-[0_0_30px_rgba(245,158,11,0.6)]"
            >
              <UserPlus className="mr-2 h-5 w-5 fill-current" />
              Create a Character
            </button>
          </Link>

          <button className="btn btn-outline border-base-700 text-base-700/75 hover:bg-base-800 hover:text-primary hover:border-base-600 h-14 px-8 font-semibold w-70">
            <BookOpen className="mr-2 h-5 w-5" /> Learn to Play
          </button>
        </motion.div>
      </div>
    </section>
  );
}
