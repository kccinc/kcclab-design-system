import type { SVGAttributes } from "react";
import { ICON_PATHS } from "./paths";
import type { IconName } from "./paths";

export type IconSize = "xs" | "sm" | "md" | "lg" | "xl";

export interface IconProps extends Omit<SVGAttributes<SVGSVGElement>, "name"> {
  /** 그릴 아이콘 이름. 사용 가능한 이름은 `ICON_NAMES`를 참고하세요. */
  name: IconName;
  /** 크기 — `--ds-icon-*` 토큰을 따릅니다. `"inherit"`이면 크기를 지정하지 않아, 부모(IconButton 등)가 정한 크기를 따릅니다. @default "md" */
  size?: IconSize | "inherit";
  /**
   * 스크린 리더용 이름. 지정하면 `role="img"`로 읽히고, 지정하지 않으면 장식용으로 보고
   * `aria-hidden` 처리합니다 — 버튼 안 아이콘처럼 옆에 텍스트/`aria-label`이 있으면 비워 두세요.
   */
  label?: string;
}

const sizeClassName: Record<IconSize, string> = {
  xs: "w-[var(--ds-icon-xs)] h-[var(--ds-icon-xs)]",
  sm: "w-[var(--ds-icon-sm)] h-[var(--ds-icon-sm)]",
  md: "w-[var(--ds-icon-md)] h-[var(--ds-icon-md)]",
  lg: "w-[var(--ds-icon-lg)] h-[var(--ds-icon-lg)]",
  xl: "w-[var(--ds-icon-xl)] h-[var(--ds-icon-xl)]",
};

/**
 * 선(line) 아이콘. 색은 `currentColor`라 부모의 글자색을 따릅니다.
 * 모양은 Lucide(ISC)를 따릅니다.
 */
export function Icon({ name, size = "md", label, className, ...rest }: IconProps) {
  return (
    <svg
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth={1.8}
      strokeLinecap="round"
      strokeLinejoin="round"
      role={label ? "img" : undefined}
      aria-label={label}
      aria-hidden={label ? undefined : true}
      className={["ds-icon shrink-0", size === "inherit" ? "" : sizeClassName[size], className]
        .filter(Boolean)
        .join(" ")}
      {...rest}
    >
      <path d={ICON_PATHS[name]} />
    </svg>
  );
}
