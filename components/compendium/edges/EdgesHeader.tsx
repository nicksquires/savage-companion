import Link from "next/link";
import React from "react";
import EdgeBreadcrumb from "./EdgeBreadcrumb";

const EdgesHeader = () => {
  return (
    <>
      <div className="md:w-5/6">
        <div className="w-full flex justify-center md:justify-start space-x-4">
          <EdgeBreadcrumb />
        </div>

        <div className="w-full flex justify-end space-x-4 mt-1 text-sm">
          <Link
            href="/edges/create"
            className="bg-primary text-primary-content 
          px-4 py-2 rounded hover:brightness-110 hover:shadow
          opacity-95 font-semibold text-center border-2 border-navbar/25"
          >
            Primary
          </Link>
          <Link
            href="/edges/create"
            className="bg-secondary text-secondary-content 
          px-4 py-2 rounded hover:brightness-110 hover:shadow
          opacity-95 font-semibold text-center border-2 border-navbar/25"
          >
            Secondary
          </Link>
          <Link
            href="/edges/create"
            className="bg-accent text-accent-content 
          px-4 py-2 rounded hover:brightness-110 hover:shadow
          opacity-95 font-semibold text-center border-2 border-navbar/25"
          >
            Accent
          </Link>
          <Link
            href="/edges/create"
            className="bg-neutral text-neutral-content 
          px-4 py-2 rounded hover:brightness-110 hover:shadow
          opacity-95 font-semibold text-center border-2 border-navbar/25"
          >
            Neutral
          </Link>
          <Link
            href="/edges/create"
            className="bg-info text-info-content 
          px-4 py-2 rounded hover:brightness-110 hover:shadow
          opacity-95 font-semibold text-center border-2 border-navbar/25"
          >
            Info
          </Link>
          <Link
            href="/edges/create"
            className="bg-success text-success-content 
            px-4 py-2 rounded hover:brightness-110 hover:shadow
            opacity-95 font-semibold text-center border-2 border-navbar/25"
          >
            Success
          </Link>
          <Link
            href="/edges/create"
            className="bg-warning text-warning-content 
          px-4 py-2 rounded hover:brightness-110 hover:shadow
          opacity-95 font-semibold text-center border-2 border-navbar/25"
          >
            Warning
          </Link>
          <Link
            href="/edges/create"
            className="bg-error text-error-content 
          px-4 py-2 rounded hover:brightness-110 hover:shadow
          opacity-95 font-semibold text-center border-2 border-navbar/25"
          >
            Error
          </Link>
        </div>
        <h1 className="my-4 text-3xl md:text-4xl font-header text-center md:text-left">
          Edge Browser
        </h1>
      </div>
    </>
  );
};

export default EdgesHeader;
