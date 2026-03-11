import React from "react";
import Image from "next/image";
import Link from "next/link"; // Better for Next.js SEO and performance
import logo from "/public/images/SW_LOGO_FP_2018.png";

const Footer = () => {
  return (
    <footer className="bg-navbar text-navbar-content">
      {/* TOP: Columns */}
      <div className="footer sm:footer-horizontal p-10">
        <aside>
          <Image
            src={logo}
            alt="Savage Worlds logo"
            className="m-1 min-h-28 h-28 min-w-42 w-42"
          />
          <p className="font-semibold">
            Savage Worlds Companion
            <br />
            <span className="opacity-80 text-sm">
              Virtual Tabletop Resource Manager
            </span>
          </p>
        </aside>

        <nav className="min-w-50">
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

        <nav className="min-w-50">
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

        <nav className="min-w-50">
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
      </div>

      {/* BOTTOM: Legal / Disclaimer */}
      <div className="border-t border-navbar-content/20 px-6 py-4 text-xs leading-relaxed opacity-70">
        © 1994-2003, 2005-2026 Pinnacle Entertainment Group | All Rights
        Reserved. Savage Worlds, SWADE, Adventure Edition, Pinnacle
        Entertainment Group, the Savage Worlds logo, and all related product
        names, game mechanics, settings, and logos are trademarks or copyrights
        of Pinnacle Entertainment Group in the U.S.A. and other countries. This
        application is an unofficial fan project and is not affiliated with or
        endorsed by Pinnacle Entertainment Group.
      </div>
    </footer>
  );
};

export default Footer;
