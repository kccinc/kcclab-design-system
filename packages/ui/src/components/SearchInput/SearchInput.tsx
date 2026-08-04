import { useState } from "react";
import type { ChangeEvent } from "react";
import { Input } from "../Input";
import type { InputProps } from "../Input";

export interface SearchInputProps extends Omit<InputProps, "prefixIcon" | "type"> {
  /** 지우기(X) 버튼 클릭 시 호출됩니다. */
  onClear?: () => void;
}

function SearchIcon() {
  return (
    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" aria-hidden="true">
      <circle cx="11" cy="11" r="7" />
      <path d="M21 21l-4.3-4.3" strokeLinecap="round" />
    </svg>
  );
}

function ClearIcon() {
  return (
    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" aria-hidden="true">
      <path d="M6 6l12 12M18 6L6 18" strokeLinecap="round" />
    </svg>
  );
}

/**
 * 검색 전용 인풋 — prefix에 돋보기 아이콘, 값이 있을 때 지우기(X) 버튼을 표시합니다.
 * 디바운스나 자동완성 리스트 연동은 포함하지 않습니다 — 필요하면 `onChange`를
 * 직접 디바운스하거나, 자동완성 리스트는 별도로 조합해서 사용하세요.
 */
export function SearchInput({ value, defaultValue, onChange, onClear, className, ...rest }: SearchInputProps) {
  const isControlled = value !== undefined;
  const [uncontrolledValue, setUncontrolledValue] = useState(defaultValue ?? "");
  const currentValue = isControlled ? value : uncontrolledValue;

  function handleChange(e: ChangeEvent<HTMLInputElement>) {
    if (!isControlled) setUncontrolledValue(e.target.value);
    onChange?.(e);
  }

  function handleClear() {
    if (!isControlled) setUncontrolledValue("");
    onClear?.();
  }

  return (
    <Input
      type="search"
      prefixIcon={<SearchIcon />}
      suffixIcon={
        currentValue ? (
          <button
            type="button"
            onClick={handleClear}
            aria-label="지우기"
            className="ds-search-input-clear inline-flex h-full w-full cursor-pointer items-center justify-center text-[var(--ds-color-text-tertiary)] hover:text-[var(--ds-color-text-secondary)]"
          >
            <ClearIcon />
          </button>
        ) : undefined
      }
      value={currentValue}
      onChange={handleChange}
      className={[
        // 네이티브 search input의 브라우저 기본 취소(X) 버튼을 없애서, 오른쪽 여백이
        // 남아 우리 커스텀 지우기 버튼이 실제 우측 끝에 붙지 못하는 문제를 방지합니다.
        "[&::-webkit-search-cancel-button]:appearance-none [&::-webkit-search-decoration]:appearance-none",
        className,
      ]
        .filter(Boolean)
        .join(" ")}
      {...rest}
    />
  );
}
