"use client";

import { useEffect, useState, useRef } from "react";
import { useCharacterBuilder } from "@/stores/characterBuilderStore";
import { motion, useMotionValue, useSpring, useTransform } from "framer-motion";
import { getAvailableRaces } from "@/app/(main)/characters/[id]/builder/api/draft/characterActions";
import RaceCreationModal from "@/components/characterBuilder/builder/modals/RaceCreationModal";
import Image from "next/image";
import { Plus, CheckCircle, Sparkles, PersonStanding } from "lucide-react";
import { useParams } from "next/navigation";
import { RaceWithAbilities } from "@/lib/types/CharacterBuilder";
import { RacialAbilityItem } from "../components/race/RacialAbilityItem";

// --- CINEMATIC CARD COMPONENT ---
function CinematicRaceCard({
  race,
  isSelected,
  onSelect,
}: {
  race: RaceWithAbilities;
  isSelected: boolean;
  onSelect: () => void;
}) {
  const [isFlipped, setIsFlipped] = useState(false);
  const cardRef = useRef<HTMLDivElement>(null);

  // 3D Tilt Math
  const x = useMotionValue(0);
  const y = useMotionValue(0);
  const mouseXSpring = useSpring(x, { stiffness: 700, damping: 40 });
  const mouseYSpring = useSpring(y, { stiffness: 700, damping: 40 });
  const rotateX = useTransform(mouseYSpring, [-0.5, 0.5], ["25deg", "-25deg"]);
  const rotateY = useTransform(mouseXSpring, [-0.5, 0.5], ["-25deg", "25deg"]);

  const handleMouseMove = (e: React.MouseEvent<HTMLDivElement>) => {
    if (!cardRef.current || isFlipped) return; // Disable tilt when flipped to make reading easier
    const rect = cardRef.current.getBoundingClientRect();
    const width = rect.width;
    const height = rect.height;
    const mouseX = e.clientX - rect.left;
    const mouseY = e.clientY - rect.top;
    const xPct = mouseX / width - 0.5;
    const yPct = mouseY / height - 0.5;
    x.set(xPct);
    y.set(yPct);
  };

  const handleMouseLeave = () => {
    x.set(0);
    y.set(0);
  };

  return (
    <div className="relative h-112.5 w-full" style={{ perspective: "1000px" }}>
      {/* Selection Aura */}
      {isSelected && (
        <div className="absolute -inset-2 bg-primary/50 blur-xl rounded-2xl z-0 animate-pulse" />
      )}

      <motion.div
        ref={cardRef}
        onMouseMove={handleMouseMove}
        onMouseLeave={handleMouseLeave}
        style={{
          rotateX: isFlipped ? 0 : rotateX,
          rotateY: isFlipped ? 0 : rotateY,
          transformStyle: "preserve-3d",
        }}
        animate={{ rotateY: isFlipped ? 180 : 0 }}
        transition={{
          duration: 0.6,
          type: "spring",
          stiffness: 200,
          damping: 20,
        }}
        className={`relative w-full h-full min-w-72 rounded-2xl shadow-xl cursor-pointer border-2 transition-colors duration-300 z-10 
          ${isSelected ? "border-primary ring-1 ring-primary/20" : "border-base-500/25"}`}
      >
        {/* ================= FRONT OF CARD ================= */}
        <div
          onClick={() => setIsFlipped(true)}
          className="absolute inset-0 w-full h-full bg-base-200 rounded-2xl overflow-hidden"
          style={{ backfaceVisibility: "hidden" }}
        >
          {!race.imageUrl ? (
            <Image
              src={`/images/races/${race.slug}.jpg`}
              alt={race.name}
              fill
              className="object-cover z-0"
            />
          ) : (
            <div className="w-full h-full flex flex-col items-center justify-center text-base-content/20 bg-linear-to-br from-base-500 to-base-200">
              <span className="text-9xl mb-12">🧬</span>
            </div>
          )}

          {isSelected && (
            <div className="absolute top-4 right-4 bg-primary text-primary-content rounded-full p-2 shadow-[0_0_15px_rgba(var(--p),0.5)] z-20">
              <CheckCircle className="w-6 h-6" />
            </div>
          )}

          {/* Ornate Banner */}
          <div
            className={`${isFlipped ? "z-0" : "z-1"}relative mt-70 justify-end align-bottom items-baseline w-full 
          bg-background/90 backdrop-blur-[2px] border-y-2 border-primary/70 py-3 text-center shadow-2xl`}
          >
            <h3 className="font-header text-4xl text-primary/90 drop-shadow-md tracking-wider uppercase">
              {race.name}
            </h3>
            <p className="text-xs tracking-[0.2em] text-white/70 mt-1">
              CLICK TO INSPECT
            </p>
          </div>
        </div>

        {/* ================= BACK OF CARD ================= */}
        <div
          className="absolute inset-0 w-full h-full bg-[url('/images/textures/builder_bg.png')] rounded-2xl overflow-hidden border border-base-300 flex flex-col"
          style={{ backfaceVisibility: "hidden", transform: "rotateY(180deg)" }}
        >
          {/* Back Header */}
          <div className="p-4 bg-base-200 border-b border-base-300 flex justify-between items-center">
            <h3 className="font-header text-3xl text-primary">{race.name}</h3>
            <button
              onClick={(e) => {
                e.stopPropagation();
                setIsFlipped(false);
              }}
              className="text-xs uppercase tracking-widest hover:text-error hover:cursor-pointer transition-colors"
            >
              Close
            </button>
          </div>

          {/* Scrollable Content */}
          <div className="p-4 flex-1 overflow-y-auto custom-scrollbar space-y-4 pointer-events-auto">
            <p className="text-base-content/80 text-sm italic leading-relaxed">
              {race.description || "No specific lore description available."}
            </p>

            {race.expandedAbilities && race.expandedAbilities.length > 0 && (
              <div>
                <div className="flex items-center gap-2 mb-3 border-b border-base-300 pb-2">
                  <Sparkles className="w-4 h-4 text-secondary" />
                  <p className="text-xs uppercase tracking-widest text-base-content/70">
                    Racial Traits
                  </p>
                </div>
                <div className="space-y-3 mt-4">
                  {race.expandedAbilities.map((ability) => (
                    <RacialAbilityItem key={ability.id} ability={ability} />
                  ))}
                </div>
              </div>
            )}
          </div>

          {/* Action Footer */}
          <div className="p-4 bg-base-200 border-t border-base-300">
            {isSelected ? (
              <button
                disabled
                className="w-full btn btn-disabled flex items-center gap-2 bg-base-300"
              >
                <CheckCircle className="w-5 h-5" /> Active Race
              </button>
            ) : (
              <button
                onClick={(e) => {
                  e.stopPropagation();
                  onSelect();
                  setIsFlipped(false);
                }}
                className="w-full btn btn-primary shadow-[0_0_15px_rgba(var(--p),0.3)] hover:shadow-[0_0_25px_rgba(var(--p),0.6)] transition-shadow"
              >
                Select This Race
              </button>
            )}
          </div>
        </div>
      </motion.div>
    </div>
  );
}

// --- MAIN TAB CLIENT ---
export default function RaceTabClient() {
  const { id } = useParams<{ id: string }>();
  const { setRace, raceId } = useCharacterBuilder();

  const [races, setRaces] = useState<RaceWithAbilities[]>([]);
  const [showModal, setShowModal] = useState(false);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    async function loadRaces() {
      setIsLoading(true);
      try {
        const available = await getAvailableRaces(id as string);
        setRaces(available as RaceWithAbilities[]);
      } catch (error) {
        console.error("Failed to load races:", error);
      } finally {
        setIsLoading(false);
      }
    }
    if (id) loadRaces();
  }, [id]);

  const syncRaceToServer = async (
    selectedRaceId: string,
    expandedAbilities: any[],
  ) => {
    await fetch(`/characters/${id}/builder/api/draft`, {
      method: "PATCH",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        raceId: selectedRaceId,
        builderState: { racialAbilities: expandedAbilities },
      }),
    });
  };

  const handleSelectRace = async (selectedRace: RaceWithAbilities) => {
    setRace(selectedRace.id, selectedRace.expandedAbilities);
    await syncRaceToServer(selectedRace.id, selectedRace.expandedAbilities);
  };

  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      className="p-6 max-w-6xl mx-auto"
    >
      {/* HEADER */}
      <div className="flex justify-between items-end pb-4 relative border-b border-primary/30 mb-10">
        <div className="absolute -bottom-px left-0 w-full h-px bg-linear-to-r from-primary via-primary/50 to-transparent" />

        <div className="relative">
          <h1 className="font-builder-header text-6xl md:text-8xl text-primary drop-shadow-[0_0_25px_rgba(var(--color-primary),0.4)] tracking-wide flex items-center gap-4">
            Race
          </h1>

          <p className="text-primary/70 tracking-[0.4em] uppercase text-sm md:text-base font-bold font-serif mt-1">
            Choose Your Look & Feel
          </p>
        </div>

        <PersonStanding className="w-16 h-16 md:w-20 md:h-20 text-primary drop-shadow-[0_0_15px_var(--color-primary)] relative mb-4" />
      </div>

      <button
        onClick={() => setShowModal(true)}
        className="btn btn-outline btn-primary flex items-center float-start gap-2 rounded-full px-6"
      >
        <Plus className="w-4 h-4" /> Create Race
      </button>

      {isLoading ? (
        <div className="flex flex-col items-center justify-center h-64 opacity-50 space-y-4">
          <div className="loading loading-spinner loading-lg text-primary"></div>
          <p className="uppercase tracking-widest text-xs">
            Consulting the Tomes...
          </p>
        </div>
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-10 mt-30">
          {races.map((race) => (
            <CinematicRaceCard
              key={race.id}
              race={race}
              isSelected={race.id === raceId}
              onSelect={() => handleSelectRace(race)}
            />
          ))}
        </div>
      )}

      <RaceCreationModal
        isOpen={showModal}
        onClose={() => setShowModal(false)}
      />
    </motion.div>
  );
}
