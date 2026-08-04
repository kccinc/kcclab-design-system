import * as TabsPrimitive from "@radix-ui/react-tabs";
import type { ReactNode } from "react";

export interface TabsProps {
  /** 선택된 탭의 값 (controlled). */
  value?: string;
  /** 선택된 탭의 값 (uncontrolled) 초기값. */
  defaultValue?: string;
  /** 선택된 탭이 바뀔 때 호출됩니다. */
  onValueChange?: (value: string) => void;
  className?: string;
  children?: ReactNode;
}

export interface TabsListProps {
  className?: string;
  children?: ReactNode;
}

export interface TabsTriggerProps {
  value: string;
  disabled?: boolean;
  className?: string;
  children?: ReactNode;
}

export interface TabsContentProps {
  value: string;
  className?: string;
  children?: ReactNode;
}

function TabsRoot({ className, children, ...rest }: TabsProps) {
  return (
    <TabsPrimitive.Root {...rest} className={["ds-tabs", className].filter(Boolean).join(" ")}>
      {children}
    </TabsPrimitive.Root>
  );
}

function TabsList({ className, children }: TabsListProps) {
  return (
    <TabsPrimitive.List
      className={[
        "ds-tabs-list flex gap-[var(--ds-space-4)] border-b border-[var(--ds-color-border)]",
        className,
      ]
        .filter(Boolean)
        .join(" ")}
    >
      {children}
    </TabsPrimitive.List>
  );
}

function TabsTrigger({ value, disabled, className, children }: TabsTriggerProps) {
  return (
    <TabsPrimitive.Trigger
      value={value}
      disabled={disabled}
      className={[
        "ds-tabs-trigger relative -mb-px cursor-pointer border-b-2 border-transparent px-[var(--ds-space-1)] py-[var(--ds-space-3)]",
        "text-[length:var(--ds-font-size-body2)] leading-[var(--ds-line-height-body2)] text-[var(--ds-color-text-secondary)]",
        "transition-colors duration-150 hover:text-[var(--ds-color-text-primary)]",
        "data-[state=active]:border-[var(--ds-color-primary)] data-[state=active]:font-medium data-[state=active]:text-[var(--ds-color-primary)]",
        "focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[var(--ds-color-border-primary)]",
        "disabled:cursor-not-allowed disabled:opacity-[var(--ds-opacity-disabled)]",
        className,
      ]
        .filter(Boolean)
        .join(" ")}
    >
      {children}
    </TabsPrimitive.Trigger>
  );
}

function TabsContent({ value, className, children }: TabsContentProps) {
  return (
    <TabsPrimitive.Content
      value={value}
      className={["ds-tabs-content pt-[var(--ds-space-4)]", className].filter(Boolean).join(" ")}
    >
      {children}
    </TabsPrimitive.Content>
  );
}

export const Tabs = Object.assign(TabsRoot, {
  List: TabsList,
  Trigger: TabsTrigger,
  Content: TabsContent,
});
