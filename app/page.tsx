"use client";
import React from "react";

export default function Home() {
  return (
    <main>
      <h1>Hello World</h1>
      <div>
        <button
          className="btn btn-primary m-3"
          onClick={() => console.log("Click")}
        >
          Click Me
        </button>
      </div>
    </main>
  );
}
