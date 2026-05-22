import { defineConfig } from "vite";
import react from "@vitejs/plugin-react";
import tailwindcss from "@tailwindcss/vite";
// https://vite.dev/config/
export default defineConfig({
  plugins: [react(), tailwindcss()],
  build: {
    rolldownOptions: {
      output: {
        manualChunks(id) {
          if (id.includes("node_modules")) {
            if (id.includes("lucide-react")) return "vendor-icons";
            if (
              id.includes("react-router-dom") ||
              id.includes("@gsap/react") ||
              id.includes("gsap")
            )
              return "vendor-routing-animation";

            return "vendor-core";
          }
        },
      },
    },
  },
});
