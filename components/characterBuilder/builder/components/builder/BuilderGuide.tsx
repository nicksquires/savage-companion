"use client";

import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { X, BookOpen, ChevronDown } from "lucide-react";
import { clsx, type ClassValue } from "clsx";
import { twMerge } from "tailwind-merge";

// Utility for Tailwind class merging
function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}

// ==========================================
// GUIDE CONTENT
// ==========================================
const guideSections = [
  {
    title: "Concept",
    content: (
      <div className="space-y-2">
        <p>
          What, exactly, is the point of you? Try to communicate as much about
          your character in as few words as possible. A single line will do
          perfectly. For instance:{" "}
          <em>"A profoundly anxious clockmaker cursed with foresight."</em>
        </p>
        <p>
          Before we inevitably get bogged down in the dreadful mathematics of it
          all, decide who your hero is and how they intend to survive the week.
          This tab sets the narrative foundation for every mechanical choice you
          are about to make.
        </p>
      </div>
    ),
  },
  {
    title: "Biography",
    content: (
      <div className="space-y-2">
        <p>
          Ah, the tragic backstory. A heart-wrenching origin story might be the
          very thing that saves an otherwise utterly abhorrent character from
          the party's collective wrath.
        </p>
        <p>
          Biographies exist to explain exactly <em>why</em> your character
          behaves the way they do, and to chart their rather perilous
          development towards whatever destination they are rushing towards. Use
          this section to aid your roleplaying decisions moving forward.
        </p>
      </div>
    ),
  },
  {
    title: "Race",
    content: (
      <div className="space-y-2">
        <p>
          Choose your ancestry. By default, you are a remarkably unremarkable
          human.
        </p>
        <p>
          If this is your first time playing, human is highly recommended.
          Humans do not start with any mandatory cultural baggage or flaws;
          instead, they are highly adaptable and begin play with{" "}
          <span className="text-success">1</span> free Novice Edge of their
          choosing. Quite the bargain.
        </p>
        <p>
          Until you take steps to become a lizard or a sentient fungus, human
          you remain. Feeling creative? You can forge your own bespoke species
          using our race creation feature (Tutorial{" "}
          <a href="#" className="text-accent underline">
            here
          </a>
          , Builder{" "}
          <a href="#" className="text-accent underline">
            here
          </a>{" "}
          — coming soon!). Other races come bundled with a mix of lovely boosts
          and dreadful Hindrances to reflect their unique physiology.
        </p>
      </div>
    ),
  },
  {
    title: "Attributes",
    content: (
      <div className="space-y-2">
        <p>
          Define your core capabilities. You are judged on five metrics:
          Agility, Smarts, Spirit, Strength, and Vigor. These passive traits
          help you resist nasty effects and dictate how effortlessly you pick up
          related Skills.
        </p>
        <ul className="space-y-1 ml-4 list-disc text-primary/80">
          <li>
            <span className="text-base-content">
              <strong>The Baseline:</strong> All Attributes start at a{" "}
              <strong className="uppercase">d4</strong>.
            </span>
          </li>
          <li>
            <span className="text-base-content">
              <strong>The Points:</strong> You have{" "}
              <span className="text-success">5</span> points to squander here.
            </span>
          </li>
          <li>
            <span className="text-base-content">
              <strong>The Cost:</strong> Spending{" "}
              <span className="text-success">1</span> point steps an Attribute
              up one die type (e.g., <strong className="uppercase">d4</strong>{" "}
              to <strong className="uppercase">d6</strong>).
            </span>
          </li>
          <li>
            <span className="text-base-content">
              <strong>The Limit:</strong> During creation, an Attribute cannot
              be raised above a <strong className="uppercase">d12</strong>,
              unless your chosen race graciously grants a starting{" "}
              <strong className="uppercase">d6</strong>, effectively raising the
              roof to <strong className="uppercase">d12+1</strong>.
            </span>
          </li>
        </ul>
      </div>
    ),
  },
  {
    title: "Skills",
    content: (
      <div className="space-y-2">
        <p>
          The things you actually <em>do</em>. Skills are active abilities used
          to shoot, sneak, or sweet-talk your way out of impending doom.
        </p>
        <ul className="space-y-1 ml-4 list-disc text-primary/80">
          <li>
            <span className="text-base-content">
              <strong>Core Skills:</strong> Congratulations, you get a{" "}
              <strong className="uppercase">d4</strong> in Athletics, Common
              Knowledge, Notice, Persuasion, and Stealth for absolutely free.
            </span>
          </li>
          <li>
            <span className="text-base-content">
              <strong>The Points:</strong> You have{" "}
              <span className="text-success">12</span> points (or up to{" "}
              <span className="text-success">15</span>, setting depending) to
              allocate.
            </span>
          </li>
          <li>
            <span className="text-base-content">
              <strong>The Cost:</strong> Raising a skill costs{" "}
              <span className="text-success">1</span> point per die step,
              provided it remains equal to or lower than its linked Attribute.
            </span>
          </li>
          <li>
            <span className="text-base-content">
              <strong>The Penalty:</strong> Exceeding the linked Attribute costs{" "}
              <span className="text-success">2</span> points per step.
              Attempting an entirely untrained skill? You'll be rolling a{" "}
              <strong className="uppercase">d4-2</strong>. Best of luck with
              that.
            </span>
          </li>
        </ul>
      </div>
    ),
  },
  {
    title: "Hindrances",
    content: (
      <div className="space-y-2">
        <p>
          Flaws that build character, quite literally. These represent your
          internal neuroses and external baggage. Taking them rewards you with
          points to buy much nicer things.
        </p>
        <p>
          Do remember, your Game Master is far more likely to reward you with
          Bennies if you actively roleplay your Hindrances—especially when it
          results in terrible, hilarious consequences. You may eventually
          overcome a Hindrance at the GM's discretion using an Advance.
        </p>
        <ul className="space-y-1 ml-4 list-disc text-primary/80">
          <li>
            <span className="text-base-content">
              <strong>The Limit:</strong> You may scrape together a maximum of{" "}
              <span className="text-success">4</span> points from Hindrances.
            </span>
          </li>
          <li>
            <span className="text-base-content">
              <strong>The Values:</strong> Major Hindrances are worth{" "}
              <span className="text-success">2</span> points, Minors are worth{" "}
              <span className="text-success">1</span> point. A classic build
              takes one Major and two Minors.
            </span>
          </li>
          <li>
            <span className="text-base-content">
              <strong>The Rewards:</strong>{" "}
              <span className="text-success">2</span> points buys an Attribute
              step or a new Edge. <span className="text-success">1</span> point
              buys a Skill step or doubles your starting wealth.
            </span>
          </li>
        </ul>
      </div>
    ),
  },
  {
    title: "Edges",
    content: (
      <div className="space-y-2">
        <p>
          The special perks that elevate you above the common rabble. Edges are
          unique features, combat maneuvers, and background privileges.
        </p>
        <ul className="space-y-1 ml-4 list-disc text-primary/80">
          <li>
            <span className="text-base-content">
              <strong>Requirements:</strong> You must meet the prerequisites. As
              you are currently a Novice, you may only select Novice-level
              Edges. Ensure your Attributes and Skills are up to snuff.
            </span>
          </li>
          <li>
            <span className="text-base-content">
              <strong>Acquisition:</strong> Buy them with points squeezed from
              your Hindrances, or just be Human and get one free. Bear in mind
              you can take a new Edge with each Advance you earn, and some Edges
              even feature 'Improved' versions for the truly ambitious.
            </span>
          </li>
        </ul>
      </div>
    ),
  },
  {
    title: "Powers",
    content: (
      <div className="space-y-2">
        <p>
          Magic, miracles, and mad science. If you intend to just hit things
          with a heavy piece of metal instead, feel free to skip this entirely.
        </p>
        <p>
          To hurl fireballs, you must first acquire the Arcane Background Edge.
          This dictates your arcane Skill (like Spellcasting or Psionics),
          grants a starting pool of Power Points (which are spent to cast said
          spells), and provides a handful of Novice powers to wreak havoc with.
        </p>
      </div>
    ),
  },
  {
    title: "Gear",
    content: (
      <div className="space-y-2">
        <p>
          Tools of the adventuring trade. You ostensibly begin with basic
          clothes, so you won't be entirely indecent upon arrival.
        </p>
        <ul className="space-y-1 ml-4 list-disc text-primary/80">
          <li>
            <span className="text-base-content">
              <strong>Starting Wealth:</strong> The default rules graciously
              provide you with <span className="text-success">$500</span> to
              purchase weapons, armor, and adventuring paraphernalia.
            </span>
          </li>
          <li>
            <span className="text-base-content">
              <strong>Protection:</strong> Strapping on Armor directly increases
              your Toughness. Highly recommended for continued survival.
            </span>
          </li>
          <li>
            <span className="text-base-content">
              <strong>Tip:</strong> Always buy some rope. You never know when
              you'll need some rope. Truly, it is the thinking hero's tool.
            </span>
          </li>
        </ul>
      </div>
    ),
  },
  {
    title: "Advancement",
    content: (
      <div className="space-y-2">
        <p>
          How you claw your way from a useless nobody to a terrifying legend.
        </p>
        <ul className="space-y-1 ml-4 list-disc text-primary/80">
          <li>
            <span className="text-base-content">
              <strong>The Pace:</strong> By default, it takes{" "}
              <span className="text-success">4</span> Advances to rank up.
            </span>
          </li>
          <li>
            <span className="text-base-content">
              <strong>The Hierarchy:</strong> You begin as a NOVICE. Survive
              long enough, and you shall progress to SEASONED, VETERAN, HEROIC,
              and finally, LEGENDARY. Each Advance makes you incrementally less
              likely to die horribly.
            </span>
          </li>
        </ul>
      </div>
    ),
  },
  {
    title: "Summary",
    content: (
      <div className="space-y-2">
        <p>
          The final reckoning. Review your character sheet and Derived Stats.
          The builder has kindly done the dreadful mathematics for you based on
          your prior choices:
        </p>
        <ul className="space-y-1 ml-4 list-disc text-primary/80">
          <li>
            <span className="text-base-content">
              <strong>Pace:</strong> Standard is{" "}
              <span className="text-success">6</span> inches on the tabletop
              (unless you've done something to modify it).
            </span>
          </li>
          <li>
            <span className="text-base-content">
              <strong>Parry:</strong> How remarkably hard you are to hit in
              melee. Mathematically: <span className="text-success">2</span>{" "}
              plus half your Fighting die.
            </span>
          </li>
          <li>
            <span className="text-base-content">
              <strong>Toughness:</strong> Your meat-shield threshold before
              taking a proper Wound. Calculated as{" "}
              <span className="text-success">2</span> plus half your Vigor die,
              plus the value of your equipped Armor.
            </span>
          </li>
        </ul>
      </div>
    ),
  },
];

// ==========================================
// COMPONENT PROPS & LOGIC
// ==========================================
interface BuilderGuideProps {
  isOpen: boolean;
  onClose: () => void;
}

export default function BuilderGuide({ isOpen, onClose }: BuilderGuideProps) {
  const [openSection, setOpenSection] = useState<string | null>(null);

  const toggleSection = (title: string) => {
    setOpenSection((prev) => (prev === title ? null : title));
  };

  return (
    <AnimatePresence>
      {isOpen && (
        <>
          {/* BACKDROP (Glassmorphism & Darkness) */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={onClose}
            className="fixed inset-0 bg-black/60 backdrop-blur-sm z-40"
          />

          {/* DRAWER PANEL */}
          <motion.div
            initial={{ x: "100%" }}
            animate={{ x: 0 }}
            exit={{ x: "100%" }}
            transition={{ type: "spring", damping: 25, stiffness: 200 }}
            className={cn(
              "fixed top-0 right-0 h-full w-full sm:w-md z-50",
              "bg-base-100/95 border-l border-primary/30 shadow-2xl",
              "flex flex-col overflow-hidden",
            )}
          >
            {/* Background Textures */}
            <div className="absolute inset-0 bg-[url('/images/textures/darkpaper.png')] opacity-40 mix-blend-multiply pointer-events-none z-0" />
            <div className="absolute inset-0 bg-[url('/images/textures/glass.png')] opacity-10 mix-blend-overlay pointer-events-none z-0" />
            <div className="absolute top-0 left-0 w-1 h-full bg-linear-to-b from-primary/50 via-accent/30 to-transparent z-0" />

            {/* HEADER */}
            <div className="p-6 relative z-10 bg-base-200/80 backdrop-blur-md border-b border-primary/20 flex justify-between items-center shadow-md">
              <div className="flex items-center gap-3">
                <div className="p-2 rounded-lg bg-primary/10 border border-primary/30 shadow-inner">
                  <BookOpen className="w-6 h-6 text-primary" />
                </div>
                <h2 className="font-header text-2xl tracking-wide text-transparent bg-clip-text bg-linear-to-r from-base-content to-base-content/70">
                  Builder Guide
                </h2>
              </div>
              <button
                onClick={onClose}
                className="btn btn-ghost btn-circle hover:bg-error/20 hover:text-error transition-colors"
                aria-label="Close Guide"
              >
                <X className="w-5 h-5" />
              </button>
            </div>

            {/* SCROLLABLE CONTENT */}
            <div className="flex-1 overflow-y-auto p-4 sm:p-6 space-y-4 relative z-10 scrollbar-thin scrollbar-thumb-primary/20 scrollbar-track-transparent">
              {guideSections.map((section) => {
                const isActive = openSection === section.title;

                return (
                  <div
                    key={section.title}
                    className={cn(
                      "rounded-xl border transition-all duration-300 overflow-hidden",
                      isActive
                        ? "bg-base-200/80 border-primary/40 shadow-[0_0_15px_rgba(var(--color-primary),0.1)]"
                        : "bg-base-200/40 border-base-300 hover:border-primary/20 hover:bg-base-200/60",
                    )}
                  >
                    {/* ACCORDION TRIGGER */}
                    <button
                      onClick={() => toggleSection(section.title)}
                      className="w-full flex items-center justify-between p-4 text-left focus:outline-none"
                    >
                      <span
                        className={cn(
                          "font-header text-xl transition-colors",
                          isActive ? "text-primary" : "text-base-content/80",
                        )}
                      >
                        {section.title}
                      </span>
                      <motion.div
                        animate={{ rotate: isActive ? 180 : 0 }}
                        transition={{ duration: 0.2 }}
                      >
                        <ChevronDown
                          className={cn(
                            "w-5 h-5",
                            isActive ? "text-primary" : "text-base-content/50",
                          )}
                        />
                      </motion.div>
                    </button>

                    {/* ACCORDION CONTENT */}
                    <AnimatePresence initial={false}>
                      {isActive && (
                        <motion.div
                          key="content"
                          initial="collapsed"
                          animate="open"
                          exit="collapsed"
                          variants={{
                            open: { opacity: 1, height: "auto" },
                            collapsed: { opacity: 0, height: 0 },
                          }}
                          transition={{
                            duration: 0.3,
                            ease: [0.04, 0.62, 0.23, 0.98],
                          }}
                        >
                          <div className="px-4 pb-5 pt-1 text-sm leading-relaxed text-base-content/80 border-t border-primary/10 mt-2">
                            {section.content}
                          </div>
                        </motion.div>
                      )}
                    </AnimatePresence>
                  </div>
                );
              })}
            </div>
          </motion.div>
        </>
      )}
    </AnimatePresence>
  );
}
