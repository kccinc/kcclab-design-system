import type { Meta, StoryObj } from "@storybook/react-vite";
import { templateSource } from "../../storybook/templateSource";
import { Dashboard } from "./Dashboard";
import raw from "./Dashboard.tsx?raw";

const meta = {
  title: "Templates/Dashboard",
  component: Dashboard,
  tags: ["autodocs"],
  // 업무 화면이라 compact 밀도로 엽니다 — 툴바의 Density 로 바꿔 볼 수 있습니다.
  globals: { density: "compact" },
  parameters: {
    layout: "fullscreen",
    docs: {
      description: {
        component:
          "대시보드 화면 예시 — `PageHeader`(상태 배지·조회 조건) + KPI `Card` + 일별 막대 차트 + 채널 비중 + 상위 상품 `Table`. " +
          "차트는 라이브러리 없이 토큰만으로 그렸습니다. 패키지에서 export 하지 않는 조합 예시라, **Show code**의 코드를 복사해 쓰세요.",
      },
      source: { code: templateSource(raw), language: "tsx" },
      canvas: { sourceState: "shown" },
    },
  },
} satisfies Meta<typeof Dashboard>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Default: Story = {};
