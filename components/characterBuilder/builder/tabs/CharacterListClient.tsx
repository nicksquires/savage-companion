"use client";

import { useState, useTransition } from "react";
import { useRouter } from "next/navigation";
import { motion, AnimatePresence, Variants } from "framer-motion";
import Tilt from "react-parallax-tilt";
import {
  PenIcon,
  Trash2,
  Plus,
  Shield,
  Swords,
  Zap,
  Coins,
  ScrollText,
  User,
  Lock,
  Move,
  Brain,
  Flame,
  BicepsFlexed,
  Activity,
} from "lucide-react";
import DeleteModal from "@/components/characterBuilder/builder/modals/DeleteModal";
import {
  createNewCharacter,
  deleteCharacter,
} from "../../../../app/(main)/characters/[id]/builder/api/draft/characterActions";
import { CharListCardOrnament } from "../components/ui/CharListCardOrnament";
import { toRomanNumeral } from "@/lib/utils/toRomanNumeral";

// --- ATTRIBUTE DATA MATRIX ---
const ATTRIBUTE_DATA = {
  AGILITY: {
    icon: Move,
    color: "text-success",
    description: "Fighting, Shooting, Stealth...",
  },
  SMARTS: {
    icon: Brain,
    color: "text-info",
    description: "Noticing, Hacking, Occult...",
  },
  SPIRIT: {
    icon: Flame,
    color: "text-warning",
    description: "Magic, Willpower, Intimidation...",
  },
  STRENGTH: {
    icon: BicepsFlexed,
    color: "text-error",
    description: "Damage, Athletics, Brawn...",
  },
  VIGOR: {
    icon: Activity,
    color: "text-accent",
    description: "Toughness, Vitality, Soaking Wounds...",
  },
} as const;

// Extended type to accommodate the premium display requirements
type Character = {
  id: string;
  name: string;
  concept: string | null;
  rank: string;
  builderState: any;
  race?: string;
  campaign?: string;
  advances?: { earned: number; unspent: number };
  attributes?: Record<string, string>; // e.g., { Agility: "d8", Smarts: "d6" }
  stats?: {
    pace: number;
    parry: number;
    toughness: number;
    armor: number;
    wealth: number;
  };
  imageUrl?: string;
};

type Role = "FREE" | "BASIC" | "PREMIUM" | "ADMIN";

// --- MOTION VARIANTS ---
const containerVariants: Variants = {
  hidden: { opacity: 0 },
  show: {
    opacity: 1,
    transition: { staggerChildren: 0.1, delayChildren: 0.2 },
  },
};

const itemVariants: Variants = {
  hidden: { opacity: 0, y: 30, scale: 0.95 },
  show: {
    opacity: 1,
    y: 0,
    scale: 1,
    transition: { type: "spring", stiffness: 300, damping: 24 },
  },
};

// --- MAIN COMPONENT ---
export default function CharacterListClient({
  characters,
  userRole = "FREE", // Defaulting for example
}: {
  characters: Character[];
  userRole?: Role;
}) {
  const router = useRouter();
  const [isPending, startTransition] = useTransition();
  const [showDeleteModal, setShowDeleteModal] = useState(false);
  const [deleteId, setDeleteId] = useState<string | null>(null);

  const draft = characters.find((c) => c.builderState !== null);
  const hasDraft = !!draft;

  const handleAction = () => {
    if (hasDraft) {
      router.push(`/characters/${draft.id}/builder/concept`);
    } else {
      startTransition(() => {
        createNewCharacter();
      });
    }
  };

  const handleConfirmDelete = () => {
    if (deleteId) {
      startTransition(() => {
        deleteCharacter(deleteId);
        setShowDeleteModal(false);
        setDeleteId(null);
      });
    }
  };

  // Slot Math
  const getSlotLimit = (role: Role) => {
    switch (role) {
      case "ADMIN":
        return Infinity;
      case "PREMIUM":
        return 100;
      case "BASIC":
        return 20;
      default:
        return 5;
    }
  };

  const maxSlots = getSlotLimit(userRole);
  const usedSlots = characters.length;
  const emptySlotsCount =
    maxSlots === Infinity ? 1 : Math.max(0, maxSlots - usedSlots);

  return (
    <div className="min-h-full bg-base-100 text-base-content relative overflow-hidden pb-24">
      {/* Ambient Background Textures */}
      <div
        className="pointer-events-none absolute inset-0 mix-blend-overlay opacity-25 
        bg-[url('/images/textures/glass.png')] bg-cover bg-center z-0"
      />

      <div
        className="pointer-events-none absolute inset-0 mix-blend-screen opacity-15 
        bg-[url('/images/textures/darkpaper.png')] bg-cover z-0"
      />

      <div className="relative max-w-full mx-auto px-6 md:px-12 pt-12">
        {/* HERO HEADER */}
        <header className="flex flex-col md:flex-row md:items-end justify-between gap-6 border-b-2 border-primary/20 pb-6 relative">
          <div className="absolute bottom-0 left-0 w-1/3 h-px bg-linear-to-r from-primary via-primary/50 to-transparent shadow-[0_0_15px_rgba(var(--color-primary),0.8)]" />

          <div>
            <h1 className="font-builder-header 2xl:text-7xl text-5xl tracking-tight text-transparent bg-clip-text bg-linear-to-br from-white via-primary to-base-500 drop-shadow-lg">
              Character Collection
            </h1>
            <p className="font-body sm:inline hidden text-primary/80 mt-1 md:mt-2 text-lg md:text-xl italic">
              Every hero leaves a mark on the world.
            </p>
          </div>
        </header>

        {/* SLOTS TRACKER */}
        <div className="flex justify-end mt-4 mb-8 pr-2">
          {maxSlots === Infinity ? (
            <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-base-200/80 border border-primary/30 shadow-[0_0_10px_rgba(var(--color-primary),0.2)] backdrop-blur-sm">
              <ScrollText className="w-4 h-4 text-primary" />
              <span className="font-bold text-sm tracking-widest uppercase">
                Unlimited Slots
              </span>
            </div>
          ) : (
            <div className="inline-flex flex-col items-end">
              <span className="font-bold text-2xl tracking-widest">
                <span className="text-white">{usedSlots}</span>
                <span className="text-base-content/40 mx-1">/</span>
                <span className="text-primary">{maxSlots}</span>
              </span>
              <span className="text-xs uppercase tracking-widest text-base-content/50">
                Slots Used
              </span>
            </div>
          )}
        </div>

        {/* CHARACTER GRID */}
        {characters.length === 0 ? (
          <EmptyState onAction={handleAction} hasDraft={hasDraft} />
        ) : (
          <motion.div
            variants={containerVariants}
            initial="hidden"
            animate="show"
            className="grid grid-cols-1 md:grid-cols-1 lg:grid-cols-2 xl:grid-cols-2 2xl:grid-cols-3 gap-10"
          >
            {characters.map((char) => (
              <motion.div key={char.id} variants={itemVariants}>
                <CharacterCard
                  char={char}
                  isDraft={char.builderState !== null}
                  onDelete={() => {
                    setDeleteId(char.id);
                    setShowDeleteModal(true);
                  }}
                />
              </motion.div>
            ))}

            {/* EMPTY SLOTS */}
            {Array.from({ length: emptySlotsCount }).map((_, idx) => {
              const isDraftPending = hasDraft && idx === 0;
              const isDisabled = hasDraft && !isDraftPending;

              return (
                <motion.div key={`empty-${idx}`} variants={itemVariants}>
                  <EmptySlotCard
                    onClick={isDisabled ? undefined : handleAction}
                    isDraftPending={isDraftPending}
                    isDisabled={Boolean(true)}
                    // isDisabled={isDisabled}
                  />
                </motion.div>
              );
            })}
          </motion.div>
        )}
      </div>

      <DeleteModal
        isOpen={showDeleteModal}
        onClose={() => setShowDeleteModal(false)}
        onConfirm={handleConfirmDelete}
        title={draft?.id === deleteId ? "Delete Draft?" : "Archive Character?"}
        message={
          draft?.id === deleteId
            ? "This will permanently delete the draft. This action cannot be undone."
            : "This will archive the character. You can restore it later."
        }
      />
    </div>
  );
}

// --- SUBCOMPONENTS ---

function CharacterCard({
  char,
  isDraft,
  onDelete,
}: {
  char: Character;
  isDraft: boolean;
  onDelete: () => void;
}) {
  const race = char.race || "Human";
  const campaign = char.campaign || "INDEPENDENT";
  const advances = char.advances || { earned: 0, unspent: 0 };

  return (
    <Tilt
      tiltMaxAngleX={4}
      tiltMaxAngleY={4}
      scale={1.02}
      transitionSpeed={1500}
      className="h-full drop-shadow-lg drop-shadow-primary/40
      mask-y-from-97% mask-x-from-95%"
    >
      {/* Top Border Roman Numeral */}
      <div
        className="absolute inset-0 top-3 sm:top-4 z-1 font-serif text-md opacity-85 flex flex-row justify-center w-full
       drop-shadow-base-content drop-shadow-md max-h-8"
      >
        •<p className="px-10">{toRomanNumeral(1)}</p>•
      </div>

      {/* Bottom Border Decoration */}
      <div
        className="absolute bottom-4 z-1 font-serif drop-shadow-base-content drop-shadow-2xl
      text-sm opacity-70 flex flex-row justify-center w-full max-h-8"
      >
        •<p className="px-10">•</p>•
      </div>

      {/* Card Container */}
      <div
        className="group relative h-full w-full flex flex-col overflow-hidden transition-all 
      min-h-140 rounded-4xl"
      >
        {/* SVG ORNAMENT (Acts as the full background & border) */}
        <div className="absolute rounded-4xl inset-0 z-0 pointer-events-none group-hover:drop-shadow-[0_0_20px_rgba(var(--color-primary),0.3)] transition-all duration-500">
          <CharListCardOrnament
            className="rounded-4xl"
            shadowColor="var(--color-black)"
            accentColor="var(--color-primary)"
            borderColor="var(--color-base-200)"
            innerColor="var(--color-base-100)"
          />
        </div>

        {/* Portrait - Offset to stay inside the SVG border */}
        <div className="absolute top-8 right-8 w-1/2 h-1/2 opacity-30 transition-opacity group-hover:opacity-60 mask-[linear-gradient(to_bottom_left,black_20%,transparent_80%)] pointer-events-none">
          {char.imageUrl ? (
            <img
              src={char.imageUrl}
              alt="portrait"
              className="w-full h-full object-cover object-top"
            />
          ) : (
            <User className="w-full h-full p-4 text-primary/50" />
          )}
        </div>

        {/* Main Content */}
        <div
          className="relative flex flex-col h-full px-10 sm:px-18 md:px-24 lg:px-14 xl:px-20 2xl:px-12 py-24 sm:py-24
         drop-shadow-lg drop-shadow-black/80"
        >
          {/* Header */}
          <div className="mb-8">
            <div className="flex flex-row items-center justify-between">
              <h2
                className={`font-builder-body font-bold text-base-content/85 drop-shadow-primary/50 
                  drop-shadow-sm tracking-wide max-w-4/5
                ${
                  char.name.length > 12
                    ? "text-2xl sm:text-3xl"
                    : "text-2xl sm:text-3xl"
                  // : "text-3xl sm:text-4xl"
                }
              `}
              >
                {char.name || "Unknown Hero"} Bolowitz
              </h2>
              {/* DRAFT BADGE */}
              {isDraft ? (
                <button
                  className="absolute top-24 sm:top-22 lg:top-24.5 right-10 sm:right-16 md:right-20 lg:right-12 xl:right-20 2xl:right-12 px-2 sm:px-3 py-1 rounded-sm bg-warning/20 border border-warning/50 text-warning text-[10px] sm:text-[11px] font-bold uppercase tracking-widest 
                shadow-[0_0_10px_rgba(var(--color-warning),0.4)] backdrop-blur-lg"
                >
                  Draft
                </button>
              ) : (
                <p>hi</p>
              )}
            </div>
            <div className="text-xs sm:text-sm uppercase tracking-widest text-primary/90 mt-1 pl-1">
              {race} • {char.rank}
            </div>
            <p className="text-base-content/80 italic my-4 line-clamp-2">
              "{char.concept || "A wandering soul seeking purpose."}"
            </p>

            {/* Campaign & Advances - Moved above buttons */}
            <div className="flex justify-between items-center mt-2 mx-2 sm:mx-6">
              <div className="flex items-center gap-2 mt-4">
                <div className="w-2.5 h-2.5 rounded-full bg-primary animate-pulse" />
                <span className="text-xs sm:text-sm text-base-content/75 uppercase tracking-wider">
                  {campaign}
                </span>
              </div>

              <div className="text-center -mb-6">
                <div className="text-xs lg:text-sm uppercase tracking-widest text-base-content/90 mb-0.5">
                  Advances
                </div>
                <div className="lg:text-3xl text-2xl font-header font-bold text-success flex justify-center gap-1.5">
                  {advances.earned}
                  {advances.unspent > 0 && (
                    <span className="text-sm bg-success/20 border border-success/40 px-2 py-0.5 rounded">
                      +{advances.unspent}
                    </span>
                  )}
                </div>
              </div>
            </div>
          </div>

          {/* Stats Strip - Updated Toughness */}
          <div
            className="bg-base-100/20 backdrop-blur-xs border-y border-base-content/20 px-3 py-3 sm:p-4 
          flex justify-between items-center text-center mb-0.5 sm:mb-2 rounded-4xl"
          >
            <StatBadge
              icon={<Zap className="w-3 h-3 sm:w-4 sm:h-4 text-accent" />}
              label="Pace"
              value={char.stats?.pace || 6}
            />
            <StatBadge
              icon={<Swords className="w-3 h-3 sm:w-4 sm:h-4 text-error" />}
              label="Parry"
              value={char.stats?.parry || 2}
            />
            <StatBadge
              icon={<Shield className="w-3 h-3 sm:w-4 sm:h-4 text-info" />}
              label="Tough"
              value={char.stats?.toughness || 4}
            />
            <StatBadge
              icon={<Coins className="w-3 h-3 sm:w-4 sm:h-4 text-success" />}
              label="Wealth"
              value={`$${char.stats?.wealth || 500}`}
            />
          </div>

          {/* Attributes Matrix */}
          <div className="grow flex flex-col justify-center mt-4">
            <div className="grid grid-cols-5 gap-1.5">
              <AttrChip
                attrKey="AGILITY"
                dice={char.attributes?.AGILITY || "d4"}
              />
              <AttrChip
                attrKey="SMARTS"
                dice={char.attributes?.SMARTS || "d4"}
              />
              <AttrChip
                attrKey="SPIRIT"
                dice={char.attributes?.SPIRIT || "d4"}
              />
              <AttrChip
                attrKey="STRENGTH"
                dice={char.attributes?.STRENGTH || "d4"}
              />
              <AttrChip attrKey="VIGOR" dice={char.attributes?.VIGOR || "d4"} />
            </div>
          </div>

          {/* Action Buttons */}
          <div className="grid cols-1 sm:flex gap-x-8 lg:gap-4 xl:gap-8 mx-4 sm:mx-0 gap-y-6 sm:gap-y-0 mt-10 text-sm sm:text-xs md:text-sm lg:text-xs 2xl:sm">
            <a
              href={
                isDraft
                  ? `/characters/${char.id}/builder/concept`
                  : `/characters/${char.id}/builder`
              }
              className={`flex-row sm:flex-1 flex justify-center items-center gap-2 rounded-md font-bold uppercase 
                tracking-widest transition-all py-3.25 sm:py-3.5
                ${
                  isDraft
                    ? "bg-warning text-warning-foreground hover:bg-warning/90 animate-pulse"
                    : "bg-primary hover:bg-primary/90 text-primary-foreground"
                }`}
            >
              <PenIcon className="w-4 h-4" />
              {isDraft ? "RESUME DRAFT" : "EDIT"}
            </a>

            <button
              onClick={onDelete}
              className="flex-row sm:flex-1 flex justify-center items-center gap-2 py-3 sm:py-3.5 rounded-md font-bold uppercase 
              tracking-widest bg-error/20 hover:bg-error/30 hover:text-error hover:cursor-pointer 
              transition-all border border-base-content/10"
            >
              <Trash2 className="w-4 h-4" />
              DELETE
            </button>
          </div>
        </div>
      </div>
    </Tilt>
  );
}

function StatBadge({
  icon,
  label,
  value,
}: {
  icon: React.ReactNode;
  label: string;
  value: string | number;
}) {
  return (
    <div className="flex flex-col items-center">
      <div className="text-white font-header text-md sm:text-lg flex items-center shadow-black drop-shadow-md">
        {value}
      </div>
      <div className="flex items-center gap-0.5 sm:gap-1 text-[8px] sm:text-[9px] uppercase tracking-widest text-base-content/70 mt-0.5">
        {icon} {label}
      </div>
    </div>
  );
}

function AttrChip({
  attrKey,
  dice,
}: {
  attrKey: keyof typeof ATTRIBUTE_DATA;
  dice: string;
}) {
  const data = ATTRIBUTE_DATA[attrKey];
  const Icon = data.icon;

  return (
    <div className="flex flex-col items-center justify-center p-3 rounded-xl bg-black/40 border border-base-content/10 hover:border-base-content/30 transition-colors">
      <Icon className={`w-5 h-5 mb-2 ${data.color}`} />
      <span className="text-[10px] font-bold text-base-content/70">
        {attrKey.substring(0, 3)}
      </span>
      <span className="font-header text-white text-sm mt-1">{dice}</span>
    </div>
  );
}

function EmptySlotCard({
  onClick,
  isDraftPending,
  isDisabled,
}: {
  onClick?: () => void;
  isDraftPending: boolean;
  isDisabled: boolean;
}) {
  return (
    <button
      onClick={onClick}
      disabled={isDisabled}
      className={`group w-full h-full min-h-140 flex flex-col items-center justify-center rounded-4xl border-2 border-dashed transition-all relative overflow-hidden
        ${
          isDisabled
            ? "border-base-700 bg-base-700/20 opacity-50 cursor-not-allowed"
            : "border-primary/30 bg-base-200/10 hover:bg-base-200/30 hover:border-primary/60 cursor-pointer"
        }`}
    >
      <div className="w-20 h-20 rounded-2xl bg-base-100/80 border flex items-center justify-center mb-6">
        {isDisabled ? (
          <Lock className="w-8 h-8 text-base-700" />
        ) : (
          <Plus
            className={`w-10 h-10 ${isDraftPending ? "text-warning" : "text-primary/70 group-hover:text-primary"}`}
          />
        )}
      </div>

      <span
        className={`font-header tracking-widest text-2xl ${isDisabled ? "text-base-700" : isDraftPending ? "text-warning" : "text-primary/80 group-hover:text-primary"}`}
      >
        {isDisabled ? "SLOT LOCKED" : "CREATE HERO"}
      </span>
    </button>
  );
}

function EmptyState({
  onAction,
  hasDraft,
}: {
  onAction: () => void;
  hasDraft: boolean;
}) {
  return (
    <motion.div
      initial={{ opacity: 0, scale: 0.95 }}
      animate={{ opacity: 1, scale: 1 }}
      className="w-full max-w-2xl mx-auto mt-12 relative"
    >
      <div className="absolute -inset-1 bg-linear-to-r from-primary/30 via-accent/30 to-primary/30 rounded-2xl blur-xl opacity-50 animate-pulse" />
      <div className="relative bg-base-200 border border-primary/30 rounded-2xl p-12 text-center shadow-2xl overflow-hidden">
        <div className="mx-auto w-24 h-24 mb-6 relative">
          <div className="absolute inset-0 border-4 border-base-700 rounded-full animate-[spin_10s_linear_infinite]" />
          <div className="absolute inset-2 border-2 border-primary/50 border-dashed rounded-full animate-[spin_15s_linear_infinite_reverse]" />
          <Swords className="w-10 h-10 text-primary absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2" />
        </div>

        <h2 className="font-header text-4xl text-white mb-4">
          Your Legend Begins Here
        </h2>
        <p className="text-base-content/60 text-lg max-w-md mx-auto mb-8 font-body">
          The table is set. The dice are waiting. Forge a new hero and step into
          the Savage Worlds.
        </p>

        <button
          onClick={onAction}
          className={`btn btn-lg px-8 tracking-widest text-white hover:-translate-y-1 transition-all ${
            hasDraft
              ? "btn-warning shadow-[0_0_20px_rgba(var(--color-warning),0.4)] hover:shadow-[0_0_30px_rgba(var(--color-warning),0.6)]"
              : "btn-primary shadow-[0_0_20px_rgba(var(--color-primary),0.4)] hover:shadow-[0_0_30px_rgba(var(--color-primary),0.6)]"
          }`}
        >
          <Plus className="w-5 h-5 mr-2" />
          {hasDraft ? "RESUME DRAFT" : "FORGE CHARACTER"}
        </button>
      </div>
    </motion.div>
  );
}
