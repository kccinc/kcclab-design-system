const ELLIPSIS = "ellipsis" as const;
type PageItem = number | typeof ELLIPSIS;

export interface PaginationProps {
  /** 현재 페이지 (1부터 시작). */
  page: number;
  /** 전체 페이지 수. */
  totalPages: number;
  /** 페이지 변경 시 호출됩니다. */
  onPageChange: (page: number) => void;
  /** 현재 페이지 양옆에 보여줄 페이지 번호 개수. @default 1 */
  siblingCount?: number;
  className?: string;
}

function getPageItems(page: number, totalPages: number, siblingCount: number): PageItem[] {
  const totalSlots = siblingCount * 2 + 5;
  if (totalPages <= totalSlots) {
    return Array.from({ length: totalPages }, (_, i) => i + 1);
  }

  const leftSibling = Math.max(page - siblingCount, 1);
  const rightSibling = Math.min(page + siblingCount, totalPages);
  const showLeftEllipsis = leftSibling > 2;
  const showRightEllipsis = rightSibling < totalPages - 1;

  const items: PageItem[] = [1];
  if (showLeftEllipsis) items.push(ELLIPSIS);
  for (let i = leftSibling === 1 ? 2 : leftSibling; i <= (rightSibling === totalPages ? totalPages - 1 : rightSibling); i++) {
    items.push(i);
  }
  if (showRightEllipsis) items.push(ELLIPSIS);
  items.push(totalPages);
  return items;
}

function ChevronLeftIcon() {
  return (
    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" aria-hidden="true">
      <path d="M15 6l-6 6 6 6" strokeLinecap="round" strokeLinejoin="round" />
    </svg>
  );
}

function ChevronRightIcon() {
  return (
    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" aria-hidden="true">
      <path d="M9 6l6 6-6 6" strokeLinecap="round" strokeLinejoin="round" />
    </svg>
  );
}

const navButtonClassName =
  "inline-flex h-[var(--ds-space-8)] w-[var(--ds-space-8)] shrink-0 cursor-pointer items-center justify-center rounded-[var(--ds-radius-sm)] " +
  "text-[var(--ds-color-text-secondary)] transition-colors duration-150 hover:bg-[var(--ds-color-grey-opacity-100)] " +
  "disabled:cursor-not-allowed disabled:opacity-[var(--ds-opacity-disabled)] disabled:hover:bg-transparent " +
  "focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[var(--ds-color-border-primary)]";

export function Pagination({ page, totalPages, onPageChange, siblingCount = 1, className }: PaginationProps) {
  const items = getPageItems(page, totalPages, siblingCount);

  return (
    <nav
      aria-label="페이지 이동"
      className={["ds-pagination flex items-center gap-[var(--ds-space-1)]", className].filter(Boolean).join(" ")}
    >
      <button
        type="button"
        className={navButtonClassName}
        onClick={() => onPageChange(page - 1)}
        disabled={page <= 1}
        aria-label="이전 페이지"
      >
        <span className="w-[var(--ds-icon-sm)] h-[var(--ds-icon-sm)]">
          <ChevronLeftIcon />
        </span>
      </button>

      {items.map((item, i) =>
        item === ELLIPSIS ? (
          <span
            key={`ellipsis-${i}`}
            className="inline-flex h-[var(--ds-space-8)] w-[var(--ds-space-8)] items-center justify-center text-[var(--ds-color-text-tertiary)]"
          >
            …
          </span>
        ) : (
          <button
            key={item}
            type="button"
            onClick={() => onPageChange(item)}
            aria-current={item === page ? "page" : undefined}
            className={[
              "inline-flex h-[var(--ds-space-8)] w-[var(--ds-space-8)] shrink-0 cursor-pointer items-center justify-center rounded-[var(--ds-radius-sm)]",
              "text-[length:var(--ds-font-size-body3)] leading-[var(--ds-line-height-body3)] transition-colors duration-150",
              "focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[var(--ds-color-border-primary)]",
              item === page
                ? "bg-[var(--ds-color-primary)] font-medium text-[var(--ds-color-text-inverse)]"
                : "text-[var(--ds-color-text-secondary)] hover:bg-[var(--ds-color-grey-opacity-100)]",
            ].join(" ")}
          >
            {item}
          </button>
        ),
      )}

      <button
        type="button"
        className={navButtonClassName}
        onClick={() => onPageChange(page + 1)}
        disabled={page >= totalPages}
        aria-label="다음 페이지"
      >
        <span className="w-[var(--ds-icon-sm)] h-[var(--ds-icon-sm)]">
          <ChevronRightIcon />
        </span>
      </button>
    </nav>
  );
}
