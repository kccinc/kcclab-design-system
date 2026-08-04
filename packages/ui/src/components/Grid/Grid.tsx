import type { HTMLAttributes, ReactNode } from "react";
import type { SpacingToken } from "../../tokens/spacing";

export type GridColumns = 1 | 2 | 3 | 4 | 5 | 6;

export interface ResponsiveGridColumns {
  /** 기본(모바일) 컬럼 수. */
  base?: GridColumns;
  /** `sm` 브레이크포인트 이상에서의 컬럼 수. */
  sm?: GridColumns;
  /** `md` 브레이크포인트 이상에서의 컬럼 수. */
  md?: GridColumns;
  /** `lg` 브레이크포인트 이상에서의 컬럼 수. */
  lg?: GridColumns;
}

export interface GridProps extends HTMLAttributes<HTMLDivElement> {
  /** 컬럼 수 — 고정값 또는 브레이크포인트별 반응형 값. @default 1 */
  columns?: GridColumns | ResponsiveGridColumns;
  /** 셀 간 간격 — spacing 토큰 스텝. @default 4 */
  gap?: SpacingToken;
  children?: ReactNode;
}

// Tailwind는 소스에 리터럴로 존재하는 클래스만 컴파일하므로, 컬럼/간격 값을
// 문자열 템플릿으로 조립하지 않고 이렇게 정적 매핑 테이블로 나열합니다.
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

const baseColsClassName: Record<GridColumns, string> = {
  1: "grid-cols-1",
  2: "grid-cols-2",
  3: "grid-cols-3",
  4: "grid-cols-4",
  5: "grid-cols-5",
  6: "grid-cols-6",
};

const smColsClassName: Record<GridColumns, string> = {
  1: "sm:grid-cols-1",
  2: "sm:grid-cols-2",
  3: "sm:grid-cols-3",
  4: "sm:grid-cols-4",
  5: "sm:grid-cols-5",
  6: "sm:grid-cols-6",
};

const mdColsClassName: Record<GridColumns, string> = {
  1: "md:grid-cols-1",
  2: "md:grid-cols-2",
  3: "md:grid-cols-3",
  4: "md:grid-cols-4",
  5: "md:grid-cols-5",
  6: "md:grid-cols-6",
};

const lgColsClassName: Record<GridColumns, string> = {
  1: "lg:grid-cols-1",
  2: "lg:grid-cols-2",
  3: "lg:grid-cols-3",
  4: "lg:grid-cols-4",
  5: "lg:grid-cols-5",
  6: "lg:grid-cols-6",
};

function columnsClassNames(columns: GridColumns | ResponsiveGridColumns): string[] {
  if (typeof columns === "number") {
    return [baseColsClassName[columns]];
  }
  const classes: string[] = [];
  if (columns.base) classes.push(baseColsClassName[columns.base]);
  if (columns.sm) classes.push(smColsClassName[columns.sm]);
  if (columns.md) classes.push(mdColsClassName[columns.md]);
  if (columns.lg) classes.push(lgColsClassName[columns.lg]);
  return classes;
}

export function Grid({ columns = 1, gap = 4, className, children, ...rest }: GridProps) {
  const classes = ["ds-grid grid", ...columnsClassNames(columns), gapClassName[gap], className]
    .filter(Boolean)
    .join(" ");

  return (
    <div className={classes} {...rest}>
      {children}
    </div>
  );
}
