import type { HTMLAttributes, ReactNode } from "react";

export interface EmptyStateProps extends Omit<HTMLAttributes<HTMLDivElement>, "title"> {
  /** 제목 위 원형 배경 안에 표시되는 아이콘 (예: `<Icon name="chart" />`). */
  icon?: ReactNode;
  /** 무엇이 비어 있는지 알려 주는 한 줄 (예: "아직 등록된 대시보드가 없습니다"). */
  title: ReactNode;
  /** 다음에 할 일을 안내하는 보조 설명. */
  description?: ReactNode;
  /** 설명 아래에 놓이는 동작 버튼 (예: `<Button>새로 만들기</Button>`). */
  action?: ReactNode;
  /** 점선 테두리 상자로 감쌀지 여부 — 카드/표 안처럼 이미 테두리가 있는 곳에서는 `false`로 둡니다. @default true */
  bordered?: boolean;
}

/** 목록·검색 결과·화면에 보여 줄 내용이 없을 때 쓰는 빈 상태 안내. 상태가 없어 서버 렌더링에서도 쓸 수 있습니다. */
export function EmptyState({
  icon,
  title,
  description,
  action,
  bordered = true,
  className,
  ...rest
}: EmptyStateProps) {
  return (
    <div
      className={[
        "ds-empty-state flex flex-col items-center gap-[var(--ds-space-2)] px-[var(--ds-space-6)] py-[var(--ds-space-12)] text-center",
        bordered
          ? "rounded-[var(--ds-radius-md)] border border-dashed border-[var(--ds-color-border-strong)] bg-[var(--ds-color-background)]"
          : "",
        className,
      ]
        .filter(Boolean)
        .join(" ")}
      {...rest}
    >
      {icon && (
        <span className="mb-[var(--ds-space-1)] inline-flex h-[var(--ds-control-height-md)] w-[var(--ds-control-height-md)] items-center justify-center rounded-[var(--ds-radius-full)] bg-[var(--ds-color-grey-background)] text-[var(--ds-color-text-tertiary)] [&_svg]:h-[var(--ds-icon-md)] [&_svg]:w-[var(--ds-icon-md)]">
          {icon}
        </span>
      )}
      <div className="text-[length:var(--ds-font-size-body2)] leading-[var(--ds-line-height-body2)] font-semibold text-[var(--ds-color-text-primary)]">
        {title}
      </div>
      {description && (
        <div className="max-w-md text-[length:var(--ds-font-size-caption1)] leading-[var(--ds-line-height-caption1)] text-[var(--ds-color-text-tertiary)]">
          {description}
        </div>
      )}
      {action && <div className="mt-[var(--ds-space-2)]">{action}</div>}
    </div>
  );
}
