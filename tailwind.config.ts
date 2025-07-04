import type { Config } from "tailwindcss";

export default {
  content: [
    "./pages/**/*.{js,ts,jsx,tsx,mdx}",
    "./components/**/*.{js,ts,jsx,tsx,mdx}",
    "./app/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  theme: {
    extend: {
      fontFamily: {
        poppins: 'var(--font-poppins)'
      },
      colors: {
        background: "var(--background)",
        foreground: "var(--foreground)",
      },
    },
  },
  plugins: [require("daisyui")],
  daisyui: {
    themes: [
      "winter",
      "sunset",
      "dracula",
      {
        mytheme: {
          "primary": "#67e8f9",
          "secondary": "#f59e0b",         
          "accent": "#ddd6fe",          
          "neutral": "#d8b4fe",
          "base-100": "#1c1917",          
          "info": "#3b82f6",          
          "success": "#a3e635",          
          "warning": "#fcd34d",          
          "error": "#ef4444",
          },
          // woody: {
          //   window: "#464040",
          //   sourceBg: "#292222",
          //   windowBorder: "#c7a49f",
          //   tabIcon: "#cc6600",
          //   inactiveTabIcon: "#E8D5BB",
          //   menuIcons: "#ebe5db",
          //   link: "#ffb107",
          //   action: "#ffcc00",
          //   inProgress: "#99cccc",
          //   complete: "#78b3b4",
          //   error: "#ff6666",
          //   textDark: "#4C2F1A",
          //   textLight: "#D8CFCF"
          // }
        },
      ],
    },
} satisfies Config;
