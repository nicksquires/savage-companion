"use client";

import { useTheme } from "next-themes";
import { useEffect, useState } from "react";
import { ChevronDown, Palette } from "lucide-react";

const themeFamilies = [
  { id: "standard", label: "Standard", color: "bg-blue-500" },
  { id: "cyberpunk", label: "Cyberpunk", color: "bg-yellow-400" },
  { id: "eldritch", label: "Eldritch", color: "bg-indigo-900" },
  { id: "aquatica", label: "Aquatica", color: "bg-cyan-500" },
  { id: "fantasy", label: "Fantasy", color: "bg-amber-700" },
  { id: "blood", label: "Blood", color: "bg-red-800" },
  { id: "forest", label: "Forest", color: "bg-green-700" },
  { id: "steam", label: "Steampunk", color: "bg-orange-800" },
  { id: "atomic", label: "Atomic", color: "bg-emerald-800" },
  { id: "noir", label: "Noir", color: "bg-zinc-900" },
  { id: "frost", label: "Frost", color: "bg-sky-200" },
  { id: "synthwave", label: "Synthwave", color: "bg-pink-500" },
];

const ThemeSwitcher = () => {
  const [mounted, setMounted] = useState(false);
  const { theme, setTheme } = useTheme();

  useEffect(() => {
    setMounted(true);
  }, []);

  if (!mounted)
    return (
      <div className="btn btn-ghost btn-sm w-32 animate-pulse bg-base-200" />
    );

  // Detect current mode from the existing theme string (e.g., "cyberpunk-dark" -> "dark")
  const currentMode = theme?.split("-")[1] || "dark";
  const currentFamily = theme?.split("-")[0] || "standard";

  const handleFamilyChange = (familyId: string) => {
    setTheme(`${familyId}-${currentMode}`);
  };

  return (
    <div className="dropdown dropdown-end text-primary-content">
      <div
        tabIndex={0}
        role="button"
        className="btn btn-ghost btn-sm gap-2 normal-case
        text-navbar-content hover:text-navbar hover:bg-navbar-content
        "
      >
        <Palette className="h-4 w-4" />
        <span className="hidden md:inline">Theme</span>
        <ChevronDown className="h-3 w-3 opacity-50" />
      </div>
      <ul
        tabIndex={0}
        className="dropdown-content menu p-2 shadow-xl 
        bg-navbar brightness-125 rounded-box w-56 z-100 border 
        border-primary/10 overflow-y-auto"
      >
        <li className="menu-title text-xs uppercase text-navbar-content opacity-70 px-4 py-2">
          Choose your vibe...
        </li>
        {themeFamilies.map((family) => (
          <li
            key={family.id}
            className="text-navbar-content hover:brightness-150"
          >
            <button
              onClick={() => handleFamilyChange(family.id)}
              className={`flex items-center justify-between px-4 py-2 ${
                currentFamily === family.id
                  ? "bg-navbar/90 text-primary font-bold"
                  : ""
              }`}
            >
              <div className="flex items-center gap-3">
                <div
                  className={`w-3 h-3 rounded-full ${family.color} shadow-sm`}
                />
                <span>{family.label}</span>
              </div>
              {currentFamily === family.id && (
                <div className="badge badge-primary text-primary-content badge-xs">
                  Active
                </div>
              )}
            </button>
          </li>
        ))}
      </ul>
    </div>
  );
};

export default ThemeSwitcher;
