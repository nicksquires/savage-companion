"use client";

import { useSession, signOut } from "next-auth/react";
import Image from "next/image";
import Link from "next/link";
import logo2 from "@/public/images/svglogo_white_logo_only.png";
import logotext from "@/public/images/svglogo_white_text_canvas.png";
import ModeToggle from "./ModeToggle";
import ThemeSwitcher from "./ThemeSwitcher";
import { UserCircle, ChevronDown } from "lucide-react";
import BurgerDrawer from "./BurgerDrawer";

const NavBar = () => {
  const { status, data: session } = useSession();

  const handleSignOut = async () => {
    await signOut({ callbackUrl: "/" });
  };

  return (
    <div
      className="navbar bg-navbar text-navbar-content 
      md:sticky lg:static
      border-b-2 border-primary px-2 z-40"
    >
      {/* LEFT — Logo */}
      <div className="navbar-start">
        <Link href="/" className="flex items-center">
          <Image
            src={logo2}
            alt="Savage Worlds Fan Product logo"
            className="w-12 sm:w-14 drop-shadow-primary/50 drop-shadow-sm opacity-95"
            priority
          />

          <Image
            src={logotext}
            alt="Savage Worlds Fan Product logo"
            className="w-32 ml-1 drop-shadow-primary/40 drop-shadow-sm opacity-95"
            priority
          />

          {/* <h2 className="font-header-bold uppercase text-[44px] tracking-tight ml-1">
            Savage
            <p className="tracking-tight text-2xl px-px -mt-4">
              Companion
            </p>
          </h2> */}

          {/* <h2
            className="font-header-bold uppercase text-[44px] tracking-normal ml-1
          drop-shadow-primary/40 drop-shadow-sm opacity-95"
          >
            Savage
            <p className="tracking-[0.13rem] text-[24px] -mt-5">Companion</p>
          </h2> */}
        </Link>
      </div>

      {/* CENTER — Nav links */}
      <div
        className="navbar-center hidden lg:flex gap-8 font-header
      text-lg"
      >
        {/* Play Dropdown */}
        <div className="dropdown dropdown-hover">
          <div
            tabIndex={0}
            role="button"
            className="m-1 flex flex-row items-center gap-1 pointer-events-none"
          >
            Play
            <ChevronDown className="md:w-5 md:h-5" />
          </div>
          <ul
            tabIndex={0}
            className="dropdown-content menu bg-navbar 
            rounded-box z-1 w-52 p-2 shadow border border-navbar-content/15"
          >
            <li className="opacity-50 pointer-events-none">
              <Link href="#">Getting Started</Link>
            </li>

            <li className="opacity-50 pointer-events-none">
              <Link href="#">Campaigns</Link>
            </li>
            <li>
              <Link href="/characters">Characters</Link>
            </li>
            <li className="opacity-50 pointer-events-none">
              <Link href="/reference/edges">Game Rules</Link>
            </li>
            <li className="opacity-50 pointer-events-none">
              <Link href="#">Guilds</Link>
            </li>
          </ul>
        </div>

        {/* Tools Dropdown */}
        <div className="dropdown dropdown-hover">
          <div
            tabIndex={0}
            role="button"
            className="m-1 flex flex-row items-center gap-1 pointer-events-none"
          >
            Tools
            <ChevronDown className="md:w-5 md:h-5" />
          </div>
          <ul
            tabIndex={0}
            className="dropdown-content menu bg-navbar 
            rounded-box z-1 w-52 p-2 shadow border border-navbar-content/15"
          >
            <li>
              <Link href="/characters">Character Creator</Link>
            </li>
            <li className="opacity-50 pointer-events-none">
              <Link href="#">Homebrew Portal</Link>
            </li>
            <li className="opacity-50 pointer-events-none">
              <Link href="#">Combat Assistant</Link>
            </li>
            <li className="opacity-50 pointer-events-none">
              <Link href="#">Encounters</Link>
            </li>
            <li className="opacity-50 pointer-events-none">
              <Link href="#">Library</Link>
            </li>
          </ul>
        </div>

        {/* Shop Dropdown */}
        <div className="dropdown dropdown-hover">
          <div
            tabIndex={0}
            role="button"
            className="m-1 flex flex-row items-center gap-1 pointer-events-none"
          >
            Shop
            <ChevronDown className="md:w-5 md:h-5" />
          </div>
          <ul
            tabIndex={0}
            className="dropdown-content menu bg-navbar 
            rounded-box z-1 w-52 p-2 shadow border border-navbar-content/15"
          >
            <li>
              <Link href="https://shop.peginc.com/">PEGinc Shop</Link>
            </li>
            <li className="opacity-50 pointer-events-none">
              <Link href="#">Compendiums</Link>
            </li>
            <li className="opacity-50 pointer-events-none">
              <Link href="#">Game Resources</Link>
            </li>
          </ul>
        </div>

        {/* About Dropdown */}
        <div className="dropdown dropdown-hover">
          <div
            tabIndex={0}
            role="button"
            className="m-1 flex flex-row items-center gap-1 pointer-events-none"
          >
            About
            <ChevronDown className="md:w-5 md:h-5" />
          </div>
          <ul
            tabIndex={0}
            className="dropdown-content menu bg-navbar 
            rounded-box z-1 w-52 p-2 shadow border border-navbar-content/15"
          >
            <li>
              <Link href="/about">About Us</Link>
            </li>
            <li>
              <Link href="/legal/credits">Credits</Link>
            </li>
            <li>
              <Link href="/legal/licenses">Licenses</Link>
            </li>
            <li>
              <Link href="/legal/privacy">Privacy</Link>
            </li>
            <li>
              <Link href="/legal/terms">Terms</Link>
            </li>
          </ul>
        </div>
      </div>

      {/* RIGHT — Theme & Mode Toggle + Auth */}
      <div
        className="navbar-end flex items-center gap-3 md:gap-4 lg:gap-5 
                lg:min-w-2/5 min-w-5/6"
      >
        {/* Main action icons — 4 slots, evenly spaced */}
        <div className="flex items-center justify-end flex-1 gap-1 sm:gap-2 md:gap-4 lg:gap-6 min-w-0">
          {/* 1. Burger – hidden on lg+ */}
          <div className="lg:hidden items-center justify-center">
            <BurgerDrawer />
          </div>

          <div
            className="lg:hidden divider divider-horizontal border-l border-navbar-content/15
           m-0 py-0 px-0 w-0"
          />

          {/* 2. Theme Family Selector */}
          <div className="flex items-center justify-center">
            <ThemeSwitcher />
          </div>

          <div
            className="divider divider-horizontal border-l border-navbar-content/15
           my-0 py-0 mx-0 w-0"
          />
          {/* 3. Light/Dark Toggle */}
          {/* <div className="flex items-center justify-center">
            <ModeToggle />
          </div> */}

          <div
            className="divider divider-horizontal border-l border-navbar-content/15
           my-0 py-0 mx-0 w-0 sm:hidden"
          />

          {/* 4. User Dropdown Button – authenticated only */}
          {status === "authenticated" && session?.user && (
            <div className="dropdown dropdown-end">
              <div
                tabIndex={0}
                role="button"
                className="btn btn-circle btn-md 
                flex items-center text-center gap-2 
                bg-navbar border-navbar sm:bg-base-300
                sm:p-5 sm:ml-1 ml-2 mr-1.5 sm:mr-2 lg:mr-3 
                min-w-11rem sm:w-44 
                shadow-sm hover:brightness-110 transition-all"
              >
                <div className="avatar placeholder">
                  <div
                    className="sm:bg-base-300 bg-navbar sm:text-base-content text-navbar-content/85 
                  rounded-full w-full h-full hover:text-navbar-content"
                  >
                    <UserCircle className="w-7 h-7" />

                    {/* smaller icon */}
                  </div>
                  <ChevronDown
                    size={18}
                    className="absolute -right-4.5 top-1 inline sm:hidden"
                  />
                </div>

                <div className="flex items-center gap-1.5 flex-1 justify-between">
                  <span className="text-sm font-medium hidden sm:inline truncate w-full">
                    {session.user?.name || session.user?.email?.split("@")[0]}
                  </span>
                  <span className="sm:inline hidden">
                    <ChevronDown size={15} className="sm:opacity-50" />
                  </span>
                </div>
              </div>

              <ul
                tabIndex={0}
                className="dropdown-content menu bg-navbar
                rounded-box z-50 w-56 p-2 shadow-lg 
                border border-base-300/30 mt-1"
              >
                <li>
                  <Link href="/dashboard">Dashboard</Link>
                </li>
                <li>
                  <Link href="#">Notifications</Link>
                </li>
                <li>
                  <Link href="#">Messages</Link>
                </li>
                <li>
                  <Link href="#">Profile</Link>
                </li>
                <li>
                  <Link href="#">My Characters</Link>
                </li>
                <li>
                  <Link href="#">Settings</Link>
                </li>
                <li className="mt-2 pt-2 border-t-2 border-base-200/40">
                  <Link href="#" className="text-navbar-content">
                    Account
                  </Link>
                </li>
                <li>
                  <button
                    onClick={handleSignOut}
                    className="text-error w-full text-left"
                  >
                    Sign Out
                  </button>
                </li>
              </ul>
            </div>
          )}

          {/* Auth fallback when unauthenticated */}
          {status === "loading" && (
            <span className="loading loading-spinner loading-md opacity-50" />
          )}

          {status === "unauthenticated" && (
            <div className="flex items-center gap-0 sm:gap-2 mr-2 sm:mr-4">
              <Link href="/signin" className="btn btn-xs sm:btn-sm btn-ghost">
                LOGIN
              </Link>
              <Link href="/signin" className="btn btn-xs sm:btn-sm btn-primary">
                SIGN UP
              </Link>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default NavBar;
