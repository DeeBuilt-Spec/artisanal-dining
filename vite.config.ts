import { defineConfig } from "vite";
import react from "@vitejs/plugin-react";
import tailwindcss from "@tailwindcss/vite";
import path from "node:path";

const port = Number(process.env.PORT) || 5101;

// GitHub Pages serves this project under /<repo>/. The base path is injected
// at build time via the VITE_BASE env var (set by the deploy workflow) and
// falls back to "/" for local dev.
const base = process.env.VITE_BASE ?? "/";

export default defineConfig({
  base,
  plugins: [react(), tailwindcss()],
  resolve: {
    alias: {
      "@": path.resolve(__dirname, "./src"),
    },
  },
  server: {
    host: "::",
    port,
    strictPort: true,
  },
  preview: {
    host: "::",
    port,
    strictPort: true,
  },
});
