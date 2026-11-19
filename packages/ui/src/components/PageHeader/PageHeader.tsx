import type { HTMLAttributes, ReactNode } from "react";

export interface PageHeaderProps extends Omit<HTMLAttributes<HTMLDivElement>, "title"> {
  /** 화면 제목. `<h1>`로 렌더링됩니다 — 배지 등을 함께 두려면 ReactNode로 넘기세요. */
  title: ReactNode;
  /** 제목 아래 한 줄 설명. */
  description?: ReactNode;
  /** 제목 오른쪽 버튼 영역. */
  actions?: ReactNode;
  /** 제목 아래 줄 (예: 탭·필터). */
  children?: ReactNode;
}

/** 본문 맨 위 화면 헤더 — 제목·설명, 오른쪽 버튼, 아래 줄(탭·필터)을 한 덩어리로 묶습니다. 상태가 없어 서버 렌더링에서도 쓸 수 있습니다. */
export function PageHeader({ title, description, actions, children, className, ...rest }: PageHeaderProps) {
  return (
    <div
      className={[
        "ds-page-header border-b border-[var(--ds-color-border)] bg-[var(--ds-color-background)]",
        "px-[var(--ds-space-4)] py-[var(--ds-space-4)] md:px-[var(--ds-space-6)]",
        className,
      ]
        .filter(Boolean)
        .join(" ")}
      {...rest}
    >
      <div className="flex flex-wrap items-start justify-between gap-x-[var(--ds-space-4)] gap-y-[var(--ds-space-2)]">
        <div className="min-w-0 flex-1">
          <h1 className="text-[length:var(--ds-font-size-heading4)] leading-[var(--ds-line-height-heading4)] font-bold text-[var(--ds-color-text-primary)]">
            {title}
          </h1>
          {description && (
            <p className="mt-[var(--ds-space-1)] text-[length:var(--ds-font-size-body3)] leading-[var(--ds-line-height-body3)] text-[var(--ds-color-text-tertiary)]">
              {description}
            </p>
          )}
        </div>
        {actions && <div className="flex flex-wrap items-center gap-[var(--ds-space-2)]">{actions}</div>}
      </div>
      {children && (
        <div className="mt-[var(--ds-space-4)] flex flex-wrap items-center gap-[var(--ds-space-2)]">{children}</div>
      )}
    </div>
  );
}
