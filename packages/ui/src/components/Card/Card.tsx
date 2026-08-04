import { forwardRef } from "react";
import type { HTMLAttributes, KeyboardEvent, ReactNode } from "react";

export interface CardProps extends HTMLAttributes<HTMLDivElement> {
  /** 클릭 가능한 카드로 만듭니다 — hover 효과, `cursor-pointer`, 키보드(Enter/Space) 활성화가 추가됩니다. @default false */
  clickable?: boolean;
  children?: ReactNode;
}

export const Card = forwardRef<HTMLDivElement, CardProps>(
  ({ clickable = false, className, children, onClick, onKeyDown, ...rest }, ref) => {
    const classes = [
      "ds-card rounded-[var(--ds-radius-md)] border border-[var(--ds-color-border)]",
      "bg-[var(--ds-color-layered-background)] p-[var(--ds-space-4)] shadow-[var(--ds-shadow-elevation-1)]",
      "transition-shadow duration-150",
      clickable
        ? "cursor-pointer hover:shadow-[var(--ds-shadow-elevation-2)] focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[var(--ds-color-border-primary)]"
        : "",
      className,
    ]
      .filter(Boolean)
      .join(" ");

    function handleKeyDown(e: KeyboardEvent<HTMLDivElement>) {
      onKeyDown?.(e);
      if (!clickable || e.defaultPrevented) return;
      if (e.key === "Enter" || e.key === " ") {
        e.preventDefault();
        (e.currentTarget as HTMLDivElement).click();
      }
    }

    return (
      <div
        ref={ref}
        className={classes}
        onClick={onClick}
        onKeyDown={clickable ? handleKeyDown : onKeyDown}
        role={clickable ? "button" : undefined}
        tabIndex={clickable ? 0 : undefined}
        {...rest}
      >
        {children}
      </div>
    );
  },
);

Card.displayName = "Card";
