"use client";

import { Card, CardContent } from "@/components/ui/card";
import {
  Carousel,
  CarouselContent,
  CarouselItem,
  CarouselNext,
  CarouselPrevious,
} from "@/components/ui/carousel";

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
    price: "Free",
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

export default function MarketplaceCarousel() {
  return (
    <section className="py-24 bg-base-50">
      <div className="max-w-7xl mx-auto px-6 flex-col">
        <div className="flex justify-between items-end mb-10">
          <div>
            <h2 className="text-4xl font-header font-bold text-base-content">
              The Bazaar
            </h2>
            <p className="text-base-content/70 mt-2">
              Official and fan-created content for every setting.
            </p>
          </div>
        </div>
        <div className="2xl:mx-0 mx-24">
          <Carousel
            opts={{
              align: "start",
              loop: true,
            }}
            className="w-full"
          >
            <CarouselContent className="-ml-4">
              {assets.map((item, index) => (
                <CarouselItem
                  key={index}
                  className="pl-4 basis-full md:basis-1/2 xl:basis-1/3 2xl:basis-1/4"
                >
                  <Card className="overflow-hidden border-base-300 bg-base-400/40 hover:border-primary transition-all group cursor-pointer">
                    <div className="h-52 relative">
                      <img
                        src={item.img}
                        alt={item.title}
                        className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                      />
                      <div className="absolute inset-0 bg-linear-to-t from-base-900/80 to-transparent" />
                    </div>
                    <CardContent className="p-4 flex flex-col justify-between items-start">
                      <div>
                        <h3 className="font-semibold text-lg text-base-content">
                          {item.title}
                        </h3>
                        <p className="text-sm text-base-content/60">
                          {item.type}
                        </p>
                      </div>
                      <div className="flex w-full justify-end">
                        <span
                          className={`badge px-2 ${
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
                </CarouselItem>
              ))}
            </CarouselContent>
            <CarouselPrevious className="bg-base-100 border-base-300" />
            <CarouselNext className="bg-base-100 border-base-300" />
          </Carousel>
        </div>
      </div>
    </section>
  );
}
