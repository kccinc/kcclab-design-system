import type { HTMLAttributes, ReactNode } from "react";

export interface ContainerProps extends HTMLAttributes<HTMLDivElement> {
  /** 콘텐츠 최대 너비 (px). 지정하지 않으면 너비 제한 없이 좌우 여백만 적용됩니다. */
  maxWidth?: number;
  children?: ReactNode;
}

export function Container({ maxWidth, className, style, children, ...rest }: ContainerProps) {
  const classes = [
    "ds-container mx-auto w-full",
    "px-[var(--ds-space-4)] md:px-[var(--ds-space-8)] lg:px-[var(--ds-space-12)]",
    className,
  ]
    .filter(Boolean)
    .join(" ");

  return (
    <div className={classes} style={{ ...style, maxWidth }} {...rest}>
      {children}
    </div>
  );
}
