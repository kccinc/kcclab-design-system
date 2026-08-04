import { createContext, useCallback, useContext, useMemo, useRef, useState } from "react";
import * as ToastPrimitive from "@radix-ui/react-toast";
import type { ReactNode } from "react";

export type ToastVariant = "default" | "success" | "danger" | "warning" | "info";

export interface ToastOptions {
  title: string;
  description?: string;
  /** 비주얼 스타일. @default "default" */
  variant?: ToastVariant;
  /** 자동으로 사라지기까지의 시간(ms). @default 4000 */
  duration?: number;
}

interface ToastItem extends ToastOptions {
  id: number;
}

interface ToastContextValue {
  toast: (options: ToastOptions) => void;
}

const ToastContext = createContext<ToastContextValue | null>(null);

/** 다른 컴포넌트에서 `toast()`를 호출하기 위한 훅. `ToastProvider` 안에서만 사용할 수 있습니다. */
export function useToast(): ToastContextValue {
  const ctx = useContext(ToastContext);
  if (!ctx) {
    throw new Error("useToast는 <ToastProvider> 내부에서만 사용할 수 있습니다.");
  }
  return ctx;
}

const variantClassName: Record<ToastVariant, string> = {
  default: "border-[var(--ds-color-border)]",
  success: "border-[var(--ds-color-success)]",
  danger: "border-[var(--ds-color-danger)]",
  warning: "border-[var(--ds-color-warning)]",
  info: "border-[var(--ds-color-info)]",
};

const variantTitleClassName: Record<ToastVariant, string> = {
  default: "text-[var(--ds-color-text-primary)]",
  success: "text-[var(--ds-color-success)]",
  danger: "text-[var(--ds-color-danger)]",
  warning: "text-[var(--ds-color-warning)]",
  info: "text-[var(--ds-color-info)]",
};

export interface ToastProviderProps {
  children?: ReactNode;
}

/**
 * 앱 루트에 한 번만 마운트하세요. 이 안쪽 어디서든 `useToast()`로 `toast()`를
 * 호출해 알림을 띄울 수 있습니다.
 */
export function ToastProvider({ children }: ToastProviderProps) {
  const [items, setItems] = useState<ToastItem[]>([]);
  const nextId = useRef(0);

  const toast = useCallback((options: ToastOptions) => {
    const id = nextId.current++;
    setItems((prev) => [...prev, { id, ...options }]);
  }, []);

  function removeItem(id: number) {
    setItems((prev) => prev.filter((item) => item.id !== id));
  }

  const value = useMemo(() => ({ toast }), [toast]);

  return (
    <ToastContext.Provider value={value}>
      <ToastPrimitive.Provider swipeDirection="right">
        {children}
        {items.map((item) => (
          <ToastPrimitive.Root
            key={item.id}
            duration={item.duration ?? 4000}
            onOpenChange={(open) => {
              if (!open) removeItem(item.id);
            }}
            className={[
              "ds-toast rounded-[var(--ds-radius-md)] border-l-4 bg-[var(--ds-color-layered-background)]",
              "p-[var(--ds-space-4)] shadow-[var(--ds-shadow-elevation-3)]",
              "data-[state=open]:animate-[ds-toast-in_150ms_ease-out]",
              variantClassName[item.variant ?? "default"],
            ].join(" ")}
          >
            <ToastPrimitive.Title
              className={[
                "text-[length:var(--ds-font-size-body2)] leading-[var(--ds-line-height-body2)] font-medium",
                variantTitleClassName[item.variant ?? "default"],
              ].join(" ")}
            >
              {item.title}
            </ToastPrimitive.Title>
            {item.description && (
              <ToastPrimitive.Description className="mt-[var(--ds-space-1)] text-[length:var(--ds-font-size-caption1)] leading-[var(--ds-line-height-caption1)] text-[var(--ds-color-text-secondary)]">
                {item.description}
              </ToastPrimitive.Description>
            )}
          </ToastPrimitive.Root>
        ))}
        <ToastPrimitive.Viewport className="fixed bottom-0 right-0 z-[var(--ds-z-toast)] flex w-[380px] max-w-[100vw] flex-col gap-[var(--ds-space-2)] p-[var(--ds-space-6)] outline-none" />
      </ToastPrimitive.Provider>
    </ToastContext.Provider>
  );
}
