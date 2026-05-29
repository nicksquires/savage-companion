"use client";

import { Card, CardContent } from "@/components/ui/card";
import {
  Carousel,
  CarouselContent,
  CarouselItem,
  CarouselNext,
  CarouselPrevious,
} from "@/components/ui/carousel";
import { motion, Variants } from "framer-motion";

const assets = [
  {
    title: "Deadlands: The Weird West",
    type: "Core Setting",
    price: "$9.99",
    img: "/images/sources/SW_DEADLANDS.jpg",
  },
  {
    title: "Fantasy Companion",
    type: "Rules Expansion",
    price: "$20.99",
    img: "/images/sources/SW_FANTASY_2.webp",
  },
  {
    title: "Sci-Fi Companion",
    type: "Assets",
    price: "$19.99",
    img: "/images/sources/SW_SCIFI_2.png",
  },
  {
    title: "East Texas University",
    type: "Setting",
    price: "$7.99",
    img: "/images/sources/SW_EAST_TEXAS_UNIVERSITY.jpg",
  },
  {
    title: "Horror Companion",
    type: "Rules Expansion",
    price: "$6.99",
    img: "/images/sources/SW_HORROR.jpg",
  },
  {
    title: "Super Powers Companion",
    type: "Rules Expansion",
    price: "Free",
    img: "/images/sources/SW_SUPERPOWERS2.jpg",
  },
  {
    title: "Pirates of the Spanish Main",
    type: "Setting",
    price: "$8.99",
    img: "/images/sources/SW_PIRATES_SPANISH_MAIN.jpg",
  },
  {
    title: "Space 1889",
    type: "Setting",
    price: "$11.99",
    img: "/images/sources/SW_SPACE1889.jpg",
  },
];

// Animation variants
const containerVariants: Variants = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: {
      staggerChildren: 0.1,
      delayChildren: 0.2,
    },
  },
};

const cardVariants: Variants = {
  hidden: {
    opacity: 0,
    y: 60,
    scale: 0.95,
  },
  visible: {
    opacity: 1,
    y: 0,
    scale: 1,
    transition: {
      duration: 0.6,
      ease: [0.25, 0.1, 0.25, 1], // smooth "gentle" easing
    },
  },
};

export default function MarketplaceCarousel() {
  return (
    <>
      <div className="absolute z-0 bg-background/95 mask-y-from-78% sm:mask-y-from-90% w-full h-full" />
      <div className="py-20 sm:py-20 bg-background/90 mask-t-from-90%">
        <div className="max-w-full mx-auto px-1 lg:px-6 flex-col">
          <div className="flex justify-center items-end mb-10">
            <div className="mx-12 text-center">
              <h2 className="text-4xl sm:text-6xl md:text-7xl uppercase font-header font-bold text-base-content">
                Marketplace
              </h2>
              <p className="text-base-content/90 mt-2 text-xs md:text-lg">
                Official and fan-created content. For every setting.
              </p>
            </div>
          </div>

          <div className="lg:mx-24 sm:mx-28 mx-20">
            <Carousel
              opts={{
                align: "start",
                loop: true,
              }}
              className="w-full"
            >
              <motion.div
                variants={containerVariants}
                initial="hidden"
                whileInView="visible"
                viewport={{ once: true, margin: "-100px" }}
              >
                <CarouselContent className="-mr-4">
                  {assets.map((item, index) => (
                    <CarouselItem
                      key={index}
                      className="px-4 basis-full md:basis-1/2 xl:basis-1/3 2xl:basis-1/4"
                    >
                      <motion.div variants={cardVariants}>
                        <Card
                          className="overflow-hidden border-2 bg-[url('/images/textures/builder_bg.png')] bg-top-left 
                            border-base-content/20 transition-all group cursor-pointer 
                            mask-y-from-98% mask-x-from-99% lg:h-115"
                        >
                          <div className="h-48 sm:h-64 lg:h-70 relative">
                            <img
                              src={item.img}
                              alt={item.title}
                              className="h-full w-full object-cover group-hover:scale-101 transition-transform duration-500 rounded-xs"
                            />
                            <div className="absolute inset-0 bg-linear-to-t from-base-900/80 to-transparent" />
                          </div>
                          <CardContent className="px-3 sm:px-4 flex flex-col justify-between items-start max-h-1/3">
                            <div>
                              <h3 className="font-semibold text-lg text-base-content">
                                {item.title}
                              </h3>
                              <p className="text-sm text-base-content/75">
                                {item.type}
                              </p>
                            </div>
                            <div className="flex w-full justify-end">
                              <span
                                className={`badge px-2.5 ${
                                  item.price === "Free"
                                    ? "badge-success"
                                    : "badge-primary"
                                }`}
                              >
                                {item.price}
                              </span>
                            </div>
                          </CardContent>
                        </Card>
                      </motion.div>
                    </CarouselItem>
                  ))}
                </CarouselContent>
              </motion.div>

              <CarouselPrevious
                className="bg-base-800/40 hover:bg-base-800/70 hover:scale-105 
                border-base-300/40 size-12 -left-18"
              />
              <CarouselNext
                className="bg-base-800/40 hover:bg-base-800/70 hover:scale-105 
                border-base-300/40 size-12 -right-18"
              />
            </Carousel>
          </div>
        </div>
      </div>
    </>
  );
}
