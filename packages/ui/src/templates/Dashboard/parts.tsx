// 대시보드 조각 — 구역 카드(Panel) · KPI 카드 · 일별 막대 차트 · 채널 비중 막대.
// 차트는 라이브러리 없이 토큰만으로 그렸다. 한 계열(primary)이라 범례 없이 제목이 계열을 설명하고, 막대마다 hover 툴팁이 있다.
// 데이터가 많거나 확대·범례 전환 같은 상호작용이 필요하면 차트 라이브러리로 바꾸는 편이 낫다.
import type { ReactNode } from "react";
import { Card } from "../../components/Card";
import { Icon } from "../../components/Icon";
import { Tooltip } from "../../components/Tooltip";
import { CHANNELS, DAILY_SALES, manwon } from "./data";
import type { Kpi } from "./data";

export const textCaption = "text-[length:var(--ds-font-size-caption1)] leading-[var(--ds-line-height-caption1)]";
export const textLabel = "text-[length:var(--ds-font-size-label1)] leading-[var(--ds-line-height-label1)]";

export function Panel({ title, sub, children, className = "" }: { title: string; sub?: string; children: ReactNode; className?: string }) {
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

export function KpiCard({ kpi }: { kpi: Kpi }) {
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
export function DailyBarChart() {
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
export function ChannelShare() {
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
