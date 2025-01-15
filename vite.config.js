import { defineConfig } from "vite";
import { resolve } from "path";
import handlebars from "vite-plugin-handlebars";
import { viteStaticCopy } from "vite-plugin-static-copy";
import * as glob from "glob";

export default defineConfig({
  root: "./src",
  envDir: "../",

  build: {
    rollupOptions: {
      input: Object.fromEntries(
        glob
          .sync("src/*.html")
          .map((file) => [
            file.slice(0, file.length - 5),
            resolve(__dirname, file),
          ])
      ),
    },
    outDir: "../dist",
    emptyOutDir: true,
  },
  plugins: [
    handlebars({
      partialDirectory: resolve(__dirname, "src/partials"),
    }),
    viteStaticCopy({
      targets: [
        { src: "js/*.min.js", dest: "js" },
        { src: "js/custom-scripts.js", dest: "js" },
        { src: "functions/*.js", dest: "functions" },
        { src: "css/*.min.css", dest: "css" },
        { src: "css/*.css", dest: "css" },
        { src: "fonts/**/*", dest: "fonts" },
        { src: "images/**/*", dest: "images" },
        { src: "../netlify.toml", dest: "." },
        { src: "package.json", dest: "." },
      ],
    }),
    {
      name: "treat-js-files-as-assets",
      enforce: "pre",
      apply: "build",
      transformIndexHtml(html) {
        return html.replace(/<script\s+src=["'](.+)["']\s*>/g, (match, src) => {
          if (
            src.includes("vite") ||
            src.startsWith("/") ||
            src.startsWith("./") ||
            src.startsWith("../")
          ) {
            return match;
          }
          return `<script src="${src}" type="text/javascript">`;
        });
      },
    },
  ],
  optimizeDeps: {
    exclude: [
      "bootstrap.min.js",
      "jquery.min.js",
      "owl.carousel.min.js",
      "jquery.countdown.min.js",
      "jquery.counterup.min.js",
      "jquery.gmap.min.js",
      "jquery.stellar.min.js",
      "venobox.min.js",
      "waypoints-sticky.min.js",
      "waypoints.min.js",
      "wow.min.js",
    ],
  },
});
