import { useState } from "react";
import type { HTMLAttributes } from "react";

export type AvatarSize = "xs" | "sm" | "md" | "lg" | "xl";

export interface AvatarProps extends HTMLAttributes<HTMLSpanElement> {
  /** 이미지 URL. 없거나 로드에 실패하면 `name`으로 만든 이니셜을 대신 보여줍니다. */
  src?: string;
  /** `<img>`의 `alt` 텍스트 — 접근성을 위해 `src`를 쓸 때는 항상 지정하세요. */
  alt?: string;
  /** 이니셜 폴백을 만드는 데 사용되는 이름 (예: "정영훈" → "정", "Younghun Jeong" → "YJ"). */
  name?: string;
  /** 사이즈. @default "md" */
  size?: AvatarSize;
}

const sizeClassName: Record<AvatarSize, string> = {
  xs: "w-[var(--ds-avatar-xs)] h-[var(--ds-avatar-xs)] text-[length:var(--ds-font-size-label2)]",
  sm: "w-[var(--ds-avatar-sm)] h-[var(--ds-avatar-sm)] text-[length:var(--ds-font-size-label1)]",
  md: "w-[var(--ds-avatar-md)] h-[var(--ds-avatar-md)] text-[length:var(--ds-font-size-body2)]",
  lg: "w-[var(--ds-avatar-lg)] h-[var(--ds-avatar-lg)] text-[length:var(--ds-font-size-heading4)]",
  xl: "w-[var(--ds-avatar-xl)] h-[var(--ds-avatar-xl)] text-[length:var(--ds-font-size-heading2)]",
};

function getInitials(name: string) {
  const parts = name.trim().split(/\s+/);
  if (parts.length === 1) return parts[0].slice(0, 2).toUpperCase();
  return (parts[0][0] + parts[parts.length - 1][0]).toUpperCase();
}

export function Avatar({ src, alt = "", name, size = "md", className, ...rest }: AvatarProps) {
  const [imageFailed, setImageFailed] = useState(false);
  const showImage = Boolean(src) && !imageFailed;

  const classes = [
    "ds-avatar inline-flex shrink-0 items-center justify-center overflow-hidden rounded-[var(--ds-radius-full)]",
    "bg-[var(--ds-color-grey-background)] font-medium text-[var(--ds-color-text-secondary)]",
    sizeClassName[size],
    className,
  ]
    .filter(Boolean)
    .join(" ");

  return (
    <span className={classes} {...rest}>
      {showImage ? (
        <img
          src={src}
          alt={alt}
          className="h-full w-full object-cover"
          onError={() => setImageFailed(true)}
        />
      ) : name ? (
        <span aria-hidden={alt ? undefined : "true"}>{getInitials(name)}</span>
      ) : (
        <svg viewBox="0 0 24 24" fill="currentColor" aria-hidden="true" className="h-3/5 w-3/5">
          <path d="M12 12a5 5 0 1 0 0-10 5 5 0 0 0 0 10Zm0 2c-4.4 0-8 2.2-8 5v1a1 1 0 0 0 1 1h14a1 1 0 0 0 1-1v-1c0-2.8-3.6-5-8-5Z" />
        </svg>
      )}
    </span>
  );
}
