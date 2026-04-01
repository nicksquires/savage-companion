"use client";
import { motion } from "framer-motion";
import { Play, Dices } from "lucide-react";
import Particles from "@tsparticles/react";
import loadFull from "@tsparticles/react";
import Link from "next/link";

export default function HeroSection() {
  const particlesInit = async (engine: any) => {
    await loadFull(engine);
  };

  return (
    <section className="relative h-screen flex items-center justify-center overflow-hidden">
      {/* Background Image */}
      <div className="absolute inset-0 bg-[url('/images/hero-bg.jpg')] bg-cover bg-center" />

      {/* Particles (embers / dust) */}
      <Particles
        id="tsparticles"
        init={particlesInit}
        options={{
          background: { color: { value: "transparent" } },
          fpsLimit: 60,
          particles: {
            color: { value: "#ef830e" },
            number: { value: 80 },
            opacity: { value: 0.4 },
            size: { value: { min: 1, max: 4 } },
            move: { enable: true, speed: 0.6, direction: "none", random: true },
          },
          detectRetina: true,
        }}
        className="absolute inset-0 z-0"
      />

      {/* Dark overlay */}
      <div className="absolute inset-0 bg-linear-to-b from-base-900/70 via-base-900/90 to-base-900" />

      <div className="relative z-10 text-center px-6 max-w-5xl mx-auto">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 1 }}
        >
          <span className="text-amber-500 font-semibold tracking-widest uppercase text-sm mb-4 block drop-shadow-[0_0_8px_rgba(245,158,11,0.7)]">
            Fast! Furious! Fun!
          </span>

          <h1 className="font-header text-6xl md:text-7xl font-black tracking-tighter text-base-content mb-6">
            Build Worlds.
            <br />
            <span className="text-transparent bg-clip-text bg-linear-to-r from-primary to-accent/90">
              Roll Bold.
            </span>
          </h1>
          <p className="text-lg md:text-xl text-base-content/70 max-w-2xl mx-auto mb-10">
            The ultimate Savage Worlds VTT. Exploding dice, custom rules, and
            character sheets - lightning fast.
          </p>
        </motion.div>

        <motion.div
          className="flex flex-col sm:flex-row gap-4 justify-center"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.4, duration: 0.5 }}
        >
          <Link href="/campaigns">
            <button
              className="btn border-none bg-primary/85 hover:bg-primary text-primary-content font-bold text-lg 
                h-14 px-8 shadow-[0_0_20px_rgba(217,119,6,0.4)] transition-all 
                hover:shadow-[0_0_30px_rgba(245,158,11,0.6)]"
            >
              <Play className="mr-2 h-5 w-5 fill-current" />
              Start a Campaign
            </button>
          </Link>

          <button className="btn btn-outline border-stone-700 text-stone-300 hover:bg-stone-800 hover:text-amber-400 hover:border-stone-600 h-14 px-8 font-semibold">
            <Dices className="mr-2 h-5 w-5" /> Try the Roller
          </button>
        </motion.div>
      </div>
    </section>
  );
}
