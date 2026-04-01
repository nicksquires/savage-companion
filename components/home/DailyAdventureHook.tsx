"use client";

import { useState } from "react";
import { Sparkles } from "lucide-react";

const hooks = [
  "A glowing asteroid crashes into the saloon. The sheriff's badge starts vibrating.",
  "The cyber-baron hires you to steal a dream. The target is a rogue AI.",
  "Goblin sappers have rigged the bridge with dynamite. The toll is an ancient secret.",
  "Your wild card draws a black joker; the dead rise in the graveyard next door.",
];

export default function DailyAdventureHook() {
  const [hook, setHook] = useState(hooks[0]);

  const generateHook = () => {
    const nextHook = hooks[Math.floor(Math.random() * hooks.length)];
    setHook(nextHook);
  };

  return (
    <div className="bg-zinc-900 border border-zinc-800 p-6 rounded-xl relative overflow-hidden group">
      <div className="absolute top-0 right-0 p-4 opacity-10 group-hover:opacity-20 transition-opacity">
        <div
          className="w-24 h-24 bg-amber-500"
          style={{
            maskImage: "url('/images/icons/lorc/scroll-unfurled.svg')",
            maskSize: "contain",
          }}
        />
      </div>
      <h4 className="flex items-center gap-2 text-amber-500 font-bold mb-3 uppercase tracking-wider text-xs">
        <Sparkles className="w-4 h-4" /> Daily Plot Hook
      </h4>
      <p className="text-zinc-300 italic mb-4 min-h-3rem">"{hook}"</p>
      <button
        onClick={generateHook}
        className="text-sm text-zinc-500 hover:text-amber-400 underline decoration-zinc-700 underline-offset-4"
      >
        Reroll Hook
      </button>
    </div>
  );
}
