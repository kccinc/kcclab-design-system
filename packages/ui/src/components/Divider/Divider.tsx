import type { HTMLAttributes, ReactNode } from "react";

export type DividerOrientation = "horizontal" | "vertical";

export interface DividerProps extends HTMLAttributes<HTMLDivElement> {
  /** 방향. @default "horizontal" */
  orientation?: DividerOrientation;
  /** 구분선 가운데에 삽입할 라벨 — `horizontal`일 때만 적용됩니다. */
  children?: ReactNode;
}

export function Divider({
  orientation = "horizontal",
  className,
  children,
  ...rest
}: DividerProps) {
  if (orientation === "vertical") {
    const classes = [
      "ds-divider w-px self-stretch bg-[var(--ds-color-border)]",
      className,
    ]
      .filter(Boolean)
      .join(" ");
    return (
      <div role="separator" aria-orientation="vertical" className={classes} {...rest} />
    );
  }

  if (children) {
    const classes = [
      "ds-divider flex items-center gap-[var(--ds-space-3)]",
      className,
    ]
      .filter(Boolean)
      .join(" ");
    return (
      <div role="separator" aria-orientation="horizontal" className={classes} {...rest}>
        <span className="h-px flex-1 bg-[var(--ds-color-border)]" />
        <span className="shrink-0 text-[length:var(--ds-font-size-caption1)] leading-[var(--ds-line-height-caption1)] text-[var(--ds-color-text-tertiary)]">
          {children}
        </span>
        <span className="h-px flex-1 bg-[var(--ds-color-border)]" />
      </div>
    );
  }

  const classes = ["ds-divider h-px w-full bg-[var(--ds-color-border)]", className]
    .filter(Boolean)
    .join(" ");
  return <div role="separator" aria-orientation="horizontal" className={classes} {...rest} />;
}
