import type { Meta, StoryObj } from "@storybook/react-vite";
import { Popover } from "./Popover";
import { Button } from "../Button";

const meta = {
  title: "Patterns/Popover",
  component: Popover,
  tags: ["autodocs"],
  args: {
    side: "bottom",
    align: "start",
    // 실제 트리거는 각 스토리의 render에서 지정합니다 — 타입을 만족시키기 위한 placeholder.
    trigger: <button type="button">Open</button>,
  },
} satisfies Meta<typeof Popover>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Default: Story = {
  render: (args) => (
    <Popover {...args} trigger={<Button variant="outline">더보기</Button>}>
      <div style={{ display: "flex", flexDirection: "column", gap: 8 }}>
        <strong>추가 정보</strong>
        <p style={{ margin: 0, color: "#6b7684" }}>여기에 부가 설명이나 옵션이 들어갑니다.</p>
      </div>
    </Popover>
  ),
};
