import type { ReactNode } from "react";

export interface StepperStep {
  label: ReactNode;
  description?: ReactNode;
}

export interface StepperProps {
  steps: StepperStep[];
  /** 현재 진행 중인 단계의 인덱스 (0부터 시작). */
  currentStep: number;
  className?: string;
}

function CheckIcon() {
  return (
    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="3" aria-hidden="true">
      <path d="M5 12l5 5 9-10" strokeLinecap="round" strokeLinejoin="round" />
    </svg>
  );
}

export function Stepper({ steps, currentStep, className }: StepperProps) {
  return (
    <ol className={["ds-stepper flex w-full items-start", className].filter(Boolean).join(" ")}>
      {steps.map((step, i) => {
        const status = i < currentStep ? "completed" : i === currentStep ? "current" : "upcoming";
        const isLast = i === steps.length - 1;

        return (
          <li key={i} className={["flex items-start", isLast ? "" : "flex-1"].join(" ")}>
            <div className="flex flex-col items-center">
              <div
                className={[
                  "flex h-[var(--ds-space-8)] w-[var(--ds-space-8)] shrink-0 items-center justify-center rounded-[var(--ds-radius-full)]",
                  "text-[length:var(--ds-font-size-caption1)] leading-[var(--ds-line-height-caption1)] font-medium",
                  status === "completed"
                    ? "bg-[var(--ds-color-primary)] text-[var(--ds-color-text-inverse)]"
                    : status === "current"
                      ? "border-2 border-[var(--ds-color-primary)] text-[var(--ds-color-primary)]"
                      : "border border-[var(--ds-color-border)] text-[var(--ds-color-text-tertiary)]",
                ].join(" ")}
              >
                {status === "completed" ? (
                  <span className="w-[var(--ds-icon-xs)] h-[var(--ds-icon-xs)]">
                    <CheckIcon />
                  </span>
                ) : (
                  i + 1
                )}
              </div>
              <div className="mt-[var(--ds-space-2)] max-w-[96px] text-center">
                <p
                  className={[
                    "text-[length:var(--ds-font-size-caption1)] leading-[var(--ds-line-height-caption1)]",
                    status === "upcoming" ? "text-[var(--ds-color-text-tertiary)]" : "font-medium text-[var(--ds-color-text-primary)]",
                  ].join(" ")}
                >
                  {step.label}
                </p>
                {step.description && (
                  <p className="mt-[var(--ds-space-1)] text-[length:var(--ds-font-size-label2)] leading-[var(--ds-line-height-label2)] text-[var(--ds-color-text-tertiary)]">
                    {step.description}
                  </p>
                )}
              </div>
            </div>
            {!isLast && (
              <div
                className={[
                  "mt-[var(--ds-space-4)] h-px flex-1",
                  status === "completed" ? "bg-[var(--ds-color-primary)]" : "bg-[var(--ds-color-border)]",
                ].join(" ")}
              />
            )}
          </li>
        );
      })}
    </ol>
  );
}
