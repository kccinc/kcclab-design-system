import type { HTMLAttributes, ReactNode } from "react";
import type { SpacingToken } from "../../tokens/spacing";

export type StackDirection = "row" | "column";
export type StackAlign = "start" | "center" | "end" | "stretch";
export type StackJustify = "start" | "center" | "end" | "between" | "around";

export interface StackProps extends HTMLAttributes<HTMLDivElement> {
  /** 배치 방향. @default "column" */
  direction?: StackDirection;
  /** 요소 간 간격 — spacing 토큰 스텝. @default 3 */
  gap?: SpacingToken;
  /** 교차축 정렬. */
  align?: StackAlign;
  /** 주축 정렬. */
  justify?: StackJustify;
  /** 넘칠 때 줄바꿈 허용 여부. @default false */
  wrap?: boolean;
  children?: ReactNode;
}

// Tailwind는 소스에 리터럴로 존재하는 클래스만 컴파일합니다 — gap 값을 문자열
// 템플릿으로 조립하면 안 되고, 이렇게 정적 매핑 테이블로 나열해야 합니다.
const gapClassName: Record<SpacingToken, string> = {
  0: "gap-[var(--ds-space-0)]",
  1: "gap-[var(--ds-space-1)]",
  2: "gap-[var(--ds-space-2)]",
  3: "gap-[var(--ds-space-3)]",
  4: "gap-[var(--ds-space-4)]",
  5: "gap-[var(--ds-space-5)]",
  6: "gap-[var(--ds-space-6)]",
  8: "gap-[var(--ds-space-8)]",
  10: "gap-[var(--ds-space-10)]",
  12: "gap-[var(--ds-space-12)]",
  16: "gap-[var(--ds-space-16)]",
  20: "gap-[var(--ds-space-20)]",
};

const alignClassName: Record<StackAlign, string> = {
  start: "items-start",
  center: "items-center",
  end: "items-end",
  stretch: "items-stretch",
};

const justifyClassName: Record<StackJustify, string> = {
  start: "justify-start",
  center: "justify-center",
  end: "justify-end",
  between: "justify-between",
  around: "justify-around",
};

export function Stack({
  direction = "column",
  gap = 3,
  align,
  justify,
  wrap = false,
  className,
  children,
  ...rest
}: StackProps) {
  const classes = [
    "ds-stack flex",
    direction === "row" ? "flex-row" : "flex-col",
    gapClassName[gap],
    align ? alignClassName[align] : "",
    justify ? justifyClassName[justify] : "",
    wrap ? "flex-wrap" : "",
    className,
  ]
    .filter(Boolean)
    .join(" ");

  return (
    <div className={classes} {...rest}>
      {children}
    </div>
  );
}
