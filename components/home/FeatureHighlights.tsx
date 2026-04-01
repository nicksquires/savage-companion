"use client";

import { motion } from "framer-motion";

const features = [
  {
    title: "Real-Time Combat",
    description:
      "Initiative cards drawn and sorted instantly. Status effects and modifiers calculate automatically.",
    iconPath: "/images/icons/lorc/crossed-swords.svg", // Using your local game-icons
  },
  {
    title: "Deep Character Modeling",
    description:
      "Edges, Hindrances, and Advances tracked seamlessly through our optimized database architecture.",
    iconPath: "/images/icons/delapouite/character.svg",
  },
  {
    title: "Dynamic Token Systems",
    description:
      "Drag-and-drop tokens with integrated line-of-sight and aura tracking.",
    iconPath: "/images/icons/lorc/hexagonal-nut.svg", // Re-contextualized as a hex token
  },
  {
    title: "Exploding Dice Engine",
    description:
      "A flawless physics and RNG engine built specifically for Savage Worlds' Ace mechanics.",
    iconPath: "/images/icons/skoll/d20.svg",
  },
];

export default function FeatureHighlights() {
  return (
    <section className="py-24 bg-zinc-950 relative border-t border-zinc-900">
      <div className="max-w-6xl mx-auto px-4">
        <div className="text-center mb-16">
          <h2 className="text-3xl md:text-5xl font-bold text-zinc-100 mb-4">
            Mechanics <span className="text-amber-500">Mastered</span>
          </h2>
          <p className="text-zinc-400 max-w-2xl mx-auto">
            We've translated the complex ruleset into an elegant digital format,
            getting the math out of the way so you can focus on the story.
          </p>
        </div>

        <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-8">
          {features.map((feature, i) => (
            <motion.div
              key={feature.title}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: "-100px" }}
              transition={{ delay: i * 0.1 }}
              className="p-6 rounded-2xl bg-zinc-900/50 border border-zinc-800 hover:border-amber-500/50 hover:bg-zinc-900 transition-colors group"
            >
              <div
                className="w-12 h-12 mb-4 bg-amber-500 transition-transform group-hover:scale-110 group-hover:bg-amber-400"
                style={{
                  maskImage: `url('${feature.iconPath}')`,
                  maskSize: "contain",
                  maskRepeat: "no-repeat",
                  maskPosition: "center",
                  WebkitMaskImage: `url('${feature.iconPath}')`,
                  WebkitMaskSize: "contain",
                  WebkitMaskRepeat: "no-repeat",
                  WebkitMaskPosition: "center",
                }}
              />
              <h3 className="text-xl font-semibold text-zinc-200 mb-2">
                {feature.title}
              </h3>
              <p className="text-zinc-500 text-sm leading-relaxed">
                {feature.description}
              </p>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
