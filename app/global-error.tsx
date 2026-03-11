"use client";

import React from "react";

interface Props {
  error: Error;
  reset: () => void;
}

const ErrorPage = ({ error, reset }: Props) => {
  console.log("Error", error);

  return (
    <>
      {/** Global-error needs html/body tags since it
       * replaces the entire root layout when triggered
       */}
      <html>
        <body>
          <div>Global Error Page</div>
          <button className="btn btn-info" onClick={() => reset()}>
            Retry
          </button>
        </body>
      </html>
    </>
  );
};

export default ErrorPage;
