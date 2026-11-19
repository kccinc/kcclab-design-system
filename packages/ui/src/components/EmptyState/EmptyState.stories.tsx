import type { Meta, StoryObj } from "@storybook/react-vite";
import { fn } from "storybook/test";
import { Button } from "../Button";
import { Icon } from "../Icon";
import { EmptyState } from "./EmptyState";

const meta = {
  title: "Components/EmptyState",
  component: EmptyState,
  tags: ["autodocs"],
  args: {
    icon: <Icon name="clipboardList" />,
    title: "아직 주문이 없습니다",
    description: "첫 주문이 들어오면 이곳에 표시됩니다.",
  },
} satisfies Meta<typeof EmptyState>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Default: Story = {};

export const WithAction: Story = {
  args: {
    icon: <Icon name="package" />,
    title: "등록된 상품이 없습니다",
    description: "상품을 등록하면 주문을 받을 수 있습니다.",
    action: (
      <Button size="sm" onClick={fn()}>
        상품 등록
      </Button>
    ),
  },
};

/** 표·카드처럼 이미 테두리가 있는 곳 안에서는 `bordered={false}`. */
export const Borderless: Story = {
  args: { icon: <Icon name="search" />, title: "검색 결과가 없습니다", description: undefined, bordered: false },
};
