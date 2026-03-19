import React from "react";
import Link from "next/link";

import {
  // LucideHouseHeart,
  // FoldHorizontal,
  BookIcon,
  PlusIcon,
  HomeIcon,
} from "lucide-react";

const EdgeBreadcrumb = () => {
  return (
    <div
      className="breadcrumbs text-sm text-primary-content 
                    rounded-b-lg bg-primary px-3 py-2
                    border-2 border-t-0 border-navbar/20"
    >
      <ul className="">
        <li className="gap-1">
          <HomeIcon />
          <Link href="/">Home</Link>
        </li>
        <li className="gap-1">
          <BookIcon />
          <Link href="/reference">Reference</Link>
        </li>
        <li>
          <span className="inline-flex items-center gap-2">
            <PlusIcon />
            Edges
          </span>
        </li>
      </ul>
    </div>
  );
};

export default EdgeBreadcrumb;
