import React from "react";
import {
  LucideHouseHeart,
  BookIcon,
  PlusIcon,
  FoldHorizontal,
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
          <a href="/">Home</a>
        </li>
        <li className="gap-1">
          <BookIcon />
          <a href="/reference">Reference</a>
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
