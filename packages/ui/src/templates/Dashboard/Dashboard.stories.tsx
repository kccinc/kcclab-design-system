import type { Meta, StoryObj } from "@storybook/react-vite";
import { TemplateDocs } from "../../storybook/TemplateDocs";
import { Dashboard } from "./Dashboard";
import dashboardRaw from "./Dashboard.tsx?raw";
import dataRaw from "./data.ts?raw";
import partsRaw from "./parts.tsx?raw";

const skeleton = `<PageHeader
  title={<>{title} <Badge variant="success">LIVE</Badge></>}   // 제목 + 상태 배지
  description="매일 오전 7시 집계 · 담당 …"
  actions={<Button>내려받기</Button>}
>
  <Select … />  <DatePicker … />                                  {/* 조회 조건 */}
</PageHeader>

<section className="grid grid-cols-2 lg:grid-cols-4">           {/* 핵심 지표 */}
  {KPIS.map((k) => <KpiCard kpi={k} />)}                          {/* parts.tsx */}
</section>

<div className="grid lg:grid-cols-3">
  <Panel title="일별 매출" className="lg:col-span-2"><DailyBarChart /></Panel>
  <Panel title="채널별 매출 비중"><ChannelShare /></Panel>
</div>

<Panel title="상품별 매출 TOP 5">
  <Table columns={…} data={TOP_PRODUCTS} />
</Panel>
`;

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
          "패키지에서 export 하지 않는 조합 예시라, 아래 코드를 복사해 앱에 맞게 고쳐 씁니다.",
      },
      source: { code: skeleton, language: "tsx" },
      page: () => (
        <TemplateDocs
          skeleton={skeleton}
          changes={[
            { where: "data.ts", what: "KPI·일별 매출·채널 비중·TOP 5 를 API 응답으로 바꿉니다. 타입(Kpi 등)만 맞추면 화면 코드는 그대로 씁니다." },
            { where: "period / baseDate", what: "조회 조건 상태를 데이터 요청 파라미터에 연결합니다." },
            { where: "parts.tsx → DailyBarChart", what: "막대 수가 많거나 확대·범례 전환이 필요하면 차트 라이브러리로 바꿉니다. 색은 --ds-color-primary 를 그대로 씁니다." },
            { where: "PageHeader", what: "제목·배지·담당 문구, 내려받기·공유 버튼 동작." },
          ]}
          files={[
            { name: "data.ts", role: "예시 데이터와 타입 — 가장 먼저 바꿀 곳", raw: dataRaw },
            { name: "Dashboard.tsx", role: "화면 — 헤더·조회 조건, KPI·차트·표 배치", raw: dashboardRaw },
            { name: "parts.tsx", role: "조각 — 구역 카드, KPI 카드, 막대 차트, 비중 막대", raw: partsRaw },
          ]}
        />
      ),
    },
  },
} satisfies Meta<typeof Dashboard>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Default: Story = {};
