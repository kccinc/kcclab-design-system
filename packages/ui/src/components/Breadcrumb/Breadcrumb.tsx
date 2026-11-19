import type { ReactNode } from "react";
import type { LinkComponent } from "../../utils/link";

export interface BreadcrumbItem {
  label: ReactNode;
  href?: string;
}

export interface BreadcrumbProps {
  items: BreadcrumbItem[];
  /** `href`가 있는 항목을 그릴 링크 컴포넌트 (예: Next.js `Link`). 지정하지 않으면 `<a>`로 이동해 페이지 전체를 새로 불러옵니다. @default "a" */
  linkComponent?: LinkComponent;
  className?: string;
}

function ChevronRightIcon() {
  return (
    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" aria-hidden="true">
      <path d="M9 6l6 6-6 6" strokeLinecap="round" strokeLinejoin="round" />
    </svg>
  );
}

export function Breadcrumb({ items, linkComponent: Link = "a", className }: BreadcrumbProps) {
  return (
    <nav aria-label="현재 위치" className={["ds-breadcrumb", className].filter(Boolean).join(" ")}>
      <ol className="flex items-center gap-[var(--ds-space-1)]">
        {items.map((item, i) => {
          const isLast = i === items.length - 1;
          return (
            <li key={i} className="flex items-center gap-[var(--ds-space-1)]">
              {i > 0 && (
                <span className="w-[var(--ds-icon-xs)] h-[var(--ds-icon-xs)] shrink-0 text-[var(--ds-color-text-tertiary)]">
                  <ChevronRightIcon />
                </span>
              )}
              {isLast || !item.href ? (
                <span
                  aria-current={isLast ? "page" : undefined}
                  className={[
                    "text-[length:var(--ds-font-size-body3)] leading-[var(--ds-line-height-body3)]",
                    isLast ? "font-medium text-[var(--ds-color-text-primary)]" : "text-[var(--ds-color-text-tertiary)]",
                  ].join(" ")}
                >
                  {item.label}
                </span>
              ) : (
                <Link
                  href={item.href}
                  className="text-[length:var(--ds-font-size-body3)] leading-[var(--ds-line-height-body3)] text-[var(--ds-color-text-tertiary)] hover:text-[var(--ds-color-text-primary)] hover:underline"
                >
                  {item.label}
                </Link>
              )}
            </li>
          );
        })}
      </ol>
    </nav>
  );
}
