import { cn } from "@/lib/utils";
import {
  Book,
  Star,
  Activity,
  Brain,
  Flame,
  BicepsFlexed,
  ShieldPlus,
} from "lucide-react";

// Icon mapping for Attributes
const AttrIcons: Record<string, any> = {
  agility: Activity,
  smarts: Brain,
  spirit: Flame,
  strength: BicepsFlexed,
  vigor: ShieldPlus,
};

// Standard SWADE Core Skills
const CORE_SKILLS = [
  "athletics",
  "common-knowledge",
  "notice",
  "persuasion",
  "stealth",
];

export function TraitGroup({
  attribute,
  attrDie,
  skills,
}: {
  attribute: string;
  attrDie: string;
  skills: Record<string, string>;
}) {
  const Icon = AttrIcons[attribute.toLowerCase()] || Book;

  return (
    <div className="flex flex-col gap-3 relative pb-4">
      {/* Ink-line divider */}
      <div className="absolute left-6 top-8 bottom-0 w-px bg-base-300/50" />

      {/* Parent Attribute */}
      <div className="flex justify-between items-center bg-base-200/50 p-3 rounded-lg border-l-4 border-primary z-10 shadow-sm">
        <div className="flex items-center gap-3">
          <div className="p-2 bg-primary/20 rounded-md text-primary">
            <Icon size={20} />
          </div>
          <span className="font-header text-2xl uppercase tracking-wider text-base-content">
            {attribute}
          </span>
        </div>
        <span className="font-bold font-mono text-xl text-primary">
          {attrDie}
        </span>
      </div>

      {/* Child Skills */}
      <div className="flex flex-wrap gap-2 pl-10 z-10">
        {Object.entries(skills).map(([skill, die]) => {
          const isCore = CORE_SKILLS.includes(
            skill.toLowerCase().replace(" ", "-"),
          );
          return (
            <div
              key={skill}
              className={cn(
                "flex items-center gap-2 px-3 py-1.5 rounded-full border text-sm transition-all",
                isCore
                  ? "bg-base-200 border-error/50 text-base-content shadow-sm"
                  : "bg-base-100 border-base-300 text-base-content/80",
              )}
            >
              {isCore && <Star size={12} className="text-error fill-error" />}
              <span className="capitalize tracking-wide">{skill}</span>
              <span className="font-mono font-bold text-secondary">{die}</span>
            </div>
          );
        })}
      </div>
    </div>
  );
}
