/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "./app/**/*.{js,ts,jsx,tsx,mdx}",
    "./components/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  theme: {
    extend: {
      colors: {
        brand: {
          primary: "#1d4ed8",   // True Royal Blue
          hover: "#1e40af",     // Softer deep blue hover state
          light: "#eff6ff",     // Light blue backdrop/badges
          accent: "#dc2626",    // Clear warning/highlight coral red
        },
        surface: {
          bg: "#f8fafc",        // Off-white canvas background
          card: "#ffffff",      // Bright white content cards
          border: "#e2e8f0",    // Clean container borders
        },
        text: {
          main: "#0f172a",      // Slate 900 for absolute readability
          muted: "#64748b",     // Clear gray text for subtitles/meta
        }
      },
    },
  },
  plugins: [],
}
