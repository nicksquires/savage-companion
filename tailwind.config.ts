import type { Config } from "tailwindcss";

const config: Config = {
  content: [
    "./app/**/*.{ts,tsx}",
    "./components/**/*.{ts,tsx}",
  ],
  plugins: [require("daisyui")],
   theme: {
    extend: {
      colors: {
        base: {
          400: "var(--color-base-400)",
          500: "var(--color-base-500)",
          600: "var(--color-base-600)",
          700: "var(--color-base-700)",
          800: "var(--color-base-800)",
          900: "var(--color-base-900)",
        },
      },
    },
  },
};

export default config;