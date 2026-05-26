"use client";

import { useState } from "react";
import { DicesIcon, Sparkles } from "lucide-react";
import { Card, CardContent } from "@/components/ui/card";

const hooks = [
  "A glowing asteroid crashes into the saloon. The sheriff's badge starts vibrating.",
  "The cyber-baron hires you to steal a dream. The target is a rogue AI.",
  "Goblin sappers have rigged the bridge with dynamite. The toll is an ancient secret.",
  "Your wild card draws a black joker; the dead rise in the graveyard next door.",
  "A mysterious stranger offers you a map to a forgotten tomb - for a price.",
  "The river runs red at midnight. Something ancient is waking beneath the water.",
  "Your horse refuses to cross the old bridge. It hasn't moved in fifty years.",
  "The town mayor's shadow has started acting on its own.",
  "A wanted poster with your face just appeared overnight.",
  "The saloon piano plays itself every night at 3 a.m.",
  "Your last bullet has a strange symbol carved into the casing.",
  "The stars above the desert are forming a new constellation.",
  "A child claims they can speak to the ghosts in the old mine.",
  "Every clock in town stopped at the exact same moment.",
  "Your reflection in the mirror blinked one second too late.",
  "The cattle are walking backward toward the mountains.",
  "A letter arrives with no stamp and your name written in blood.",
  "The preacher's sermon is in a language no one in town has ever heard.",
  "Your deck of cards now contains one extra joker that wasn't there yesterday.",
  "The wind carries voices that only you can hear.",
];

export default function DailyAdventureHook() {
  const [hook, setHook] = useState(hooks[0]);

  const reroll = () => {
    const next = hooks[Math.floor(Math.random() * hooks.length)];
    setHook(next);
  };

  return (
    <>
      <div className="py-20 bg-background">
        <div className="max-w-4xl mx-auto bg-base-50/30 px-6">
          <Card className="border-base-300 bg-[url('/images/textures/builder_bg.png')] mix-blend-normal opacity-90">
            <CardContent className="p-10 flex flex-col justify-center items-center">
              <div className="flex items-center gap-3 mb-6 text-left">
                <Sparkles className="text-primary w-10 h-10 md:w-14 md:h-14" />
                <h4 className="font-bold uppercase tracking-widest text-primary text-lg md:text-2xl">
                  Daily Plot Hook
                </h4>
              </div>
              <p className="text:md md:text-xl italic leading-relaxed text-base-content min-h-5.5rem mb-8">
                “{hook}”
              </p>
              <button
                onClick={reroll}
                className="btn btn-outline btn-lg md:btn-xl max-w-[12em]"
              >
                <DicesIcon />
                Reroll Hook
              </button>
            </CardContent>
          </Card>
        </div>
      </div>
    </>
  );
}
