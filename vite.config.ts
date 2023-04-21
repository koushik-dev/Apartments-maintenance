import { defineConfig } from "vite";
import react from "@vitejs/plugin-react";
import { VitePWA, VitePWAOptions } from "vite-plugin-pwa";

const manifestForPlugin: Partial<VitePWAOptions> = {
  registerType: "autoUpdate",
  strategies: "injectManifest",
  injectManifest: {
    injectionPoint: undefined,
  },
  includeAssets: ["favicon.ico", "apple-touch-icon.png", "masked-icon.svg"],
  devOptions: {
    enabled: true,
  },
  manifest: {
    name: "Sai adarshya apartments",
    short_name: "adarshya",
    description: "An app to show apartments maintanence and other details.",
    icons: [
      {
        src: "/apartment_icon_192.png",
        sizes: "192x192",
        type: "image/png",
      },
      {
        src: "/apartment_icon_512.png",
        sizes: "512x512",
        type: "image/png",
      },
      {
        src: "/apple-touch-icon.png",
        sizes: "180x180",
        type: "image/png",
        purpose: "apple touch icon",
      },
      {
        src: "/manifest-icon-512.maskable.png",
        sizes: "225x225",
        type: "image/png",
        purpose: "any maskable",
      },
    ],
    theme_color: "#ffffff",
    background_color: "#8757d1",
    display: "standalone",
    scope: "/",
    orientation: "portrait",
    start_url: "/",
  },
};

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [react(), VitePWA(manifestForPlugin)],
});
