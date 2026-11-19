import type { Meta, StoryObj } from "@storybook/react-vite";
import { useState } from "react";
import { fn } from "storybook/test";
import { StoryLink } from "../../storybook/StoryLink";
import { Badge } from "../Badge";
import { Icon } from "../Icon";
import { IconButton } from "../IconButton";
import { Nav } from "./Nav";

const meta = {
  title: "Patterns/Nav",
  component: Nav,
  tags: ["autodocs"],
  args: { "aria-label": "주 메뉴", linkComponent: StoryLink },
} satisfies Meta<typeof Nav>;

export default meta;
type Story = StoryObj<typeof meta>;

const items = [
  { id: "home", label: "홈", icon: "home" },
  { id: "orders", label: "주문", icon: "receipt" },
  { id: "products", label: "상품", icon: "package" },
  { id: "customers", label: "고객", icon: "users" },
  { id: "settings", label: "설정", icon: "settings" },
] as const;

/** 기본 — 세로, 아이콘 옆 이름. 사이드 메뉴에 씁니다. */
export const Default: Story = {
  render: function Render(args) {
    const [active, setActive] = useState("orders");
    return (
      <div className="w-60">
        <Nav {...args}>
          {items.map((x) => (
            <Nav.Item key={x.id} href={`#${x.id}`} icon={<Icon name={x.icon} />} active={active === x.id} onClick={() => setActive(x.id)}>
              {x.label}
            </Nav.Item>
          ))}
        </Nav>
      </div>
    );
  },
};

/** 그룹·설명·오른쪽 요소(`trailing`). 하위 메뉴 패널처럼 항목이 많은 목록에 씁니다. */
export const Grouped: Story = {
  render: function Render(args) {
    const [active, setActive] = useState("list");
    const item = (id: string, label: string, icon: Parameters<typeof Icon>[0]["name"], description?: string, count?: number) => (
      <Nav.Item
        key={id}
        href={`#${id}`}
        icon={<Icon name={icon} />}
        description={description}
        active={active === id}
        onClick={() => setActive(id)}
        trailing={
          count !== undefined ? (
            <Badge variant="neutral">{count}</Badge>
          ) : (
            <IconButton variant="ghost" size="sm" icon={<Icon name="moreHorizontal" size="inherit" />} aria-label={`${label} 더 보기`} onClick={fn()} />
          )
        }
      >
        {label}
      </Nav.Item>
    );
    return (
      <div className="w-72">
        <Nav {...args} aria-label="주문 메뉴">
          <Nav.Group label="주문" trailing="3">
            {item("list", "주문 목록", "clipboardList", "전체 주문 조회·검색", 128)}
            {item("returns", "반품 요청", "refresh", "처리 대기 중인 반품", 4)}
            {item("shipping", "배송 현황", "mapPin")}
          </Nav.Group>
          <Nav.Group label="정산" trailing="2">
            {item("settlement", "정산 내역", "receipt", "월별 정산")}
            {item("invoices", "세금계산서", "fileText")}
          </Nav.Group>
        </Nav>
      </div>
    );
  },
};

/** 아이콘 아래 이름(`layout="stacked"`). 좁은 아이콘 레일에 씁니다. `href` 없는 항목은 버튼이 되어 `expanded`로 열림 상태를 알립니다. */
export const Rail: Story = {
  render: function Render(args) {
    const [open, setOpen] = useState<string | null>(null);
    return (
      <div className="w-16 border-r border-[var(--ds-color-border)] p-[var(--ds-space-1)]">
        <Nav {...args}>
          {items.map((x) =>
            x.id === "home" ? (
              <Nav.Item key={x.id} layout="stacked" href="#home" icon={<Icon name={x.icon} />} active={open === null}>
                {x.label}
              </Nav.Item>
            ) : (
              <Nav.Item
                key={x.id}
                layout="stacked"
                icon={<Icon name={x.icon} />}
                active={open === x.id}
                expanded={open === x.id}
                onClick={() => setOpen((cur) => (cur === x.id ? null : x.id))}
              >
                {x.label}
              </Nav.Item>
            ),
          )}
        </Nav>
      </div>
    );
  },
};

/** 가로(`orientation="horizontal"`) + 아이콘 아래 이름. 모바일 하단 탭에 씁니다. */
export const Horizontal: Story = {
  render: function Render(args) {
    const [active, setActive] = useState("home");
    return (
      <div className="w-96 border-t border-[var(--ds-color-border)]">
        <Nav {...args} orientation="horizontal" aria-label="하단 메뉴">
          {items.slice(0, 4).map((x) => (
            <Nav.Item key={x.id} layout="stacked" href={`#${x.id}`} icon={<Icon name={x.icon} />} active={active === x.id} onClick={() => setActive(x.id)}>
              {x.label}
            </Nav.Item>
          ))}
        </Nav>
      </div>
    );
  },
};
