import { EdgeSummary } from "@/lib/types/EdgeSummary";
import { HoverEdgeLink } from "./HoverEdgeLink";
import { EdgeRequirement } from "@/lib/types/EdgeRequirement";

interface PrerequisiteListProps {
  requirements: EdgeRequirement[] | null | undefined; // Assuming it comes in as an array of objects
  edgeSummaries: EdgeSummary[];
}

export function PrerequisiteList({
  requirements,
  edgeSummaries,
}: PrerequisiteListProps) {
  // Fallback for empty or missing requirements
  if (
    !requirements ||
    !Array.isArray(requirements) ||
    requirements.length === 0
  ) {
    return <span className="text-sm mt-1 uppercase">None</span>;
  }

  return (
    <ul className="text-sm mt-1 space-y-1">
      {requirements.map((requirement, index) => {
        switch (requirement.type) {
          case "ATTRIBUTE":
            return (
              <li key={index}>
                <span className="font-bold">ATTRIBUTE:</span>{" "}
                {requirement.attribute} {requirement.dieType}
              </li>
            );

          case "SKILL":
            return (
              <li key={index}>
                <span className="font-bold">SKILL:</span> {requirement.skill}{" "}
                {requirement.dieType}
              </li>
            );

          case "EDGE":
            // Find the matching summary (O(n) — fine for small/medium lists)
            const summaryObj = edgeSummaries.find(
              (s) => s.slug === requirement.edgeSlug,
            );

            return (
              <li
                key={index}
                className="flex items-center justify-center gap-1"
              >
                <span className="font-bold">EDGE:</span>

                {requirement.edgeSlug ? (
                  <HoverEdgeLink
                    edgeSlug={requirement.edgeSlug}
                    summary={
                      summaryObj?.description ?? "No description available."
                    }
                  />
                ) : (
                  <span className="opacity-70">UNKNOWN EDGE</span>
                )}
              </li>
            );

          default:
            // Fallback for any unexpected types
            return (
              <li key={index}>
                <span className="font-bold">{requirement.type}:</span>
                Unknown format
              </li>
            );
        }
      })}
    </ul>
  );
}
