import { useEffect, useId, useRef, useState } from "react";
import type { PointerEvent as ReactPointerEvent } from "react";
import { Button } from "../Button";

export type SignatureSize = "sm" | "md" | "lg";

export interface SignatureProps {
  /** 서명 획을 그리다 뗄 때마다 PNG data URL로 호출됩니다. */
  onChange?: (dataUrl: string) => void;
  /** 지우기 버튼 클릭 시 호출됩니다. */
  onClear?: () => void;
  /** 미리 채워둘 기존 서명 이미지 (data URL). */
  defaultValue?: string;
  /** 캔버스 높이. @default "md" */
  size?: SignatureSize;
  /** 서명이 비어있을 때 표시할 안내 문구. @default "여기에 서명해주세요" */
  placeholder?: string;
  /** 지우기 버튼 텍스트. @default "지우기" */
  clearLabel?: string;
  /** 필수 입력 여부 (폼 검증용). @default false */
  required?: boolean;
  /** 비활성화 여부 — 그릴 수 없고 흐리게 표시됩니다. @default false */
  disabled?: boolean;
  /** 그릴 수 없고 기존 서명만 보여줍니다 (지우기 버튼도 숨겨집니다). @default false */
  readOnly?: boolean;
  /** `errorMessage` 없이도 에러 상태 스타일을 강제로 적용합니다. */
  error?: boolean;
  /** 캔버스 아래에 표시할 에러 메시지. */
  errorMessage?: string;
  id?: string;
  className?: string;
}

const sizeClassName: Record<SignatureSize, string> = {
  sm: "h-[var(--ds-space-20)]",
  md: "h-[calc(var(--ds-space-20)*1.5)]",
  lg: "h-[calc(var(--ds-space-20)*2)]",
};

function getPoint(e: ReactPointerEvent<HTMLCanvasElement>, canvas: HTMLCanvasElement) {
  const rect = canvas.getBoundingClientRect();
  return { x: e.clientX - rect.left, y: e.clientY - rect.top };
}

export function Signature({
  onChange,
  onClear,
  defaultValue,
  size = "md",
  placeholder = "여기에 서명해주세요",
  clearLabel = "지우기",
  required = false,
  disabled = false,
  readOnly = false,
  error = false,
  errorMessage,
  id,
  className,
}: SignatureProps) {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const isDrawingRef = useRef(false);
  const lastPointRef = useRef({ x: 0, y: 0 });
  const hasContentRef = useRef(false);
  const [hasContent, setHasContentState] = useState(false);

  function setHasContent(value: boolean) {
    hasContentRef.current = value;
    setHasContentState(value);
  }
  const generatedId = useId();
  const signatureId = id ?? generatedId;
  const errorId = `${signatureId}-error`;
  const hasError = error || Boolean(errorMessage);
  const canDraw = !disabled && !readOnly;

  // 캔버스 표시 크기(CSS) 대비 실제 픽셀 밀도를 맞춰서 선명하게 그립니다.
  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;

    function resize() {
      const canvas = canvasRef.current;
      if (!canvas) return;
      const rect = canvas.getBoundingClientRect();
      const dpr = window.devicePixelRatio || 1;
      const prev = canvas.toDataURL();
      canvas.width = rect.width * dpr;
      canvas.height = rect.height * dpr;
      const ctx = canvas.getContext("2d");
      if (!ctx) return;
      ctx.scale(dpr, dpr);
      ctx.lineCap = "round";
      ctx.lineJoin = "round";
      ctx.lineWidth = 2;
      ctx.strokeStyle = getComputedStyle(canvas).color;
      if (hasContentRef.current) {
        const img = new Image();
        img.onload = () => ctx.drawImage(img, 0, 0, rect.width, rect.height);
        img.src = prev;
      }
    }

    resize();
    const observer = new ResizeObserver(resize);
    observer.observe(canvas);
    return () => observer.disconnect();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  useEffect(() => {
    if (!defaultValue) return;
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext("2d");
    if (!ctx) return;
    const rect = canvas.getBoundingClientRect();
    const img = new Image();
    img.onload = () => {
      ctx.drawImage(img, 0, 0, rect.width, rect.height);
      setHasContent(true);
    };
    img.src = defaultValue;
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [defaultValue]);

  function handlePointerDown(e: ReactPointerEvent<HTMLCanvasElement>) {
    if (!canDraw) return;
    const canvas = canvasRef.current;
    if (!canvas) return;
    canvas.setPointerCapture(e.pointerId);
    isDrawingRef.current = true;
    lastPointRef.current = getPoint(e, canvas);
  }

  function handlePointerMove(e: ReactPointerEvent<HTMLCanvasElement>) {
    if (!canDraw || !isDrawingRef.current) return;
    const canvas = canvasRef.current;
    const ctx = canvas?.getContext("2d");
    if (!canvas || !ctx) return;
    const point = getPoint(e, canvas);
    ctx.beginPath();
    ctx.moveTo(lastPointRef.current.x, lastPointRef.current.y);
    ctx.lineTo(point.x, point.y);
    ctx.stroke();
    lastPointRef.current = point;
    if (!hasContentRef.current) setHasContent(true);
  }

  function handlePointerUp(e: ReactPointerEvent<HTMLCanvasElement>) {
    if (!isDrawingRef.current) return;
    isDrawingRef.current = false;
    const canvas = canvasRef.current;
    if (canvas?.hasPointerCapture(e.pointerId)) {
      canvas.releasePointerCapture(e.pointerId);
    }
    if (canvas && hasContentRef.current) onChange?.(canvas.toDataURL("image/png"));
  }

  function handleClear() {
    const canvas = canvasRef.current;
    const ctx = canvas?.getContext("2d");
    if (canvas && ctx) ctx.clearRect(0, 0, canvas.width, canvas.height);
    setHasContent(false);
    onClear?.();
  }

  return (
    <div className="ds-signature-wrapper w-full">
      <div
        className={[
          "ds-signature relative w-full overflow-hidden rounded-[var(--ds-radius-sm)] border transition-colors duration-150",
          hasError ? "border-[var(--ds-color-border-danger)]" : "border-[var(--ds-color-border)]",
          readOnly ? "bg-[var(--ds-color-grey-background)]" : "bg-[var(--ds-color-background)]",
          disabled ? "cursor-not-allowed opacity-[var(--ds-opacity-disabled)]" : "",
          sizeClassName[size],
          className,
        ]
          .filter(Boolean)
          .join(" ")}
      >
        <canvas
          ref={canvasRef}
          id={signatureId}
          tabIndex={canDraw ? 0 : -1}
          className={[
            "absolute inset-0 h-full w-full touch-none text-[var(--ds-color-text-primary)]",
            canDraw ? "cursor-crosshair" : "",
          ]
            .filter(Boolean)
            .join(" ")}
          onPointerDown={handlePointerDown}
          onPointerMove={handlePointerMove}
          onPointerUp={handlePointerUp}
          aria-invalid={hasError || undefined}
          aria-required={required || undefined}
          aria-describedby={errorMessage ? errorId : undefined}
        />
        {!hasContent && (
          <span className="pointer-events-none absolute inset-0 flex items-center justify-center text-[length:var(--ds-font-size-body2)] leading-[var(--ds-line-height-body2)] text-[var(--ds-color-text-placeholder)]">
            {placeholder}
          </span>
        )}
        {!readOnly && (
          <Button
            type="button"
            variant="outline"
            size="sm"
            onClick={handleClear}
            disabled={disabled || !hasContent}
            className="absolute right-[var(--ds-space-2)] top-[var(--ds-space-2)]"
          >
            {clearLabel}
          </Button>
        )}
      </div>
      {errorMessage && (
        <p
          id={errorId}
          className="mt-[var(--ds-space-1)] text-[length:var(--ds-font-size-caption1)] leading-[var(--ds-line-height-caption1)] text-[var(--ds-color-danger)]"
        >
          {errorMessage}
        </p>
      )}
    </div>
  );
}
