import type { ReactNode } from "react";

export interface FormGroupProps {
  /** 섹션 제목. */
  title?: ReactNode;
  /** 제목 아래에 표시할 보조 설명. */
  description?: ReactNode;
  children?: ReactNode;
  className?: string;
}

export function FormGroup({ title, description, children, className }: FormGroupProps) {
  return (
    <fieldset
      className={["ds-form-group flex flex-col gap-[var(--ds-space-4)] border-none p-0 m-0", className]
        .filter(Boolean)
        .join(" ")}
    >
      {(title || description) && (
        <div className="flex flex-col gap-[var(--ds-space-1)]">
          {title && (
            <legend className="text-[length:var(--ds-font-size-heading4)] leading-[var(--ds-line-height-heading4)] font-semibold text-[var(--ds-color-text-primary)]">
              {title}
            </legend>
          )}
          {description && (
            <p className="m-0 text-[length:var(--ds-font-size-body3)] leading-[var(--ds-line-height-body3)] text-[var(--ds-color-text-secondary)]">
              {description}
            </p>
          )}
        </div>
      )}
      <div className="flex flex-col gap-[var(--ds-space-4)]">{children}</div>
    </fieldset>
  );
}
