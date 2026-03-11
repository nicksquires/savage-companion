"use client";

import { useTheme } from "next-themes";
import { useEffect, useState } from "react";
import { Sun, Moon } from "lucide-react";

const ModeToggle = () => {
  const [mounted, setMounted] = useState(false);
  const { theme, setTheme } = useTheme();

  // Ensure component is mounted to avoid hydration mismatch
  useEffect(() => {
    setMounted(true);
  }, []);

  if (!mounted) {
    return <div className="p-2 w-9 h-9" />; // Placeholder to prevent layout shift
  }

  const toggleMode = () => {
    if (!theme) return;

    // Logic: Split 'cyberpunk-dark' into ['cyberpunk', 'dark']
    const parts = theme.split("-");
    const family = parts[0];
    const currentMode = parts[1];

    const newMode = currentMode === "light" ? "dark" : "light";
    setTheme(`${family}-${newMode}`);
  };

  const isDark = theme?.includes("-dark");

  return (
    <button
      onClick={toggleMode}
      className="btn btn-ghost btn-circle"
      aria-label="Toggle Mode"
    >
      {isDark ? (
        <Sun className="h-5 w-5 text-warning" />
      ) : (
        <Moon className="h-5 w-5 text-warning" />
      )}
    </button>
  );
};

export default ModeToggle;
