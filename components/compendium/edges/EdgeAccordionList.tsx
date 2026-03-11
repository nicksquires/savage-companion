"use client";

import { useState, useEffect } from "react";
import { Edge } from "@/lib/types/Edge";
import {
  ChevronUp,
  ChevronDown,
  ChevronLeft,
  ChevronRight,
  Plus,
  Dice1,
  Dice2,
  Dice3,
  Dice4,
  Dice5,
} from "lucide-react";
import { PrerequisiteList } from "./PrerequisiteList";

interface Props {
  edges: Edge[];
  onSort: (field: "name" | "category" | "rank" | "sourceName") => void;
  sortBy: string;
  sortDir: "asc" | "desc";
}

export default function EdgeAccordionList({
  edges,
  onSort,
  sortBy,
  sortDir,
}: Props) {
  const [currentPage, setCurrentPage] = useState(1);
  // 1. New state for items per page, defaulting to 20
  const [itemsPerPage, setItemsPerPage] = useState(20);

  // 2. Add itemsPerPage to the dependency array to reset to page 1 if the view size changes
  useEffect(() => {
    setCurrentPage(1);
  }, [edges.length, sortBy, sortDir, itemsPerPage]);

  const sortIcon = (field: string) =>
    sortBy === field ? (sortDir === "asc" ? " ▲" : " ▼") : "";

  // Pagination Math using the new dynamic state
  const totalPages = Math.ceil(edges.length / itemsPerPage);
  const startIndex = (currentPage - 1) * itemsPerPage;
  const paginatedEdges = edges.slice(startIndex, startIndex + itemsPerPage);

  const getPageNumbers = () => {
    if (totalPages <= 1) return [];

    const pages: (number | string)[] = [];
    pages.push(1);

    const startPage = Math.max(2, currentPage - 2);
    const endPage = Math.min(totalPages - 1, currentPage + 2);

    if (startPage > 2) {
      if (startPage === 3) pages.push(2);
      else pages.push("...");
    }

    for (let i = startPage; i <= endPage; i++) {
      pages.push(i);
    }

    if (endPage < totalPages - 1) {
      if (endPage === totalPages - 2) pages.push(totalPages - 1);
      else pages.push("...");
    }

    if (totalPages > 1) {
      pages.push(totalPages);
    }

    return pages;
  };

  const PaginationControls = () => {
    if (edges.length === 0) return null; // Hide completely if no results

    return (
      <div
        className="flex flex-col lg:flex-row justify-between 
      items-center gap-4 mt-15 mb-2 w-full"
      >
        {/* Left Side: Stats */}
        <div className="flex flex-col sm:flex-row items-center gap-4">
          <span className="text-xs opacity-70">
            Showing {startIndex + 1} to{" "}
            {Math.min(startIndex + itemsPerPage, edges.length)} of{" "}
            {edges.length} Edges
          </span>
        </div>

        {/* 'Center': Page Navigation (Hidden if only 1 page) */}
        {totalPages > 1 && (
          <div className="join shadow-sm">
            <button
              className="join-item btn btn-sm bg-base-200 hover:bg-base-300"
              onClick={() => setCurrentPage((p) => Math.max(1, p - 1))}
              disabled={currentPage === 1}
            >
              <ChevronLeft size={16} /> Prev
            </button>

            {getPageNumbers().map((pageNum, idx) => (
              <button
                key={idx}
                className={`join-item btn btn-sm ${
                  pageNum === currentPage
                    ? "btn-active btn-primary pointer-events-none"
                    : "bg-base-200 hover:bg-base-300"
                } ${pageNum === "..." ? "btn-disabled bg-transparent border-none" : ""}`}
                onClick={() =>
                  typeof pageNum === "number" && setCurrentPage(pageNum)
                }
                disabled={pageNum === "..."}
              >
                {pageNum}
              </button>
            ))}

            <button
              className="join-item btn btn-sm bg-base-200 hover:bg-base-300"
              onClick={() => setCurrentPage((p) => Math.min(totalPages, p + 1))}
              disabled={currentPage === totalPages}
            >
              Next <ChevronRight size={16} />
            </button>
          </div>
        )}
        {/* Rows per page select dropdown */}
        <div className="flex items-center gap-2">
          <span className="text-sm opacity-70">Rows per page:</span>

          <select
            className="select select-bordered select-sm bg-base-200 w-20"
            value={itemsPerPage}
            onChange={(e) => setItemsPerPage(Number(e.target.value))}
          >
            <option value={10}>10</option>
            <option value={20}>20</option>
            <option value={50}>50</option>
          </select>
        </div>
      </div>
    );
  };

  return (
    <div className="space-y-5 md:w-full">
      {/* Sorting Header */}
      <div className="grid grid-cols-4 gap-2 mt-7 mb-5 px-8">
        <button
          className="btn btn-sm md:btn-md btn-ghost text-md lg:text-lg"
          onClick={() => onSort("name")}
        >
          Name {sortIcon("name")}
        </button>
        <button
          className="btn btn-sm md:btn-md btn-ghost text-md lg:text-lg"
          onClick={() => onSort("sourceName")}
        >
          Source {sortIcon("source")}
        </button>
        <button
          className="btn btn-sm md:btn-md btn-ghost text-md lg:text-lg"
          onClick={() => onSort("category")}
        >
          Category {sortIcon("category")}
        </button>
        <button
          className="btn btn-sm md:btn-md btn-ghost text-md lg:text-lg"
          onClick={() => onSort("rank")}
        >
          Rank {sortIcon("rank")}
        </button>
      </div>

      {/* Accordion List */}
      {paginatedEdges.map((edge) => (
        <div
          key={edge.id}
          className="collapse collapse-arrow 
          rounded-br-4xl rounded-tl-4xl
          border-2 border-b-6 border-current/50
          bg-base-200 shadow-sm hover:shadow-lg"
        >
          <input type="checkbox" className="peer" />
          <svg className="absolute inset-0 w-full h-full pointer-events-none">
            <use href="@/public/svg/borders/synthwave-frame.svg" />
          </svg>
          {/* Header */}
          <div
            className="collapse-title grid grid-cols-3 gap-4 
                          p-4 md:m-0 bg-base-300 
                          transition-all duration-200 
                          peer-hover:brightness-89 
                          peer-checked:brightness-94"
          >
            <div className="flex flex-col items-start">
              <h2 className="text-md md:text-2xl font-semibold">
                {edge.name.toLocaleUpperCase()}
              </h2>
              <p className="italic opacity-70 text-xs md:text-sm">
                {edge.sourceName}
              </p>
            </div>
            <div className="flex flex-row items-center text-right">
              <span className="md:min-w-32 text-xs md:text-lg opacity-90">
                {edge.category?.toLocaleUpperCase() || "Uncategorized"}
              </span>

              <div className="divider divider-horizontal" />
              <div className="flex flex-row items-center gap-1 md:gap-2 text-xs md:text-lg opacity-90">
                <div className="text-primary">
                  {edge.rank === "NOVICE" && <Dice1 />}
                  {edge.rank === "SEASONED" && <Dice2 />}
                  {edge.rank === "VETERAN" && <Dice3 />}
                  {edge.rank === "HEROIC" && <Dice4 />}
                  {edge.rank === "LEGENDARY" && <Dice5 />}
                </div>
                {edge.rank}
              </div>
            </div>
            <span className="min-w-10" />
          </div>

          {/* Body */}
          <div className="collapse-content space-y-4 px-6 bg-base-200">
            {/* Top Row stats */}
            <div className="mt-5 flex flex-row items-center text-center">
              <div className="w-1/3">
                <p className="font-bold md:text-lg">Prerequisites</p>

                <PrerequisiteList requirements={edge.requirements as any} />
              </div>
              <div className="w-1/3">
                <p className="font-bold md:text-lg">Category</p>
                <p className="text-sm mt-1">
                  {edge.category?.toLocaleUpperCase()}
                </p>
              </div>
              <div className="w-1/3 flex flex-col justify-center items-center">
                <p className="font-bold md:text-lg">Rank</p>
                <div className="text-sm flex flex-row items-center gap-1 mt-1">
                  <div className="text-primary">
                    {edge.rank === "NOVICE" && <Dice1 />}
                    {edge.rank === "SEASONED" && <Dice2 />}
                    {edge.rank === "VETERAN" && <Dice3 />}
                    {edge.rank === "HEROIC" && <Dice4 />}
                    {edge.rank === "LEGENDARY" && <Dice5 />}
                  </div>
                  {edge.rank}
                </div>
              </div>
            </div>

            <div className="divider divider-vertical my-0" />

            {/* Description */}
            <p className="whitespace-pre-line py-3 font-light">
              {edge.description || edge.summary}
            </p>

            {/* Tags + Signature */}
            <div className="flex flex-col md:flex-row items-start px-2">
              <span className="font-medium whitespace-nowrap mr-1">Tags:</span>
              <div className="flex flex-wrap gap-2 items-center md:w-4/5 lg:w-3/4 mt-1 mb-3">
                {edge.tags.map((tag) => (
                  <span
                    key={tag.id}
                    className="badge badge-outline badge-sm bg-accent text-accent-content"
                  >
                    {tag.name}
                  </span>
                ))}
              </div>

              <span className="italic text-sm opacity-70 w:1/5 lg:w-1/4 ml-10 text-right self-end md:self-center">
                {edge.owner?.name || edge.sourceName}
              </span>
            </div>

            {/* Footer */}
            <div className="flex justify-between items-center pt-2">
              <div className="grid grid-cols-3 gap-2 w-full max-w-xl">
                <button className="btn btn-info btn-sm">
                  View Full Details
                </button>
                <button className="btn btn-success btn-sm">
                  <Plus size={16} /> Add to Collection
                </button>
                <button className="btn btn-neutral btn-sm">Placeholder</button>
              </div>

              <div className="flex gap-2 pointer-events-none">
                <button className="btn btn-square btn-sm btn-ghost disabled">
                  <ChevronUp size={16} />
                </button>
                <button className="btn btn-square btn-sm btn-ghost disabled">
                  <ChevronDown size={16} />
                </button>
              </div>
            </div>
          </div>
        </div>
      ))}

      {/* Bottom Pagination Controls */}
      <PaginationControls />
    </div>
  );
}
