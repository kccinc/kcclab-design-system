// 목록 화면 Template — 검색 조건(주문 번호·고객명·상품명·상태·주문일 기간) + 표 + 페이지 이동.
// 검색 조건은 입력하는 값(draft)과 실제로 적용된 값(applied)을 따로 둬서, [검색]을 눌렀을 때만 목록이 바뀝니다.
import { useId, useState } from "react";
import type { FormEvent } from "react";
import { Badge } from "../../components/Badge";
import type { BadgeVariant } from "../../components/Badge";
import { Button } from "../../components/Button";
import { DatePicker } from "../../components/DatePicker";
import { EmptyState } from "../../components/EmptyState";
import { FormField } from "../../components/FormField";
import { Icon } from "../../components/Icon";
import { Input } from "../../components/Input";
import { Label } from "../../components/Label";
import { PageHeader } from "../../components/PageHeader";
import { Pagination } from "../../components/Pagination";
import { Select } from "../../components/Select";
import { Table } from "../../components/Table";

// ─── 데이터 ──────────────────────────────────────────────────────────
export type OrderStatus = "pending" | "paid" | "shipped" | "cancelled";

export interface Order {
  id: string;
  customer: string;
  product: string;
  amount: number;
  status: OrderStatus;
  /** yyyy-mm-dd */
  orderedAt: string;
}

const STATUS: Record<OrderStatus, { label: string; variant: BadgeVariant }> = {
  pending: { label: "결제 대기", variant: "warning" },
  paid: { label: "결제 완료", variant: "primary" },
  shipped: { label: "배송 중", variant: "success" },
  cancelled: { label: "취소", variant: "neutral" },
};

const STATUS_OPTIONS = [
  { value: "all", label: "전체" },
  ...(Object.keys(STATUS) as OrderStatus[]).map((s) => ({ value: s, label: STATUS[s].label })),
];

const customers = ["김민수", "이서연", "박지훈", "최유진", "정다은", "한도윤"];
const products = ["무선 키보드", "27인치 모니터", "USB-C 허브", "노트북 거치대", "블루투스 스피커"];
const statuses = Object.keys(STATUS) as OrderStatus[];

/** 예시 주문 42건 */
export const sampleOrders: Order[] = Array.from({ length: 42 }, (_, i) => ({
  id: `ORD-${20240 + i}`,
  customer: customers[i % customers.length]!,
  product: products[(i * 3) % products.length]!,
  amount: 19000 + ((i * 7919) % 380) * 1000,
  status: statuses[i % statuses.length]!,
  orderedAt: `2026-11-${String(16 - (i % 15)).padStart(2, "0")}`,
}));

// ─── 검색 조건 ───────────────────────────────────────────────────────
interface Filters {
  orderId: string;
  customer: string;
  product: string;
  status: "all" | OrderStatus;
  from?: Date;
  to?: Date;
}

const EMPTY_FILTERS: Filters = { orderId: "", customer: "", product: "", status: "all" };

const toYmd = (d: Date) =>
  `${d.getFullYear()}-${String(d.getMonth() + 1).padStart(2, "0")}-${String(d.getDate()).padStart(2, "0")}`;

const contains = (value: string, query: string) => value.toLowerCase().includes(query.trim().toLowerCase());

function matches(order: Order, f: Filters) {
  return (
    contains(order.id, f.orderId) &&
    contains(order.customer, f.customer) &&
    contains(order.product, f.product) &&
    (f.status === "all" || order.status === f.status) &&
    (!f.from || order.orderedAt >= toYmd(f.from)) &&
    (!f.to || order.orderedAt <= toYmd(f.to))
  );
}

const isFiltered = (f: Filters) =>
  Boolean(f.orderId.trim() || f.customer.trim() || f.product.trim() || f.status !== "all" || f.from || f.to);

const PAGE_SIZE = 10;

// ─── 화면 ────────────────────────────────────────────────────────────
export interface ListPageProps {
  orders?: Order[];
  /** 행을 눌렀을 때 (예: 상세 화면으로 이동) */
  onOpenOrder?: (order: Order) => void;
}

export function ListPage({ orders = sampleOrders, onOpenOrder }: ListPageProps) {
  const [draft, setDraft] = useState<Filters>(EMPTY_FILTERS);
  const [applied, setApplied] = useState<Filters>(EMPTY_FILTERS);
  const [page, setPage] = useState(1);
  const fromId = useId();

  const set = <K extends keyof Filters>(key: K, value: Filters[K]) => setDraft((d) => ({ ...d, [key]: value }));
  const search = (e: FormEvent) => {
    e.preventDefault();
    setApplied(draft);
    setPage(1);
  };
  const reset = () => {
    setDraft(EMPTY_FILTERS);
    setApplied(EMPTY_FILTERS);
    setPage(1);
  };

  const filtered = orders.filter((o) => matches(o, applied));
  const totalPages = Math.max(1, Math.ceil(filtered.length / PAGE_SIZE));
  const rows = filtered.slice((page - 1) * PAGE_SIZE, page * PAGE_SIZE);

  return (
    <div className="bg-[var(--ds-color-background)]">
      <PageHeader
        title="주문 목록"
        description={`검색 결과 ${filtered.length.toLocaleString("ko-KR")}건`}
        actions={
          <>
            <Button size="sm" variant="outline" leftIcon={<Icon name="download" size="inherit" />}>
              내려받기
            </Button>
            <Button size="sm" leftIcon={<Icon name="plus" size="inherit" />}>
              주문 등록
            </Button>
          </>
        }
      />

      <div className="flex flex-col gap-[var(--ds-space-4)] p-[var(--ds-space-4)] md:p-[var(--ds-space-6)]">
        {/* 검색 조건 */}
        <form
          onSubmit={search}
          aria-label="검색 조건"
          className="rounded-[var(--ds-radius-md)] border border-[var(--ds-color-border)] bg-[var(--ds-color-grey-opacity-50)] p-[var(--ds-space-4)]"
        >
          <div className="grid grid-cols-1 gap-[var(--ds-space-3)] sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-6">
            <FormField label="주문 번호">
              <Input size="sm" placeholder="ORD-20240" value={draft.orderId} onChange={(e) => set("orderId", e.target.value)} />
            </FormField>
            <FormField label="고객명">
              <Input size="sm" placeholder="고객 이름" value={draft.customer} onChange={(e) => set("customer", e.target.value)} />
            </FormField>
            <FormField label="상품명">
              <Input size="sm" placeholder="상품 이름" value={draft.product} onChange={(e) => set("product", e.target.value)} />
            </FormField>
            <FormField label="상태">
              <Select size="sm" options={STATUS_OPTIONS} value={draft.status} onValueChange={(v) => set("status", v as Filters["status"])} />
            </FormField>
            {/* 기간: 시작일·종료일 두 칸. 시작일보다 앞선 종료일은 고를 수 없다 */}
            <div className="flex flex-col gap-[var(--ds-space-2)] sm:col-span-2">
              <Label htmlFor={fromId}>주문일</Label>
              <div className="flex items-center gap-[var(--ds-space-2)]">
                <div className="min-w-0 flex-1">
                  <DatePicker id={fromId} size="sm" placeholder="시작일" value={draft.from} toDate={draft.to} onValueChange={(d) => set("from", d)} />
                </div>
                <span aria-hidden="true" className="text-[var(--ds-color-text-tertiary)]">
                  ~
                </span>
                <div className="min-w-0 flex-1">
                  <DatePicker size="sm" placeholder="종료일" value={draft.to} fromDate={draft.from} onValueChange={(d) => set("to", d)} />
                </div>
              </div>
            </div>
          </div>
          <div className="mt-[var(--ds-space-4)] flex justify-end gap-[var(--ds-space-2)]">
            <Button type="button" size="sm" variant="ghost" leftIcon={<Icon name="refresh" size="inherit" />} onClick={reset}>
              초기화
            </Button>
            <Button type="submit" size="sm" leftIcon={<Icon name="search" size="inherit" />}>
              검색
            </Button>
          </div>
        </form>

        {/* 결과 */}
        {filtered.length === 0 ? (
          <EmptyState
            icon={<Icon name={isFiltered(applied) ? "search" : "clipboardList"} />}
            title={isFiltered(applied) ? "조건에 맞는 주문이 없습니다" : "아직 주문이 없습니다"}
            description={isFiltered(applied) ? "검색 조건을 바꾸거나 초기화해 보세요." : "첫 주문이 들어오면 이곳에 표시됩니다."}
            action={
              isFiltered(applied) ? (
                <Button size="sm" variant="outline" onClick={reset}>
                  조건 초기화
                </Button>
              ) : undefined
            }
          />
        ) : (
          <>
            <Table
              rowKey={(o) => o.id}
              data={rows}
              onRowClick={onOpenOrder}
              columns={[
                { key: "id", header: "주문 번호" },
                { key: "customer", header: "고객" },
                { key: "product", header: "상품" },
                {
                  key: "amount",
                  header: "금액",
                  align: "right",
                  render: (o) => <span className="tabular-nums">{o.amount.toLocaleString("ko-KR")}원</span>,
                },
                { key: "status", header: "상태", render: (o) => <Badge variant={STATUS[o.status].variant}>{STATUS[o.status].label}</Badge> },
                { key: "orderedAt", header: "주문일", render: (o) => <span className="tabular-nums">{o.orderedAt}</span> },
              ]}
            />
            <Pagination page={page} totalPages={totalPages} onPageChange={setPage} className="self-center" />
          </>
        )}
      </div>
    </div>
  );
}
