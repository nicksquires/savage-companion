"use client";

import { useState } from "react";
import Link from "next/link";
import { Menu, ChevronUp, ChevronDown } from "lucide-react";

// Organize the hierarchy data to keep the JSX clean
const navSections = [
  {
    title: "Campaigns",
    links: [
      { name: "New Campaign", href: "#" },
      { name: "Active Campaigns", href: "#" },
      { name: "Encounters", href: "#" },
    ],
  },
  {
    title: "Tools",
    links: [
      { name: "Character Builder", href: "/characters" },
      { name: "Combat Assistant", href: "#" },
      { name: "Beast Builder", href: "#" },
    ],
  },
  {
    title: "Reference",
    links: [
      { name: "Bestiary", href: "#" },
      { name: "Races", href: "#" },
      { name: "Hindrances", href: "#" },
      { name: "Edges", href: "/reference/edges" },
      { name: "Gear", href: "#" },
      { name: "Powers", href: "#" },
    ],
  },
];

export default function BurgerDrawer() {
  // State to track which accordion section is currently open
  const [openSection, setOpenSection] = useState<string | null>(null);

  const toggleSection = (title: string) => {
    setOpenSection((prev) => (prev === title ? null : title));
  };

  return (
    <div className="drawer drawer-end lg:hidden z-50">
      <input id="mobile-nav-drawer" type="checkbox" className="drawer-toggle" />

      <div className="drawer-content">
        {/* Hamburger Trigger Button */}
        <label
          htmlFor="mobile-nav-drawer"
          className="btn btn-ghost btn-circle"
          aria-label="Open Menu"
        >
          <Menu size={24} />
        </label>
      </div>

      <div className="drawer-side">
        {/* Overlay that closes the drawer when clicking outside */}
        <label
          htmlFor="mobile-nav-drawer"
          aria-label="close sidebar"
          className="drawer-overlay"
        ></label>

        {/* Drawer Content */}
        <div
          className="menu p-4 w-90 min-h-full bg-navbar text-base-content
         flex flex-col gap-3 pt-12"
        >
          {navSections.map((section) => {
            const isOpen = openSection === section.title;

            return (
              <div key={section.title} className="flex flex-col w-full">
                {/* Parent Link / Accordion Trigger */}
                <button
                  onClick={() => toggleSection(section.title)}
                  className="btn btn-ghost btn-xl w-full justify-start font-header 
                  text-lg text-navbar-content bg-navbar transition-all"
                >
                  {/* Left-aligned Chevron that flips on open */}
                  {isOpen ? (
                    <ChevronDown size={20} className="mr-2" />
                  ) : (
                    <ChevronUp size={20} className="mr-2" />
                  )}
                  {section.title}
                </button>

                {/* Hidden Child Links (Revealed when open) */}
                <div
                  className={`flex flex-col overflow-hidden transition-all duration-300 ease-in-out ${
                    isOpen ? "max-h-96 opacity-100 mt-2" : "max-h-0 opacity-0"
                  }`}
                >
                  <ul className="flex flex-col gap-1 ml-6 border-l-2 border-primary/20 pl-2">
                    {section.links.map((link) => (
                      <li key={link.name}>
                        <Link
                          href={link.href}
                          // Note: For drawer links, adding an onClick to close the drawer
                          // entirely when a link is clicked is usually a good idea!
                          className="btn btn-ghost hover:bg-neutral/20 btn-sm w-full justify-start 
                          text-navbar-content font-normal"
                        >
                          {link.name}
                        </Link>
                      </li>
                    ))}
                  </ul>
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </div>
  );
}
