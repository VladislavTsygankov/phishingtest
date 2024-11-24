import react from "@vitejs/plugin-react";
import { resolve } from "path";
import { defineConfig, splitVendorChunkPlugin } from "vite";

export default defineConfig({
  plugins: [react(), splitVendorChunkPlugin()],
  server: {
    host: "0.0.0.0",
    port: 3000,
  },
  resolve: {
    alias: [{ find: "@public", replacement: resolve(__dirname, "./public") }],
  },
  build: {
    rollupOptions: {
      input: {
        main: resolve(__dirname, "index.html"),
      },
    },
  },
});
