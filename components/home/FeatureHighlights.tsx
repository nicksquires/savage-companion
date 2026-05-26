"use client";

import { motion } from "framer-motion";
import { Card, CardContent } from "@/components/ui/card";
import {
  Swords,
  User,
  Map,
  Dice6,
  BookOpen,
  Zap,
  Layers,
  Users,
} from "lucide-react";

const features = [
  {
    title: "Companion Utilities",
    description:
      "Quick tools for creating and managing characters, creatures, and custom content.",
    icon: Zap,
  },
  {
    title: "Modular Mechanics Engine",
    description:
      "Plug, play, and customize-your rules, your world, powered by the Savage Worlds foundation.",
    icon: Dice6,
  },
  {
    title: "Dynamic Maps & Tokens",
    description:
      "Drag-and-drop tokens with line-of-sight, auras, lighting, and real-time movement.",
    icon: Map,
  },
  {
    title: "Homebrew Settings",
    description:
      "Create, use, and share portable homebrew packages for campaigns.",
    icon: BookOpen,
  },
];

export default function FeatureHighlights() {
  return (
    <>
      <div
        className=" bg-[url('/images/textures/darkerparchment.png')]
       mask-y-from-84%"
      >
        <div className="w-full h-full bg-primary/10 backdrop-blur-[2px] py-42 lg:py-36">
          <div className="max-w-7xl mx-auto px-6">
            <div className="text-center mb-8 sm:mb-16">
              <h2 className="text-5xl md:text-6xl font-bold text-base-content/90 mb-6">
                Mechanics <span className="text-primary">Mastered</span>
              </h2>
              <p className="text-base-content/85 max-w-2xl mx-auto">
                Built from the ground up for Savage Worlds: <br />
                Fast, Furious, and Fun.
              </p>
            </div>

            <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6">
              {features.map((feature, i) => (
                <motion.div
                  key={feature.title}
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  transition={{ delay: i * 0.1 }}
                >
                  <Card className="h-full border-2 border-base-500/10 hover:border-primary/40 transition-all group bg-primary/15">
                    <CardContent className="p-8">
                      <feature.icon className="w-10 h-10 text-primary/90 mb-6 transition-transform group-hover:scale-110" />
                      <h3 className="font-header text-2xl font-semibold mb-3">
                        {feature.title}
                      </h3>
                      <p className="text-base-content/90 leading-relaxed">
                        {feature.description}
                      </p>
                    </CardContent>
                  </Card>
                </motion.div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </>
  );
}
