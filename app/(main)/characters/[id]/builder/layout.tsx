import { notFound } from "next/navigation";
import { prisma } from "@/prisma/client";
import BuilderShell from "@/components/characterBuilder/builder/components/builder/BuilderShell";
import DebugPanel from "@/components/characterBuilder/builder/components/builder/DebugPanel";
import DraftHydrator from "@/components/characterBuilder/builder/components/builder/DraftHydrator";

export default async function BuilderLayout({
  children,
  params,
}: {
  children: React.ReactNode;
  params: Promise<{ id: string }>;
}) {
  const { id } = await params;

  // Fetch the complete draft state
  const character = await prisma.playerCharacter.findUnique({
    where: { id },
    select: {
      id: true,
      name: true,
      concept: true,
      raceId: true,
      imageUrl: true,
      campaignId: true,
      agility: true,
      smarts: true,
      spirit: true,
      strength: true,
      vigor: true,
      builderState: true,
      playerCharacterSources: { select: { sourceName: true } },
      skills: { include: { skill: true } },
      hindrances: { include: { hindrance: true } },
      edges: { include: { edge: true } },
      arcaneBackgrounds: { include: { arcaneBackground: true } },
      powers: { include: { power: true } },
      inventory: {
        include: {
          item: {
            include: {
              armor: true,
              weapon: true, // (might need later for damage/parry math [likely items only?])
            },
          },
        },
      },
      advancementLog: true,
      advancementsEnabled: true,
      advancesEarned: true,
      advancesPerRank: true,
      advancesUnspent: true,
    },
  });

  if (!character) notFound();

  // Add inventory item instances to character
  const hydratedInventory = {
    ...character,
    inventory: character.inventory.map((instance) => ({
      itemId: instance.itemId,
      quantity: instance.quantity,
      cost: instance.item.cost || 0,
      isEquipped: instance.isEquipped,
      item: instance.item,
    })),
  };

  // Flatten sources array for Zustand store
  const formattedData = {
    ...hydratedInventory,
    sources: character.playerCharacterSources
      .map((s) => s.sourceName)
      .filter(Boolean),
  };

  return (
    <div>
      <DraftHydrator initialData={formattedData}>
        <BuilderShell>{children}</BuilderShell>
        <DebugPanel />
      </DraftHydrator>
    </div>
  );
}
