import * as ProgressPrimitive from "@radix-ui/react-progress";

export type ProgressBarVariant = "linear" | "circular";

export interface ProgressBarProps {
  /** 현재 진행 값. */
  value: number;
  /** 진행 값의 최댓값. @default 100 */
  max?: number;
  /** 모양. @default "linear" */
  variant?: ProgressBarVariant;
  className?: string;
}

// 원형 SVG의 내부 좌표계 상수 — 실제 렌더링 크기는 아래 `--ds-avatar-lg` 토큰 기반
// className이 결정하고, 이 값들은 그 안에서의 원/스트로크 기하학 계산용입니다.
const CIRCLE_VIEWBOX = 48;
const CIRCLE_RADIUS = 20;
const CIRCLE_STROKE_WIDTH = 4;
const CIRCLE_CIRCUMFERENCE = 2 * Math.PI * CIRCLE_RADIUS;

export function ProgressBar({ value, max = 100, variant = "linear", className }: ProgressBarProps) {
  const percent = Math.min(100, Math.max(0, (value / max) * 100));

  if (variant === "circular") {
    const offset = CIRCLE_CIRCUMFERENCE * (1 - percent / 100);
    return (
      <ProgressPrimitive.Root
        value={value}
        max={max}
        className={["ds-progress-circular inline-block w-[var(--ds-avatar-lg)] h-[var(--ds-avatar-lg)]", className]
          .filter(Boolean)
          .join(" ")}
      >
        <ProgressPrimitive.Indicator asChild>
          <svg viewBox={`0 0 ${CIRCLE_VIEWBOX} ${CIRCLE_VIEWBOX}`} className="-rotate-90">
            <circle
              cx={CIRCLE_VIEWBOX / 2}
              cy={CIRCLE_VIEWBOX / 2}
              r={CIRCLE_RADIUS}
              fill="none"
              stroke="var(--ds-color-border)"
              strokeWidth={CIRCLE_STROKE_WIDTH}
            />
            <circle
              cx={CIRCLE_VIEWBOX / 2}
              cy={CIRCLE_VIEWBOX / 2}
              r={CIRCLE_RADIUS}
              fill="none"
              stroke="var(--ds-color-primary)"
              strokeWidth={CIRCLE_STROKE_WIDTH}
              strokeLinecap="round"
              strokeDasharray={CIRCLE_CIRCUMFERENCE}
              strokeDashoffset={offset}
              style={{ transition: "stroke-dashoffset 150ms" }}
            />
          </svg>
        </ProgressPrimitive.Indicator>
      </ProgressPrimitive.Root>
    );
  }

  return (
    <ProgressPrimitive.Root
      value={value}
      max={max}
      className={[
        "ds-progress-linear h-[var(--ds-space-2)] w-full overflow-hidden rounded-[var(--ds-radius-full)]",
        "bg-[var(--ds-color-border)]",
        className,
      ]
        .filter(Boolean)
        .join(" ")}
    >
      <ProgressPrimitive.Indicator
        className="h-full rounded-[var(--ds-radius-full)] bg-[var(--ds-color-primary)] transition-transform duration-150"
        style={{ transform: `translateX(-${100 - percent}%)` }}
      />
    </ProgressPrimitive.Root>
  );
}
