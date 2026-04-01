// import Link from "next/link";
import React from "react";
import EdgeBreadcrumb from "./EdgeBreadcrumb";
import TestButtons from "./TestButtons";

const EdgesHeader = () => {
  return (
    <>
      <div className="md:w-5/6">
        <div className="w-full flex justify-center md:justify-start space-x-4 mb-10">
          <EdgeBreadcrumb />
        </div>

        <TestButtons />
        <h1 className="my-4 text-3xl md:text-4xl font-header text-center md:text-left">
          Edge Browser
        </h1>
      </div>
    </>
  );
};

export default EdgesHeader;
