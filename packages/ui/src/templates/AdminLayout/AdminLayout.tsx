// 업무용 관리 화면 골격 Template — compact 밀도(<html data-density="compact">)에서 쓰는 것을 전제로 합니다.
// AppShell 자리에: 어두운 상단 바 / Nav 로 만든 아이콘 레일 + 하위 메뉴 패널(고정·떠 있음) / 모바일 하단 탭.
// 그 밖에 CommandPalette(Ctrl·⌘ K), 모바일 Drawer 메뉴. 본문은 Templates/Dashboard · Templates/ListPage 를 넣었습니다.
import { Fragment, useEffect, useMemo, useState } from "react";
import { AppShell } from "../../components/AppShell";
import { Avatar } from "../../components/Avatar";
import { CommandPalette } from "../../components/CommandPalette";
import { Drawer } from "../../components/Drawer";
import { DropdownMenu } from "../../components/DropdownMenu";
import { EmptyState } from "../../components/EmptyState";
import { Icon } from "../../components/Icon";
import type { IconName } from "../../components/Icon";
import { IconButton } from "../../components/IconButton";
import { Nav } from "../../components/Nav";
import { PageHeader } from "../../components/PageHeader";
import { SearchInput } from "../../components/SearchInput";
import { Tooltip } from "../../components/Tooltip";
import type { LinkComponent } from "../../utils/link";
import { Dashboard } from "../Dashboard/Dashboard";
import { ListPage } from "../ListPage/ListPage";

// ─── 메뉴 데이터 (보통 서버·설정에서 받아 온다) ──────────────────────
interface MenuItem {
  id: string;
  label: string;
  icon: IconName;
  /** 이름 위 분류 (예: DAILY) */
  category?: string;
  status?: "live" | "draft";
  owner?: string;
}
interface MenuSection {
  id: string;
  label: string;
  icon: IconName;
  /** 하위 메뉴 없이 바로 이동 */
  direct?: boolean;
  divider?: boolean;
  groups?: { label: string; items: MenuItem[] }[];
}

const SECTIONS: MenuSection[] = [
  { id: "home", label: "홈", icon: "home", direct: true },
  {
    id: "sales",
    label: "매출",
    icon: "chart",
    groups: [
      {
        label: "매출 현황",
        items: [
          { id: "sales-daily", label: "일일 매출 현황", icon: "calendarDays", category: "DAILY", status: "live", owner: "김지원 · 영업기획팀" },
          { id: "sales-weekly", label: "주간 매출 리포트", icon: "calendarRange", category: "WEEKLY", status: "live", owner: "김지원 · 영업기획팀" },
          { id: "sales-monthly", label: "월간 실적", icon: "calendarCheck", category: "MONTHLY", status: "draft", owner: "이도현 · 재무팀" },
        ],
      },
      {
        label: "분석",
        items: [
          { id: "sales-channel", label: "채널별 KPI", icon: "gauge", category: "KPI", status: "live", owner: "박서윤 · 마케팅팀" },
          { id: "sales-product", label: "상품별 매출", icon: "chartColumn", category: "KPI", status: "live", owner: "박서윤 · 마케팅팀" },
        ],
      },
    ],
  },
  {
    id: "orders",
    label: "주문",
    icon: "receipt",
    groups: [
      {
        label: "주문 관리",
        items: [
          { id: "order-list", label: "주문 목록", icon: "clipboardList" },
          { id: "returns", label: "반품 요청", icon: "refresh" },
          { id: "shipping", label: "배송 현황", icon: "mapPin" },
        ],
      },
    ],
  },
  {
    id: "products",
    label: "상품",
    icon: "package",
    groups: [
      {
        label: "상품 관리",
        items: [
          { id: "product-list", label: "상품 목록", icon: "package" },
          { id: "stock", label: "재고 현황", icon: "boxes" },
        ],
      },
    ],
  },
  {
    id: "settings",
    label: "설정",
    icon: "settings",
    divider: true,
    groups: [
      {
        label: "설정",
        items: [
          { id: "members", label: "멤버·권한", icon: "shield" },
          { id: "billing", label: "결제 수단", icon: "creditCard" },
        ],
      },
    ],
  },
];

const hrefOf = (id: string) => `#${id}`;

function locate(id: string) {
  for (const section of SECTIONS) {
    if (section.id === id) return { section, group: undefined, item: undefined };
    for (const group of section.groups ?? []) {
      const item = group.items.find((x) => x.id === id);
      if (item) return { section, group, item };
    }
  }
  return undefined;
}

const countItems = (s: MenuSection) => (s.groups ?? []).reduce((n, g) => n + g.items.length, 0);

const textCaption = "text-[length:var(--ds-font-size-caption1)] leading-[var(--ds-line-height-caption1)]";
const textLabel = "text-[length:var(--ds-font-size-label1)] leading-[var(--ds-line-height-label1)]";

// 크기는 토큰 조합으로 — compact 에서 상단 바 45 · 레일 60 · 패널 272px
const RAIL_WIDTH = "w-[calc(var(--ds-control-height-lg)+var(--ds-space-6))]";
const RAIL_LEFT = "left-[calc(var(--ds-control-height-lg)+var(--ds-space-6))]";
const PANEL_WIDTH = "w-[calc(var(--ds-space-20)*4+var(--ds-space-4))]";

// ─── 상단 바 ─────────────────────────────────────────────────────────
function TopBar({ crumbs, onSearch, onMenu }: { crumbs: string[]; onSearch: () => void; onMenu: () => void }) {
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

// ─── 하위 메뉴 패널 ──────────────────────────────────────────────────
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

function MenuPanel({
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

// ─── 본문 ────────────────────────────────────────────────────────────
function Content({ activeId }: { activeId: string }) {
  const found = locate(activeId);
  if (found?.section.id === "sales" && found.item) return <Dashboard title={found.item.label} />;
  if (activeId === "order-list") return <ListPage />;
  return (
    <>
      <PageHeader title={found?.item?.label ?? found?.section.label ?? "홈"} />
      <div className="p-[var(--ds-space-6)]">
        <EmptyState icon={<Icon name="layoutDashboard" />} title="화면을 준비하고 있습니다" description="‘매출’의 대시보드나 ‘주문 > 주문 목록’을 열어 보세요." />
      </div>
    </>
  );
}

// ─── 조합 ────────────────────────────────────────────────────────────
export interface AdminLayoutProps {
  /** 라우터 Link (예: Next.js `Link`). 기본은 `<a>` */
  linkComponent?: LinkComponent;
  /** 처음 열 화면 id */
  defaultActiveId?: string;
  /** 메뉴 패널 고정(펼침) 초기값 — 실제 앱에서는 쿠키 등에 저장해 다음 방문에도 유지한다 */
  defaultPinned?: boolean;
}

export function AdminLayout({ linkComponent = "a", defaultActiveId = "sales-daily", defaultPinned = true }: AdminLayoutProps) {
  const [activeId, setActiveId] = useState(defaultActiveId);
  const [pinned, setPinned] = useState(defaultPinned);
  const [panelId, setPanelId] = useState<string | null>(defaultPinned ? (locate(defaultActiveId)?.section.id ?? null) : null);
  const [searchOpen, setSearchOpen] = useState(false);
  const [drawerOpen, setDrawerOpen] = useState(false);

  const active = locate(activeId);
  const panelSection = SECTIONS.find((s) => s.id === panelId && s.groups);
  const floating = Boolean(panelSection) && !pinned;

  // 실제 앱에서는 라우터의 현재 경로로 activeId 를 정하고, 이동은 Link 가 맡는다.
  // 이동하면 패널은 이동한 곳을 따라간다:
  //  - 고정 안 함 → 닫는다
  //  - 고정 + 하위 메뉴가 있는 곳(예: 검색으로 다른 묶음의 화면) → 그 묶음의 패널로 바꾼다
  //  - 고정 + 하위 메뉴가 없는 곳(예: 홈) → 닫는다(고정 설정은 유지돼, 다음에 묶음을 누르면 다시 고정으로 열린다)
  const go = (id: string) => {
    setActiveId(id);
    setDrawerOpen(false);
    const section = locate(id)?.section;
    setPanelId(pinned && section?.groups ? section.id : null);
  };

  // 떠 있는 패널은 Esc 로 닫는다(패널 위에 연 Dialog 안의 Esc 는 Dialog 몫).
  useEffect(() => {
    if (!floating) return;
    const onKey = (e: KeyboardEvent) => {
      const target = e.target instanceof Element ? e.target : null;
      if (e.key === "Escape" && !target?.closest('[role="dialog"]')) setPanelId(null);
    };
    window.addEventListener("keydown", onKey);
    return () => window.removeEventListener("keydown", onKey);
  }, [floating]);

  const paletteItems = useMemo(
    () =>
      SECTIONS.flatMap((s) =>
        (s.groups ?? []).flatMap((g) =>
          g.items.map((x) => ({
            id: x.id,
            label: x.label,
            description: g.label === s.label ? s.label : `${s.label} · ${g.label}`,
            icon: <Icon name={s.icon} />,
            keywords: `${x.category ?? ""} ${x.owner ?? ""}`,
          })),
        ),
      ),
    [],
  );

  const crumbs = active ? [active.section.label, ...(active.group && active.group.label !== active.section.label ? [active.group.label] : []), ...(active.item ? [active.item.label] : [])] : [];
  const railSelected = (s: MenuSection) => (panelId ? panelId === s.id : active?.section.id === s.id);

  const panel = panelSection && (
    <MenuPanel
      key={panelSection.id}
      section={panelSection}
      activeId={activeId}
      pinned={pinned}
      linkComponent={linkComponent}
      onPinnedChange={(next) => {
        setPinned(next);
        if (!next) setPanelId(null); // 고정을 풀면 닫는다
      }}
      onClose={() => {
        setPanelId(null);
        setPinned(false);
      }}
      onGo={go}
    />
  );

  return (
    <>
      <AppShell
        header={<TopBar crumbs={crumbs} onSearch={() => setSearchOpen(true)} onMenu={() => setDrawerOpen(true)} />}
        sidebar={
          <div className="hidden h-full md:flex">
            <div className={`h-full ${RAIL_WIDTH} overflow-y-auto border-r border-[var(--ds-color-border)] p-[var(--ds-space-1)]`}>
              <Nav aria-label="주 메뉴" linkComponent={linkComponent}>
                {SECTIONS.map((s) => (
                  <Fragment key={s.id}>
                    {s.divider && <li aria-hidden="true" className="mx-[var(--ds-space-2)] my-[var(--ds-space-1)] h-[var(--ds-border-width)] bg-[var(--ds-color-border)]" />}
                    {s.direct ? (
                      <Nav.Item layout="stacked" href={hrefOf(s.id)} icon={<Icon name={s.icon} />} active={railSelected(s)} onClick={() => go(s.id)}>
                        {s.label}
                      </Nav.Item>
                    ) : (
                      <Nav.Item
                        layout="stacked"
                        icon={<Icon name={s.icon} />}
                        active={railSelected(s)}
                        expanded={panelId === s.id}
                        onClick={() => setPanelId((cur) => (cur === s.id && !pinned ? null : s.id))}
                      >
                        {s.label}
                      </Nav.Item>
                    )}
                  </Fragment>
                ))}
              </Nav>
            </div>
            {/* 고정된 패널은 본문을 민다 */}
            {pinned && panel}
            {/* 고정하지 않은 패널은 본문 위에 겹쳐 뜬다 — AppShell 본문 영역이 relative 라 absolute 로 올린다 */}
            {floating && (
              <div className={`absolute inset-y-0 ${RAIL_LEFT} right-0 z-[var(--ds-z-overlay)]`}>
                <div className="absolute inset-0 bg-[var(--ds-color-grey-opacity-200)]" aria-hidden="true" onClick={() => setPanelId(null)} />
                <div className="relative h-full w-fit shadow-[var(--ds-shadow-elevation-4)]">{panel}</div>
              </div>
            )}
          </div>
        }
        footer={
          <div className="border-t border-[var(--ds-color-border)] md:hidden">
            <Nav orientation="horizontal" aria-label="하단 메뉴" linkComponent={linkComponent}>
              {SECTIONS.slice(0, 4).map((s) => (
                <Nav.Item key={s.id} layout="stacked" icon={<Icon name={s.icon} />} active={active?.section.id === s.id} onClick={() => setDrawerOpen(true)}>
                  {s.label}
                </Nav.Item>
              ))}
              <Nav.Item layout="stacked" icon={<Icon name="menu" />} onClick={() => setDrawerOpen(true)}>
                전체
              </Nav.Item>
            </Nav>
          </div>
        }
      >
        <Content activeId={activeId} />
      </AppShell>

      <CommandPalette open={searchOpen} onOpenChange={setSearchOpen} items={paletteItems} placeholder="메뉴 이름으로 이동" onSelect={(item) => go(item.id)} />

      <Drawer open={drawerOpen} onOpenChange={setDrawerOpen} side="left">
        <Drawer.Header>
          <Drawer.Title>메뉴</Drawer.Title>
        </Drawer.Header>
        <div className="h-[calc(100%-var(--ds-space-16))] overflow-y-auto px-[var(--ds-space-3)] pb-[var(--ds-space-3)]">
          <Nav aria-label="전체 메뉴" linkComponent={linkComponent}>
            {SECTIONS.filter((s) => s.groups).map((s) => (
              <Nav.Group key={s.id} label={s.label}>
                {s.groups!.flatMap((g) =>
                  g.items.map((x) => (
                    <Nav.Item key={x.id} href={hrefOf(x.id)} icon={<Icon name={x.icon} />} active={activeId === x.id} onClick={() => go(x.id)}>
                      {x.label}
                    </Nav.Item>
                  )),
                )}
              </Nav.Group>
            ))}
          </Nav>
        </div>
      </Drawer>
    </>
  );
}
