"use client";
import { useState } from "react";
import { useRouter, usePathname, useParams } from "next/navigation";
import { useCharacterBuilder } from "@/stores/characterBuilderStore";
import { tabs } from "../../tabsConfig";
import { Tabs, TabsList, TabsTrigger } from "@/components/ui/tabs";
import {
  ChevronLeft,
  ChevronRight,
  User,
  Plus,
  Info,
  Trash2,
  CircleIcon,
  CheckCircleIcon,
} from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";
import { deleteCharacter } from "@/app/(main)/characters/[id]/builder/api/draft/characterActions";
import DeleteModal from "../../modals/DeleteModal";
import AdvancementBar from "./AdvancementBar";

export default function BuilderShell({
  children,
}: {
  children: React.ReactNode;
}) {
  const router = useRouter();
  const pathname = usePathname();
  const { id } = useParams<{ id: string }>();
  const {
    name,
    edges,
    advancementsEnabled,
    toggleAdvancementEnabled,
    setDraft,
  } = useCharacterBuilder();

  const currentTab = pathname.split("/").pop() || "concept";
  const tabIds = tabs.map((t) => t.id);
  const currentIndex = tabIds.indexOf(currentTab);

  // Dynamic disabled state for Powers
  const isPowersEnabled = edges.some((e) =>
    e.slug.includes("arcane-background"),
  );

  const updatedTabs = tabs.map((tab) =>
    tab.id === "powers" ? { ...tab, disabled: !isPowersEnabled } : tab,
  );

  const syncToServer = async (payload: any) => {
    await fetch(`/characters/${id}/builder/api/draft`, {
      method: "PATCH",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(payload),
    });
  };

  const handleToggleAdvancement = () => {
    const newState = !advancementsEnabled;
    toggleAdvancementEnabled();
    syncToServer({ advancementsEnabled: newState });
  };

  const goToTab = (newIndex: number) => {
    if (newIndex < 0 || newIndex >= tabIds.length) return;
    if (currentTab === "edges" && !isPowersEnabled && newIndex > currentIndex)
      router.push(`/characters/${id}/builder/${tabIds[newIndex++]}`);

    if (currentTab === "gear" && !isPowersEnabled && newIndex < currentIndex)
      router.push(`/characters/${id}/builder/${tabIds[newIndex--]}`);
    router.push(`/characters/${id}/builder/${tabIds[newIndex]}`);
  };

  // Delete modal
  const [showDeleteModal, setShowDeleteModal] = useState(false);

  async function handleDeleteCharacter() {
    await deleteCharacter(id);
    router.push("/characters");
  }

  // Guide drawer
  const [isGuideOpen, setIsGuideOpen] = useState(false);

  const guideSections = [
    {
      title: "Concept",
      content:
        "What do you uniquely bring to the party? Savage Worlds is a fast, furious, and highly cinematic system, so lean into big ideas and archetypes. Before getting bogged down in numbers, decide who your character is and how they solve problems. Think about how your character will contribute to both social interactions and combat encounters. This tab sets the narrative foundation for all the mechanical choices you are about to make. Include which setting your character is from and their name.",
    },
    {
      title: "Race",
      content:
        "Choose your character's ancestry. Your race provides inherent biological or cultural traits.\n\n• Humans: If this is your first time playing, Human is highly recommended. Humans do not start with any automatic racial Hindrances. Instead, they are highly adaptable and begin play with 1 free Novice Edge of their choosing (provided they meet the other requirements).\n\n• Other Races: Non-human races come with a mix of positive Trait boosts and negative Hindrances built-in to reflect their unique physiology and culture.",
    },
    {
      title: "Attributes",
      content:
        "Define your core capabilities. Your character is defined by five core Attributes: Agility, Smarts, Spirit, Strength, and Vigor. These are passive, innate abilities used to resist effects and dictate how easily you learn related Skills.\n\n• The Baseline: All Attributes start at a d4 die type.\n• The Points: You have 5 points to spend here.\n• The Cost: Spending 1 point increases an Attribute by one die type (e.g., d4 to d6).\n• The Limit: During character creation, an Attribute cannot be raised above a d12 (unless a racial ability grants a starting d6, raising the maximum to d12+1).",
    },
    {
      title: "Skills",
      content:
        "Allocate your active training and knowledge. Skills are what you use to actively perform tasks, attack, or influence others.\n\n• Core Skills: You automatically get a d4 in five Core Skills for free: Athletics (Agility), Common Knowledge (Smarts), Notice (Smarts), Persuasion (Spirit), and Stealth (Agility).\n• The Points: You have 12 points (up to 15 depending on the setting) to allocate.\n• The Cost: Raising a skill costs 1 point per die type, as long as the skill's die type is equal to or lower than its linked Attribute.\n• The Penalty: If you want to raise a Skill higher than its linked Attribute, it costs 2 points per die type increase. Un-trained skills are rolled at a d4-2.",
    },
    {
      title: "Hindrances",
      content:
        "Flaws that make you stronger. Hindrances represent your character's internal flaws and external weaknesses, providing great roleplay opportunities and narrative hooks for the Game Master. Taking Hindrances rewards you with points to further customize your character.\n\n• The Limit: You can gain a maximum of 4 points from Hindrances.\n• The Values: Major Hindrances grant 2 points, and Minor Hindrances grant 1 point. A standard build takes one Major and two Minor Hindrances.\n• The Rewards: 2 Points → Raise an Attribute by one die type, or gain a new Edge. 1 Point → Gain another Skill point, or double your starting wealth.",
    },
    {
      title: "Edges",
      content:
        "Special abilities that set you apart. Edges are unique features, combat maneuvers, and background perks that differentiate your character from others with similar skills.\n\n• Requirements: You must meet the prerequisites to take an Edge. At character creation, you are a Novice rank, so you may only select Novice-level Edges. You must also meet any Attribute or Skill minimums listed.\n• How to get them: You can purchase Edges by spending points gained from your Hindrances, or by choosing the Human race (which grants one for free).",
    },
    {
      title: "Powers",
      content:
        "Tap into magic, miracles, or weird science. (Note: If your character does not use magic, you can skip this tab). To cast spells or use powers, you must first possess the Arcane Background Edge (found in the Edges tab). Selecting an Arcane Background dictates which arcane Skill you use to cast (like Spellcasting, Faith, or Psionics) and grants you a starting pool of Power Points and a selection of novice Powers to choose from.",
    },
    {
      title: "Gear",
      content:
        "Equip your hero for the adventure. Your character already has basic clothes and era-appropriate personal necessities.\n\n• Starting Wealth: You have $500 in starting funds to purchase adventuring gear, weapons, and armor.\n• Protection: Purchasing and equipping Armor will directly increase your Toughness statistic.\n• Tip: Always buy some rope. You never know when you'll need some rope.",
    },
    {
      title: "Summary",
      content:
        'Review your final character sheet and Derived Stats. This is your final overview. The builder has automatically calculated your Derived Statistics based on your previous choices:\n\n• Pace: Standard is 6" (modified by specific Edges, Hindrances, or Races).\n• Parry: How hard you are to hit in melee. Calculated as 2 + half of your Fighting die.\n• Toughness: How much damage you can take before suffering a Wound. Calculated as 2 + half of your Vigor die, plus the value of your equipped Armor.',
    },
  ];

  return (
    <>
      <div className="min-h-screen">
        {/* Sticky Tabs */}
        <Tabs
          value={currentTab}
          onValueChange={(value) =>
            router.push(`/characters/${id}/builder/${value}`)
          }
          className="sticky top-0 z-35 w-full"
        >
          <TabsList
            className={`grid w-full grid-cols-8 bg-base-500 rounded-none pb-0`}
          >
            {updatedTabs.map((tab) => (
              <TabsTrigger
                key={tab.id}
                value={tab.id}
                disabled={tab.disabled}
                className="flex items-center text-md font-bold gap-1.5 data-[state=active]:text-primary data-[state=active]:hover:cursor-auto rounded-3xl rounded-br-none rounded-bl-none hover:cursor-pointer"
                data-tip={tab.tooltip}
              >
                <tab.icon />
                <span className="hidden lg:inline">{tab.label}</span>
              </TabsTrigger>
            ))}
          </TabsList>
        </Tabs>

        <AdvancementBar />

        {/* Header Card */}
        <div
          className={`max-w-4xl mx-auto mt-8 px-6 ${currentTab === "summary" ? "hidden" : ""}`}
        >
          <div className="card bg-base-100 shadow-xl border border-base-300 flex flex-row items-center gap-6 p-6">
            {/* Avatar */}
            <div className="relative w-16 h-16 md:w-24 md:h-24 shrink-0">
              <div className="w-full h-full rounded-2xl border-2 border-dashed border-primary/60 bg-base-200 flex items-center justify-center overflow-hidden">
                <div className="text-center">
                  <User className="w-12 h-12 text-base-content/40 mx-auto" />
                  <button
                    onClick={() =>
                      alert("Avatar upload coming soon (Next.js + Cloudinary)")
                    }
                    className="absolute bottom-2 right-2 btn btn-circle btn-primary btn-xs shadow-md"
                  >
                    <Plus className="w-3 h-3" />
                  </button>
                </div>
              </div>
            </div>

            {/* Name */}
            <div className="flex-1">
              <label className="text-xs font-medium tracking-widest text-base-content/60 mb-1 block">
                CHARACTER NAME
              </label>
              <input
                value={name}
                onChange={(e) => setDraft({ name: e.target.value })}
                className="input input-bordered w-full text-lg md:text-2xl font-header bg-base-500/50 border-0 focus:border-primary px-2 py-1"
                placeholder={`Untitled Character`}
              />
            </div>

            {/* Advancement + Guide + Delete */}
            <div className="flex flex-col items-end gap-1">
              <button
                onClick={handleToggleAdvancement}
                className="btn btn-ghost btn-sm flex items-center gap-2 text-success"
              >
                {advancementsEnabled ? (
                  <CheckCircleIcon className="w-6 h-6 sm:w-4 sm:h-4" />
                ) : (
                  <CircleIcon className="w-6 h-6 sm:w-4 sm:h-4" />
                )}
                <p className="hidden sm:inline">Advancement</p>
              </button>
              <button
                onClick={() => setIsGuideOpen(true)}
                className="btn btn-ghost btn-sm flex items-center gap-2 text-secondary"
              >
                <Info className="w-6 h-6 sm:w-4 sm:h-4" />
                <p className="hidden sm:inline">Show Guide</p>
              </button>

              <button
                onClick={() => setShowDeleteModal(true)}
                className="btn btn-ghost btn-sm flex items-center gap-2 text-error hover:bg-error/10"
              >
                <Trash2 className="w-6 h-6 sm:w-4 sm:h-4" />
                <p className="hidden sm:inline">Delete Character</p>
              </button>
            </div>
          </div>
        </div>

        {/* Content with side arrows */}
        <div className="max-w-7xl mx-auto px-6 sticky top-0">
          <button
            onClick={() => goToTab(currentIndex - 1)}
            disabled={currentIndex <= 0}
            className="absolute left-4 xl:left-0 top-32 btn btn-circle btn-secondary text-4xl shadow-lg z-5 disabled:opacity-30"
          >
            <ChevronLeft />
          </button>

          <div className="px-12 min-h-400px">
            <AnimatePresence mode="wait">
              <motion.div
                key={currentTab}
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -10 }}
                transition={{ duration: 0.2 }}
              >
                {children}
              </motion.div>
            </AnimatePresence>
          </div>

          <button
            onClick={() => goToTab(currentIndex + 1)}
            disabled={currentIndex >= tabIds.length - 1}
            className="absolute right-4 xl:right-0 top-32 btn btn-circle btn-secondary text-4xl shadow-lg z-5 disabled:opacity-30"
          >
            <ChevronRight />
          </button>
        </div>

        {/* Delete Confirmation Modal */}
        <DeleteModal
          isOpen={showDeleteModal}
          onClose={() => setShowDeleteModal(false)}
          onConfirm={handleDeleteCharacter}
          title="Delete Character?"
          message="This will permanently delete the character and all draft data. This action cannot be undone."
        />

        {/* Guide Drawer */}
        <AnimatePresence>
          {isGuideOpen && (
            <motion.div
              initial={{ x: "100%" }}
              animate={{ x: 0 }}
              exit={{ x: "100%" }}
              className="fixed top-0 right-0 h-full w-96 bg-base-100 shadow-2xl border-l border-primary/30 z-50 overflow-auto"
            >
              <div className="p-6 sticky top-0 bg-base-100 border-b flex justify-between items-center">
                <h2 className="font-header text-2xl">
                  Character Builder Guide
                </h2>
                <button
                  onClick={() => setIsGuideOpen(false)}
                  className="btn btn-ghost btn-circle"
                >
                  ✕
                </button>
              </div>

              <div className="p-6 space-y-8">
                {guideSections.map((section) => (
                  <div
                    key={section.title}
                    className="collapse collapse-arrow border border-base-300 bg-base-200"
                  >
                    <input type="checkbox" />
                    <div className="collapse-title font-medium text-primary">
                      {section.title}
                    </div>
                    <div className="collapse-content text-sm leading-relaxed whitespace-pre-line">
                      {section.content}
                    </div>
                  </div>
                ))}
              </div>
            </motion.div>
          )}
        </AnimatePresence>

        {/* Backdrop */}
        {isGuideOpen && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 0.5 }}
            exit={{ opacity: 0 }}
            onClick={() => setIsGuideOpen(false)}
            className="fixed inset-0 bg-black z-40"
          />
        )}
      </div>
    </>
  );
}
