import { Edge } from "@/lib/types/Edge"

// Fetch all edges on the server
export async function getEdges(): Promise<Edge[]> {
  const res = await fetch(`${process.env.NEXT_PUBLIC_BASE_URL}/api/edges`, {
    cache: "no-store",
  });
  if (!res.ok) throw new Error("Failed to fetch edges");
  return res.json();
}