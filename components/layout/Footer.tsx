import React from "react";
import Image from "next/image";
import Link from "next/link"; // Better for Next.js SEO and performance
import logo from "@/public/images/SW_LOGO_FP_2018.png";

const Footer = () => {
  return (
    <footer className="flex flex-col bg-navbar text-navbar-content justify-between">
      {/* Icon Aside/Header */}
      <div className="footer sm:footer-horizontal py-10 px-2 lg:px-10 items-center sm:justify-between justify-center">
        <aside className="flex flex-col items-center text-center">
          <Image
            src={logo}
            alt="Savage Worlds logo"
            className="min-w-25 w-42"
          />
          <p className="font-semibold">
            Savage Worlds Companion
            <br />
            <span className="opacity-80 text-sm">
              Virtual Tabletop Resource Manager
            </span>
          </p>
        </aside>

        {/* Campaigns */}
        <nav className="min-w-30 sm:min-w-30">
          <h6 className="footer-title opacity-90 font-black">Campaigns</h6>
          <Link href="#" className="link link-hover">
            New Campaign
          </Link>
          <Link href="#" className="link link-hover">
            Active Campaigns
          </Link>
          <Link href="#" className="link link-hover">
            Encounters
          </Link>
        </nav>

        {/* Tools */}
        <nav className="min-w-30 sm:min-w-30">
          <h6 className="footer-title opacity-90 font-black">Tools</h6>
          <Link href="#" className="link link-hover">
            Character Builder
          </Link>
          <Link href="#" className="link link-hover">
            Combat Assistant
          </Link>
          <Link href="#" className="link link-hover">
            Beast Builder
          </Link>
        </nav>

        {/* Reference */}
        <nav className="min-w-30 sm:min-w-30">
          <h6 className="footer-title opacity-90 font-black">Reference</h6>
          <div className="grid grid-cols-2 gap-x-8 gap-y-2">
            <Link href="#" className="link link-hover">
              Bestiary
            </Link>
            <Link href="#" className="link link-hover">
              Races
            </Link>
            <Link href="#" className="link link-hover">
              Hindrances
            </Link>
            <Link href="#" className="link link-hover">
              Edges
            </Link>
            <Link href="#" className="link link-hover">
              Gear
            </Link>
            <Link href="#" className="link link-hover">
              Powers
            </Link>
          </div>
        </nav>

        {/* Legal
        <nav className="min-w-50 mx-auto">
          <h6 className="footer-title opacity-90 font-black">Legal</h6>
          <Link href="/" className="link link-hover">
            Terms of Use
          </Link>
          <Link href="#" className="link link-hover">
            Licensing Notice
          </Link>
          <Link href="#" className="link link-hover">
            Privacy Policy
          </Link>
          <Link href="#" className="link link-hover">
            Cookie Usage
          </Link>
        </nav> */}
      </div>

      {/* BOTTOM: Legal / Disclaimer */}
      <div className="border-t border-navbar-content/20 px-6 py-4 text-xs leading-relaxed opacity-70">
        © 1994-2003, 2005-2026 Pinnacle Entertainment Group. All rights
        reserved.&nbsp;&nbsp;|&nbsp;&nbsp;Savage Worlds, SWADE, Adventure
        Edition, Pinnacle Entertainment Group, the Savage Worlds logo, and all
        related product names, settings, and game mechanics are trademarks or
        copyrights of Pinnacle Entertainment Group in the U.S.A. and other
        countries&nbsp;&nbsp;|&nbsp;&nbsp;This application is an unofficial fan
        project created under the Savage Worlds fan content guidelines. It is
        not affiliated with, endorsed, sponsored, or approved by Pinnacle
        Entertainment Group. No copyrighted text or material from official
        publications is reproduced verbatim.
        <br />© 2026 Nicholas Squires. All rights
        reserved&nbsp;&nbsp;|&nbsp;&nbsp;Savage Companion, along with its
        original code, data structures, organization, and non-verbatim
        mechanical interpretations and descriptions, are the intellectual
        property of Nicholas Squires.
      </div>
    </footer>
  );
};

export default Footer;
