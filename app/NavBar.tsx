"use client";
import { useSession } from "next-auth/react";
import Image from "next/image";
import Link from "next/link";
import React from "react";
import logo from "/public/images/SW_LOGO_FP_2018.png";

const NavBar = () => {
  const { status, data: session } = useSession();

  return (
    <div className="navbar bg-black space-x-5">
      <Link href="/" className="text-xl mr-5 mb-1">
        <Image src={logo} alt="Savage worlds logo" width={100} height={110} />
        {/* My App */}
      </Link>

      {/* <Link href="/users" className="">
        Users
      </Link> */}

      <div className="dropdown dropdown-hover">
        <div tabIndex={0} className=" bg-black border-none">
          <a href="">Campaigns</a>
        </div>
        <ul
          tabIndex={0}
          className="dropdown-content menu bg-base-300 rounded-box z-[1] w-52 p-2 shadow"
        >
          <li>
            <a>New Campaign</a>
          </li>
          <li>
            <a>Active Campaigns</a>
          </li>
          <li>
            <a>Encounters</a>
          </li>
        </ul>
      </div>

      <div className="dropdown dropdown-hover">
        <div tabIndex={0} className=" bg-black border-none">
          <a href="">Tools</a>
        </div>
        <ul
          tabIndex={0}
          className="dropdown-content menu bg-base-300 rounded-box z-[1] w-52 p-2 shadow"
        >
          <li>
            <a>Character Builder</a>
          </li>
          <li>
            <a>Combat Assistant</a>
          </li>
          <li>
            <a>Beast Builder</a>
          </li>
        </ul>
      </div>

      <div className="dropdown dropdown-hover">
        <div tabIndex={0} className=" bg-black border-none">
          <a href="">Reference</a>
        </div>
        <ul
          tabIndex={0}
          className="dropdown-content menu bg-base-300 rounded-box z-[1] w-52 p-2 shadow"
        >
          <li>
            <a>Bestiary</a>
          </li>
          <li>
            <a>Races</a>
          </li>
          <li>
            <a>Hindrances</a>
          </li>
          <li>
            <a>Edges</a>
          </li>
          <li>
            <a>Gear</a>
          </li>
          <li>
            <a>Powers</a>
          </li>
        </ul>
      </div>

      {status === "loading" && <div className="loading"></div>}
      {status === "authenticated" && (
        <div className="float-right">
          {session.user!.name || session.user!.email}
          <Link href="/api/auth/signout" className="ml-3">
            Sign Out
          </Link>
        </div>
      )}
      {status === "unauthenticated" && (
        <div>
          <Link href="/api/auth/signin">Login</Link>
          <div className="divider divider-horizontal"></div>
          <Link href="/users/new">Sign Up</Link>
        </div>
      )}
    </div>
  );
};

export default NavBar;
