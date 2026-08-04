import * as AccordionPrimitive from "@radix-ui/react-accordion";
import type { ReactNode } from "react";

export type AccordionType = "single" | "multiple";

export interface AccordionProps {
  /** 한 번에 하나만 펼칠지, 여러 개 동시에 펼칠 수 있는지. @default "single" */
  type?: AccordionType;
  /** `type="single"`일 때, 펼쳐진 항목을 다시 클릭해서 닫을 수 있는지. @default true */
  collapsible?: boolean;
  /** 펼쳐진 항목의 `value` (controlled). `type`에 따라 문자열 또는 문자열 배열. */
  value?: string | string[];
  /** 펼쳐진 항목의 `value` (uncontrolled) 초기값. */
  defaultValue?: string | string[];
  /** 펼쳐진 항목이 바뀔 때 호출됩니다. */
  onValueChange?: (value: string | string[]) => void;
  className?: string;
  children?: ReactNode;
}

export interface AccordionItemProps {
  /** 이 항목을 식별하는 값. */
  value: string;
  /** 헤더에 표시할 제목. */
  title: ReactNode;
  /** 비활성화 여부. */
  disabled?: boolean;
  className?: string;
  children?: ReactNode;
}

function ChevronDownIcon() {
  return (
    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" aria-hidden="true">
      <path d="M6 9l6 6 6-6" strokeLinecap="round" strokeLinejoin="round" />
    </svg>
  );
}

function AccordionRoot({
  type = "single",
  collapsible = true,
  value,
  defaultValue,
  onValueChange,
  className,
  children,
}: AccordionProps) {
  const rootClassName = ["ds-accordion divide-y divide-[var(--ds-color-border)]", className]
    .filter(Boolean)
    .join(" ");

  // Radix models single/multiple as a discriminated union; our own prop
  // surface stays permissive on purpose (see CLAUDE.md rule 8 — don't
  // over-build for a type-safety edge case), so each branch narrows back
  // down to what that variant of Radix's Root actually expects.
  if (type === "multiple") {
    return (
      <AccordionPrimitive.Root
        type="multiple"
        value={value as string[] | undefined}
        defaultValue={defaultValue as string[] | undefined}
        onValueChange={onValueChange as ((value: string[]) => void) | undefined}
        className={rootClassName}
      >
        {children}
      </AccordionPrimitive.Root>
    );
  }

  return (
    <AccordionPrimitive.Root
      type="single"
      collapsible={collapsible}
      value={value as string | undefined}
      defaultValue={defaultValue as string | undefined}
      onValueChange={onValueChange as ((value: string) => void) | undefined}
      className={rootClassName}
    >
      {children}
    </AccordionPrimitive.Root>
  );
}

function AccordionItem({ value, title, disabled, className, children }: AccordionItemProps) {
  return (
    <AccordionPrimitive.Item value={value} disabled={disabled} className={className}>
      <AccordionPrimitive.Header>
        <AccordionPrimitive.Trigger
          className={[
            "ds-accordion-trigger flex w-full cursor-pointer items-center justify-between gap-[var(--ds-space-2)]",
            "py-[var(--ds-space-3)] text-left text-[length:var(--ds-font-size-body2)] leading-[var(--ds-line-height-body2)]",
            "font-medium text-[var(--ds-color-text-primary)]",
            "focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[var(--ds-color-border-primary)]",
            "disabled:cursor-not-allowed disabled:opacity-[var(--ds-opacity-disabled)]",
            "[&_svg]:transition-transform [&_svg]:duration-150 data-[state=open]:[&_svg]:rotate-180",
          ].join(" ")}
        >
          {title}
          <span className="w-[var(--ds-icon-sm)] h-[var(--ds-icon-sm)] shrink-0 text-[var(--ds-color-text-tertiary)]">
            <ChevronDownIcon />
          </span>
        </AccordionPrimitive.Trigger>
      </AccordionPrimitive.Header>
      <AccordionPrimitive.Content className="ds-accordion-content overflow-hidden text-[var(--ds-color-text-secondary)] data-[state=open]:pb-[var(--ds-space-3)]">
        {children}
      </AccordionPrimitive.Content>
    </AccordionPrimitive.Item>
  );
}

export const Accordion = Object.assign(AccordionRoot, { Item: AccordionItem });
