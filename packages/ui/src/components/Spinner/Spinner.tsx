export type SpinnerSize = "xs" | "sm" | "md" | "lg" | "xl";

export interface SpinnerProps {
  /** 사이즈. @default "md" */
  size?: SpinnerSize;
  /** 스크린 리더용 라벨. @default "로딩 중" */
  label?: string;
  className?: string;
}

const sizeClassName: Record<SpinnerSize, string> = {
  xs: "w-[var(--ds-icon-xs)] h-[var(--ds-icon-xs)]",
  sm: "w-[var(--ds-icon-sm)] h-[var(--ds-icon-sm)]",
  md: "w-[var(--ds-icon-md)] h-[var(--ds-icon-md)]",
  lg: "w-[var(--ds-icon-lg)] h-[var(--ds-icon-lg)]",
  xl: "w-[var(--ds-icon-xl)] h-[var(--ds-icon-xl)]",
};

export function Spinner({ size = "md", label = "로딩 중", className }: SpinnerProps) {
  const classes = ["ds-spinner animate-spin shrink-0", sizeClassName[size], className]
    .filter(Boolean)
    .join(" ");

  return (
    <span role="status" className="inline-flex">
      <svg className={classes} viewBox="0 0 24 24" fill="none" aria-hidden="true">
        <circle cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="3" opacity="0.25" />
        <path d="M22 12a10 10 0 0 0-10-10" stroke="currentColor" strokeWidth="3" strokeLinecap="round" />
      </svg>
      <span className="sr-only">{label}</span>
    </span>
  );
}
