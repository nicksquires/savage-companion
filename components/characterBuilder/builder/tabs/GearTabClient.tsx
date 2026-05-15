"use client";

import { useEffect, useState, useMemo } from "react";
import { useCharacterBuilder } from "@/stores/characterBuilderStore";
import { motion, AnimatePresence } from "framer-motion";
import { useParams } from "next/navigation";
import { getAvailableItems } from "@/app/(main)/characters/[id]/builder/api/draft/characterActions";
import { Search, Minus, Plus, Shirt, Backpack } from "lucide-react";
import { parchmentVariants } from "../components/gear/parchmentVariants";
import { cn } from "@/lib/utils";
import Tilt from "react-parallax-tilt";
import { ItemSpecificStats } from "../components/gear/ItemSpecificStats";
import { CategoryIcon } from "../components/gear/CategoryIcon";

export default function GearTabClient() {
  const { id } = useParams<{ id: string }>();
  const [isLoading, setIsLoading] = useState(true);
  const [searchQuery, setSearchQuery] = useState("");
  const [activeCategory, setActiveCategory] = useState<string>("ALL");

  const {
    inventory = [],
    availableItems = [],
    setAvailableItems,
    buyItem,
    updateItemQuantity,
    toggleEquipped,
    remainingWealth,
    maxWealth,
  } = useCharacterBuilder();

  useEffect(() => {
    async function loadData() {
      if (availableItems.length > 0) return setIsLoading(false);
      try {
        const fetched = await getAvailableItems(id as string);
        setAvailableItems(fetched);
      } finally {
        setIsLoading(false);
      }
    }
    if (id) loadData();
  }, [id, availableItems.length, setAvailableItems]);

  const syncToServer = async (payload: any) => {
    await fetch(`/characters/${id}/builder/api/draft`, {
      method: "PATCH",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(payload),
    });
  };

  const handleBuy = (item: any) => {
    buyItem(item);
    const newInv = inventory.find((i) => i.itemId === item.id)
      ? inventory.map((i) =>
          i.itemId === item.id ? { ...i, quantity: i.quantity + 1 } : i,
        )
      : [
          ...inventory,
          { itemId: item.id, quantity: 1, cost: item.cost, isEquipped: false },
        ];
    syncToServer({ inventory: newInv });
  };

  const handleUpdateQty = (itemId: string, delta: number) => {
    updateItemQuantity(itemId, delta);
    const newInv = inventory
      .map((i) =>
        i.itemId === itemId ? { ...i, quantity: i.quantity + delta } : i,
      )
      .filter((i) => i.quantity > 0);
    syncToServer({ inventory: newInv });
  };

  const handleToggleEquip = (itemId: string) => {
    toggleEquipped(itemId);
    const newInv = inventory.map((i) =>
      i.itemId === itemId ? { ...i, isEquipped: !i.isEquipped } : i,
    );
    syncToServer({ inventory: newInv });
  };

  const filteredItems = useMemo(() => {
    return availableItems.filter((item) => {
      const matchesSearch = item.name
        .toLowerCase()
        .includes(searchQuery.toLowerCase());
      const matchesCategory =
        activeCategory === "ALL" || item.type === activeCategory;
      return matchesSearch && matchesCategory;
    });
  }, [availableItems, searchQuery, activeCategory]);

  const categories = [
    "ALL",
    "WEAPON",
    "ARMOR",
    "TOOL",
    "CONSUMABLE",
    "AMMUNITION",
  ];

  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      className="max-w-full mx-2 md:mx-auto py-6"
    >
      {/* HEADER */}
      <div className="flex justify-between items-end pb-4 relative border-b border-primary/30 mb-10">
        <div className="absolute -bottom-px left-0 w-full h-px bg-linear-to-r from-primary via-primary/50 to-transparent" />

        <div className="relative">
          <h1 className="font-builder-header text-6xl md:text-8xl text-primary drop-shadow-[0_0_25px_rgba(var(--color-primary),0.4)] tracking-wide flex items-center gap-4">
            Gear
          </h1>

          <p className="text-primary/70 tracking-[0.4em] uppercase text-sm md:text-base font-bold font-serif mt-1">
            Requisitions & Ledger
          </p>
        </div>

        <Backpack className="w-16 h-16 md:w-20 md:h-20 text-primary drop-shadow-[0_0_15px_var(--color-primary)] relative mb-4" />
      </div>

      {/* MAIN GRID: Ledger Left (Top on Mobile), Shop Right */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-12 items-start">
        {/* LEFT COLUMN: THE BACKPACK LEDGER */}
        <div className="lg:col-span-5 flex flex-col gap-6 md:sticky top-14 z-50">
          <div
            className={cn(
              parchmentVariants({ variant: "panel" }),
              "flex flex-col overflow-hidden",
            )}
          >
            {/* Ledger Header / Funds */}
            <div className="px-6 py-3 bg-base-200/30 border-b border-base-300/40 relative">
              <h3 className="font-body font-semibold uppercase text-2xl md:text-4xl mb-0 md:mb-1 text-base-content/85 tracking-wider">
                Ledger
              </h3>
              <p className="text-xs uppercase tracking-widest text-base-content/50 font-bold md:mb-6">
                Current Funds
              </p>

              <div className="flex justify-end items-center gap-3 z-0">
                <span
                  className={cn(
                    "text-3xl md:text-6xl font-black font-mono tracking-tighter drop-shadow-[0_0_15px_rgba(0,0,0,0.5)]",
                    remainingWealth < 0 ? "text-error" : "text-success",
                  )}
                >
                  ${remainingWealth}
                </span>
                <span className="text-base-content/40 text-sm md:text-xl font-mono font-bold mb-2">
                  / ${maxWealth}
                </span>
              </div>
            </div>

            {/* Scrollable Inventory Rows */}
            <div className="overflow-y-auto max-h-[60vh] flex flex-col bg-base-50/60 p-2">
              <AnimatePresence>
                {inventory.length === 0 ? (
                  <motion.div
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    className="text-center py-4 md:py-16 px-6"
                  >
                    <p className="font-serif italic text-base-content/40">
                      Your pack lies empty...
                    </p>
                  </motion.div>
                ) : (
                  inventory.map((invItem, idx) => {
                    const itemDef = availableItems.find(
                      (i) => i.id === invItem.itemId,
                    );
                    if (!itemDef) return null;

                    const isEquippable =
                      itemDef.type === "ARMOR" ||
                      itemDef.type === "WEAPON" ||
                      itemDef.type === "TOOL";

                    return (
                      <motion.div
                        key={invItem.itemId}
                        initial={{ opacity: 0, x: -20 }}
                        animate={{ opacity: 1, x: 0 }}
                        exit={{ opacity: 0, height: 0 }}
                        className={cn(
                          "px-3 py-3 flex flex-col items-center justify-between group bg-base-100/10 hover:bg-base-200/40 border-b border-base-300/50 transition-colors",
                          idx === 0 && "rounded-t-2xl",
                          idx === inventory.length - 1 &&
                            "rounded-b-2xl border-b-0",
                        )}
                      >
                        {/* Left: Icon & Titles */}
                        <div className="flex flex-row items-center gap-4 flex-1 min-w-0 w-full">
                          <div className="w-9 h-9 rounded-full bg-base-300/30 flex items-center justify-center shrink-0">
                            <CategoryIcon
                              type={itemDef.type}
                              className="w-5 h-5"
                            />
                          </div>

                          <div className="flex flex-col min-w-0 w-full">
                            <div className="flex items-center gap-3">
                              <span
                                className={cn(
                                  "font-bold text-md truncate flex flex-row",
                                  invItem.isEquipped
                                    ? "text-primary/80 drop-shadow-[0_0_5px_var(--color-primary)]"
                                    : "text-base-content/80",
                                )}
                              >
                                {itemDef.name}
                                {invItem.isEquipped ? (
                                  <Shirt className="w-3.5 h-3.5 mx-1 mt-1.25 text-info fill-info opacity-80" />
                                ) : (
                                  ""
                                )}
                              </span>
                              {/* EQUIP TOGGLE BADGE */}
                              {isEquippable && (
                                <button
                                  onClick={() =>
                                    handleToggleEquip(invItem.itemId)
                                  }
                                  className={cn(
                                    "px-1.5 py-0.5 text-[10px] font-black uppercase tracking-wider rounded transition-all hover:cursor-pointer",
                                    invItem.isEquipped
                                      ? "bg-accent/20 text-accent border border-accent/40 shadow-[0_0_8px_var(--color-accent)]"
                                      : "bg-secondary/10 text-secondary border border-secondary/30 hover:bg-secondary/30",
                                  )}
                                >
                                  {invItem.isEquipped ? "UNEQUIP" : "EQUIP"}
                                </button>
                              )}
                            </div>
                            <span className="text-[10px] uppercase font-mono tracking-widest text-base-content/50 mt-0.5">
                              ${itemDef.cost || 0} ea.
                            </span>
                          </div>
                        </div>

                        {/* Right: Math & Controls */}
                        <div className="flex flex-row w-full items-center justify-end gap-5 shrink-0 ml-4">
                          <span className="font-mono text-base-content/80 font-bold">
                            ${(itemDef.cost || 0) * invItem.quantity}
                          </span>

                          <div className="flex items-center bg-base-300/20 border border-base-300/50 rounded-lg p-0.5">
                            <button
                              onClick={() =>
                                handleUpdateQty(invItem.itemId, -1)
                              }
                              className="p-1.5 text-base-content/50 hover:text-error hover:cursor-pointer transition-colors"
                            >
                              <Minus className="w-3 h-3" />
                            </button>
                            <span className="font-mono text-xs w-6 text-center font-bold text-base-content">
                              {invItem.quantity}
                            </span>
                            <button
                              onClick={() => handleUpdateQty(invItem.itemId, 1)}
                              className="p-1.5 text-base-content/50 hover:text-success hover:cursor-pointer transition-colors"
                            >
                              <Plus className="w-3 h-3" />
                            </button>
                          </div>
                        </div>
                      </motion.div>
                    );
                  })
                )}
              </AnimatePresence>
            </div>
          </div>
        </div>

        {/* RIGHT COLUMN: THE SHOP */}
        <div className="lg:col-span-7 flex flex-col gap-6">
          {/* Stacked Control Console */}
          <div className="flex flex-col w-full rounded-2xl overflow-hidden border border-base-300/40 shadow-lg">
            {/* Top Row: Search */}
            <div className="relative bg-base-200/90 p-2">
              <Search className="absolute left-6 top-1/2 -translate-y-1/2 w-5 h-5 text-base-content/40" />
              <input
                type="text"
                placeholder="Search the archives..."
                className="w-full bg-transparent pl-14 pr-4 py-3 outline-none font-serif text-lg text-base-content/85 placeholder:text-base-content/30"
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
              />
            </div>
            {/* Bottom Row: Tabs */}
            <div className="bg-base-100 p-2 flex gap-1 flex-wrap justify-center sm:justify-start px-2 border-t border-base-300/50">
              {categories.map((cat) => (
                <button
                  key={cat}
                  onClick={() => setActiveCategory(cat)}
                  className={cn(
                    "px-4 py-2 m-0.5 rounded-lg font-bold text-[10px] tracking-widest uppercase transition-colors flex flex-row gap-1",
                    activeCategory === cat
                      ? "bg-primary/20 text-primary border border-primary/30"
                      : "text-base-content/50 hover:bg-base-200",
                  )}
                >
                  <CategoryIcon type={cat.toWellFormed()} className="w-4 h-4" />
                  {cat}
                </button>
              ))}
            </div>
          </div>

          {/* Catalog Grid */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            {isLoading ? (
              <div className="col-span-full text-center py-20 opacity-50">
                <span className="loading loading-spinner loading-lg" />
              </div>
            ) : (
              filteredItems.map((item) => (
                <Tilt
                  key={item.id}
                  tiltMaxAngleX={5}
                  tiltMaxAngleY={5}
                  scale={1.01}
                  transitionSpeed={2000}
                >
                  <div
                    className={cn(
                      parchmentVariants({
                        variant: "scrollCard",
                        interactive: "hover",
                      }),
                      "p-5 pb-14 flex flex-col h-full group relative",
                    )}
                  >
                    {/* Top Bar */}
                    <div className="flex items-center gap-2 mb-2">
                      <CategoryIcon type={item.type} className="w-4 h-4" />
                      <span className="text-[10px] uppercase tracking-[0.2em] font-bold text-base-content/50">
                        {item.type}
                      </span>
                    </div>

                    {/* Title & Core Details */}
                    <h3 className="font-header text-2xl truncate text-base-content/85 drop-shadow-sm mb-1">
                      {item.name}
                    </h3>
                    <div className="flex items-center gap-4 text-xs font-bold font-mono text-base-content/70">
                      <span className="text-success/85 tracking-widest">
                        ${item.cost || 0}
                      </span>
                      <span className="flex items-center gap-1 opacity-60">
                        {item.weight || 0} lbs
                      </span>
                    </div>

                    {/* Polymorphic Stats Render */}
                    <ItemSpecificStats item={item} />

                    {/* Absolute Wax Seal Add Button */}
                    <motion.button
                      whileHover={
                        remainingWealth >= (item.cost || 0)
                          ? { scale: 1.1, rotate: [0, -10, 10, 0] }
                          : {}
                      }
                      whileTap={
                        remainingWealth >= (item.cost || 0)
                          ? { scale: 0.9 }
                          : {}
                      }
                      onClick={() => handleBuy(item)}
                      disabled={remainingWealth < (item.cost || 0)}
                      className={cn(
                        "absolute bottom-3 right-3 w-10 h-10 rounded-full flex items-center justify-center shrink-0 border-2 transition-all shadow-md z-0",
                        remainingWealth < (item.cost || 0)
                          ? "bg-base-300 border-base-200 text-base-content/30 opacity-50"
                          : "bg-primary/20 border-primary text-primary hover:bg-primary hover:text-primary-content shadow-[inset_0_0_10px_rgba(56,189,248,0.3)]",
                      )}
                    >
                      <Plus strokeWidth={3} />
                    </motion.button>
                  </div>
                </Tilt>
              ))
            )}
          </div>
        </div>
      </div>
    </motion.div>
  );
}
