// 메뉴 데이터 — 앱에서 가장 먼저 바꿀 곳. 보통 서버·설정(테넌트별 메뉴 JSON 등)에서 받아 온다.
import type { IconName } from "../../components/Icon";

export interface MenuItem {
  id: string;
  label: string;
  icon: IconName;
  /** 이름 위 분류 (예: DAILY) */
  category?: string;
  status?: "live" | "draft";
  owner?: string;
}
export interface MenuSection {
  id: string;
  label: string;
  icon: IconName;
  /** 하위 메뉴 없이 바로 이동 */
  direct?: boolean;
  divider?: boolean;
  groups?: { label: string; items: MenuItem[] }[];
}

export const SECTIONS: MenuSection[] = [
  { id: "home", label: "홈", icon: "home", direct: true },
  {
    id: "sales",
    label: "매출",
    icon: "chart",
    groups: [
      {
        label: "매출 현황",
        items: [
          { id: "sales-daily", label: "일일 매출 현황", icon: "calendarDays", category: "DAILY", status: "live", owner: "김지원 · 영업기획팀" },
          { id: "sales-weekly", label: "주간 매출 리포트", icon: "calendarRange", category: "WEEKLY", status: "live", owner: "김지원 · 영업기획팀" },
          { id: "sales-monthly", label: "월간 실적", icon: "calendarCheck", category: "MONTHLY", status: "draft", owner: "이도현 · 재무팀" },
        ],
      },
      {
        label: "분석",
        items: [
          { id: "sales-channel", label: "채널별 KPI", icon: "gauge", category: "KPI", status: "live", owner: "박서윤 · 마케팅팀" },
          { id: "sales-product", label: "상품별 매출", icon: "chartColumn", category: "KPI", status: "live", owner: "박서윤 · 마케팅팀" },
        ],
      },
    ],
  },
  {
    id: "orders",
    label: "주문",
    icon: "receipt",
    groups: [
      {
        label: "주문 관리",
        items: [
          { id: "order-list", label: "주문 목록", icon: "clipboardList" },
          { id: "returns", label: "반품 요청", icon: "refresh" },
          { id: "shipping", label: "배송 현황", icon: "mapPin" },
        ],
      },
    ],
  },
  {
    id: "products",
    label: "상품",
    icon: "package",
    groups: [
      {
        label: "상품 관리",
        items: [
          { id: "product-list", label: "상품 목록", icon: "package" },
          { id: "stock", label: "재고 현황", icon: "boxes" },
        ],
      },
    ],
  },
  {
    id: "settings",
    label: "설정",
    icon: "settings",
    divider: true,
    groups: [
      {
        label: "설정",
        items: [
          { id: "members", label: "멤버·권한", icon: "shield" },
          { id: "billing", label: "결제 수단", icon: "creditCard" },
        ],
      },
    ],
  },
];

export const hrefOf = (id: string) => `#${id}`;

export function locate(id: string) {
  for (const section of SECTIONS) {
    if (section.id === id) return { section, group: undefined, item: undefined };
    for (const group of section.groups ?? []) {
      const item = group.items.find((x) => x.id === id);
      if (item) return { section, group, item };
    }
  }
  return undefined;
}

export const countItems = (s: MenuSection) => (s.groups ?? []).reduce((n, g) => n + g.items.length, 0);
