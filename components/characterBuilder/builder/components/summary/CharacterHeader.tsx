"use client";

import React from "react";
import { motion } from "framer-motion";
import { User, Footprints, Sword, Shield, Coins } from "lucide-react";
import { cn } from "@/lib/utils";
import { CharacterDraft } from "@/lib/types/CharacterBuilder";
import { calculateRank } from "@/lib/character/builder/validation";
import { LaurelCorner, OrnateCorner } from "../ui/Corners";

/**
 * COMPONENT: AmbientGlowLayer
 * Creates a breathing, magical aura behind the entire card.
 */
const AmbientGlowLayer = () => (
  <motion.div
    animate={{ scale: [1, 1.03, 1], opacity: [0.5, 0.8, 0.5] }}
    transition={{ duration: 10, repeat: Infinity, ease: "easeInOut" }}
    className="absolute -inset-10 -z-10 bg-[radial-gradient(ellipse_at_center,rgba(var(--color-primary-rgb),0.15)_0%,rgba(var(--color-accent-rgb),0.1)_40%,transparent_70%)] blur-3xl pointer-events-none"
  />
);

/**
 * COMPONENT: GlimmerLayer
 * A 3-part animated light system (Sweep, Flicker, Rim Light)
 */
const GlimmerLayer = () => (
  <div className="absolute inset-0 pointer-events-none overflow-hidden rounded-[calc(1.5rem-1px)] z-10 mix-blend-screen">
    {/* 1. Bright Sweep */}
    <motion.div
      animate={{ x: ["-150%", "250%"] }}
      transition={{
        duration: 3.5,
        repeat: Infinity,
        ease: "easeInOut",
        repeatDelay: 6,
      }}
      className="absolute inset-0 w-3/4 bg-linear-to-r from-transparent via-primary/30 to-transparent skew-x-12 blur-md"
    />

    {/* 2. Specular Flicker (Magical Motes) */}
    <motion.div
      animate={{ opacity: [0, 0.8, 0] }}
      transition={{
        duration: 2.5,
        repeat: Infinity,
        ease: "easeInOut",
        delay: 1,
      }}
      className="absolute top-12 left-1/4 w-1.5 h-1.5 bg-primary/80 rounded-full blur-[1px]"
    />
    <motion.div
      animate={{ opacity: [0, 0.6, 0] }}
      transition={{
        duration: 4,
        repeat: Infinity,
        ease: "easeInOut",
        delay: 3,
      }}
      className="absolute bottom-24 right-1/3 w-2 h-2 bg-accent/60 rounded-full blur-[2px]"
    />

    {/* 3. Edge Catch Light */}
    <div className="absolute inset-0 border border-primary/30 rounded-[calc(1.5rem-1px)] opacity-50 shadow-[inset_0_1px_0_rgba(255,255,255,0.1)]" />
  </div>
);

/**
 * COMPONENT: CharacterMedallion
 * Upgraded to Success/Primary blend with inner heroic rim lighting
 */
const CharacterMedallion = ({ imageUrl }: { imageUrl?: string | null }) => (
  <div className="relative group perspective-1000 shrink-0">
    <motion.div
      whileHover={{ rotateY: 10, rotateX: -5, scale: 1.05 }}
      transition={{ type: "spring", stiffness: 300, damping: 20 }}
      className="relative w-24 h-24 md:w-36 md:h-36 lg:w-48 lg:h-48 rounded-full z-20"
    >
      {/* Outer Etched Ring */}
      <div className="absolute -inset-5 rounded-full border border-primary/20 animate-[spin_25s_linear_infinite] drop-shadow-md" />

      {/* Middle Metallic Ring (Success/Primary blend for heroic feel) */}
      <div className="absolute -inset-2.5 rounded-full border-[5px] border-primary/80 bg-linear-to-b from-primary via-success to-primary/40 shadow-[0_10px_30px_rgba(var(--color-primary-rgb),0.5),inset_0_2px_4px_rgba(255,255,255,0.4)]" />

      {/* Inner Masked Image with heavy inner shadow */}
      <div className="absolute inset-0 rounded-full overflow-hidden border-2 border-base-300 bg-base-300 shadow-[inset_0_4px_20px_rgba(0,0,0,0.8)]">
        {imageUrl ? (
          <img
            src={imageUrl}
            alt="Avatar"
            className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-700"
          />
        ) : (
          <User className="w-12 h-12 md:w-18 md:h-18 lg:w-24 lg:h-24 m-5.5 md:m-8.5 lg:m-12 text-base-100/50" />
        )}
      </div>

      {/* Dynamic Hover Light Overlay */}
      <div className="absolute inset-0 rounded-full bg-linear-to-tr from-transparent via-white/0 to-transparent group-hover:via-white/20 transition-all duration-500 pointer-events-none" />
    </motion.div>
  </div>
);

/**
 * COMPONENT: StatRelicTab
 * Deep base tones, massive icons, and heavy physical presence
 */
const StatRelicTab = ({
  icon,
  label,
  value,
  delay = 0,
  colorClass = "text-primary",
}: any) => (
  <motion.div
    initial={{ y: -30, opacity: 0, rotateZ: -2 }}
    animate={{ y: 0, opacity: 1, rotateZ: 0 }}
    transition={{
      type: "spring",
      stiffness: 150,
      damping: 12,
    }}
    whileHover={{ y: -1, transition: { duration: 0.2 } }}
    className="relative flex flex-col items-center group cursor-default"
  >
    {/* Thick Metallic Hangers */}
    <div className="absolute -top-4 flex justify-between w-10 md:w-16 px-1 z-0">
      <div className="w-2.5 h-8 bg-linear-to-b from-base-100 to-base-300 border-x border-primary/40 rounded-t-sm shadow-[inset_0_1px_1px_rgba(255,255,255,0.2)]" />
      <div className="w-2.5 h-8 bg-linear-to-b from-base-100 to-base-300 border-x border-primary/40 rounded-t-sm shadow-[inset_0_1px_1px_rgba(255,255,255,0.2)]" />
    </div>

    {/* Heavy Plaque Body */}
    <div className="w-full bg-linear-to-b from-base-200 via-base-300 to-[rgba(0,0,0,0.2)] dark:to-black/30 border-x border-b border-primary/30 shadow-[0_15px_25px_-5px_rgba(0,0,0,0.6),inset_0_2px_4px_rgba(255,255,255,0.05)] rounded-b-2xl p-2 lg:py-8 relative z-10 overflow-hidden flex flex-col items-center">
      {/* Double SVG Etched Borders */}
      <div className="absolute inset-1.5 border border-primary/15 rounded-b-xl border-t-0 pointer-events-none" />
      <div className="absolute inset-2.5 border border-primary/5 rounded-b-lg border-t-0 pointer-events-none" />

      {/* Engraved Icon Treatment */}
      <div
        className={cn(
          "relative flex items-center justify-center pb-1 mb-1 group-hover:scale-110 group-hover:-translate-y-1 transition-all duration-500",
          colorClass,
        )}
      >
        <div className="absolute inset-0 bg-current opacity-15 blur-2xl rounded-full" />
        <div className="drop-shadow-[0_2px_8px_currentColor]">{icon}</div>
      </div>

      {/* Typography Hierarchy */}
      <span className="hidden lg:inline text-[11px] font-bold uppercase tracking-[0.25em] text-base-content/60 drop-shadow-sm mb-1">
        {label}
      </span>
      <span className="text-xs md:text-lg lg:text-3xl font-black font-mono text-base-content/90 lg:text-base-content/85 tracking-tighter drop-shadow-[0_2px_4px_rgba(0,0,0,0.8)]">
        {value}
      </span>
    </div>
  </motion.div>
);

type DerivedStats = {
  pace: number;
  parry: number;
  toughness: number;
  armor: number;
};

interface Props {
  draft: CharacterDraft;
  raceName: string;
  derivedStats: DerivedStats;
}

/**
 * MAIN COMPONENT: CharacterHeader (The Legendary Artifact)
 */
export const CharacterHeader = ({ draft, raceName, derivedStats }: Props) => {
  return (
    <motion.div
      initial={{ opacity: 0, y: 30 }}
      animate={{ opacity: 1, y: 0 }}
      className="relative w-full max-w-6xl mx-auto mask-x-from-277 mask-t-from-121"
    >
      <AmbientGlowLayer />

      {/* 1. MAIN CARD FRAME */}
      {/* Darkened the base gradient to allow foreground highlights to pop out heavily */}
      <div
        className="relative p-1.5 rounded-sm rounded-tl-[5.85rem] rounded-br-[5.85rem] 
                  bg-linear-to-br from-primary/40 via-base-300 to-base-100/40 
                  shadow-[0_25px_50px_-12px_rgba(0,0,0,0.7)] overflow-visible
                  mask-b-from-99%
      "
      >
        {/* The Parchment Panel with extreme inset shadows */}
        <div className="relative rounded-sm rounded-tl-[5.85rem] rounded-br-[5.85rem] overflow-hidden min-h-1/6 flex flex-col sm:flex-row items-center md:items-start gap-12 p-10 shadow-[inset_0_4px_20px_rgba(0,0,0,0.5)]">
          <GlimmerLayer />

          {/* Asymmetrical Ornamentation Rhythm */}
          <LaurelCorner className="top-0 left-0 text-primary/60" />
          <OrnateCorner className="top-0 right-0 rotate-90 text-primary" />
          <LaurelCorner className="bottom-0 right-0 -rotate-180 text-primary/60" />
          <OrnateCorner className="bottom-0 left-0 rotate-270 text-primary" />

          {/* 2. PORTRAIT SECTION */}
          <CharacterMedallion imageUrl={draft.imageUrl} />

          {/* 3. CONTENT SECTION */}
          <div className="flex-1 space-y-2 lg:space-y-6 text-center md:text-left z-20 md:pt-4">
            <div>
              <motion.h1
                className="text-5xl lg:text-7xl font-builder-header tracking-wider 
              bg-clip-text text-transparent bg-linear-to-b from-base-800 via-primary to-error/30 
              drop-shadow-[0_4px_12px_rgba(var(--color-primary-rgb),0.6)]"
              >
                {draft.name || "Unnamed Hero"}
              </motion.h1>
              <p className="text-sm md:text-md lg:text-2xl font-header uppercase tracking-[0.3em] lg:tracking-[0.4em] text-primary/85 ml-2 mt-2 drop-shadow-sm">
                {draft.advancesEarned
                  ? calculateRank(draft.advancesEarned, draft.advancesPerRank)
                      .name
                  : "NOVICE"}{" "}
                {raceName}
              </p>
            </div>

            {/* Inset Biography Panel - Darkened for better contrast */}
            <div className="relative group max-w-xl w-4/5">
              <div className="absolute -inset-1 bg-linear-to-r from-primary/10 to-accent/10 blur-sm opacity-50 group-hover:opacity-100 transition duration-700" />
              <div className="relative rounded-2xl p-4 bg-base-300/80 backdrop-blur-md border-y border-primary/20 shadow-[inset_0_2px_10px_rgba(0,0,0,0.4)]">
                <p className="text-xs md:text-md lg:text-lg leading-relaxed font-serif italic text-base-content/90 drop-shadow-[0_1px_1px_rgba(0,0,0,0.8)]">
                  {draft.concept ||
                    draft.biography ||
                    "The legend has yet to be written..."}
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* 4. HERO RELIC PANELS (Stat Tabs) */}
      <div className="grid grid-cols-4 gap-2 md:gap-6 lg:gap-10 pr-18 pl-4 sm:px-28 md:px-24 -mt-1.25 relative z-30">
        <StatRelicTab
          delay={0.1}
          icon={
            <Footprints className="w-7 h-7 md:w-10 md:h-10 lg:w-14 lg:h-14" />
          }
          label="Pace"
          value={derivedStats.pace}
          colorClass="text-base-content" // Neutral metallic
        />
        <StatRelicTab
          delay={0.2}
          icon={<Sword className="w-7 h-7 md:w-10 md:h-10 lg:w-14 lg:h-14" />}
          label="Parry"
          value={derivedStats.parry}
          colorClass="text-error" // Danger/Combat
        />
        <StatRelicTab
          delay={0.3}
          icon={<Shield className="w-7 h-7 md:w-10 md:h-10 lg:w-14 lg:h-14" />}
          label="Toughness"
          value={`${derivedStats.toughness}(${derivedStats.armor})`}
          colorClass="text-info" // Protection
        />
        <StatRelicTab
          delay={0.4}
          icon={<Coins className="w-7 h-7 md:w-10 md:h-10 lg:w-14 lg:h-14" />}
          label="Funds"
          value={`$${draft.maxWealth - draft.wealthSpent}`}
          colorClass="text-warning" // Wealth/Gold
        />
      </div>
    </motion.div>
  );
};
