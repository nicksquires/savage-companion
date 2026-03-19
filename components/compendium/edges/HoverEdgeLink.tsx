"use client";

import { useState } from "react";
import Link from "next/link";

interface HoverEdgeLinkProps {
  edgeSlug: string;
  summary: string;
}

export function HoverEdgeLink({ edgeSlug }: HoverEdgeLinkProps) {
  const [description, setDescription] = useState<string | null>(null);
  const [isLoading, setIsLoading] = useState(false);
  const [hasFetched, setHasFetched] = useState(false);

  const formatSlug = (slug: string) => slug.replace(/-/g, " ").toUpperCase();
  const displayName = formatSlug(edgeSlug);

  // Only fetch the data when the user hovers over the link
  const handleMouseEnter = async () => {
    if (hasFetched || isLoading) return;

    setIsLoading(true);
    try {
      const response = await fetch(`/api/edges/slug/${edgeSlug.toLowerCase()}`);
      if (response.ok) {
        const data = await response.json();
        setDescription(
          data.summary || data.description || "No description available.",
        );
      } else {
        setDescription("Failed to load description.");
      }
    } catch (error) {
      console.error("Failed to fetch edge details:", error);
      setDescription("Error loading data.");
    } finally {
      setIsLoading(false);
      setHasFetched(true);
    }
  };

  return (
    <div className="dropdown dropdown-hover dropdown-top md:dropdown-right z-50">
      <Link
        href={`/edges/${edgeSlug}`}
        className="link link-primary link-hover font-semibold"
        onMouseEnter={handleMouseEnter}
      >
        {displayName}
      </Link>

      {/* Floating Modal/Card */}
      <div
        tabIndex={0}
        className="dropdown-content z-1 card card-compact w-64 
        shadow-xl bg-base-100 text-base-content mb-2
        border border-base-300"
      >
        <div className="card-body">
          <h3 className="card-title justify-center text-center text-md lg:text-lg my-0 py-0 border-b-2">
            {displayName}
          </h3>
          <div className="text-left font-normal text-xs lg:text-sm opacity-80 whitespace-normal min-h-12">
            {isLoading ? (
              <div className="flex justify-center items-center h-full">
                <span className="loading loading-dots loading-sm"></span>
              </div>
            ) : (
              <p>{description || "Hover to load description..."}</p>
            )}
          </div>

          <div className="card-actions justify-between mt-3">
            <Link href={`/edges/${edgeSlug}`} className="btn btn-xs btn-info">
              View Edge
            </Link>
            <button className="btn btn-xs btn-outline btn-accent">
              Favorite
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}
