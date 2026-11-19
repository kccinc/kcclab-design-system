// 주문 데이터와 검색 조건 — 앱에서는 sampleOrders 대신 API 데이터를 쓰고,
// 서버에서 검색한다면 matches() 대신 Filters 를 요청 파라미터로 바꿔 보낸다.
import type { BadgeVariant } from "../../components/Badge";

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

export const STATUS: Record<OrderStatus, { label: string; variant: BadgeVariant }> = {
  pending: { label: "결제 대기", variant: "warning" },
  paid: { label: "결제 완료", variant: "primary" },
  shipped: { label: "배송 중", variant: "success" },
  cancelled: { label: "취소", variant: "neutral" },
};

export const STATUS_OPTIONS = [
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
export interface Filters {
  orderId: string;
  customer: string;
  product: string;
  status: "all" | OrderStatus;
  from?: Date;
  to?: Date;
}

export const EMPTY_FILTERS: Filters = { orderId: "", customer: "", product: "", status: "all" };

const toYmd = (d: Date) =>
  `${d.getFullYear()}-${String(d.getMonth() + 1).padStart(2, "0")}-${String(d.getDate()).padStart(2, "0")}`;

const contains = (value: string, query: string) => value.toLowerCase().includes(query.trim().toLowerCase());

export function matches(order: Order, f: Filters) {
  return (
    contains(order.id, f.orderId) &&
    contains(order.customer, f.customer) &&
    contains(order.product, f.product) &&
    (f.status === "all" || order.status === f.status) &&
    (!f.from || order.orderedAt >= toYmd(f.from)) &&
    (!f.to || order.orderedAt <= toYmd(f.to))
  );
}

export const isFiltered = (f: Filters) =>
  Boolean(f.orderId.trim() || f.customer.trim() || f.product.trim() || f.status !== "all" || f.from || f.to);

export const PAGE_SIZE = 10;
