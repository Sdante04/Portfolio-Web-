import { defineConfig } from "vite";
import path from "path";
import tailwindcss from "@tailwindcss/vite";
import react from "@vitejs/plugin-react";

export default defineConfig({
  plugins: [
    // The React and Tailwind plugins are both required for Make, even if
    // Tailwind is not being actively used – do not remove them
    react(),
    tailwindcss(),
  ],
  resolve: {
    alias: {
      // Alias @ to the src directory
      "@": path.resolve(__dirname, "./src"),
    },
  },

  // File types to support raw imports. Never add .css, .tsx, or .ts files to this.
  assetsInclude: ["**/*.svg", "**/*.csv"],

  // === Build output configuration ===
  // Cambiamos outDir a "build" para que el comando `vite build` genere /build
  build: {
    outDir: "build",
    // keep default behavior (emptyOutDir: true). Podés añadir otras opciones si querés:
    // sourcemap: true,
    // rollupOptions: { ... }
  },
});