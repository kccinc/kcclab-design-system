// 하위 메뉴 패널 — 레일에서 고른 묶음의 화면 목록. 제목·개수 · 고정/닫기 · 묶음 안 검색 · 그룹 · 항목(분류·상태·담당·설정).
import { useState } from "react";
import { Icon } from "../../components/Icon";
import { IconButton } from "../../components/IconButton";
import { Nav } from "../../components/Nav";
import { SearchInput } from "../../components/SearchInput";
import { Tooltip } from "../../components/Tooltip";
import type { LinkComponent } from "../../utils/link";
import { countItems, hrefOf } from "./menu";
import type { MenuItem, MenuSection } from "./menu";
import { PANEL_WIDTH, textCaption, textLabel } from "./styles";

function ItemMeta({ item }: { item: MenuItem }) {
  if (!item.status && !item.owner) return null;
  return (
    <>
      {item.status === "live" && (
        <span className={`inline-flex shrink-0 items-center gap-[var(--ds-space-1)] font-bold text-[var(--ds-color-success)] ${textLabel}`}>
          <span className="h-[var(--ds-space-2)] w-[var(--ds-space-2)] rounded-[var(--ds-radius-full)] bg-[var(--ds-color-success)]" />
          LIVE
        </span>
      )}
      {item.status === "draft" && <span className={`shrink-0 font-bold text-[var(--ds-color-warning)] ${textLabel}`}>준비 중</span>}
      {item.owner && <span className="truncate">{item.owner}</span>}
    </>
  );
}

export function MenuPanel({
  section,
  activeId,
  pinned,
  linkComponent,
  onPinnedChange,
  onClose,
  onGo,
}: {
  section: MenuSection;
  activeId: string;
  pinned: boolean;
  linkComponent: LinkComponent;
  onPinnedChange: (next: boolean) => void;
  onClose: () => void;
  onGo: (id: string) => void;
}) {
  const [query, setQuery] = useState("");
  const q = query.trim().toLowerCase();
  const groups = (section.groups ?? [])
    .map((g) => ({
      ...g,
      items: g.items.filter((x) => !q || `${x.label} ${x.category ?? ""} ${x.owner ?? ""}`.toLowerCase().includes(q)),
    }))
    .filter((g) => g.items.length > 0);
  const pinLabel = pinned ? "메뉴 고정 풀기" : "메뉴 고정";

  return (
    <aside aria-label={`${section.label} 메뉴`} className={`flex h-full ${PANEL_WIDTH} flex-col border-r border-[var(--ds-color-border)] bg-[var(--ds-color-background)]`}>
      <div className="flex items-center gap-[var(--ds-space-1)] border-b border-[var(--ds-color-border)] py-[var(--ds-space-2)] pl-[var(--ds-space-4)] pr-[var(--ds-space-2)]">
        <h2 className="text-[length:var(--ds-font-size-heading4)] leading-[var(--ds-line-height-heading4)] font-extrabold">{section.label}</h2>
        <span className={`flex-1 text-[var(--ds-color-text-tertiary)] tabular-nums ${textCaption}`}>{countItems(section)}개</span>
        <Tooltip content={pinLabel} side="bottom">
          <IconButton
            variant="ghost"
            size="sm"
            aria-label={pinLabel}
            aria-pressed={pinned}
            icon={<Icon name={pinned ? "chevronsLeft" : "chevronsRight"} size="inherit" />}
            onClick={() => onPinnedChange(!pinned)}
          />
        </Tooltip>
        <IconButton variant="ghost" size="sm" aria-label="메뉴 닫기" icon={<Icon name="x" size="inherit" />} onClick={onClose} />
      </div>
      <div className="px-[var(--ds-space-3)] py-[var(--ds-space-2)]">
        <SearchInput size="sm" placeholder={`${section.label} 내 검색`} value={query} onChange={(e) => setQuery(e.target.value)} onClear={() => setQuery("")} />
      </div>
      <div className="min-h-0 flex-1 overflow-y-auto px-[var(--ds-space-2)] pb-[var(--ds-space-3)]">
        <Nav aria-label={`${section.label} 하위 메뉴`} linkComponent={linkComponent}>
          {groups.map((g) => (
            <Nav.Group key={g.label} label={g.label} trailing={g.items.length}>
              {g.items.map((x) => (
                <Nav.Item
                  key={x.id}
                  href={hrefOf(x.id)}
                  icon={<Icon name={x.icon} />}
                  overline={x.category}
                  description={<ItemMeta item={x} />}
                  active={activeId === x.id}
                  onClick={() => onGo(x.id)}
                  trailing={
                    x.status && (
                      <Tooltip content="설정" side="bottom">
                        <IconButton variant="ghost" size="sm" aria-label={`${x.label} 설정`} icon={<Icon name="settings" size="inherit" />} />
                      </Tooltip>
                    )
                  }
                >
                  {x.label}
                </Nav.Item>
              ))}
            </Nav.Group>
          ))}
        </Nav>
        {groups.length === 0 && (
          <p className={`px-[var(--ds-space-3)] py-[var(--ds-space-6)] text-[var(--ds-color-text-tertiary)] ${textCaption}`}>‘{query.trim()}’에 맞는 메뉴가 없습니다.</p>
        )}
      </div>
    </aside>
  );
}
