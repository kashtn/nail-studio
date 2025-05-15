import { defineConfig } from "vite";
import react from "@vitejs/plugin-react";

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [react()],
  optimizeDeps: {
    exclude: ["lucide-react"],
  },
  preview: {
    port: 3000,
  },
  server: {
    port: 3000,
    hmr: {
      overlay: true,
      protocol: "ws",
      host: "localhost",
    },
    watch: {
      usePolling: true,
      interval: 1000,
    },
  },
  build: {
    rollupOptions: {
      output: {
        manualChunks(id) {
          if (id.includes("node_modules")) {
            const parts = id.split("node_modules/")[1].split("/");
            const name = parts[0].startsWith("@")
              ? parts.slice(0, 2).join("/")
              : parts[0];
            return `vendor-${name.replace("/", "-")}`;
          }
        },
        entryFileNames: "[hash].js",
        chunkFileNames: "[hash].js",
        assetFileNames: "[hash].[ext]",
      },
    },
  },
});
