"use client";

import { useSession } from "next-auth/react";
import Image from "next/image";
import Link from "next/link";
import React from "react";
import logo from "/public/images/SW_LOGO_FP_2018.png";
import ModeToggle from "./ModeToggle";
import ThemeSwitcher from "./ThemeSwitcher";
import { ChevronDown } from "lucide-react";
import BurgerDrawer from "./BurgerDrawer";

const NavBar = () => {
  const { status, data: session } = useSession();

  return (
    <div
      className="navbar bg-navbar text-navbar-content md:sticky lg:static
                    border-b-2 border-primary px-2"
    >
      {/* LEFT — Logo */}
      <div className="navbar-start">
        <Link href="/" className="flex items-center">
          <Image
            src={logo}
            alt="Savage Worlds Fan Product logo"
            className="w-30 h-20"
          />
        </Link>
      </div>

      {/* CENTER — Nav links */}
      <div
        className="navbar-center hidden lg:flex gap-8 font-header
      text-lg"
      >
        {/* Campaigns Dropdown */}
        <div className="dropdown dropdown-hover">
          <div
            tabIndex={0}
            role="button"
            className="m-1 flex flex-row items-center gap-1"
          >
            Campaigns
            <ChevronDown size={15} />
          </div>
          <ul
            tabIndex={0}
            className="dropdown-content menu bg-navbar 
            rounded-box z-1 w-52 p-2 shadow border border-primary/10"
          >
            <li>
              <Link href="#">New Campaign</Link>
            </li>
            <li>
              <Link href="#">Active Campaigns</Link>
            </li>
            <li>
              <Link href="#">Encounters</Link>
            </li>
          </ul>
        </div>

        {/* Tools Dropdown */}
        <div className="dropdown dropdown-hover">
          <div
            tabIndex={0}
            role="button"
            className="m-1 flex flex-row items-center gap-1"
          >
            Tools
            <ChevronDown size={15} />
          </div>
          <ul
            tabIndex={0}
            className="dropdown-content menu bg-navbar 
            rounded-box z-1 w-52 p-2 shadow border border-primary/10"
          >
            <li>
              <Link href="#">Character Builder</Link>
            </li>
            <li>
              <Link href="#">Combat Assistant</Link>
            </li>
            <li>
              <Link href="#">Beast Builder</Link>
            </li>
          </ul>
        </div>

        {/* Reference Dropdown */}
        <div className="dropdown dropdown-hover">
          <div
            tabIndex={0}
            role="button"
            className="m-1 flex flex-row items-center gap-1"
          >
            Reference
            <ChevronDown size={15} />
          </div>
          <ul
            tabIndex={0}
            className="dropdown-content menu bg-navbar 
            rounded-box z-1 w-52 p-2 shadow border border-primary/10"
          >
            <li>
              <Link href="#">Bestiary</Link>
            </li>
            <li>
              <Link href="#">Races</Link>
            </li>
            <li>
              <Link href="#">Hindrances</Link>
            </li>
            <li>
              <Link href="/reference/edges">Edges</Link>
            </li>
            <li>
              <Link href="#">Gear</Link>
            </li>
            <li>
              <Link href="#">Powers</Link>
            </li>
          </ul>
        </div>
      </div>

      {/* RIGHT — Auth & Mode Toggle */}
      <div className="navbar-end gap-2">
        {/* Burger menu */}
        <div className="flex lg:hidden mr-2">
          <BurgerDrawer />
        </div>

        {/* 1. Theme Family Selector */}
        <ThemeSwitcher />

        {/* 2. Light/Dark Toggle */}
        <ModeToggle />

        <div className="divider divider-horizontal mx-0"></div>

        {/* ... Auth section ... */}
        {status === "loading" && (
          <span className="loading loading-spinner loading-sm" />
        )}
        {status === "authenticated" && (
          <div className="flex items-center gap-4">
            <span className="text-md text-center font-medium hidden sm:inline">
              {session.user?.name || session.user?.email}
            </span>
            <Link
              href="/api/auth/signout"
              className="btn btn-sm btn-outline mr-2"
            >
              Sign Out
            </Link>
          </div>
        )}
        {status === "unauthenticated" && (
          <div className="flex items-center gap-2">
            <Link href="/api/auth/signin" className="btn btn-sm btn-ghost">
              Login
            </Link>
            <Link href="/users/new" className="btn btn-sm btn-primary mr-2">
              Sign Up
            </Link>
          </div>
        )}
      </div>
    </div>
  );
};

export default NavBar;
