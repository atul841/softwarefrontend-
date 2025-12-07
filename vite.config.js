import { defineConfig } from "vite";
import react from "@vitejs/plugin-react";

export default defineConfig({
  plugins: [react()],

  server: {
    port: 5173,

    proxy: {
      "/cashfree-sdk": {
        target: "https://sdk.cashfree.com/js/ui/2.0.0/cashfree.js",
        changeOrigin: true,
        rewrite: () => "",
        secure: false,
      },
    },
  },
});
