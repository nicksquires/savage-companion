"use client";
import { motion } from "framer-motion";
import { UserPlus, Map, BookOpen, Wand2, Users, Swords } from "lucide-react";

const actions = [
  { label: "Create Character", icon: UserPlus, color: "primary" },
  { label: "Start Campaign", icon: Map, color: "secondary" },
  { label: "Browse Marketplace", icon: BookOpen, color: "accent" },
  { label: "Build Homebrew", icon: Wand2, color: "success" },
  { label: "Join a Table", icon: Users, color: "warning" },
  { label: "Random Encounter", icon: Swords, color: "error" },
];

export default function QuickActionPanel() {
  return (
    <section className="relative -mt-12 max-w-7xl mx-auto px-6 z-10">
      <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-4">
        {actions.map((action, i) => (
          <motion.button
            key={action.label}
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ delay: i * 0.05 }}
            whileHover={{ y: -6, scale: 1.03 }}
            className={`group flex flex-col items-center justify-center p-8 rounded-3xl border border-base-300 bg-base-100 hover:bg-base-200 hover:border-${action.color} transition-all`}
          >
            <action.icon
              className={`w-10 h-10 text-${action.color} mb-4 transition-transform group-hover:scale-110`}
            />
            <span className="font-medium text-base-content text-center">
              {action.label}
            </span>
          </motion.button>
        ))}
      </div>
    </section>
  );
}
// "use client";

// import { motion } from "framer-motion";
// import { UserPlus, Map, BookOpen, Wand2, Users, Swords } from "lucide-react";
// import { clsx, type ClassValue } from "clsx";
// import { twMerge } from "tailwind-merge";

// function cn(...inputs: ClassValue[]) {
//   return twMerge(clsx(inputs));
// }

// const actions = [
//   {
//     id: 1,
//     label: "Create Character",
//     icon: UserPlus,
//     color:
//       "hover:border-blue-500 hover:text-blue-400 hover:shadow-[0_0_15px_rgba(59,130,246,0.3)]",
//   },
//   {
//     id: 2,
//     label: "Launch Campaign",
//     icon: Map,
//     color:
//       "hover:border-amber-500 hover:text-amber-400 hover:shadow-[0_0_15px_rgba(245,158,11,0.3)]",
//   },
//   {
//     id: 3,
//     label: "Browse Marketplace",
//     icon: BookOpen,
//     color:
//       "hover:border-purple-500 hover:text-purple-400 hover:shadow-[0_0_15px_rgba(168,85,247,0.3)]",
//   },
//   {
//     id: 4,
//     label: "Build Homebrew",
//     icon: Wand2,
//     color:
//       "hover:border-emerald-500 hover:text-emerald-400 hover:shadow-[0_0_15px_rgba(16,185,129,0.3)]",
//   },
//   {
//     id: 5,
//     label: "Join a Table",
//     icon: Users,
//     color:
//       "hover:border-rose-500 hover:text-rose-400 hover:shadow-[0_0_15px_rgba(244,63,94,0.3)]",
//   },
//   {
//     id: 6,
//     label: "Random Encounter",
//     icon: Swords,
//     color:
//       "hover:border-red-600 hover:text-red-500 hover:shadow-[0_0_15px_rgba(220,38,38,0.3)]",
//   },
// ];

// export default function QuickActionPanel() {
//   return (
//     <section className="relative z-20 mt-16 max-w-6xl mx-auto px-10">
//       <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-4">
//         {actions.map((action, i) => (
//           <motion.button
//             key={action.id}
//             initial={{ opacity: 0, y: 20 }}
//             animate={{ opacity: 1, y: 0 }}
//             whileTap={{ scale: 0.95 }}
//             className={cn(
//               "flex flex-col items-center justify-center p-6 gap-3 rounded-xl border border-zinc-800 bg-zinc-900/90 backdrop-blur-sm text-zinc-400 transition-all duration-300",
//               action.color,
//             )}
//           >
//             <action.icon className="w-8 h-8 transition-transform duration-300 group-hover:scale-110" />
//             <span className="text-sm font-medium tracking-wide text-center">
//               {action.label}
//             </span>
//           </motion.button>
//         ))}
//       </div>
//     </section>
//   );
// }
