import { defineConfig } from "vite";
import react from "@vitejs/plugin-react";
import tailwindcss from "@tailwindcss/vite";

// https://vite.dev/config/
export default defineConfig({
  plugins: [
    react(),
    tailwindcss({
      // Optional: Customize Tailwind config here if needed
      config: {
        darkMode: "class", // Ensure dark mode is enabled
        content: ["./src/**/*.{js,jsx,ts,tsx}"], // Specify files to scan
      },
    }),
  ],
});
