import { defineConfig } from "tsup";

export default defineConfig([
  {
    // JS/TS entries. `injectStyle` inlines the CSS imported by src/index.ts
    // into the JS bundle as a runtime style-injection call, so consumers get
    // styles automatically just by importing the package — no separate CSS
    // import required.
    entry: {
      index: "src/index.ts",
      tokens: "src/tokens/index.ts",
    },
    format: ["cjs", "esm"],
    dts: true,
    splitting: false,
    sourcemap: true,
    clean: true,
    minify: true,
    external: ["react", "react-dom"],
    injectStyle: true,
  },
  {
    // Plain CSS entry, built separately (without injectStyle) so it stays a
    // real dist/style.css file — for consumers who prefer to import/link the
    // stylesheet explicitly instead of relying on the JS-injected styles.
    // Built from styles/style.css (not styles/index.css) since this is the
    // only one of the two CSS bundles that safely supports @font-face's
    // relative url() asset references — see that file's header comment.
    entry: {
      style: "src/styles/style.css",
    },
    clean: false,
    sourcemap: true,
    minify: true,
    esbuildOptions(options) {
      // Copy referenced .woff2 files into dist/fonts/ and rewrite the
      // @font-face url()s in the emitted CSS to point there.
      options.loader = { ...options.loader, ".woff2": "copy" };
      options.assetNames = "fonts/[name]";
    },
  },
]);
