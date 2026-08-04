import type { Meta, StoryObj } from "@storybook/react-vite";
import { Card } from "./Card";

const meta = {
  title: "Components/Card",
  component: Card,
  tags: ["autodocs"],
  args: {
    children: (
      <div>
        <h4 style={{ margin: 0 }}>카드 제목</h4>
        <p style={{ margin: "8px 0 0", color: "#6b7684" }}>카드 본문 내용이 들어갑니다.</p>
      </div>
    ),
  },
} satisfies Meta<typeof Card>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Default: Story = {
  render: (args) => (
    <div style={{ width: 280 }}>
      <Card {...args} />
    </div>
  ),
};

export const Clickable: Story = {
  args: { clickable: true, onClick: () => alert("Card clicked") },
  render: (args) => (
    <div style={{ width: 280 }}>
      <Card {...args} />
    </div>
  ),
};
