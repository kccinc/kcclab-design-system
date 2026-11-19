import type { Meta, StoryObj } from "@storybook/react-vite";
import { StoryLink } from "../../storybook/StoryLink";
import { TemplateDocs } from "../../storybook/TemplateDocs";
import { AdminLayout } from "./AdminLayout";
import adminLayoutRaw from "./AdminLayout.tsx?raw";
import menuPanelRaw from "./MenuPanel.tsx?raw";
import menuRaw from "./menu.ts?raw";
import stylesRaw from "./styles.ts?raw";
import topBarRaw from "./TopBar.tsx?raw";

const skeleton = `// 앱 루트(layout.tsx 등)에서 한 번 — 업무 화면 밀도
<html lang="ko" data-density="compact">

// 화면 골격 — AppShell 의 네 자리에 무엇을 넣는지
<AppShell
  header={<TopBar crumbs={crumbs} onSearch={openSearch} onMenu={openDrawer} />}  // TopBar.tsx
  sidebar={
    <div className="hidden h-full md:flex">                        {/* 768px 이상에서만 */}
      <Nav aria-label="주 메뉴" linkComponent={Link}>                {/* 아이콘 레일 */}
        {SECTIONS.map((s) => (
          <Nav.Item layout="stacked" icon={<Icon name={s.icon} />} onClick={() => openPanel(s.id)}>
            {s.label}
          </Nav.Item>
        ))}
      </Nav>
      {pinned && <MenuPanel section={section} />}                    {/* 고정: 본문을 민다 (MenuPanel.tsx) */}
      {floating && <div className="absolute ...">{panel}</div>}      {/* 고정 안 함: 본문 위에 뜬다 */}
    </div>
  }
  footer={<Nav orientation="horizontal">{/* 모바일 하단 탭 */}</Nav>}
>
  {children}                                                         {/* 본문 — Dashboard, ListPage … */}
</AppShell>

<CommandPalette open={searchOpen} items={paletteItems} onSelect={go} />  // Ctrl·⌘ K
<Drawer side="left"><Nav>{/* 모바일 전체 메뉴 */}</Nav></Drawer>
`;

const meta = {
  title: "Templates/AdminLayout",
  component: AdminLayout,
  tags: ["autodocs"],
  // 업무 화면 골격이라 compact 밀도로 엽니다 — 툴바의 Density 로 바꿔 볼 수 있습니다.
  globals: { density: "compact" },
  parameters: {
    layout: "fullscreen",
    docs: {
      description: {
        component:
          "업무용 관리 화면 골격 — `AppShell` 자리에 어두운 상단 바, `Nav`로 만든 아이콘 레일·하위 메뉴 패널(고정/떠 있음)·모바일 하단 탭, " +
          "`CommandPalette`(Ctrl K), 모바일 `Drawer`를 조합했습니다. 본문은 `Templates/Dashboard`·`Templates/ListPage`입니다. " +
          "패키지에서 export 하지 않는 조합 예시라, 아래 코드를 복사해 앱에 맞게 고쳐 씁니다.",
      },
      story: { inline: false, iframeHeight: 720 },
      source: { code: skeleton, language: "tsx" },
      page: () => (
        <TemplateDocs
          skeleton={skeleton}
          changes={[
            { where: "menu.ts → SECTIONS", what: "앱 메뉴 데이터(서버·설정에서 받은 메뉴). 타입(MenuSection·MenuItem)만 맞추면 나머지 코드는 그대로 씁니다." },
            { where: "linkComponent", what: "라우터 Link (예: Next.js Link). 기본 <a>는 이동할 때마다 페이지 전체를 새로 불러옵니다." },
            { where: "activeId / go()", what: "useState 대신 현재 경로(예: usePathname())로 activeId 를 계산합니다. 이동은 Link 가 하므로 go()에는 패널·Drawer 닫기만 남깁니다." },
            { where: "pinned", what: "쿠키에 저장해 다음 방문에도 유지합니다. 서버 렌더링이면 쿠키로 읽어야 첫 화면이 깜빡이지 않습니다." },
            { where: "Content", what: "실제 페이지(children)로 바꿉니다. 지금은 예시로 Dashboard·ListPage 를 넣었습니다." },
            { where: "TopBar.tsx", what: "로고, 프로필 메뉴 항목(내 정보·로그아웃 등)." },
            { where: "MenuPanel.tsx → 설정 버튼", what: "항목 설정 창을 여는 동작을 연결하거나, 필요 없으면 trailing 을 지웁니다." },
          ]}
          files={[
            { name: "menu.ts", role: "메뉴 데이터와 찾기 함수 — 가장 먼저 바꿀 곳", raw: menuRaw },
            { name: "AdminLayout.tsx", role: "조합 — AppShell 에 상단 바·레일·패널·하단 탭을 넣고 상태(현재 화면·패널·고정)를 관리", raw: adminLayoutRaw },
            { name: "MenuPanel.tsx", role: "하위 메뉴 패널 — 제목·개수, 고정/닫기, 검색, 그룹·항목", raw: menuPanelRaw },
            { name: "TopBar.tsx", role: "어두운 상단 바 — 로고, 현재 위치, 검색, 전체 화면, 프로필", raw: topBarRaw },
            { name: "styles.ts", role: "여러 파일이 같이 쓰는 클래스 (레일·패널 폭, 글자 크기)", raw: stylesRaw },
          ]}
        />
      ),
    },
  },
  args: { linkComponent: StoryLink },
} satisfies Meta<typeof AdminLayout>;

export default meta;
type Story = StoryObj<typeof meta>;

/** 메뉴 패널을 고정(펼침)한 상태 — 본문을 옆으로 밉니다. 패널의 « 버튼으로 고정을 풀면 닫힙니다. */
export const Default: Story = {};

/** 고정하지 않은 상태 — 레일의 메뉴를 누르면 패널이 본문 위에 떴다가, 이동·바깥 클릭·Esc 로 닫힙니다. */
export const Unpinned: Story = { args: { defaultPinned: false } };
