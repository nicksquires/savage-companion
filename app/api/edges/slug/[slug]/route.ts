import { NextRequest, NextResponse } from "next/server";
import { prisma } from "@/prisma/client";
import { edgeSchema } from "../../../../../lib/schemas/api/edge.schema";

// Next.js 15 requires typing params as a Promise
type Params = { params: Promise<{ slug: string }> };
// when Next.js runs await params, the result is literally coming back as undefined.

// This is a notorious headache right now in the Next.js ecosystem. The transition from 
// Next.js 14 (where params was synchronous) to Next.js 15 (where params is a Promise) 
// has created a lot of weird edge cases where the context object doesn't behave exactly 
// as expected, leaving params undefined and crashing the route.

// The Bulletproof Fix
// Instead of fighting with Next.js's changing params definitions, we can use a completely 
// foolproof method. The request object inherently knows its own URL. We can just extract 
// the slug directly from the URL string itself. It works 100% of the time, regardless of 
// your Next.js version.

// Why this works:
// context: any stops TypeScript from throwing red squigglies
// while we navigate the version differences.

// request.nextUrl.pathname.split("/").pop() takes 
// the path (/api/edges/slug/command) and grabs the very 
// last segment (command). It entirely bypasses the Next.js
//  dynamic router bug we're hitting.


// GET - get one edge from the master list
export async function GET(request: NextRequest, context: any) {
  try {
    // 1. Safely await params (handles both Next 14 sync and Next 15 async)
    const resolvedParams = await context?.params;
    
    // 2. Bulletproof Fallback: If params is undefined, pluck the slug straight from the URL!
    // Example: "/api/edges/slug/command" -> splits into array -> pops off "command"
    const slug = resolvedParams?.slug || request.nextUrl.pathname.split("/").pop();

    if (!slug) {
      return NextResponse.json({ error: "Slug could not be found in URL" }, { status: 400 });
    }

    const edge = await prisma.edge.findUnique({
      where: { slug: slug },
    });

    if (!edge) {
      return NextResponse.json({ error: "Edge not found" }, { status: 404 });
    }

    return NextResponse.json(edge);
  } catch (err) {
    console.error("Database/Server Error fetching Edge:", err); 
    return NextResponse.json({ 
      error: "Failed to fetch edge", 
      details: String(err) 
    }, { status: 500 });
  }
}

// PATCH - update one edge in the master list
export async function PATCH(request: NextRequest, { params }: Params) {
  try {
    const { slug } = await params;
    const body = await request.json();
    const validation = edgeSchema.partial().safeParse(body);

    if (!validation.success) {
        return NextResponse.json(validation.error.errors, { status: 400 });
    }

    const updatedEdge = await prisma.edge.update({
      where: { slug: slug },
      data: body,
    });

    return NextResponse.json(updatedEdge);

  } catch (err) {
    return NextResponse.json({ error: "Failed to update edge" }, { status: 500 });
  }
}

// DELETE - delete one edge from the master list
export async function DELETE({ params }: Params) {
  try {
    const { slug } = await params;
    
    const edge = await prisma.edge.findUnique({
      where: { slug: slug },
    });

    if (!edge) {
      return NextResponse.json({ error: "Edge not found" }, { status: 404 });
    }

    await prisma.edge.delete({ where: { slug: slug } });
  
    return NextResponse.json({ message: "Edge deleted" }, { status: 204 });
  } catch (err) {
    return NextResponse.json({ error: "Failed to delete edge" }, { status: 500 });
  }
}