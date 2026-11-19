import type { Meta, StoryObj } from "@storybook/react-vite";
import { StoryLink } from "../../storybook/StoryLink";
import { templateSource } from "../../storybook/templateSource";
import { AdminLayout } from "./AdminLayout";
import raw from "./AdminLayout.tsx?raw";

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
          "패키지에서 export 하지 않는 조합 예시라, **Show code**의 코드를 복사해 앱에 맞게 고쳐 쓰세요 (`linkComponent`에 라우터 Link 를 넘깁니다).",
      },
      story: { inline: false, iframeHeight: 720 },
      source: { code: templateSource(raw), language: "tsx" },
      canvas: { sourceState: "shown" },
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
