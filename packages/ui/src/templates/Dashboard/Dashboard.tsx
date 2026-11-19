// 대시보드 화면 Template — 화면 헤더(상태 배지·조회 조건) + KPI 카드 + 일별 막대 차트 + 채널 비중 + 상위 상품 표.
import { useId, useState } from "react";
import { Badge } from "../../components/Badge";
import { Button } from "../../components/Button";
import { DatePicker } from "../../components/DatePicker";
import { Icon } from "../../components/Icon";
import { PageHeader } from "../../components/PageHeader";
import { Select } from "../../components/Select";
import { Table } from "../../components/Table";
import { KPIS, TOP_PRODUCTS, manwon } from "./data";
import { ChannelShare, DailyBarChart, KpiCard, Panel } from "./parts";

// ─── 화면 ────────────────────────────────────────────────────────────
export interface DashboardProps {
  /** 화면 제목 */
  title?: string;
}

export function Dashboard({ title = "일일 매출 현황" }: DashboardProps) {
  const [period, setPeriod] = useState("1d");
  const [baseDate, setBaseDate] = useState<Date | undefined>(new Date(2026, 10, 16));
  const periodId = useId();
  const dateId = useId();

  return (
    <div className="bg-[var(--ds-color-grey-opacity-50)]">
      <PageHeader
        title={
          <span className="inline-flex items-center gap-[var(--ds-space-2)]">
            {title}
            <Badge variant="success">LIVE</Badge>
            <Badge variant="primary">DAILY</Badge>
          </span>
        }
        description="매일 오전 7시 집계 · 담당 김지원(영업기획팀) · 단위 만 원"
        actions={
          <>
            <Button size="sm" variant="outline" leftIcon={<Icon name="download" size="inherit" />}>
              내려받기
            </Button>
            <Button size="sm" variant="outline" leftIcon={<Icon name="share" size="inherit" />}>
              공유
            </Button>
          </>
        }
      >
        {/* 조회 조건은 눈에 보이는 라벨 없이 한 줄로 두되, 스크린 리더용 라벨은 연결한다 */}
        <label htmlFor={periodId} className="sr-only">
          기간
        </label>
        <div className="w-32">
          <Select
            id={periodId}
            size="sm"
            value={period}
            onValueChange={setPeriod}
            options={[
              { value: "1d", label: "일간" },
              { value: "7d", label: "최근 7일" },
              { value: "30d", label: "최근 30일" },
            ]}
          />
        </div>
        <label htmlFor={dateId} className="sr-only">
          기준일
        </label>
        <div className="w-40">
          <DatePicker id={dateId} size="sm" value={baseDate} onValueChange={setBaseDate} />
        </div>
      </PageHeader>

      <div className="flex flex-col gap-[var(--ds-space-4)] p-[var(--ds-space-4)] md:p-[var(--ds-space-6)]">
        <section aria-label="핵심 지표" className="grid grid-cols-2 gap-[var(--ds-space-3)] lg:grid-cols-4">
          {KPIS.map((k) => (
            <KpiCard key={k.label} kpi={k} />
          ))}
        </section>

        <div className="grid grid-cols-1 gap-[var(--ds-space-3)] lg:grid-cols-3">
          <Panel title="일별 매출" sub="최근 14일" className="lg:col-span-2">
            <DailyBarChart />
          </Panel>
          <Panel title="채널별 매출 비중" sub="오늘">
            <ChannelShare />
          </Panel>
        </div>

        <Panel title="상품별 매출 TOP 5" sub="오늘">
          <Table
            rowKey={(r) => r.rank}
            data={TOP_PRODUCTS}
            columns={[
              { key: "rank", header: "순위", align: "center", width: "4rem" },
              { key: "name", header: "상품" },
              { key: "category", header: "분류" },
              { key: "qty", header: "판매 수량", align: "right", render: (r) => <span className="tabular-nums">{r.qty.toLocaleString("ko-KR")}</span> },
              { key: "sales", header: "매출", align: "right", render: (r) => <span className="tabular-nums">{manwon(r.sales)}</span> },
            ]}
          />
        </Panel>
      </div>
    </div>
  );
}
