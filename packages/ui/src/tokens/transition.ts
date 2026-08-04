/** Transition tokens — mirrors `--ds-transition-*` in tokens.css. */
export const transition = {
  duration: {
    fast: "150ms",
    normal: "250ms",
    slow: "400ms",
  },
  timingFunction: "cubic-bezier(0.4, 0, 0.2, 1)",
} as const;

export type TransitionDurationToken = keyof typeof transition.duration;
