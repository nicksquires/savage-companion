import { Sword, Users, Heart, Star } from "lucide-react";
import logo2 from "@/public/images/svglogo_white_logo_only.png";
import Image from "next/image";

export default function AboutPage() {
  return (
    <div className="min-h-screen bg-base-100 text-base-content pb-24">
      <div className="max-w-4xl mx-auto px-6 pt-20">
        <div className="flex justify-center mb-10">
          <Image src={logo2} className="w-27 opacity-90" alt="Logo" />
        </div>

        <h1 className="font-header text-6xl md:text-7xl text-center tracking-tighter mb-8">
          About eSquires Studios
        </h1>

        <div className="prose prose-lg max-w-none text-base-content/90">
          <p className="text-xl text-center">
            We build tools for storytellers.
          </p>

          <div className="my-16 border-l-4 border-primary pl-8">
            <p className="text-2xl leading-relaxed">
              Savage Companion is a passion project born from years of running
              and participating in all flavours of tabletop campaigns.
            </p>
          </div>

          <p className="py-2">
            My name is <strong>Nicholas Squires</strong>, and I created eSquires
            Studios as an independent studio dedicated to making high-quality
            digital products.
          </p>
          <p className="py-2">
            Harnessing this alongside my passion for the Savage Worlds tabletop
            system, I decided to create a small web app to manage my personal
            campaigns and assets, and that idea grew until I decided to take
            inspiration from giants like&nbsp;
            <a href="https://roll20.net" className="link-primary">
              Roll20
            </a>
            &nbsp;and&nbsp;
            <a href="https://www.dndbeyond.com" className="link-primary">
              D&amp;D Beyond
            </a>
            &nbsp;and challenge myself to create something that other people
            might make use of.
          </p>
          <p className="py-2">
            I want to spread the spirit of Savage Worlds to as many people as I
            can, and am always open to suggestions for how I can best achieve
            that.
          </p>
          <p className="py-2">
            While I am a proud member of team "Pen and Paper", I also know that
            there is a large community of virtual tabletop sessions. My hope is
            this app will provide a simple, fast way to enjoy my favorite
            tabletop RPG system to that community of online players and GMs.
          </p>

          <div className="grid md:grid-cols-3 gap-8 my-16">
            <div className="text-center">
              <Sword className="w-12 h-12 mx-auto mb-4 text-primary" />
              <h3 className="font-header text-xl">Built for Play</h3>
              <p className="text-sm text-base-content/70">
                Fast character creation, exploding dice, and real-time campaign
                tools.
              </p>
            </div>
            <div className="text-center">
              <Users className="w-12 h-12 mx-auto mb-4 text-primary" />
              <h3 className="font-header text-xl">Made by Players</h3>
              <p className="text-sm text-base-content/70">
                Designed by a tabletop enjoyer who wanted SWADE-specific utility
                and customization.
              </p>
            </div>
            <div className="text-center">
              <Heart className="w-12 h-12 mx-auto mb-4 text-primary" />
              <h3 className="font-header text-xl">For the Community</h3>
              <p className="text-sm text-base-content/70">
                Built with love for fans of the Savage Worlds system.
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
