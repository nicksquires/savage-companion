import React from "react";
import Image from "next/image";
import Link from "next/link";
import logo from "@/public/images/SW_LOGO_FP_2018.png";

const Footer = () => {
  return (
    <footer className="bg-navbar text-navbar-content z-1 border-t border-navbar-content/10">
      {/* Main Grid Content */}
      <div className="max-w-full mx-auto py-10 px-6 lg:px-10 grid grid-cols-1 sm:grid-cols-2 md:grid-cols-5 gap-8 text-center md:text-left">
        {/* Brand / Logo Aside */}
        <div className="flex flex-col items-center md:items-center text-center gap-3 sm:col-span-2 md:col-span-1">
          <Image
            src={logo}
            alt="Savage Worlds logo"
            className="w-36 object-contain"
          />
          <div>
            <p className="font-header font-semibold text-lg leading-snug">
              Savage Worlds Companion
            </p>
            <p className="opacity-70 text-xs mt-1">
              Virtual Tabletop Resource Manager
            </p>
          </div>
        </div>

        {/* Play (Formerly Campaigns) */}
        <nav className="flex flex-col gap-2 w-full">
          <h6 className="footer-title opacity-90 font-black tracking-wider text-md md:text-lg border-b border-navbar-content/10 pb-1 mb-1">
            Play
          </h6>
          <Link
            href="#"
            className="link link-hover text-sm opacity-50 pointer-events-none"
          >
            Getting Started
          </Link>
          <Link
            href="#"
            className="link link-hover text-sm opacity-50 pointer-events-none"
          >
            Campaigns
          </Link>
          <Link href="/characters" className="link link-hover text-sm">
            Characters
          </Link>
          <Link
            href="/reference/edges"
            className="link link-hover text-sm opacity-50 pointer-events-none"
          >
            Game Rules
          </Link>
          <Link
            href="#"
            className="link link-hover text-sm opacity-50 pointer-events-none"
          >
            Guilds
          </Link>
        </nav>

        {/* Tools */}
        <nav className="flex flex-col gap-2 w-full">
          <h6 className="footer-title opacity-90 font-black tracking-wider text-md md:text-lg border-b border-navbar-content/10 pb-1 mb-1">
            Tools
          </h6>
          <Link href="/characters" className="link link-hover text-sm">
            Character Creator
          </Link>
          <Link
            href="#"
            className="link link-hover text-sm opacity-50 pointer-events-none"
          >
            Homebrew Portal
          </Link>
          <Link
            href="#"
            className="link link-hover text-sm opacity-50 pointer-events-none"
          >
            Combat Assistant
          </Link>
          <Link
            href="#"
            className="link link-hover text-sm opacity-50 pointer-events-none"
          >
            Encounters
          </Link>
          <Link
            href="#"
            className="link link-hover text-sm opacity-50 pointer-events-none"
          >
            Library
          </Link>
        </nav>

        {/* Shop */}
        <nav className="flex flex-col gap-2 w-full">
          <h6 className="footer-title opacity-90 font-black tracking-wider text-md md:text-lg border-b border-navbar-content/10 pb-1 mb-1">
            Shop
          </h6>
          <Link
            href="https://shop.peginc.com/"
            className="link link-hover text-sm"
          >
            PEGinc Shop
          </Link>
          <Link
            href="#"
            className="link link-hover text-sm opacity-50 pointer-events-none"
          >
            Compendiums
          </Link>
          <Link
            href="#"
            className="link link-hover text-sm opacity-50 pointer-events-none"
          >
            Game Resources
          </Link>
        </nav>

        {/* About */}
        <nav className="flex flex-col gap-2 w-full">
          <h6 className="footer-title opacity-90 font-black tracking-wider text-md md:text-lg border-b border-navbar-content/10 pb-1 mb-1">
            About
          </h6>
          <Link href="/about" className="link link-hover text-sm">
            About Us
          </Link>
          <Link href="/legal/credits" className="link link-hover text-sm">
            Credits
          </Link>
          <Link href="/legal/licenses" className="link link-hover text-sm">
            Licenses
          </Link>
          <Link href="/legal/privacy" className="link link-hover text-sm">
            Privacy Policy
          </Link>
          <Link href="/legal/terms" className="link link-hover text-sm">
            Terms of Use
          </Link>
        </nav>
      </div>

      {/* BOTTOM: Legal / Disclaimer */}
      <div className="border-t border-navbar-content/15 px-6 lg:px-10 py-6 text-[11px] leading-relaxed opacity-70 max-w-full mx-auto space-y-3">
        <p>
          © 1994-2003, 2005-2026 Pinnacle Entertainment Group. All rights
          reserved.&nbsp;&nbsp;|&nbsp;&nbsp;Savage Worlds, SWADE, Adventure
          Edition, Pinnacle Entertainment Group, the Savage Worlds logo, and all
          related product names, settings, and game mechanics are trademarks or
          copyrights of Pinnacle Entertainment Group in the U.S.A. and other
          countries.&nbsp;&nbsp;|&nbsp;&nbsp;This application is an unofficial
          fan project created under the Savage Worlds fan content guidelines. It
          is not affiliated with, endorsed, sponsored, or approved by Pinnacle
          Entertainment Group. No copyrighted text or material from official
          publications is reproduced verbatim.
        </p>
        <p className="border-t border-navbar-content/10 pt-3">
          © 2026 eSquires Studios. All rights
          reserved.&nbsp;&nbsp;|&nbsp;&nbsp;Savage Companion, along with its
          original code, data structures, organization, and non-verbatim
          mechanical interpretations and descriptions, are the intellectual
          property of eSquires Studios.
        </p>
      </div>
    </footer>
  );
};

export default Footer;
