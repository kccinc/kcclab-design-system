// 예시 데이터 — 앱에서는 API 응답으로 바꾼다. 모양(타입)만 맞추면 화면 코드는 그대로 쓸 수 있다.
export interface Kpi {
  label: string;
  value: string;
  /** 전일 대비 변화 (예: "4.2%") */
  delta: string;
  direction: "up" | "down";
  /** 이 변화가 좋은 쪽인지 — 반품률은 내려가야 좋다 */
  good: boolean;
}

export const KPIS: Kpi[] = [
  { label: "매출액", value: "1억 2,840만", delta: "4.2%", direction: "up", good: true },
  { label: "주문 수", value: "3,412", delta: "1.8%", direction: "up", good: true },
  { label: "객단가", value: "37,630원", delta: "0.6%", direction: "down", good: false },
  { label: "반품률", value: "2.1%", delta: "0.3%p", direction: "down", good: true },
];

/** 최근 14일 매출 (만 원) */
export const DAILY_SALES = [9820, 10450, 11230, 9640, 8710, 12880, 13420, 11960, 10780, 11340, 12150, 9930, 12470, 12840].map(
  (value, i) => ({ date: `11.${String(3 + i).padStart(2, "0")}`, value }),
);

export const CHANNELS = [
  { name: "자사몰", share: 46 },
  { name: "오픈마켓", share: 31 },
  { name: "제휴몰", share: 15 },
  { name: "오프라인", share: 8 },
];

export const TOP_PRODUCTS = [
  { rank: 1, name: "27인치 모니터", category: "디스플레이", qty: 412, sales: 13184 },
  { rank: 2, name: "무선 키보드", category: "입력 장치", qty: 1280, sales: 8960 },
  { rank: 3, name: "노트북 거치대", category: "액세서리", qty: 960, sales: 4320 },
  { rank: 4, name: "USB-C 허브", category: "액세서리", qty: 1044, sales: 4176 },
  { rank: 5, name: "블루투스 스피커", category: "오디오", qty: 388, sales: 3104 },
];

export const manwon = (v: number) => `${v.toLocaleString("ko-KR")}만 원`;
