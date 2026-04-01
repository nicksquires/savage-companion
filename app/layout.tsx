import type { Metadata } from "next";
import { auth } from "@/auth";
import Providers from "./(auth)/Provider";
import "./globals.css";
import NavBar from "@/components/layout/NavBar";
import Footer from "../components/layout/Footer";

import localFont from "next/font/local";
import {
  Inter,
  Cinzel,
  Orbitron,
  Rajdhani,
  Crimson_Text,
  Righteous,
  Lato,
  Lora,
  Merriweather,
  Creepster,
  Roboto_Slab,
  Amatic_SC,
  Quicksand,
  Playfair_Display,
  PT_Serif,
  Anton,
  Courier_Prime,
  Bebas_Neue,
  Libre_Baskerville,
  Montserrat,
  Open_Sans,
  Press_Start_2P,
  Space_Mono,
} from "next/font/google";

// --- FONT DEFINITIONS ---

// 1. Standard
const inter = Inter({ variable: "--font-inter", subsets: ["latin"] });
const poppins = localFont({
  src: "../public/fonts/poppins-regular-webfont.woff2",
  variable: "--font-poppins",
});

// 2. Cyberpunk
const orbitron = Orbitron({ variable: "--font-orbitron", subsets: ["latin"] });
const rajdhani = Rajdhani({
  variable: "--font-rajdhani",
  subsets: ["latin"],
  weight: ["400", "700"],
});

// 3. Eldritch
const cinzel = Cinzel({ variable: "--font-cinzel", subsets: ["latin"] });
const crimson = Crimson_Text({
  variable: "--font-crimson",
  subsets: ["latin"],
  weight: ["400", "700"],
});

// 4. Aquatica
const righteous = Righteous({
  variable: "--font-righteous",
  subsets: ["latin"],
  weight: ["400"],
});
const lato = Lato({
  variable: "--font-lato",
  subsets: ["latin"],
  weight: ["400", "700"],
});

// 5. Fantasy
const lora = Lora({ variable: "--font-lora", subsets: ["latin"] });
const merriweather = Merriweather({
  variable: "--font-merriweather",
  subsets: ["latin"],
  weight: ["400", "700"],
});

// 6. Blood
const creepster = Creepster({
  variable: "--font-creepster",
  subsets: ["latin"],
  weight: ["400"],
});
const robotoSlab = Roboto_Slab({
  variable: "--font-roboto-slab",
  subsets: ["latin"],
});

// 7. Forest
const amatic = Amatic_SC({
  variable: "--font-amatic",
  subsets: ["latin"],
  weight: ["400", "700"],
});
const quicksand = Quicksand({
  variable: "--font-quicksand",
  subsets: ["latin"],
});

// 8. Steam
const playfair = Playfair_Display({
  variable: "--font-playfair",
  subsets: ["latin"],
});
const ptSerif = PT_Serif({
  variable: "--font-pt-serif",
  subsets: ["latin"],
  weight: ["400", "700"],
});

// 9. Atomic
const anton = Anton({
  variable: "--font-anton",
  subsets: ["latin"],
  weight: ["400"],
});
const courier = Courier_Prime({
  variable: "--font-courier",
  subsets: ["latin"],
  weight: ["400", "700"],
});

// 10. Noir
const bebas = Bebas_Neue({
  variable: "--font-bebas",
  subsets: ["latin"],
  weight: ["400"],
});
const baskerville = Libre_Baskerville({
  variable: "--font-baskerville",
  subsets: ["latin"],
  weight: ["400", "700"],
});

// 11. Frost
const montserrat = Montserrat({
  variable: "--font-montserrat",
  subsets: ["latin"],
});
const openSans = Open_Sans({
  variable: "--font-open-sans",
  subsets: ["latin"],
});

// 12. Synthwave
const pressStart = Press_Start_2P({
  variable: "--font-press-start",
  subsets: ["latin"],
  weight: ["400"],
});
const spaceMono = Space_Mono({
  variable: "--font-space-mono",
  subsets: ["latin"],
  weight: ["400", "700"],
});

export const metadata: Metadata = {
  title: "Savage Worlds Companion",
  description: "Virtual Tabletop Manager",
};

export default async function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const session = await auth();

  return (
    <html
      lang="en"
      suppressHydrationWarning
      className={`
          ${inter.variable} ${poppins.variable} ${orbitron.variable} ${rajdhani.variable} 
          ${cinzel.variable} ${crimson.variable} ${righteous.variable} ${lato.variable} 
          ${lora.variable} ${merriweather.variable} ${creepster.variable} ${robotoSlab.variable} 
          ${amatic.variable} ${quicksand.variable} ${playfair.variable} ${ptSerif.variable} 
          ${anton.variable} ${courier.variable} ${bebas.variable} ${baskerville.variable} 
          ${montserrat.variable} ${openSans.variable} ${pressStart.variable} ${spaceMono.variable}
          antialiased bg-base-100 text-base-content font-body transition-colors duration-300
        `}
    >
      <body>
        <Providers session={session}>
          <div className="flex flex-col min-h-screen">
            <NavBar />
            <main className="grow">{children}</main>
            <Footer />
          </div>
        </Providers>
      </body>
    </html>
  );
}
