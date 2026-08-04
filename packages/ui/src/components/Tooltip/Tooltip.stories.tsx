import type { Meta, StoryObj } from "@storybook/react-vite";
import { Tooltip } from "./Tooltip";
import { Button } from "../Button";
import { IconButton } from "../IconButton";

function InfoIcon() {
  return (
    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" aria-hidden="true">
      <circle cx="12" cy="12" r="9" />
      <path d="M12 11v5M12 8h.01" strokeLinecap="round" />
    </svg>
  );
}

const meta = {
  title: "Components/Tooltip",
  component: Tooltip,
  tags: ["autodocs"],
  argTypes: {
    side: {
      control: "select",
      options: ["top", "right", "bottom", "left"],
    },
  },
  args: {
    content: "이 작업은 되돌릴 수 없습니다",
    side: "top",
    // 실제 트리거는 각 스토리의 render에서 지정합니다 — 타입을 만족시키기 위한 placeholder.
    children: <button type="button">Hover me</button>,
  },
} satisfies Meta<typeof Tooltip>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Default: Story = {
  render: (args) => (
    <Tooltip {...args}>
      <Button>Hover me</Button>
    </Tooltip>
  ),
};

export const OnIconButton: Story = {
  args: { content: "더 알아보기" },
  render: (args) => (
    <Tooltip {...args}>
      <IconButton icon={<InfoIcon />} aria-label="정보" variant="ghost" />
    </Tooltip>
  ),
};

export const Sides: Story = {
  render: (args) => (
    <div style={{ display: "flex", gap: 24, padding: 40 }}>
      <Tooltip {...args} side="top">
        <Button variant="outline">Top</Button>
      </Tooltip>
      <Tooltip {...args} side="right">
        <Button variant="outline">Right</Button>
      </Tooltip>
      <Tooltip {...args} side="bottom">
        <Button variant="outline">Bottom</Button>
      </Tooltip>
      <Tooltip {...args} side="left">
        <Button variant="outline">Left</Button>
      </Tooltip>
    </div>
  ),
};
