import { defineConfig } from "vite";
import react from "@vitejs/plugin-react";
import path from "path";

export default defineConfig({
  plugins: [react()],
  css: {
    postcss: path.resolve(__dirname, "./postcss.config.cjs"),
  },
  resolve: {
    alias: {
      '@': path.resolve(__dirname, 'src'),
      "@shared": path.resolve(__dirname, "../shared"),
    },
  },
});


