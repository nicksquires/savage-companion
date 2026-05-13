import { prisma } from "@/prisma/client";
import { auth } from "@/auth";
import { redirect } from "next/navigation";
import CharacterListClient from "../../../components/characterBuilder/builder/tabs/CharacterListClient";

export default async function CharactersPage() {
  const session = await auth();
  if (!session?.user?.id) redirect("/signin");

  const characters = await prisma.playerCharacter.findMany({
    where: { userId: session.user.id },
    orderBy: { createdAt: "desc" },
    select: {
      id: true,
      name: true,
      concept: true,
      rank: true,
      builderState: true,
    },
  });

  return (
    <div className="max-w-6xl mx-auto p-8">
      <CharacterListClient characters={characters} />
    </div>
  );
}
