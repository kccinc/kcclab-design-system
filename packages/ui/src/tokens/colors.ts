/**
 * Color tokens. Values mirror the CSS custom properties defined in
 * `src/styles/tokens.css` (--ds-color-*) — kept as JS objects too so
 * docs/tooling (e.g. Storybook Foundation page) can render swatches
 * without parsing CSS.
 */
export const colors = {
  grey: {
    50: "#f9fafb",
    100: "#f2f4f6",
    200: "#e5e8eb",
    300: "#d1d6db",
    400: "#b0b8c1",
    500: "#8b95a1",
    600: "#6b7684",
    700: "#4e5968",
    800: "#333d4b",
    900: "#191f28",
  },
  blue: {
    50: "#e8f3ff",
    100: "#c9e2ff",
    200: "#90c2ff",
    300: "#64a8ff",
    400: "#4593fc",
    500: "#3182f6",
    600: "#2272eb",
    700: "#1b64da",
    800: "#1957c2",
    900: "#194aa6",
  },
  red: {
    50: "#ffeeee",
    100: "#ffd4d6",
    200: "#feafb4",
    300: "#fb8890",
    400: "#f66570",
    500: "#f04452",
    600: "#e42939",
    700: "#d22030",
    800: "#bc1b2a",
    900: "#a51926",
  },
  orange: {
    50: "#fff3e0",
    100: "#ffe0b0",
    200: "#ffcd80",
    300: "#ffbd51",
    400: "#ffa927",
    500: "#fe9800",
    600: "#fb8800",
    700: "#f57800",
    800: "#ed6700",
    900: "#e45600",
  },
  yellow: {
    50: "#fff9e7",
    100: "#ffefbf",
    200: "#ffe69b",
    300: "#ffdd78",
    400: "#ffd158",
    500: "#ffc342",
    600: "#ffb331",
    700: "#faa131",
    800: "#ee8f11",
    900: "#dd7d02",
  },
  green: {
    50: "#f0faf6",
    100: "#aeefd5",
    200: "#76e4b8",
    300: "#3fd599",
    400: "#15c47e",
    500: "#03b26c",
    600: "#02a262",
    700: "#029359",
    800: "#028450",
    900: "#027648",
  },
  teal: {
    50: "#edf8f8",
    100: "#bce9e9",
    200: "#89d8d8",
    300: "#58c7c7",
    400: "#30b6b6",
    500: "#18a5a5",
    600: "#109595",
    700: "#0c8585",
    800: "#097575",
    900: "#076565",
  },
  purple: {
    50: "#f9f0fc",
    100: "#edccf8",
    200: "#da9bef",
    300: "#c770e4",
    400: "#b44bd7",
    500: "#a234c7",
    600: "#9128b4",
    700: "#8222a2",
    800: "#73228e",
    900: "#65237b",
  },
  greyOpacity: {
    50: "rgba(0, 23, 51, 0.02)",
    100: "rgba(2, 32, 71, 0.05)",
    200: "rgba(0, 27, 55, 0.1)",
    300: "rgba(0, 29, 58, 0.18)",
    400: "rgba(0, 25, 54, 0.31)",
    500: "rgba(3, 24, 50, 0.46)",
    600: "rgba(0, 19, 43, 0.58)",
    700: "rgba(3, 18, 40, 0.7)",
    800: "rgba(0, 12, 30, 0.8)",
    900: "rgba(2, 9, 19, 0.91)",
  },
  semantic: {
    background: "#ffffff",
    greyBackground: "#f2f4f6",
    layeredBackground: "#ffffff",
    floatedBackground: "#ffffff",
    /** Dark surface paired with `colors.text.inverse` — e.g. Tooltip. */
    inverseBackground: "#191f28",
  },
  /**
   * Semantic action colors. Prefer these over the primitive scales
   * (`colors.blue`, `colors.red`, ...) in component code — retheming or
   * rebranding only requires changing the values here (and the matching
   * `--ds-color-*` variables in tokens.css), not every component.
   */
  action: {
    primary: {
      DEFAULT: "#3182f6", // blue.500
      hover: "#2272eb", // blue.600
      active: "#1b64da", // blue.700
      light: "#e8f3ff", // blue.50
    },
    secondary: {
      DEFAULT: "#6b7684", // grey.600
      hover: "#4e5968", // grey.700
      light: "#f2f4f6", // grey.100
    },
    success: {
      DEFAULT: "#03b26c", // green.500
      hover: "#02a262", // green.600
      light: "#f0faf6", // green.50
    },
    danger: {
      DEFAULT: "#f04452", // red.500
      hover: "#e42939", // red.600
      light: "#ffeeee", // red.50
    },
    warning: {
      DEFAULT: "#fe9800", // orange.500
      hover: "#fb8800", // orange.600
      light: "#fff3e0", // orange.50
    },
    info: {
      DEFAULT: "#18a5a5", // teal.500
      hover: "#109595", // teal.600
      light: "#edf8f8", // teal.50
    },
  },
  /** Border-only semantic colors — kept separate from `text`/`action` so a className reads as "what kind of border is this" at a glance. */
  border: {
    DEFAULT: "#e5e8eb", // grey.200
    strong: "#d1d6db", // grey.300
    primary: "#3182f6", // blue.500 — focused input, selected state
    danger: "#f04452", // red.500 — error state input
  },
  /** Text-only semantic colors. Prefer these over `colors.grey.*` in component code. */
  text: {
    primary: "#191f28", // grey.900
    secondary: "#4e5968", // grey.700
    tertiary: "#8b95a1", // grey.500
    disabled: "#b0b8c1", // grey.400
    placeholder: "#b0b8c1", // grey.400
    inverse: "#ffffff",
  },
} as const;

export type ColorScale = keyof typeof colors;
export type ActionColor = keyof typeof colors.action;
