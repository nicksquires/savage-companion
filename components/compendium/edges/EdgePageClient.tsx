// app/edges/components/EdgePageClient.tsx
"use client";

import { useMemo, useState } from "react";
import EdgeFilters, { EdgeFilterState, EdgeSortField } from "./EdgeFilters";
import EdgeAccordionList from "./EdgeAccordionList";
import { Edge } from "@/lib/types/Edge";
import { EdgeSummary } from "@/lib/types/EdgeSummary";

interface Props {
  edges: Edge[];
}

// Define rank weights outside the component to avoid recreating it on every render
const RANK_WEIGHTS: Record<string, number> = {
  NOVICE: 1,
  SEASONED: 2,
  VETERAN: 3,
  HEROIC: 4,
  LEGENDARY: 5,
};

export default function EdgePageClient({ edges }: Props) {
  const [filters, setFilters] = useState<EdgeFilterState>({
    search: "",
    category: "",
    rank: "",
    sourceName: "",
    sortBy: "name",
    sortDir: "asc",
  });

  function handleSort(field: EdgeSortField) {
    setFilters((prev) => ({
      ...prev,
      sortBy: field,
      sortDir: prev.sortBy === field && prev.sortDir === "asc" ? "desc" : "asc",
    }));
  }

  // Filter and sort list of edges based on filter params
  const filteredEdges = useMemo(() => {
    return edges
      .filter((e) =>
        e.name.toLowerCase().includes(filters.search.toLowerCase()),
      )
      .filter((e) =>
        filters.category ? e.category === filters.category : true,
      )
      .filter((e) => (filters.rank ? e.rank === filters.rank : true))
      .filter((e) =>
        filters.sourceName
          ? filters.sourceName === "Homebrew"
            ? e.isHomebrew
            : e.sourceName === filters.sourceName
          : true,
      )
      .sort((a, b) => {
        const dir = filters.sortDir === "asc" ? 1 : -1;

        // Custom Numeric Sorting for Rank
        if (filters.sortBy === "rank") {
          const rankA = RANK_WEIGHTS[a.rank?.toUpperCase()] || 0;
          const rankB = RANK_WEIGHTS[b.rank?.toUpperCase()] || 0;
          return (rankA - rankB) * dir;
        }

        // Standard Alphabetical Sorting for Name, Category, Source
        const valA = String(a[filters.sortBy] || "");
        const valB = String(b[filters.sortBy] || "");
        return valA.localeCompare(valB) * dir;
      });
  }, [edges, filters]);

  // Extract edge summaries for query-less edge requirement hoverlinks
  const edgeSummaries: EdgeSummary[] = useMemo(
    () =>
      edges?.map((edge) => ({
        slug: edge.slug,
        description: edge.description ?? null,
      })) ?? [],
    [edges],
  );

  return (
    <>
      <div className="flex flex-col items-center max-w-7/8 md:max-w-5/6">
        <EdgeFilters value={filters} onChange={setFilters} />

        <EdgeAccordionList
          edges={filteredEdges}
          edgeSummaries={edgeSummaries}
          onSort={handleSort}
          sortBy={filters.sortBy}
          sortDir={filters.sortDir}
        />
      </div>
    </>
  );
}
