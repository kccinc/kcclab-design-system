import { cloneElement, useId } from "react";
import type { ReactElement, ReactNode } from "react";
import { Label } from "../Label";

export interface FormFieldChildProps {
  id?: string;
  required?: boolean;
  error?: boolean;
  errorMessage?: string;
}

export interface FormFieldProps {
  /** 라벨 텍스트. */
  label: ReactNode;
  /**
   * 이 필드와 짝지어질 입력 요소 (`Input`/`Textarea`/`Select`/`DatePicker` 등) —
   * 단 하나여야 합니다. `id`/`required`/`error`/`errorMessage`가 자동으로 전파됩니다.
   */
  children: ReactElement<FormFieldChildProps>;
  /** 필수 입력 여부 — 라벨에 `*`가 표시되고, 입력 요소에도 전파됩니다. @default false */
  required?: boolean;
  /** `errorMessage` 없이도 에러 상태를 강제로 적용합니다. */
  error?: boolean;
  /** 라벨-입력 요소 아래에 표시할 에러 메시지 — 입력 요소로 전파되어 그 안에서 렌더링됩니다. */
  errorMessage?: string;
  /** 명시적인 id — 지정하지 않으면 자동 생성됩니다. */
  htmlFor?: string;
  className?: string;
}

export function FormField({
  label,
  children,
  required = false,
  error = false,
  errorMessage,
  htmlFor,
  className,
}: FormFieldProps) {
  const generatedId = useId();
  const fieldId = htmlFor ?? generatedId;
  const hasError = error || Boolean(errorMessage);

  const clonedChild = cloneElement(children, {
    id: fieldId,
    required,
    error: hasError,
    errorMessage,
  });

  return (
    <div className={["ds-form-field flex flex-col gap-[var(--ds-space-2)]", className].filter(Boolean).join(" ")}>
      <Label htmlFor={fieldId} required={required}>
        {label}
      </Label>
      {clonedChild}
    </div>
  );
}
