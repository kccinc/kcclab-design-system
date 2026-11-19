import * as DialogPrimitive from "@radix-ui/react-dialog";
import { useEffect, useId, useMemo, useRef, useState } from "react";
import type { KeyboardEvent, ReactNode } from "react";

export interface CommandPaletteItem {
  /** 항목을 식별하는 고유 값. */
  id: string;
  /** 결과 목록에 굵게 표시되는 이름. 검색 대상입니다. */
  label: string;
  /** 이름 아래 회색 보조 문구 (예: "데이터 · 적재"). 검색 대상입니다. */
  description?: string;
  /** 왼쪽 네모 칸 안에 표시되는 아이콘. */
  icon?: ReactNode;
  /** 화면에는 보이지 않지만 검색에 함께 쓰는 단어 (예: 담당자·부서·영문 이름). */
  keywords?: string;
}

export interface CommandPaletteProps {
  /** 열림 상태 (controlled). */
  open: boolean;
  /** 열림 상태가 바뀔 때 호출됩니다 — 닫기(Esc·바깥 클릭·항목 선택)와 단축키 열기 모두. */
  onOpenChange: (open: boolean) => void;
  /** 검색 대상 항목 전체. 검색어가 비어 있으면 앞에서부터 `maxResults`개를 보여 줍니다. */
  items: CommandPaletteItem[];
  /** 항목을 골랐을 때(클릭·Enter) 호출됩니다. 호출 뒤 팔레트는 자동으로 닫힙니다. */
  onSelect: (item: CommandPaletteItem) => void;
  /** 검색창 placeholder. @default "검색어를 입력하세요" */
  placeholder?: string;
  /** 스크린 리더용 팔레트 이름. @default "빠른 이동" */
  label?: string;
  /** 결과 목록에 보여 줄 최대 개수. @default 8 */
  maxResults?: number;
  /** Ctrl+K / ⌘K로 팔레트를 여는 전역 단축키를 등록할지 여부. @default true */
  shortcut?: boolean;
}

function SearchIcon() {
  return (
    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" aria-hidden="true">
      <circle cx="11" cy="11" r="7" />
      <path d="M21 21l-4.3-4.3" strokeLinecap="round" />
    </svg>
  );
}

function matches(item: CommandPaletteItem, q: string) {
  return `${item.label} ${item.description ?? ""} ${item.keywords ?? ""}`.toLowerCase().includes(q);
}

/**
 * 빠른 이동(커맨드 팔레트) — Ctrl+K / ⌘K로 열고, 이름·설명·키워드로 찾아 Enter로 고릅니다.
 * 이동 자체는 하지 않습니다 — `onSelect`에서 라우터로 이동하세요.
 */
export function CommandPalette({
  open,
  onOpenChange,
  items,
  onSelect,
  placeholder = "검색어를 입력하세요",
  label = "빠른 이동",
  maxResults = 8,
  shortcut = true,
}: CommandPaletteProps) {
  const [query, setQuery] = useState("");
  const [activeIndex, setActiveIndex] = useState(0);
  const listId = useId();
  const optionId = (i: number) => `${listId}-option-${i}`;
  const listRef = useRef<HTMLUListElement>(null);

  const results = useMemo(() => {
    const q = query.trim().toLowerCase();
    return (q ? items.filter((item) => matches(item, q)) : items).slice(0, maxResults);
  }, [items, query, maxResults]);

  // 단축키: 열려 있지 않을 때만 연다(열린 상태에서 다시 누르면 브라우저 기본 동작만 막는다).
  useEffect(() => {
    if (!shortcut) return;
    function onKeyDown(e: globalThis.KeyboardEvent) {
      if ((e.ctrlKey || e.metaKey) && e.key.toLowerCase() === "k") {
        e.preventDefault();
        onOpenChange(true);
      }
    }
    window.addEventListener("keydown", onKeyDown);
    return () => window.removeEventListener("keydown", onKeyDown);
  }, [shortcut, onOpenChange]);

  // 닫힐 때 검색어를 비워, 다음에 열면 처음 상태로 시작한다.
  useEffect(() => {
    if (!open) {
      setQuery("");
      setActiveIndex(0);
    }
  }, [open]);

  // 키보드로 고른 항목이 목록 밖으로 나가지 않게 스크롤한다.
  useEffect(() => {
    listRef.current?.querySelector(`[data-index="${activeIndex}"]`)?.scrollIntoView({ block: "nearest" });
  }, [activeIndex]);

  function choose(item: CommandPaletteItem) {
    onSelect(item);
    onOpenChange(false);
  }

  function handleKeyDown(e: KeyboardEvent<HTMLInputElement>) {
    if (e.key === "ArrowDown") {
      e.preventDefault();
      setActiveIndex((i) => (results.length === 0 ? 0 : (i + 1) % results.length));
    } else if (e.key === "ArrowUp") {
      e.preventDefault();
      setActiveIndex((i) => (results.length === 0 ? 0 : (i - 1 + results.length) % results.length));
    } else if (e.key === "Enter" && !e.nativeEvent.isComposing) {
      const item = results[activeIndex];
      if (item) {
        e.preventDefault();
        choose(item);
      }
    }
  }

  const textClass = "text-[length:var(--ds-font-size-label1)] leading-[var(--ds-line-height-label1)]";

  return (
    <DialogPrimitive.Root open={open} onOpenChange={onOpenChange}>
      <DialogPrimitive.Portal>
        <DialogPrimitive.Overlay className="ds-command-palette-overlay fixed inset-0 z-[var(--ds-z-overlay)] bg-[var(--ds-color-grey-opacity-600)]" />
        <DialogPrimitive.Content
          aria-describedby={undefined}
          className={[
            "ds-command-palette fixed left-1/2 top-[12vh] z-[var(--ds-z-modal)] w-[calc(100%-var(--ds-space-8))] max-w-lg -translate-x-1/2",
            "rounded-[var(--ds-radius-lg)] bg-[var(--ds-color-floated-background)] p-[var(--ds-space-3)] shadow-[var(--ds-shadow-elevation-4)] outline-none",
          ].join(" ")}
        >
          <DialogPrimitive.Title className="sr-only">{label}</DialogPrimitive.Title>
          <div className="flex h-[var(--ds-control-height-md)] items-center gap-[var(--ds-space-2)] rounded-[var(--ds-radius-sm)] border border-[var(--ds-color-border-primary)] px-[var(--ds-space-3)]">
            <span className="h-[var(--ds-icon-sm)] w-[var(--ds-icon-sm)] shrink-0 text-[var(--ds-color-text-tertiary)]">
              <SearchIcon />
            </span>
            <input
              autoFocus
              role="combobox"
              aria-expanded="true"
              aria-controls={listId}
              aria-autocomplete="list"
              aria-activedescendant={results[activeIndex] ? optionId(activeIndex) : undefined}
              aria-label={label}
              placeholder={placeholder}
              value={query}
              onChange={(e) => {
                setQuery(e.target.value);
                setActiveIndex(0);
              }}
              onKeyDown={handleKeyDown}
              className="min-w-0 flex-1 bg-transparent text-[length:var(--ds-font-size-body2)] leading-[var(--ds-line-height-body2)] text-[var(--ds-color-text-primary)] outline-none placeholder:text-[var(--ds-color-text-placeholder)]"
            />
          </div>

          <ul ref={listRef} id={listId} role="listbox" aria-label="검색 결과" className="mt-[var(--ds-space-2)] max-h-80 overflow-auto">
            {results.map((item, i) => (
              <li
                key={item.id}
                id={optionId(i)}
                data-index={i}
                role="option"
                aria-selected={i === activeIndex}
                onMouseMove={() => setActiveIndex(i)}
                onClick={() => choose(item)}
                className={[
                  "flex cursor-pointer items-center gap-[var(--ds-space-3)] rounded-[var(--ds-radius-sm)] px-[var(--ds-space-3)] py-[var(--ds-space-2)]",
                  i === activeIndex ? "bg-[var(--ds-color-grey-opacity-100)]" : "",
                ].join(" ")}
              >
                {item.icon && (
                  <span className="inline-flex h-[var(--ds-control-height-sm)] w-[var(--ds-control-height-sm)] shrink-0 items-center justify-center rounded-[var(--ds-radius-sm)] bg-[var(--ds-color-grey-background)] text-[var(--ds-color-text-secondary)] [&_svg]:h-[var(--ds-icon-sm)] [&_svg]:w-[var(--ds-icon-sm)]">
                    {item.icon}
                  </span>
                )}
                <span className="min-w-0 flex-1">
                  <span className="block truncate text-[length:var(--ds-font-size-body2)] leading-[var(--ds-line-height-body2)] font-semibold text-[var(--ds-color-text-primary)]">
                    {item.label}
                  </span>
                  {item.description && (
                    <span className="block truncate text-[length:var(--ds-font-size-caption1)] leading-[var(--ds-line-height-caption1)] text-[var(--ds-color-text-tertiary)]">
                      {item.description}
                    </span>
                  )}
                </span>
              </li>
            ))}
            {results.length === 0 && (
              <li className="px-[var(--ds-space-3)] py-[var(--ds-space-6)] text-center text-[length:var(--ds-font-size-caption1)] leading-[var(--ds-line-height-caption1)] text-[var(--ds-color-text-tertiary)]">
                ‘{query.trim()}’에 맞는 결과가 없습니다.
              </li>
            )}
          </ul>

          <div className={`mt-[var(--ds-space-2)] flex gap-[var(--ds-space-3)] border-t border-[var(--ds-color-border)] px-[var(--ds-space-2)] pt-[var(--ds-space-2)] ${textClass} text-[var(--ds-color-text-tertiary)]`}>
            <span>↑↓ 이동</span>
            <span>Enter 열기</span>
            <span>Esc 닫기</span>
          </div>
        </DialogPrimitive.Content>
      </DialogPrimitive.Portal>
    </DialogPrimitive.Root>
  );
}
