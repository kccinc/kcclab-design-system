// 어두운 상단 바 — 로고 · 현재 위치 · 메뉴 검색(Ctrl K) · 전체 화면 · 프로필 메뉴.
import { Avatar } from "../../components/Avatar";
import { DropdownMenu } from "../../components/DropdownMenu";
import { Icon } from "../../components/Icon";
import { textCaption, textLabel } from "./styles";

export function TopBar({ crumbs, onSearch, onMenu }: { crumbs: string[]; onSearch: () => void; onMenu: () => void }) {
  const darkButton =
    "inline-flex h-[var(--ds-control-height-sm)] cursor-pointer items-center justify-center gap-[var(--ds-space-2)] rounded-[var(--ds-radius-sm)] border border-[var(--ds-color-border-inverse)] text-[var(--ds-color-text-inverse-secondary)] hover:text-[var(--ds-color-text-inverse)]";
  return (
    <header className="flex h-[calc(var(--ds-control-height-md)+var(--ds-space-4))] items-center gap-[var(--ds-space-3)] bg-[var(--ds-color-inverse-background)] pr-[var(--ds-space-3)] text-[var(--ds-color-text-inverse)]">
      <span className="md:hidden">
        <button type="button" aria-label="메뉴 열기" onClick={onMenu} className="flex cursor-pointer pl-[var(--ds-space-3)] text-[var(--ds-color-text-inverse-secondary)] hover:text-[var(--ds-color-text-inverse)]">
          <Icon name="menu" />
        </button>
      </span>
      <span className={`shrink-0 pl-[var(--ds-space-4)] md:w-[calc(var(--ds-control-height-lg)+var(--ds-space-6))] text-[length:var(--ds-font-size-body1)] leading-[var(--ds-line-height-body1)] font-bold tracking-tight`}>
        Acme <span className="text-[var(--ds-color-primary)]">BI</span>
      </span>
      <nav aria-label="현재 위치" className="hidden min-w-0 border-l border-[var(--ds-color-inverse-background-hover)] pl-[var(--ds-space-3)] md:block">
        <ol className="flex items-center gap-[var(--ds-space-2)]">
          {crumbs.map((c, i) => (
            <li key={i} className="flex min-w-0 items-center gap-[var(--ds-space-2)]">
              {i > 0 && <Icon name="chevronRight" size="xs" className="text-[var(--ds-color-text-tertiary)]" />}
              <span
                aria-current={i === crumbs.length - 1 ? "page" : undefined}
                className={`truncate text-[length:var(--ds-font-size-body1)] leading-[var(--ds-line-height-body1)] ${
                  i === crumbs.length - 1 ? "font-semibold" : "text-[var(--ds-color-text-inverse-secondary)]"
                }`}
              >
                {c}
              </span>
            </li>
          ))}
        </ol>
      </nav>
      <div className="flex-1" />
      <button type="button" onClick={onSearch} aria-label="메뉴 검색" className={`${darkButton} px-[var(--ds-space-3)]`}>
        <Icon name="search" size="sm" />
        <span className={`hidden sm:inline ${textCaption}`}>검색</span>
        <kbd className={`hidden rounded-[var(--ds-radius-xs)] bg-[var(--ds-color-inverse-background-hover)] px-[var(--ds-space-1)] font-sans font-semibold sm:inline ${textLabel}`}>Ctrl K</kbd>
      </button>
      <span className="hidden sm:inline-flex">
        <button
          type="button"
          aria-label="전체 화면"
          title="전체 화면"
          className={`${darkButton} w-[var(--ds-control-height-sm)]`}
          onClick={() => (document.fullscreenElement ? document.exitFullscreen() : document.documentElement.requestFullscreen?.())?.catch(() => {})}
        >
          <Icon name="maximize" size="sm" />
        </button>
      </span>
      <DropdownMenu
        align="end"
        trigger={
          <button type="button" aria-label="프로필 메뉴" className="flex cursor-pointer rounded-[var(--ds-radius-full)]">
            <Avatar name="홍길동" size="xs" />
          </button>
        }
      >
        <DropdownMenu.Item>내 정보</DropdownMenu.Item>
        <DropdownMenu.Item>로그아웃</DropdownMenu.Item>
      </DropdownMenu>
    </header>
  );
}
