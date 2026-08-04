import type { Meta, StoryObj } from "@storybook/react-vite";
import { Skeleton } from "./Skeleton";

const meta = {
  title: "Components/Skeleton",
  component: Skeleton,
  tags: ["autodocs"],
  argTypes: {
    variant: {
      control: "select",
      options: ["text", "circle", "rect"],
    },
  },
  args: {
    variant: "text",
  },
} satisfies Meta<typeof Skeleton>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Text: Story = {
  render: (args) => (
    <div style={{ display: "flex", flexDirection: "column", gap: 8, width: 240 }}>
      <Skeleton {...args} />
      <Skeleton {...args} width="80%" />
      <Skeleton {...args} width="60%" />
    </div>
  ),
};

export const Circle: Story = {
  args: { variant: "circle" },
};

export const Rect: Story = {
  args: { variant: "rect", width: 240, height: 120 },
};

export const CardPlaceholder: Story = {
  render: () => (
    <div style={{ display: "flex", gap: 12, width: 320 }}>
      <Skeleton variant="circle" />
      <div style={{ display: "flex", flexDirection: "column", gap: 8, flex: 1 }}>
        <Skeleton variant="text" width="50%" />
        <Skeleton variant="text" width="80%" />
      </div>
    </div>
  ),
};
