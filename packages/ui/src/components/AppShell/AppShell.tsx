import type { HTMLAttributes, ReactNode } from "react";

export interface AppShellProps extends HTMLAttributes<HTMLDivElement> {
  /** 맨 위 영역 (예: 로고·검색·프로필이 있는 상단 바). */
  header?: ReactNode;
  /** 본문 왼쪽 영역 (예: 사이드 메뉴). 반응형으로 숨기려면 넣는 요소에 직접 `hidden md:flex` 등을 지정하세요. */
  sidebar?: ReactNode;
  /** 맨 아래 영역 (예: 모바일 하단 탭). */
  footer?: ReactNode;
  /** 본문. 화면 높이를 넘으면 본문 안에서만 스크롤되고, 위·왼쪽·아래 영역은 제자리에 고정됩니다. */
  children?: ReactNode;
}

/**
 * 앱 화면 배치 — 위(header) · 왼쪽(sidebar) · 본문 · 아래(footer) 자리만 잡습니다.
 * 각 자리에 무엇을 넣을지는 앱이 정합니다. 본문 영역은 `position: relative`라,
 * 사이드 메뉴 위에 겹쳐 뜨는 패널 같은 요소를 `absolute`로 올릴 수 있습니다.
 */
export function AppShell({ header, sidebar, footer, children, className, ...rest }: AppShellProps) {
  return (
    <div
      className={[
        "ds-app-shell flex h-dvh flex-col bg-[var(--ds-color-background)] text-[var(--ds-color-text-primary)]",
        className,
      ]
        .filter(Boolean)
        .join(" ")}
      {...rest}
    >
      {header && <div className="shrink-0">{header}</div>}
      <div className="relative flex min-h-0 flex-1">
        {sidebar && <div className="flex h-full shrink-0">{sidebar}</div>}
        <main className="ds-app-shell-main min-w-0 flex-1 overflow-y-auto">{children}</main>
      </div>
      {footer && <div className="shrink-0">{footer}</div>}
    </div>
  );
}
