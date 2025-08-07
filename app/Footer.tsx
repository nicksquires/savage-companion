import React from "react";
import Image from "next/image";
import logo from "/public/images/SW_LOGO_FP_2018.png";

const Footer = () => {
  return (
    <footer className="footer bg-base-200 text-base-content p-5">
      <aside className="ml-11 w-4/6">
        <Image src={logo} alt="Savage worlds logo" width={100} height={110} />
        <p className="font-semibold">
          Savage Worlds Manager
          <br />
          Virtual tabletop companion
          <br />
        </p>
        <p className="mt-3 text-xs">
          This application references the Savage Worlds game system, available
          from{" "}
          <a href="https://peginc.com/?ref=savaged-us" className="link">
            Pinnacle Entertainment Group
          </a>{" "}
          at{" "}
          <a href="https://peginc.com/?ref=savaged-us" className="link">
            www.peginc.com
          </a>
          . Savage Worlds and all associated logos and trademarks are copyrights
          of Pinnacle Entertainment Group. Used with permission. Pinnacle makes
          no representation or warranty as to the quality, viability, or
          suitability for purpose of this product.
        </p>
      </aside>
      <nav className="mr-16">
        <h6 className="footer-title">Campaigns</h6>
        <a className="link link-hover">New Campaign</a>
        <a className="link link-hover">Active Campaigns</a>
        <a className="link link-hover">Encounters</a>
      </nav>
      <nav className="mr-16">
        <h6 className="footer-title">Tools</h6>
        <a className="link link-hover">Character Builder</a>
        <a className="link link-hover">Combat Assistant</a>
        <a className="link link-hover">Beast Builder</a>
      </nav>
      <nav className="mr-16">
        <h6 className="footer-title">Reference</h6>
        <a className="link link-hover">Bestiary</a>
        <a className="link link-hover">Races</a>
        <a className="link link-hover">Hindrances</a>
        <a className="link link-hover">Edges</a>
        <a className="link link-hover">Gear</a>
        <a className="link link-hover">Powers</a>
      </nav>
    </footer>
  );
};

export default Footer;
