import type { Meta, StoryObj } from "@storybook/react-vite";
import { useState } from "react";
import { fn } from "storybook/test";
import { Button } from "../Button";
import { Icon } from "../Icon";
import { CommandPalette } from "./CommandPalette";
import type { CommandPaletteItem } from "./CommandPalette";

const items: CommandPaletteItem[] = [
  { id: "orders", label: "주문 목록", description: "주문", icon: <Icon name="clipboardList" />, keywords: "order" },
  { id: "returns", label: "반품 요청", description: "주문", icon: <Icon name="refresh" />, keywords: "return" },
  { id: "products", label: "상품 목록", description: "상품", icon: <Icon name="package" /> },
  { id: "stock", label: "재고 현황", description: "상품", icon: <Icon name="boxes" /> },
  { id: "customers", label: "고객 목록", description: "고객", icon: <Icon name="users" /> },
  { id: "inquiries", label: "문의 내역", description: "고객", icon: <Icon name="mail" /> },
  { id: "members", label: "멤버·권한", description: "설정", icon: <Icon name="shield" /> },
];

const meta = {
  title: "Patterns/CommandPalette",
  component: CommandPalette,
  tags: ["autodocs"],
  args: {
    open: false,
    onOpenChange: fn(),
    onSelect: fn(),
    items,
    placeholder: "메뉴 이름으로 이동",
  },
  render: function Render(args) {
    const [open, setOpen] = useState(args.open);
    const [picked, setPicked] = useState<string | null>(null);
    return (
      <div className="flex items-center gap-[var(--ds-space-3)]">
        <Button variant="outline" leftIcon={<Icon name="search" size="inherit" />} onClick={() => setOpen(true)}>
          검색 (Ctrl K)
        </Button>
        {picked && (
          <span className="text-[length:var(--ds-font-size-body3)] text-[var(--ds-color-text-secondary)]">선택: {picked}</span>
        )}
        <CommandPalette
          {...args}
          open={open}
          onOpenChange={(next) => {
            setOpen(next);
            args.onOpenChange(next);
          }}
          onSelect={(item) => {
            setPicked(item.label);
            args.onSelect(item);
          }}
        />
      </div>
    );
  },
} satisfies Meta<typeof CommandPalette>;

export default meta;
type Story = StoryObj<typeof meta>;

/** 버튼을 누르거나 Ctrl+K / ⌘K로 엽니다. 고른 항목은 Actions 탭에도 기록됩니다. */
export const Default: Story = {};

export const Opened: Story = { args: { open: true } };
