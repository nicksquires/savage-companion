import {
  User,
  PersonStanding,
  Dices,
  Skull,
  ShieldPlus,
  Wand2,
  ScrollText,
  type LucideIcon,
  Backpack,
} from "lucide-react";

export type TabConfig = {
  id: string;
  label: string;
  icon: LucideIcon;
  disabled?: boolean;
  tooltip?: string;
};

export const tabs: TabConfig[] = [
  { id: "concept", label: "Concept", icon: User },
  { id: "race", label: "Race", icon: PersonStanding },
  { id: "traits", label: "Traits", icon: Dices },
  { id: "hindrances", label: "Hindrances", icon: Skull },
  { id: "edges", label: "Edges", icon: ShieldPlus },
  {
    id: "powers",
    label: "Powers",
    icon: Wand2,
    disabled: true,
    tooltip: "Select Arcane Background (Edge) to Enable",
  },
  { id: "gear", label: "Gear", icon: Backpack },
  { id: "summary", label: "Summary", icon: ScrollText },
];