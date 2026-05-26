"use client";

import { motion, Variants } from "framer-motion";
import Tilt from "react-parallax-tilt";
import {
  Dices,
  Star,
  Zap,
  Crown,
  Crosshair,
  Flame,
  ShieldPlus,
  Skull,
  HandCoins,
} from "lucide-react";
import { Card, CardContent } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion";
import { clsx, type ClassValue } from "clsx";
import { twMerge } from "tailwind-merge";
import Image from "next/image";
import WildcardIcon from "@/public/images/icons/wildcard_icon.png";
import {
  D10,
  D12,
  D4,
  D6,
  D8,
} from "@/components/characterBuilder/builder/components/ui/svg/DiceNumSVG";
import logo2 from "@/public/images/svglogo_white_logo_only.png";

function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}

// Reusable animation variants
const fadeUp: Variants = {
  hidden: { opacity: 0, y: 20 },
  visible: { opacity: 1, y: 0, transition: { duration: 0.5, ease: "easeOut" } },
};

const staggerContainer: Variants = {
  hidden: { opacity: 0 },
  visible: { opacity: 1, transition: { staggerChildren: 0.15 } },
};

export default function GettingStartedClient() {
  return (
    <div className="min-h-screen bg-base-100 text-base-content font-body relative overflow-hidden">
      {/* Global Base Texture */}
      <div className="fixed inset-0 bg-[url('/images/textures/darkpaper.png')] opacity-20 mix-blend-overlay pointer-events-none z-0" />

      {/* --- HERO SECTION --- */}
      <section className="relative w-full py-16 px-6 flex flex-col items-center justify-center text-center border-b border-primary/20 z-10">
        <div className="absolute inset-0 bg-[url('/images/textures/builder_bg.png')] opacity-20 mix-blend-overlay bg-cover pointer-events-none" />
        <div className="absolute inset-0 bg-linear-to-b from-base-100/10 via-base-100/50 to-base-100/70" />

        <motion.div
          initial="hidden"
          animate="visible"
          variants={staggerContainer}
          className="flex flex-col relative z-10 max-w-full mx-auto justify-center items-center"
        >
          <motion.div
            variants={fadeUp}
            className="flex justify-center mt-10 mb-6"
          >
            <div className="relative w-30 md:w-50 inline-block">
              <Image
                src={WildcardIcon}
                alt="Wildcard Icon"
                width={240}
                height={240}
                className="w-full h-auto brightness-0 invert drop-shadow-primary drop-shadow-sm opacity-35"
              />
              <Image
                src={WildcardIcon}
                alt="Wildcard Icon"
                width={240}
                height={240}
                className=" absolute top-0 w-full h-auto brightness-0 invert drop-shadow-secondary/20 drop-shadow-2xl opacity-80 animate-pulse"
              />
            </div>
          </motion.div>
          <motion.h1
            variants={fadeUp}
            className="font-header py-2 sm:pb-16 sm:pt-2 text-4xl sm:text-5xl md:text-7xl font-black text-transparent bg-clip-text bg-linear-to-br from-primary via-secondary to-base-content drop-shadow-sm"
          >
            Learn to Play <br />
            Savage Worlds
          </motion.h1>
          <motion.h2
            variants={fadeUp}
            className="font-header text-3xl md:text-4xl w-full md:w-4/5 2xl:w-2/3 pt-8 pb-4 text-base-content/80 uppercase 
            tracking-[0.2em] font-bold border-b-base-content/80 border-b"
          >
            NEW PLAYER GUIDE
          </motion.h2>

          <motion.p
            variants={fadeUp}
            className="text-sm sm:text-md lg:text-lg text-base-content/60 w-full px-3 sm:px-8 lg:px-20 xl:px-40 2xl:px-90 leading-relaxed mt-6 sm:mt-8"
          >
            Savage Worlds is a fast &amp; furious tabletop RPG ruleset developed
            by{" "}
            <a href="https://peginc.com/" className="link-primary">
              Pinnacle Entertainment Group
            </a>
            . Take on the role of a hero, completing objectives and overcoming
            obstacles set by the Game Master (
            <strong className="uppercase">GM</strong>). Narrate your character's
            actions, and when the outcome is uncertain, you roll the dice to see
            if you succeed.
          </motion.p>

          <motion.p
            variants={fadeUp}
            className="text-md sm:text-lg lg:text-xl text-base-content/75 px-3 sm:px-8 lg:px-20 xl:px-40 2xl:px-90 leading-relaxed mt-6 sm:mt-8"
          >
            Whether you are exploring haunted ruins, battling across irradiated
            wastelands, or slugging it out with supervillains in the skies
            above, you are stepping into a game designed for explosive action
            and epic storytelling!
          </motion.p>
        </motion.div>
      </section>

      <div className="max-w-5xl mx-auto px-4 md:px-6 py-16 space-y-24 relative z-10">
        {/* --- SECTION 1: THE CORE RULES --- */}
        <motion.section
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, margin: "-100px" }}
          variants={staggerContainer}
          className="space-y-8"
        >
          <motion.div
            variants={fadeUp}
            className="flex items-center gap-1 sm:gap-4 border-b border-primary/20 pb-4"
          >
            <Flame className="w-9 h-9 md:w-13 md:h-13 pb-1.5 text-primary" />
            <h2 className="font-header text-2xl md:text-5xl text-base-content">
              The Anatomy of an Action
            </h2>
          </motion.div>

          <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 items-start">
            <motion.div variants={fadeUp} className="text-center">
              <motion.p
                variants={fadeUp}
                className="text-sm sm:text-md md:text-lg leading-relaxed text-base-content/80 text-left"
              >
                In Savage Worlds, your hero's capabilities are measured by a
                ladder of traditional gaming dice:
              </motion.p>
              <div className="flex flex-row leading-relaxed text-base-content/80 text-center my-0.5 sm:my-4 mx-10 sm:mx-2 justify-center">
                <D4 size={100} color="var(--color-primary)" />
                <D6 size={100} color="var(--color-primary)" />
                <D8 size={100} color="var(--color-primary)" />
                <D10 size={100} color="var(--color-primary)" />
                <D12 size={100} color="var(--color-primary)" />
              </div>
              <motion.p
                variants={fadeUp}
                className="text-sm sm:text-md md:text-lg leading-relaxed text-base-content/80 text-left"
              >
                The larger the die, the better your chances of success. Whenever
                your hero attempts something important, you make a{" "}
                <strong className="uppercase">Trait Roll</strong>. Your hero may
                be leaping a chasm, so they roll with their{" "}
                <strong className="uppercase">ATHLETICS</strong> Skill die; or
                perhaps they are coercing an NPC to help them, which requires
                the <strong className="uppercase">INTIMIDATION</strong> skill of
                your hero versus the{" "}
                <strong className="uppercase">SPIRIT</strong> attribute of the
                target (this is called a{" "}
                <strong className="uppecase">TEST</strong>).
              </motion.p>
            </motion.div>

            <motion.div variants={fadeUp} className="space-y-6">
              <div className="bg-base-200/40 border border-base-300 rounded-3xl p-6 shadow-inner relative overflow-hidden">
                <div className="absolute inset-0 bg-[url('/images/textures/parchment.png')] opacity-15 mix-blend-overlay" />
                <motion.h3
                  variants={fadeUp}
                  className="font-header text-xl sm:text-2xl text-accent mb-4"
                >
                  Wild Cards &amp; the Wild Die
                </motion.h3>
                <motion.p
                  variants={fadeUp}
                  className="text-sm sm:text-md md:text-lg text-base-content/80 leading-relaxed mb-2"
                >
                  Because you are playing a{" "}
                  <strong className="uppercase">player</strong> character, you
                  are what is called a{" "}
                  <strong className="uppercase">Wild Card</strong> - a hero
                  destined for greatness!
                </motion.p>
                <motion.p
                  variants={fadeUp}
                  className="text-sm sm:text-md md:text-lg text-base-content/80 leading-relaxed mb-4"
                >
                  Whenever you make a Trait Roll, you don't just roll your
                  standard ability die. You also roll a{" "}
                  <strong className="uppercase">Wild Die</strong> (a standard{" "}
                  <strong className="uppercase">D6</strong>) at the exact same
                  time.
                </motion.p>
                <div className="bg-base-300/50 p-4 rounded-xl border border-base-content/10 flex items-start gap-3">
                  <Zap className="w-5 h-5 text-warning shrink-0 mt-0.5 fill-warning" />
                  <motion.p
                    variants={fadeUp}
                    className="text-sm text-base-content/70"
                  >
                    <strong className="uppercase">Keep the Highest:</strong> You
                    don't add them together. You simply compare both dice and
                    keep the highest result.
                  </motion.p>
                </div>
              </div>
            </motion.div>
          </div>

          {/* GOLDEN RULE AND ACING */}
          <motion.div
            variants={fadeUp}
            className="grid grid-cols-1 md:grid-cols-2 gap-6 mt-8"
          >
            <Card className="border-l-4 border-l-primary bg-base-200/50 backdrop-blur-sm relative overflow-hidden group">
              <div className="absolute inset-0 bg-[url('/images/textures/glass.png')] opacity-10 mix-blend-overlay group-hover:opacity-20 transition-opacity" />
              <CardContent className="p-6 relative z-10 space-y-2">
                <Crosshair className="absolute -top-6 -left-4 h-40 w-40 sm:w-60 sm:h-60 z-0 text-primary opacity-10" />
                <motion.h3
                  variants={fadeUp}
                  className="font-header text-xl sm:text-2xl font-semibold text-primary flex items-center gap-2"
                >
                  Golden Die Rule: Success on a 4
                </motion.h3>
                <motion.p
                  variants={fadeUp}
                  className="text-sm sm:text-md md:text-lg text-base-content/80 text-left px-2"
                >
                  To succeed at almost any standard task, you simply need to
                  roll a <strong className="text-primary">4 or higher</strong>{" "}
                  on your die.
                </motion.p>
              </CardContent>
            </Card>

            <Card className="border-l-4 border-l-warning bg-warning/5 backdrop-blur-sm overflow-hidden">
              <CardContent className="p-6 flex items-start gap-4 h-full">
                <motion.div
                  animate={{ rotate: [0, 15, -15, 0], scale: [1, 1.1, 1] }}
                  transition={{
                    repeat: Infinity,
                    duration: 2,
                    ease: "easeInOut",
                  }}
                  className="shrink-0 relative"
                >
                  <div className="absolute inset-0 bg-warning blur-md opacity-30 rounded-full" />
                  <Dices className="w-10 h-10 text-warning relative z-10" />
                </motion.div>
                <div>
                  <motion.h3
                    variants={fadeUp}
                    className="font-header text-xl sm:text-2xl text-warning mb-2"
                  >
                    Acing: The Exploding Dice
                  </motion.h3>
                  <motion.p
                    variants={fadeUp}
                    className="text-sm sm:text-md md:text-lg text-base-content/80 leading-relaxed"
                  >
                    If you roll the maximum possible number on any die (like a 6
                    on a <strong className="uppercase">D6</strong>), the die
                    "explodes." You roll that die again and add the new value to
                    your total! If it maxes out again, keep rolling and adding.
                    Even a humble <strong className="uppercase">D4</strong> can
                    achieve legendary feats.
                  </motion.p>
                </div>
              </CardContent>
            </Card>
          </motion.div>
        </motion.section>
        {/* --- SECTION 2: YOUR HERO --- */}
        <motion.section
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, margin: "-100px" }}
          variants={staggerContainer}
          className="space-y-8"
        >
          <motion.div
            variants={fadeUp}
            className="flex items-center gap-4 border-b border-secondary/20 pb-4"
          >
            <Crown className="w-9 h-9 md:w-13 md:h-13 pb-1.5 text-secondary" />
            <h2 className="font-header text-2xl md:text-5xl text-base-content">
              Building a Legend
            </h2>
          </motion.div>
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
            <motion.div variants={fadeUp} className="lg:col-span-2 space-y-6">
              <motion.p
                variants={fadeUp}
                className="text-sm sm:text-md md:text-lg leading-relaxed text-base-content/80"
              >
                Great characters are far more than just numbers, but numbers are
                where they begin.
              </motion.p>

              <div className="space-y-2 2xl:space-y-4">
                <motion.h3
                  variants={fadeUp}
                  className="font-header uppercase text-2xl sm:text-3xl md:text-4xl text-secondary"
                >
                  Attributes
                </motion.h3>
                <motion.p
                  variants={fadeUp}
                  className="text-base-content/80 text-sm sm:text-md md:text-lg pl-1.5"
                >
                  Every character has five core Attributes that measure their
                  raw potential:{" "}
                  <strong className="uppercase">
                    Agility, Smarts, Spirit, Strength,
                  </strong>{" "}
                  and <strong className="uppercase">Vigor</strong>. During
                  creation, all Attributes start at a{" "}
                  <strong className="uppercase">D4</strong>. You spend points to
                  step them up the ladder.
                </motion.p>
              </div>

              <div className="space-y-2 2xl:space-y-4">
                <motion.h3
                  variants={fadeUp}
                  className="font-header uppercase text-2xl sm:text-3xl md:text-4xl text-secondary"
                >
                  Skills &amp; Untrained Rolls
                </motion.h3>
                <motion.p
                  variants={fadeUp}
                  className="text-base-content/80 text-sm sm:text-md md:text-lg pl-1.5"
                >
                  Skills are your learned abilities - like <em>Shooting</em>,{" "}
                  <em>Electronics</em>, or <em>Persuasion</em>. If you attempt
                  something you haven't learned, you make an{" "}
                  <strong className="uppercase">Untrained Roll</strong>. You
                  still roll a standard{" "}
                  <strong className="uppercase">D4</strong> (and your Wild Die),
                  but you suffer a{" "}
                  <strong className="text-error">-2 penalty</strong> to the
                  final result.
                </motion.p>
              </div>

              <div className="space-y-2 2xl:space-y-4">
                <motion.h3
                  variants={fadeUp}
                  className="font-header uppercase text-2xl sm:text-3xl md:text-4xl text-secondary"
                >
                  Modifiers
                </motion.h3>
                <motion.p
                  variants={fadeUp}
                  className="text-base-content/80 text-sm sm:text-md md:text-lg pl-1.5"
                >
                  If a task is exceptionally difficult, or your hero has a
                  situational advantage,{" "}
                  <strong className="text-error uppercase">NEGATIVE</strong> or{" "}
                  <strong className="text-success uppercase">POSITIVE</strong>{" "}
                  modifiers can be applied to your final{" "}
                  <strong className="uppercase">TRAIT ROLL</strong>. Is your
                  hero <strong className="uppercase">WOUNDED</strong> or{" "}
                  <strong className="uppercase">DISTRACTED</strong>? Are they
                  behind cover, or are they prone? All of these factors can play
                  a large role in how things turn out for your hero!
                </motion.p>
              </div>
            </motion.div>

            {/* Derived Stats Panel */}
            <motion.div
              variants={fadeUp}
              className="bg-base-200 border border-base-300/70 rounded-3xl px-1.5 pt-6 pb-2 lg:px-2 lg:py-8 shadow-lg lg:my-30"
            >
              <motion.h3
                variants={fadeUp}
                className="font-header text-2xl text-base-content/70 uppercase tracking-widest mb-6 text-center"
              >
                Derived Stats
              </motion.h3>
              <motion.div variants={fadeUp} className="flex flex-col gap-1">
                <Badge
                  variant="outline"
                  className="w-fit bg-base-100 text-sm sm:text-md md:text-lg py-3 px-2.5 sm:py-4 sm:px-5 border-secondary/30 text-secondary"
                >
                  <strong className="uppercase pr-1">PACE</strong>(Speed)
                </Badge>
                <motion.p
                  variants={fadeUp}
                  className="text-sm sm:text-md md:text-lg text-base-content/60 pb-4 px-3"
                >
                  How fast you move in combat (Standard is 6)
                </motion.p>
              </motion.div>
              <motion.div variants={fadeUp} className="flex flex-col gap-1">
                <Badge
                  variant="outline"
                  className="w-fit bg-base-100 text-sm sm:text-md md:text-lg py-3 px-2.5 sm:py-4 sm:px-5 border-secondary/30 text-secondary"
                >
                  <strong className="uppercase pr-1">PARRY</strong>(Defense)
                </Badge>
                <motion.p
                  variants={fadeUp}
                  className="text-sm sm:text-md md:text-lg text-base-content/60 pb-4 px-3"
                >
                  How hard you are to hit in melee (2 + half Fighting)
                </motion.p>
              </motion.div>
              <motion.div variants={fadeUp} className="flex flex-col gap-1">
                <Badge
                  variant="outline"
                  className="w-fit bg-base-100 text-sm sm:text-md md:text-lg py-3 px-2.5 sm:py-4 sm:px-5 border-secondary/30 text-secondary"
                >
                  <strong className="uppercase pr-1">TOUGHNESS</strong>
                  (Health)
                </Badge>
                <motion.p
                  variants={fadeUp}
                  className="text-sm sm:text-md md:text-lg text-base-content/60 pb-4 px-3"
                >
                  Your damage threshold (2 + half Vigor + Armor)
                </motion.p>
              </motion.div>
            </motion.div>
          </div>
        </motion.section>

        {/* --- SECTION 3: HINDRANCES AND EDGES --- */}
        <motion.section
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, margin: "-50px" }}
          variants={staggerContainer}
          className="space-y-2 lg:space-y-8"
        >
          <motion.div variants={fadeUp}>
            <Card className="bg-linear-to-r from-base-200 to-base-100 border-primary/20 my-2 lg:my-8 overflow-hidden relative">
              {/* ORNAMENTAL GLOW */}
              <div className="absolute inset-0 bg-radial from-primary/10 via-transparent to-transparent pointer-events-none" />

              <CardContent className="p-6 lg:p-8 flex flex-col gap-6 relative z-10">
                {/* HEADER */}
                <div className="flex flex-col md:flex-row items-center gap-6">
                  <Skull className="hidden sm:inline w-16 h-16 text-error opacity-50 shrink-0" />

                  <div className="flex-1 text-center">
                    <motion.h3
                      variants={fadeUp}
                      className="font-header text-2xl sm:text-5xl text-primary uppercase tracking-wider mb-3"
                    >
                      Hindrances &amp; Edges
                    </motion.h3>

                    <motion.p
                      variants={fadeUp}
                      className="text-base-content/80 text-sm sm:text-md md:text-lg leading-relaxed max-w-3xl mx-auto"
                    >
                      Heroes are defined as much by their flaws as their
                      advantages.{" "}
                      <strong className="uppercase text-error">
                        Hindrances
                      </strong>{" "}
                      shape personality, vulnerabilities, and roleplay
                      opportunities, while{" "}
                      <strong className="uppercase text-success">Edges</strong>{" "}
                      represent unique abilities, supernatural gifts, and
                      legendary combat prowess.
                    </motion.p>
                  </div>

                  <ShieldPlus className="hidden sm:inline w-16 h-16 text-success opacity-50 shrink-0" />
                </div>

                {/* CONTENT GRID */}
                <div className="grid grid-cols-1 xl:grid-cols-2 gap-6">
                  {/* HINDRANCES */}
                  <div className="relative rounded-2xl border border-error/20 bg-base-300/30 backdrop-blur-sm p-5 overflow-hidden">
                    <div className="absolute inset-x-0 top-0 h-px bg-linear-to-r from-transparent via-error/50 to-transparent" />

                    <div className="flex items-center gap-3 mb-4">
                      <Skull className="w-6 h-6 text-error" />

                      <h4 className="font-header text-xl sm:text-3xl tracking-wide text-error">
                        Hindrances
                      </h4>
                    </div>

                    <motion.p
                      variants={fadeUp}
                      className="text-sm sm:text-md md:text-lg text-base-content/70 leading-relaxed mb-5"
                    >
                      Taking <strong className="uppercase">HINDRANCES</strong>{" "}
                      grants bonus character points while defining your hero's
                      weaknesses, fears, flaws, and dangerous complications. A
                      hero may take a max of 4 points worth of{" "}
                      <strong className="uppercase">HINDRANCES</strong>.
                    </motion.p>

                    <ul className="space-y-4">
                      <li className="rounded-xl border border-warning/20 bg-warning/10 p-4">
                        <div className="flex items-center justify-between mb-2">
                          <span className="font-header uppercase text-warning text-sm sm:text-md md:text-lg tracking-wide">
                            Minor
                          </span>

                          <span className="text-xs px-2 py-1 rounded-full border border-warning/20 bg-warning/10 text-warning font-semibold">
                            1 Point
                          </span>
                        </div>

                        <motion.p
                          variants={fadeUp}
                          className="text-xs sm:text-sm md:text-md text-base-content/80 leading-relaxed"
                        >
                          Minor{" "}
                          <strong className="uppercase">HINDRANCES</strong>{" "}
                          impose manageable penalties or roleplay obligations,
                          such as being overly Curious, Greedy, or clumsy with
                          delicate tasks.
                        </motion.p>
                      </li>

                      <li className="rounded-xl border border-error/30 bg-error/20 p-4">
                        <div className="flex items-center justify-between mb-2">
                          <span className="font-header uppercase text-error text-sm sm:text-md md:text-lg tracking-wide">
                            Major
                          </span>

                          <span className="text-xs px-2 py-1 rounded-full border border-error/20 bg-error/10 text-error font-semibold">
                            2 Points
                          </span>
                        </div>

                        <motion.p
                          variants={fadeUp}
                          className="text-xs sm:text-sm md:text-md text-base-content/80 leading-relaxed"
                        >
                          Major{" "}
                          <strong className="uppercase">HINDRANCES</strong>{" "}
                          represent severe burdens or dangerous flaws that
                          constantly shape the character's life, such as
                          blindness, chronic illness, or being hunted by
                          powerful enemies.
                        </motion.p>
                      </li>
                    </ul>
                  </div>

                  {/* EDGES */}
                  <div className="relative rounded-2xl border border-success/20 bg-base-300/30 backdrop-blur-sm p-5 overflow-hidden">
                    <div className="absolute inset-x-0 top-0 h-px bg-linear-to-r from-transparent via-success/50 to-transparent" />

                    <div className="flex items-center gap-3 mb-4">
                      <ShieldPlus className="w-6 h-6 text-success" />

                      <h4 className="font-header text-xl sm:text-3xl tracking-wide text-success">
                        Edges
                      </h4>
                    </div>

                    <motion.p
                      variants={fadeUp}
                      className="text-sm sm:text-md md:text-lg text-base-content/70 leading-relaxed mb-5"
                    >
                      <strong className="uppercase">EDGES</strong> are
                      exceptional talents, combat techniques, mystical powers,
                      and heroic abilities that make characters truly iconic.{" "}
                      <strong className="uppercase">EDGES</strong> may be taken
                      with an <strong className="uppercase">ADVANCE</strong>, or
                      by using <strong className="uppercase">HINDRANCE</strong>{" "}
                      points. Categories include:
                    </motion.p>

                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                      {[
                        {
                          title: "Background",
                          desc: "Innate gifts, upbringing, or natural advantages gained during character creation.",
                        },
                        {
                          title: "Combat",
                          desc: "Battle-focused techniques like Frenzy or Sweep that enhance martial skill.",
                        },
                        {
                          title: "Leadership",
                          desc: "Command abilities that inspire allies and strengthen nearby companions.",
                        },
                        {
                          title: "Power",
                          desc: "Arcane talents and supernatural abilities required to wield magic or psionics.",
                        },
                      ].map((edge) => (
                        <div
                          key={edge.title}
                          className="group rounded-xl border border-success/10 bg-base-200/40 p-4 transition-all duration-300 hover:border-success/30 hover:bg-success/5"
                        >
                          <h5 className="font-header uppercase tracking-wide text-success text-sm sm:text-md md:text-lg mb-2 group-hover:translate-x-0.5 transition-transform">
                            {edge.title}
                          </h5>

                          <motion.p
                            variants={fadeUp}
                            className="text-xs sm:text-sm md:text-md text-base-content/75 leading-relaxed"
                          >
                            {edge.desc}
                          </motion.p>
                        </div>
                      ))}
                    </div>
                  </div>
                </div>
              </CardContent>
            </Card>
          </motion.div>
        </motion.section>

        {/* --- SECTION 4: ACTION AND DANGER --- */}
        <motion.section
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, margin: "-100px" }}
          variants={staggerContainer}
          className="space-y-8"
        >
          <motion.div
            variants={fadeUp}
            className="flex items-center gap-4 border-b border-accent/20 pb-4"
          >
            <HandCoins className="w-9 h-9 md:w-13 md:h-13 pb-1.5 text-accent" />
            <h2 className="font-header text-2xl md:text-5xl text-base-content">
              Action &amp; Benefits
            </h2>
          </motion.div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            <Tilt
              tiltMaxAngleX={5}
              tiltMaxAngleY={5}
              glareEnable
              glareMaxOpacity={0.1}
              glareBorderRadius="24px"
              scale={1.02}
              className="h-full"
            >
              <motion.div
                variants={fadeUp}
                className="h-full bg-base-200/60 backdrop-blur-md border border-base-300 rounded-3xl p-6 md:p-8 shadow-xl relative overflow-hidden group"
              >
                <div className="absolute inset-0 bg-[url('/images/textures/darkpaper.png')] opacity-30 bg-bottom mix-blend-multiply group-hover:opacity-40 transition-opacity" />
                <div className="relative z-10">
                  <motion.h3
                    variants={fadeUp}
                    className="font-header text-2xl sm:text-3xl text-accent mb-4"
                  >
                    The Action Deck
                  </motion.h3>
                  <motion.p
                    variants={fadeUp}
                    className="text-sm sm:text-md md:text-lg text-base-content/80 leading-relaxed mb-4"
                  >
                    Combat is fast and chaotic. Instead of rolling dice to see
                    who goes first, Savage Worlds uses a standard deck of
                    playing cards (with the Jokers left in) to determine
                    Initiative.
                  </motion.p>
                  <motion.p
                    variants={fadeUp}
                    className="text-sm sm:text-md md:text-lg text-base-content/80 leading-relaxed"
                  >
                    The GM deals cards every round, and characters act in
                    descending order. If you draw a{" "}
                    <strong className="uppercase">Joker</strong>, you can act
                    whenever you want <em>and</em> you gain massive bonuses to
                    your rolls that round!
                  </motion.p>
                </div>
              </motion.div>
            </Tilt>

            <Tilt
              tiltMaxAngleX={5}
              tiltMaxAngleY={5}
              glareEnable
              glareMaxOpacity={0.1}
              glareBorderRadius="24px"
              scale={1.02}
              className="h-full"
            >
              <motion.div
                variants={fadeUp}
                className="h-full bg-linear-to-br from-base-200 to-base-300 border border-warning/30 rounded-3xl p-6 md:p-8 shadow-[0_0_30px_rgba(var(--color-warning),0.1)] relative overflow-hidden group"
              >
                <div className="absolute top-4 right-4 animate-pulse">
                  <Star className="w-16 h-16 text-warning/20" />
                </div>
                <div className="relative z-10">
                  <motion.h3
                    variants={fadeUp}
                    className="font-header text-2xl sm:text-3xl text-warning mb-4 flex items-center gap-3"
                  >
                    <Star className="w-6 h-6 text-warning fill-warning" />{" "}
                    Bennies
                  </motion.h3>
                  <motion.p
                    variants={fadeUp}
                    className="text-sm sm:text-md md:text-lg text-base-content/80 leading-relaxed mb-4"
                  >
                    Heroes are lucky. This is represented by "Bennies"
                    (benefits). You start every session with a handful of these
                    tokens. You can spend a Benny to{" "}
                    <strong className="uppercase">reroll</strong> any{" "}
                    <strong className="uppercase">Trait roll</strong>, or to
                    instantly shrug off devastating damage.
                  </motion.p>
                  <motion.p
                    variants={fadeUp}
                    className="text-sm sm:text-md md:text-lg text-base-content/80 leading-relaxed italic border-l-2 border-warning/50 pl-4"
                  >
                    When you roleplay well, make the table laugh, or do
                    something incredibly heroic, the GM will reward you with
                    more Bennies. Spend them freely!
                  </motion.p>
                </div>
              </motion.div>
            </Tilt>
          </div>
        </motion.section>

        {/* --- ADVANCED INFO (ACCORDIONS) --- */}
        <motion.section
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, margin: "-50px" }}
          variants={staggerContainer}
          className="max-w-3xl mx-auto"
        >
          <motion.div variants={fadeUp}>
            <motion.h3
              variants={fadeUp}
              className="font-header text-xl sm:text-2xl text-center text-base-content/50 uppercase tracking-widest mb-6"
            >
              Want to know more?
            </motion.h3>
            <Accordion
              type="single"
              collapsible
              className="w-full bg-base-200/50 rounded-2xl border border-base-300 px-4"
            >
              <AccordionItem value="item-1" className="border-b-base-300">
                <AccordionTrigger className="font-header text-sm sm:text-md md:text-lg hover:text-primary">
                  How do Modifiers work?
                </AccordionTrigger>
                <AccordionContent className="text-base-content/70 leading-relaxed">
                  While 4 is the standard Target Number, the GM might apply
                  modifiers based on the situation. Shooting in the dark might
                  impose a -2 penalty, while using a high-tech scope might grant
                  a +2 bonus. You apply these modifiers to your final roll
                  result before comparing it to the Target Number.
                </AccordionContent>
              </AccordionItem>
              <AccordionItem value="item-2" className="border-b-base-300">
                <AccordionTrigger className="font-header text-sm sm:text-md md:text-lg hover:text-secondary">
                  What happens when I take Wounds?
                </AccordionTrigger>
                <AccordionContent className="text-base-content/70 leading-relaxed">
                  When you take damage that simply meets your Toughness, you are{" "}
                  <strong className="uppercase">Shaken</strong> (distracted and
                  briefly stunned). If damage exceeds your Toughness by 4 or
                  more (a Raise), you take a{" "}
                  <strong className="uppercase">Wound</strong>. Player
                  characters can take up to 3 Wounds before they risk being
                  Incapacitated. Each Wound inflicts a -1 penalty to all your
                  Trait rolls.
                </AccordionContent>
              </AccordionItem>
              <AccordionItem value="item-3" className="border-none">
                <AccordionTrigger className="font-header text-sm sm:text-md md:text-lg hover:text-accent transition-colors">
                  What is an Extra?
                </AccordionTrigger>
                <AccordionContent className="text-base-content/70 leading-relaxed">
                  While players and major villains are{" "}
                  <strong className="uppercase">Wild Cards</strong>, the rest of
                  the world consists of{" "}
                  <strong className="uppercase">Extras</strong> (guards, generic
                  monsters, townsfolk). Extras do not roll a Wild Die, and they
                  typically go down after taking a single Wound, making combat
                  against hordes fast and furious!
                </AccordionContent>
              </AccordionItem>
            </Accordion>
          </motion.div>
        </motion.section>

        <div
          className="flex flex-col mx-auto text-center justify-center items-center gap-y-2 sm:gap-y-6
        border-3 border-base-200/40 rounded-3xl p-4 sm:p-10 mask-y-from-98% mask-x-from-98%
        drop-shadow-md drop-shadow-base-50 max-w-2xl"
        >
          <div className="absolute inset-0 bg-neutral/10 bg-bottom mix-blend-color-dodge group-hover:opacity-40 transition-opacity backdrop-blur-xs z-0 rounded-3xl" />
          <div className="absolute inset-0 bg-primary/20 bg-bottom mix-blend-color-burn group-hover:opacity-40 transition-opacity backdrop-blur-xs z-0 rounded-3xl" />
          <div className="absolute inset-0 bg-[url('/images/textures/glass.png')] opacity-10 mix-blend-color-dodge bg-center group-hover:opacity-40 transition-opacity rounded-3xl" />
          <motion.h3
            variants={fadeUp}
            className="text-[22px] sm:text-3xl uppercase font-semibold font-header tracking-[0.02rem] z-1 opacity-80"
          >
            Complete Ruleset Coming Soon
          </motion.h3>{" "}
          <Image src={logo2} className="w-38 sm:w-48 opacity-65 " alt="Logo" />
        </div>
      </div>
    </div>
  );
}
