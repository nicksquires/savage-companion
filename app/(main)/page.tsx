"use client";
import React from "react";
import bg from "../public/images/old_paper.jpg";

export default function Home() {
  return (
    <main>
      <div>
        <h1>Hello World</h1>
        <div>
          <button
            className="btn btn-primary m-3"
            onClick={() => console.log("Click")}
          >
            Click Me
          </button>
        </div>
      </div>
    </main>
  );
}
