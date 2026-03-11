"use client";
import React, { ReactNode } from "react";
import { SessionProvider } from "next-auth/react";
import { ThemeProvider } from "next-themes";

const Providers = ({ children }: { children: ReactNode }) => {
  return (
    // SessionProvider handles  NextAuth login state
    <SessionProvider>
      {/* ThemeProvider handles applying the correct 'data-theme' 
        to <html> tag. We disable the default Next.js hydration 
        warning because next-themes needs to inject the theme script 
        before React fully hydrates.
      */}
      <ThemeProvider
        attribute="data-theme"
        defaultTheme="standard-dark"
        enableSystem={true}
        // This prevents the "Flash of Unstyled Content"
        // (FOUC) when the page loads
        disableTransitionOnChange
      >
        {children}
      </ThemeProvider>
    </SessionProvider>
  );
};

export default Providers;
