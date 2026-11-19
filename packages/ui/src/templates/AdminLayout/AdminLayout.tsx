// 업무용 관리 화면 골격 Template — compact 밀도(<html data-density="compact">)에서 쓰는 것을 전제로 합니다.
// AppShell 자리에: 어두운 상단 바(TopBar) / Nav 로 만든 아이콘 레일 + 하위 메뉴 패널(MenuPanel, 고정·떠 있음) / 모바일 하단 탭.
// 그 밖에 CommandPalette(Ctrl·⌘ K), 모바일 Drawer 메뉴. 본문은 Templates/Dashboard · Templates/ListPage 를 넣었습니다.
import { Fragment, useEffect, useMemo, useState } from "react";
import { AppShell } from "../../components/AppShell";
import { CommandPalette } from "../../components/CommandPalette";
import { Drawer } from "../../components/Drawer";
import { EmptyState } from "../../components/EmptyState";
import { Icon } from "../../components/Icon";
import { Nav } from "../../components/Nav";
import { PageHeader } from "../../components/PageHeader";
import type { LinkComponent } from "../../utils/link";
import { Dashboard } from "../Dashboard/Dashboard";
import { ListPage } from "../ListPage/ListPage";
import { MenuPanel } from "./MenuPanel";
import { SECTIONS, hrefOf, locate } from "./menu";
import type { MenuSection } from "./menu";
import { RAIL_LEFT, RAIL_WIDTH } from "./styles";
import { TopBar } from "./TopBar";

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
