// Line icon set (24×24 viewBox, 1.8 stroke). Shapes follow Lucide (https://lucide.dev, ISC license).
// Add a new icon by adding one entry here — the name list and `IconName` type derive from the keys.
const CAL = "M8 2v4M16 2v4M3 9h18M5 4h14a2 2 0 0 1 2 2v14a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2V6a2 2 0 0 1 2-2z";
const CLIP = "M9 2h6v4H9zM16 4h2a2 2 0 0 1 2 2v14a2 2 0 0 1-2 2H6a2 2 0 0 1-2-2V6a2 2 0 0 1 2-2h2";
const FILE = "M14 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V8zM14 2v6h6";
const circle = (cx: number, cy: number, r: number) => `M${cx - r} ${cy}a${r} ${r} 0 1 0 ${r * 2} 0a${r} ${r} 0 1 0 ${-r * 2} 0`;

export const ICON_PATHS = {
  home: "M3 10.5 12 3l9 7.5V20a1 1 0 0 1-1 1h-5v-6H9v6H4a1 1 0 0 1-1-1z",
  search: `${circle(11, 11, 7)}M21 21l-4.3-4.3`,
  panel: "M3 5a2 2 0 0 1 2-2h14a2 2 0 0 1 2 2v14a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2zM9 3v18",
  chevronDown: "M6 9l6 6 6-6",
  chevronRight: "M9 6l6 6-6 6",
  chevronsLeft: "M11 17l-5-5 5-5M18 17l-5-5 5-5",
  chevronsRight: "M13 17l5-5-5-5M6 17l5-5-5-5",
  x: "M18 6 6 18M6 6l12 12",
  menu: "M4 6h16M4 12h16M4 18h16",
  maximize: "M8 3H5a2 2 0 0 0-2 2v3M21 8V5a2 2 0 0 0-2-2h-3M3 16v3a2 2 0 0 0 2 2h3M16 21h3a2 2 0 0 0 2-2v-3",
  pin: "M12 17v5M8 3h8M9 3v7l-3 4h12l-3-4V3",
  swap: "M16 3l4 4-4 4M20 7H4M8 21l-4-4 4-4M4 17h16",
  logout: "M9 21H5a2 2 0 0 1-2-2V5a2 2 0 0 1 2-2h4M16 17l5-5-5-5M21 12H9",
  settings:
    "M12.22 2h-.44a2 2 0 0 0-2 2v.18a2 2 0 0 1-1 1.73l-.43.25a2 2 0 0 1-2 0l-.15-.08a2 2 0 0 0-2.73.73l-.22.38a2 2 0 0 0 .73 2.73l.15.1a2 2 0 0 1 1 1.72v.51a2 2 0 0 1-1 1.74l-.15.09a2 2 0 0 0-.73 2.73l.22.38a2 2 0 0 0 2.73.73l.15-.08a2 2 0 0 1 2 0l.43.25a2 2 0 0 1 1 1.73V20a2 2 0 0 0 2 2h.44a2 2 0 0 0 2-2v-.18a2 2 0 0 1 1-1.73l.43-.25a2 2 0 0 1 2 0l.15.08a2 2 0 0 0 2.73-.73l.22-.39a2 2 0 0 0-.73-2.73l-.15-.08a2 2 0 0 1-1-1.74v-.5a2 2 0 0 1 1-1.74l.15-.09a2 2 0 0 0 .73-2.73l-.22-.38a2 2 0 0 0-2.73-.73l-.15.08a2 2 0 0 1-2 0l-.43-.25a2 2 0 0 1-1-1.73V4a2 2 0 0 0-2-2z" +
    circle(12, 12, 3),
  share: `${circle(18, 5, 3)}${circle(6, 12, 3)}${circle(18, 19, 3)}M8.59 13.51l6.83 3.98M15.41 6.51l-6.82 3.98`,
  globe: `${circle(12, 12, 10)}M2 12h20M12 2a15.3 15.3 0 0 1 4 10 15.3 15.3 0 0 1-4 10 15.3 15.3 0 0 1-4-10 15.3 15.3 0 0 1 4-10z`,
  link: "M10 13a5 5 0 0 0 7.54.54l3-3a5 5 0 0 0-7.07-7.07l-1.72 1.71M14 11a5 5 0 0 0-7.54-.54l-3 3a5 5 0 0 0 7.07 7.07l1.71-1.71",
  plus: "M12 5v14M5 12h14",
  help: `${circle(12, 12, 10)}M9.09 9a3 3 0 0 1 5.83 1c0 2-3 3-3 3M12 17h.01`,
  sparkles: "M12 3l1.9 5.1L19 10l-5.1 1.9L12 17l-1.9-5.1L5 10l5.1-1.9zM19 3v4M21 5h-4",
  check: "M20 6 9 17l-5-5",
  minus: "M5 12h14",
  chevronUp: "M18 15l-6-6-6 6",
  chevronLeft: "M15 18l-6-6 6-6",
  arrowLeft: "M19 12H5M12 19l-7-7 7-7",
  arrowRight: "M5 12h14M12 5l7 7-7 7",
  moreHorizontal: `${circle(5, 12, 1)}${circle(12, 12, 1)}${circle(19, 12, 1)}`,
  edit: "M17 3a2.85 2.85 0 1 1 4 4L7.5 20.5 2 22l1.5-5.5z",
  trash: "M3 6h18M19 6v14a2 2 0 0 1-2 2H7a2 2 0 0 1-2-2V6M8 6V4a2 2 0 0 1 2-2h4a2 2 0 0 1 2 2v2",
  copy: "M10 8h10a2 2 0 0 1 2 2v10a2 2 0 0 1-2 2H10a2 2 0 0 1-2-2V10a2 2 0 0 1 2-2zM4 16a2 2 0 0 1-2-2V4a2 2 0 0 1 2-2h10a2 2 0 0 1 2 2",
  download: "M21 15v4a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2v-4M7 10l5 5 5-5M12 15V3",
  externalLink: "M15 3h6v6M10 14 21 3M18 13v6a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2V8a2 2 0 0 1 2-2h6",
  refresh: "M3 12a9 9 0 0 1 9-9 9.75 9.75 0 0 1 6.74 2.74L21 8M21 3v5h-5M21 12a9 9 0 0 1-9 9 9.75 9.75 0 0 1-6.74-2.74L3 16M8 16H3v5",
  filter: "M22 3H2l8 9.46V19l4 2v-8.54z",
  bell: "M6 8a6 6 0 0 1 12 0c0 7 3 9 3 9H3s3-2 3-9M10.3 21a1.94 1.94 0 0 0 3.4 0",
  mail: "M4 4h16a2 2 0 0 1 2 2v12a2 2 0 0 1-2 2H4a2 2 0 0 1-2-2V6a2 2 0 0 1 2-2zM22 6l-10 7L2 6",
  user: `${circle(12, 7, 4)}M19 21v-2a4 4 0 0 0-4-4H9a4 4 0 0 0-4 4v2`,
  eye: `M2 12s3-7 10-7 10 7 10 7-3 7-10 7-10-7-10-7z${circle(12, 12, 3)}`,
  info: `${circle(12, 12, 10)}M12 16v-4M12 8h.01`,
  alertTriangle: "M10.29 3.86 1.82 18a2 2 0 0 0 1.71 3h16.94a2 2 0 0 0 1.71-3L13.71 3.86a2 2 0 0 0-3.42 0zM12 9v4M12 17h.01",

  chart: "M4 20V10M10 20V4M16 20v-7M21 20H3",
  database: "M12 3c4.4 0 8 1.3 8 3s-3.6 3-8 3-8-1.3-8-3 3.6-3 8-3zM4 6v12c0 1.7 3.6 3 8 3s8-1.3 8-3V6M4 12c0 1.7 3.6 3 8 3s8-1.3 8-3",
  upload: "M12 16V4M7 9l5-5 5 5M4 20h16",
  code: "M16 18l6-6-6-6M8 6l-6 6 6 6",
  checkCircle: `${circle(12, 12, 9)}M8 12l3 3 5-6`,
  lock: "M5 11h14v10H5zM8 11V7a4 4 0 0 1 8 0v4",
  map: "M9 4 3 6v14l6-2 6 2 6-2V4l-6 2zM9 4v14M15 6v14",
  users: "M9 11a4 4 0 1 0 0-8 4 4 0 0 0 0 8zM2 21a7 7 0 0 1 14 0M16 3.1a4 4 0 0 1 0 7.8M22 21a7 7 0 0 0-4-6.3",
  shield: "M12 22s8-4 8-10V5l-8-3-8 3v7c0 6 8 10 8 10zM9 12l2 2 4-4",
  building:
    "M6 22V4a2 2 0 0 1 2-2h8a2 2 0 0 1 2 2v18zM6 12H4a2 2 0 0 0-2 2v6a2 2 0 0 0 2 2h2M18 9h2a2 2 0 0 1 2 2v9a2 2 0 0 1-2 2h-2M10 6h4M10 10h4M10 14h4M10 18h4",
  wrench:
    "M14.7 6.3a1 1 0 0 0 0 1.4l1.6 1.6a1 1 0 0 0 1.4 0l3.77-3.77a6 6 0 0 1-7.94 7.94l-6.91 6.91a2.12 2.12 0 0 1-3-3l6.91-6.91a6 6 0 0 1 7.94-7.94z",
  car: `M19 17h2v-4.5L19 7H5l-2 5.5V17h2M9 17h6${circle(7, 17, 2)}${circle(17, 17, 2)}M3 12.5h18`,
  landmark: "M3 21h18M5 21v-9M9.5 21v-9M14.5 21v-9M19 21v-9M2 9l10-6 10 6z",
  calendar: CAL,
  grid: "M4 4h6v6H4zM14 4h6v6h-6zM4 14h6v6H4zM14 14h6v6h-6z",

  calendarDays: `${CAL}M8 14h.01M12 14h.01M16 14h.01M8 18h.01M12 18h.01M16 18h.01`,
  calendarCheck: `${CAL}M9 16l2 2 4-4`,
  calendarRange: `${CAL}M17 14h-6M13 18H7M7 14h.01M17 18h.01`,
  trendingUp: "M22 7l-8.5 8.5-5-5L2 17M16 7h6v6",
  gauge: "M12 14l4-4M3.34 19a10 10 0 1 1 17.32 0",
  store: "M3 9l1.5-5h15L21 9M4 9v11h16V9M3 9h18M9 20v-6h6v6",
  package:
    "M16.5 9.4 7.5 4.21M21 16V8a2 2 0 0 0-1-1.73l-7-4a2 2 0 0 0-2 0l-7 4A2 2 0 0 0 3 8v8a2 2 0 0 0 1 1.73l7 4a2 2 0 0 0 2 0l7-4A2 2 0 0 0 21 16zM3.27 6.96 12 12.01l8.73-5.05M12 22.08V12",
  award: `${circle(12, 8, 6)}M15.48 12.89 17 22l-5-3-5 3 1.52-9.11`,
  droplet: "M12 22a7 7 0 0 0 7-7c0-2-1-3.9-3-5.5s-3.5-4-4-6.5c-.5 2.5-2 4.9-4 6.5C6 11.1 5 13 5 15a7 7 0 0 0 7 7z",
  smartphone: "M7 2h10a2 2 0 0 1 2 2v16a2 2 0 0 1-2 2H7a2 2 0 0 1-2-2V4a2 2 0 0 1 2-2zM12 18h.01",
  clipboardCheck: `${CLIP}M9 14l2 2 4-4`,
  clipboardList: `${CLIP}M12 11h4M12 16h4M8 11h.01M8 16h.01`,
  chartColumn: "M3 3v18h18M18 17V9M13 17V5M8 17v-3",
  chartLine: "M3 3v18h18M7 16l4-4 4 4 5-6",
  chartPie: "M21.21 15.89A10 10 0 1 1 8 2.83M22 12A10 10 0 0 0 12 2v10z",
  receipt: "M4 2v20l2-1 2 1 2-1 2 1 2-1 2 1 2-1 2 1V2l-2 1-2-1-2 1-2-1-2 1-2-1-2 1zM16 8H8M16 12H8M13 16H8",
  handshake:
    "M11 17l2 2a1 1 0 1 0 3-3M14 14l2.5 2.5a1 1 0 1 0 3-3l-3.88-3.88a3 3 0 0 0-4.24 0l-.88.88a1 1 0 1 1-3-3l2.81-2.81a5.79 5.79 0 0 1 7.06-.87l.47.28a2 2 0 0 0 1.42.25L21 4M21 3l1 11h-2M3 3 2 14l6.5 6.5a1 1 0 1 0 3-3M3 4h8",
  fileCheck: `${FILE}M9 15l2 2 4-4`,
  fileText: `${FILE}M16 13H8M16 17H8M10 9H8`,
  fileUp: `${FILE}M12 18v-6M9 15l3-3 3 3`,
  dollar: `${circle(12, 12, 10)}M16 8h-6a2 2 0 1 0 0 4h4a2 2 0 1 1 0 4H8M12 18V6`,
  percent: `M19 5 5 19${circle(6.5, 6.5, 2.5)}${circle(17.5, 17.5, 2.5)}`,
  warehouse:
    "M22 8.35V20a2 2 0 0 1-2 2H4a2 2 0 0 1-2-2V8.35A2 2 0 0 1 3.26 6.5l8-3.2a2 2 0 0 1 1.48 0l8 3.2A2 2 0 0 1 22 8.35zM6 18h12M6 14h12M6 10h12v12H6z",
  hourglass:
    "M5 22h14M5 2h14M17 22v-4.17a2 2 0 0 0-.59-1.42L12 12l-4.41 4.41A2 2 0 0 0 7 17.83V22M7 2v4.17a2 2 0 0 0 .59 1.42L12 12l4.41-4.41A2 2 0 0 0 17 6.17V2",
  carFront:
    "M21 8l-2 2-1.5-3.7A2 2 0 0 0 15.65 5H8.35a2 2 0 0 0-1.85 1.3L5 10 3 8M7 14h.01M17 14h.01M5 10h14a2 2 0 0 1 2 2v4a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2v-4a2 2 0 0 1 2-2zM5 18v2M19 18v2",
  layers: "M12 2 2 7l10 5 10-5zM2 17l10 5 10-5M2 12l10 5 10-5",
  calculator:
    "M6 2h12a2 2 0 0 1 2 2v16a2 2 0 0 1-2 2H6a2 2 0 0 1-2-2V4a2 2 0 0 1 2-2zM8 6h8M16 14v4M16 10h.01M12 10h.01M8 10h.01M12 14h.01M8 14h.01M12 18h.01M8 18h.01",
  table: "M5 3h14a2 2 0 0 1 2 2v14a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2V5a2 2 0 0 1 2-2zM3 9h18M3 15h18M9 3v18M15 3v18",
  creditCard: "M4 5h16a2 2 0 0 1 2 2v10a2 2 0 0 1-2 2H4a2 2 0 0 1-2-2V7a2 2 0 0 1 2-2zM2 10h20",
  boxes:
    "M7 16.5 2.97 14.2A2 2 0 0 1 2 12.5V7.7l5 2.9 5-2.9M7 10.6v5.9M12 7.7 7 4.8 2 7.7M17 16.5l4.03-2.3a2 2 0 0 0 .97-1.7V7.7l-5 2.9-5-2.9M17 10.6v5.9M22 7.7l-5-2.9-5 2.9M7 16.5l5 2.9 5-2.9",
  mapPin: `M20 10c0 6-8 12-8 12s-8-6-8-12a8 8 0 0 1 16 0z${circle(12, 10, 3)}`,
  tags: "M12.59 2.59A2 2 0 0 0 11.17 2H4a2 2 0 0 0-2 2v7.17a2 2 0 0 0 .59 1.42l8.7 8.7a2.43 2.43 0 0 0 3.42 0l6.58-6.58a2.43 2.43 0 0 0 0-3.42zM7.5 7.5h.01",
  layoutDashboard: "M3 3h7v9H3zM14 3h7v5h-7zM14 12h7v9h-7zM3 16h7v5H3z",
  scale: "M16 16l3-8 3 8c-.87.65-1.92 1-3 1s-2.13-.35-3-1zM2 16l3-8 3 8c-.87.65-1.92 1-3 1s-2.13-.35-3-1zM7 21h10M12 3v18M3 7h2c2 0 5-1 7-2 2 1 5 2 7 2h2",
  network: "M16 16h6v6h-6zM2 16h6v6H2zM9 2h6v6H9zM5 16v-3a1 1 0 0 1 1-1h12a1 1 0 0 1 1 1v3M12 12V8",
  plug: "M12 22v-5M9 8V2M15 8V2M18 8v5a4 4 0 0 1-4 4h-4a4 4 0 0 1-4-4V8z",
} as const satisfies Record<string, string>;

export type IconName = keyof typeof ICON_PATHS;

/** Every available icon name, in declaration order. */
export const ICON_NAMES = Object.keys(ICON_PATHS) as IconName[];
