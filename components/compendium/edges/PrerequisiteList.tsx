import Link from "next/link";
import { HoverEdgeLink } from "./HoverEdgeLink";

// Define the expected structure based on your JSON schema
interface Requirement {
  type: string;
  dieType?: string;
  attribute?: string;
  skill?: string;
  edgeSlug?: string;
}

interface PrerequisiteListProps {
  requirements: Requirement[] | null | undefined; // Assuming it comes in as an array of objects
}

export function PrerequisiteList({ requirements }: PrerequisiteListProps) {
  // Fallback for empty or missing requirements
  if (
    !requirements ||
    !Array.isArray(requirements) ||
    requirements.length === 0
  ) {
    return <span className="text-sm mt-1 uppercase">None</span>;
  }

  // Helper to format slugs like "martial-artist" to "MARTIAL ARTIST"
  const formatSlug = (slug: string) => slug.replace(/-/g, " ").toUpperCase();

  return (
    <ul className="text-sm mt-1 space-y-1">
      {requirements.map((req, index) => {
        switch (req.type) {
          case "ATTRIBUTE":
            return (
              <li key={index}>
                <span className="font-bold">ATTRIBUTE:</span> {req.attribute}{" "}
                {req.dieType}
              </li>
            );

          case "SKILL":
            return (
              <li key={index}>
                <span className="font-bold">SKILL:</span> {req.skill}{" "}
                {req.dieType}
              </li>
            );

          case "EDGE":
            return (
              <li
                key={index}
                className="flex items-center justify-center gap-1"
              >
                <span className="font-bold">EDGE:</span>

                {/* Smart fetching component */}
                {req.edgeSlug ? (
                  <HoverEdgeLink edgeSlug={req.edgeSlug} />
                ) : (
                  <span className="opacity-70">UNKNOWN EDGE</span>
                )}
              </li>
            );

          default:
            // Fallback for any unexpected types
            return (
              <li key={index}>
                <span className="font-bold">{req.type}:</span> Unknown format
              </li>
            );
        }
      })}
    </ul>
  );
}
