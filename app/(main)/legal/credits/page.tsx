import logo2 from "@/public/images/svglogo_white_logo_only.png";
import Image from "next/image";

export default function CreditsPage() {
  return (
    <div className="min-h-screen bg-base-100 text-base-content pb-24">
      <div className="max-w-4xl mx-auto px-6 pt-16">
        <div className="flex justify-center mb-8">
          <Image src={logo2} className="w-27 opacity-90" alt="Logo" />
        </div>

        <h1 className="font-header text-6xl text-center tracking-tighter mb-4">
          Credits &amp; Attributions
        </h1>
        <p className="text-center text-xl text-base-content/70">
          Thank you to everyone who made this possible.
        </p>

        <div className="mt-16 space-y-16">
          <section>
            <h2 className="font-header text-3xl mb-6">Creator</h2>
            <p className="text-2xl">
              Nicholas Squires -{" "}
              <span className="text-primary">eSquires Studios</span>
            </p>
          </section>

          <section>
            <h2 className="font-header text-3xl mb-6">Visual Identity</h2>
            <p className="text-xl">
              Logo designed by <strong>Giggles and Pie Graphic Design</strong>
            </p>
          </section>

          <section>
            <h2 className="font-header text-3xl mb-6">Icons</h2>
            <p>
              The vast majority of icons come from{" "}
              <a
                href="https://game-icons.net"
                target="_blank"
                className="link text-primary"
              >
                game-icons.net
              </a>{" "}
              and are used under the{" "}
              <a
                href="https://creativecommons.org/licenses/by/3.0/"
                target="_blank"
                className="link text-primary"
              >
                CC BY 3.0
              </a>{" "}
              license.
            </p>
            <p className="text-sm mt-2 text-base-content/70">
              Thank you to Lorc, Delapouite, Skoll, and all the other
              contributors.
            </p>
          </section>

          <section>
            <h2 className="font-header text-3xl mb-6">Typography</h2>
            <ul className="space-y-3 text-lg">
              <li>
                • Treacherous Corners, Bathory, Varnyx — Custom / Local fonts
              </li>
              <li>
                • Inter, Cinzel, Orbitron, Rajdhani, Crimson Text, Righteous,
                Lato, Lora, Merriweather, Creepster, Roboto Slab, Amatic SC,
                Quicksand, Playfair Display, PT Serif, Anton, Courier Prime,
                Bebas Neue, Libre Baskerville, Montserrat, Open Sans, Press
                Start 2P, Space Mono — Google Fonts
              </li>
            </ul>
          </section>

          <section>
            <h2 className="font-header text-3xl mb-6">Textures</h2>
            <p className="text-lg">
              Background textures and parchment effects sourced from{" "}
              <a
                href="https://texturelabs.org"
                target="_blank"
                className="link text-primary"
              >
                texturelabs.org
              </a>
              .
            </p>
          </section>
        </div>

        <div className="mt-20 pt-12 border-t border-base-content/10 text-center text-sm text-base-content/60">
          © {new Date().getFullYear()} eSquires Studios • All original code and
          design © Nicholas Squires
        </div>
      </div>
    </div>
  );
}
