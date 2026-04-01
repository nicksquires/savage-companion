"use client";

const assets = [
  {
    title: "Deadlands: The Weird West",
    type: "Core Setting",
    price: "$9.99",
    img: "/images/deadlands.jpg",
  },
  {
    title: "Fantasy Companion",
    type: "Rules Expansion",
    price: "Free",
    img: "/images/fantasy.jpg",
  },
  {
    title: "Sci-Fi Token Pack",
    type: "Assets",
    price: "$4.99",
    img: "/images/scifi.jpg",
  },
  {
    title: "East Texas University",
    type: "Setting",
    price: "$7.99",
    img: "/images/etu.jpg",
  },
];

export default function MarketplaceCarousel() {
  return (
    <section className="py-24 bg-navbar overflow-hidden">
      <div className="max-w-6xl mx-auto px-4">
        {/* Header */}
        <div className="flex justify-between items-end mb-10">
          <div>
            <h2 className="text-3xl font-bold text-stone-100">The Bazaar</h2>
            <p className="text-stone-400 mt-2">
              Expand your multiverse with official and homebrew content.
            </p>
          </div>
        </div>

        {/* DaisyUI native Carousel */}
        <div className="carousel carousel-center w-full space-x-4 p-4 bg-transparent rounded-box -ml-4">
          {assets.map((item, index) => (
            <div
              key={index}
              className="carousel-item w-[85%] sm:w-1/2 md:w-1/3 lg:w-1/4"
            >
              {/* DaisyUI Card */}
              <div className="card w-full bg-stone-900 border border-stone-800 rounded-xl overflow-hidden group cursor-pointer hover:border-amber-600 transition-all">
                <figure className="h-48 relative w-full m-0 p-0">
                  <div
                    className="absolute inset-0 bg-cover bg-center group-hover:scale-105 transition-transform duration-500"
                    style={{ backgroundImage: `url(${item.img})` }}
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-stone-900 to-transparent" />
                </figure>

                <div className="card-body p-5 flex flex-row justify-between items-center bg-stone-900">
                  <div className="flex flex-col">
                    <h3 className="card-title text-lg font-bold text-stone-100 m-0">
                      {item.title}
                    </h3>
                    <p className="text-sm text-stone-500 m-0">{item.type}</p>
                  </div>

                  {/* DaisyUI Badge */}
                  <div
                    className={`badge border-none py-3 px-3 font-medium ${
                      item.price === "Free"
                        ? "bg-amber-600 text-navbar"
                        : "bg-stone-800 text-stone-300"
                    }`}
                  >
                    {item.price}
                  </div>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
