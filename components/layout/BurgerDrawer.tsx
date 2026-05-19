"use client";

import { useState } from "react";
import Link from "next/link";
import { Menu, ChevronUp, ChevronDown } from "lucide-react";

// Updated hierarchy with isDisabled flags
const navSections = [
  {
    title: "Play",
    links: [
      { name: "Getting Started", href: "#", isDisabled: true },
      { name: "Campaigns", href: "#", isDisabled: true },
      { name: "Characters", href: "/characters", isDisabled: false },
      { name: "Game Rules", href: "/reference/edges", isDisabled: true },
      { name: "Guilds", href: "#", isDisabled: true },
    ],
  },
  {
    title: "Tools",
    links: [
      { name: "Character Creator", href: "/characters", isDisabled: false },
      { name: "Homebrew Portal", href: "#", isDisabled: true },
      { name: "Combat Assistant", href: "#", isDisabled: true },
      { name: "Encounters", href: "#", isDisabled: true },
      { name: "Library", href: "#", isDisabled: true },
    ],
  },
  {
    title: "Shop",
    links: [
      {
        name: "PEGinc Shop",
        href: "https://shop.peginc.com/",
        isDisabled: false,
      },
      { name: "Compendiums", href: "#", isDisabled: true },
      { name: "Game Resources", href: "#", isDisabled: true },
    ],
  },
  {
    title: "About",
    links: [
      { name: "About Us", href: "/about", isDisabled: false },
      { name: "Credits", href: "/legal/credits", isDisabled: false },
      { name: "Licenses", href: "/legal/licenses", isDisabled: false },
      { name: "Privacy", href: "/legal/privacy", isDisabled: false },
      { name: "Terms", href: "/legal/terms", isDisabled: false },
    ],
  },
];

export default function BurgerDrawer() {
  const [openSection, setOpenSection] = useState<string | null>(null);

  const toggleSection = (title: string) => {
    setOpenSection((prev) => (prev === title ? null : title));
  };

  return (
    <div className="drawer drawer-end lg:hidden z-50">
      <input id="mobile-nav-drawer" type="checkbox" className="drawer-toggle" />

      <div className="drawer-content">
        <label
          htmlFor="mobile-nav-drawer"
          className="btn btn-ghost btn-circle"
          aria-label="Open Menu"
        >
          <Menu className="h-5 sm:h-6 w-5 sm:w-6" />
        </label>
      </div>

      <div className="drawer-side">
        <label
          htmlFor="mobile-nav-drawer"
          aria-label="close sidebar"
          className="drawer-overlay"
        ></label>

        <div className="menu p-4 w-90 min-h-full bg-navbar text-base-content flex flex-col gap-3 pt-12">
          {navSections.map((section) => {
            const isOpen = openSection === section.title;

            return (
              <div key={section.title} className="flex flex-col w-full">
                <button
                  onClick={() => toggleSection(section.title)}
                  className="btn btn-ghost btn-xl w-full justify-start font-header text-lg text-navbar-content bg-navbar transition-all"
                >
                  {isOpen ? (
                    <ChevronDown size={20} className="mr-2" />
                  ) : (
                    <ChevronUp size={20} className="mr-2" />
                  )}
                  {section.title}
                </button>

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
                          // Conditionally apply disabled styles
                          className={`btn btn-ghost btn-sm w-full justify-start text-navbar-content font-normal 
                            ${link.isDisabled ? "opacity-50 pointer-events-none" : "hover:bg-neutral/20"}`}
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
