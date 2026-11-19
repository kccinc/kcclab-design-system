// 대시보드 화면 Template — 화면 헤더(상태 배지·조회 조건) + KPI 카드 + 일별 막대 차트 + 채널 비중 + 상위 상품 표.
// 차트는 라이브러리 없이 토큰만으로 그렸습니다. 한 계열(primary)이라 범례 없이 제목이 계열을 설명하고, 막대마다 hover 툴팁이 있습니다.
import { useId, useState } from "react";
import type { ReactNode } from "react";
import { Badge } from "../../components/Badge";
import { Button } from "../../components/Button";
import { Card } from "../../components/Card";
import { DatePicker } from "../../components/DatePicker";
import { Icon } from "../../components/Icon";
import { PageHeader } from "../../components/PageHeader";
import { Select } from "../../components/Select";
import { Table } from "../../components/Table";
import { Tooltip } from "../../components/Tooltip";

// ─── 예시 데이터 ─────────────────────────────────────────────────────
interface Kpi {
  label: string;
  value: string;
  /** 전일 대비 변화 (예: "4.2%") */
  delta: string;
  direction: "up" | "down";
  /** 이 변화가 좋은 쪽인지 — 반품률은 내려가야 좋다 */
  good: boolean;
}

const KPIS: Kpi[] = [
  { label: "매출액", value: "1억 2,840만", delta: "4.2%", direction: "up", good: true },
  { label: "주문 수", value: "3,412", delta: "1.8%", direction: "up", good: true },
  { label: "객단가", value: "37,630원", delta: "0.6%", direction: "down", good: false },
  { label: "반품률", value: "2.1%", delta: "0.3%p", direction: "down", good: true },
];

/** 최근 14일 매출 (만 원) */
const DAILY_SALES = [9820, 10450, 11230, 9640, 8710, 12880, 13420, 11960, 10780, 11340, 12150, 9930, 12470, 12840].map(
  (value, i) => ({ date: `11.${String(3 + i).padStart(2, "0")}`, value }),
);

const CHANNELS = [
  { name: "자사몰", share: 46 },
  { name: "오픈마켓", share: 31 },
  { name: "제휴몰", share: 15 },
  { name: "오프라인", share: 8 },
];

const TOP_PRODUCTS = [
  { rank: 1, name: "27인치 모니터", category: "디스플레이", qty: 412, sales: 13184 },
  { rank: 2, name: "무선 키보드", category: "입력 장치", qty: 1280, sales: 8960 },
  { rank: 3, name: "노트북 거치대", category: "액세서리", qty: 960, sales: 4320 },
  { rank: 4, name: "USB-C 허브", category: "액세서리", qty: 1044, sales: 4176 },
  { rank: 5, name: "블루투스 스피커", category: "오디오", qty: 388, sales: 3104 },
];

const manwon = (v: number) => `${v.toLocaleString("ko-KR")}만 원`;

// ─── 조각 ────────────────────────────────────────────────────────────
const textCaption = "text-[length:var(--ds-font-size-caption1)] leading-[var(--ds-line-height-caption1)]";
const textLabel = "text-[length:var(--ds-font-size-label1)] leading-[var(--ds-line-height-label1)]";

function Panel({ title, sub, children, className = "" }: { title: string; sub?: string; children: ReactNode; className?: string }) {
  return (
    <Card className={`flex flex-col gap-[var(--ds-space-3)] ${className}`}>
      <h2 className="flex items-baseline gap-[var(--ds-space-2)] text-[length:var(--ds-font-size-body2)] leading-[var(--ds-line-height-body2)] font-bold">
        {title}
        {sub && <span className={`font-normal text-[var(--ds-color-text-tertiary)] ${textCaption}`}>{sub}</span>}
      </h2>
      {children}
    </Card>
  );
}

function KpiCard({ kpi }: { kpi: Kpi }) {
  // 색만으로 좋고 나쁨을 전달하지 않도록 화살표 아이콘과 "전일 대비" 글자를 함께 쓴다.
  return (
    <Card className="flex flex-col gap-[var(--ds-space-1)]">
      <span className={`text-[var(--ds-color-text-secondary)] ${textCaption}`}>{kpi.label}</span>
      <span className="text-[length:var(--ds-font-size-heading1)] leading-[var(--ds-line-height-heading1)] font-extrabold tabular-nums">
        {kpi.value}
      </span>
      <span className={`flex items-center gap-[var(--ds-space-1)] ${textLabel}`}>
        <span
          className={`inline-flex items-center font-semibold tabular-nums ${
            kpi.good ? "text-[var(--ds-color-success)]" : "text-[var(--ds-color-danger)]"
          }`}
        >
          <Icon name={kpi.direction === "up" ? "chevronUp" : "chevronDown"} size="xs" />
          {kpi.delta}
        </span>
        <span className="text-[var(--ds-color-text-tertiary)]">전일 대비</span>
      </span>
    </Card>
  );
}

/** 막대 차트 — 한 계열, 0부터 시작하는 축, 옅은 가로 눈금, 막대마다 hover 툴팁. */
function DailyBarChart() {
  const max = Math.ceil(Math.max(...DAILY_SALES.map((d) => d.value)) / 5000) * 5000;
  const ticks = [max, max / 2, 0];
  return (
    <div className="flex gap-[var(--ds-space-2)]">
      {/* y축 눈금 */}
      <div className={`flex h-40 flex-col justify-between text-right text-[var(--ds-color-text-tertiary)] tabular-nums ${textLabel}`}>
        {ticks.map((t) => (
          <span key={t} className="-translate-y-1/2 first:translate-y-0 last:translate-y-0">
            {(t / 10000).toLocaleString("ko-KR")}억
          </span>
        ))}
      </div>
      <div className="min-w-0 flex-1">
        <div className="relative h-40 border-b border-[var(--ds-color-border-strong)]">
          {/* 가로 눈금선 */}
          <div className="absolute inset-x-0 top-0 border-t border-dashed border-[var(--ds-color-border)]" />
          <div className="absolute inset-x-0 top-1/2 border-t border-dashed border-[var(--ds-color-border)]" />
          {/* 막대: 칸 전체가 hover 영역이라 가는 막대도 쉽게 가리킬 수 있다 */}
          <div className="absolute inset-0 flex items-end gap-[var(--ds-border-width-thick)]">
            {DAILY_SALES.map((d, i) => (
              <Tooltip key={d.date} content={`11월 ${Number(d.date.slice(3))}일 · ${manwon(d.value)}`}>
                <div
                  tabIndex={0}
                  aria-label={`11월 ${Number(d.date.slice(3))}일 매출 ${manwon(d.value)}`}
                  className="group flex h-full flex-1 cursor-default items-end justify-center outline-none"
                >
                  <div
                    className={`w-3/5 rounded-t-[var(--ds-radius-xs)] transition-opacity duration-150 group-hover:opacity-[var(--ds-opacity-hover)] group-focus-visible:outline-2 group-focus-visible:outline-[var(--ds-color-border-primary)] ${
                      i === DAILY_SALES.length - 1 ? "bg-[var(--ds-color-primary)]" : "bg-[var(--ds-color-primary-light)] group-hover:bg-[var(--ds-color-primary)]"
                    }`}
                    style={{ height: `${(d.value / max) * 100}%` }}
                  />
                </div>
              </Tooltip>
            ))}
          </div>
        </div>
        {/* x축: 이틀마다 날짜 */}
        <div className={`mt-[var(--ds-space-1)] flex text-[var(--ds-color-text-tertiary)] tabular-nums ${textLabel}`}>
          {DAILY_SALES.map((d, i) => (
            <span key={d.date} className="flex-1 text-center">
              {i % 2 === 1 ? d.date : ""}
            </span>
          ))}
        </div>
      </div>
    </div>
  );
}

/** 비중 — 한 색의 가로 막대 + 이름·값은 글자색으로. */
function ChannelShare() {
  return (
    <ul className="flex flex-col gap-[var(--ds-space-3)]">
      {CHANNELS.map((c) => (
        <li key={c.name} className="flex flex-col gap-[var(--ds-space-1)]">
          <div className={`flex justify-between ${textCaption}`}>
            <span className="text-[var(--ds-color-text-secondary)]">{c.name}</span>
            <span className="font-semibold tabular-nums">{c.share}%</span>
          </div>
          <div className="h-[var(--ds-space-2)] rounded-[var(--ds-radius-full)] bg-[var(--ds-color-grey-background)]">
            <div className="h-full rounded-[var(--ds-radius-full)] bg-[var(--ds-color-primary)]" style={{ width: `${c.share}%` }} />
          </div>
        </li>
      ))}
    </ul>
  );
}

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
