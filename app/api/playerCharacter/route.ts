import { NextRequest, NextResponse } from "next/server";
import { prisma } from "@/prisma/client";
import { createCharacterSchema } from "@/lib/schemas/api/playerCharacter.schema";

// GET_ALL: Fetch characters, optionally filtered by user or campaign
export async function GET(request: NextRequest) {
  const { searchParams } = new URL(request.url);
  const userId = searchParams.get("userId");
  const campaignId = searchParams.get("campaignId");

  try {
    const characters = await prisma.playerCharacter.findMany({
      where: {
        userId: userId ?? undefined,
        campaignId: campaignId ?? undefined,
        isActive: true, // Hide deleted/archived characters
      },
      orderBy: { name: "asc" },
    });

    return NextResponse.json(characters);
  } catch (err) {
    return NextResponse.json(
      { error: "Failed to fetch characters", details: String(err) },
      { status: 500 }
    );
  }
}

// POST: Create a new character, injecting campaign defaults if applicable
export async function POST(request: NextRequest) {
  try {
    const body = await request.json();
    const parsed = createCharacterSchema.safeParse(body);

    if (!parsed.success) {
      return NextResponse.json(parsed.error.flatten(), { status: 400 });
    }

    const data = parsed.data;

    // Default Savage Worlds baselines
    // let startingBennies = 3;
    // let startingWealth = 500;

    // TODO: If they are joining a campaign, check if the GM altered the rules
    // if (data.campaignId) {
    //   const campaign = await prisma.campaign.findUnique({
    //     where: { id: data.campaignId },
    //     select: { defaultBennies: true, defaultWealth: true }, // Assuming these fields exist
    //   });

    //   if (campaign) {
    //     startingBennies = campaign.defaultBennies ?? startingBennies;
    //     startingWealth = campaign.defaultWealth ?? startingWealth;
    //   }
    // }

    // Create the character template
    const newCharacter = await prisma.playerCharacter.create({
      data: {
        ...data,
        // Override with campaign rules if the frontend didn't explicitly provide them
        // startingBennies: data.startingBennies ?? startingBennies,
        // bennies: data.bennies ?? startingBennies,
        // wealth: data.wealth ?? startingWealth,
      },
    });

    return NextResponse.json(newCharacter, { status: 201 });
  } catch (err) {
    return NextResponse.json(
      { error: "Failed to create character", details: String(err) },
      { status: 500 }
    );
  }
}