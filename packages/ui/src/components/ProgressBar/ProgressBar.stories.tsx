import type { Meta, StoryObj } from "@storybook/react-vite";
import { ProgressBar } from "./ProgressBar";

const meta = {
  title: "Components/ProgressBar",
  component: ProgressBar,
  tags: ["autodocs"],
  argTypes: {
    variant: {
      control: "select",
      options: ["linear", "circular"],
    },
  },
  args: {
    value: 40,
    variant: "linear",
  },
} satisfies Meta<typeof ProgressBar>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Linear: Story = {
  render: (args) => (
    <div style={{ width: 280 }}>
      <ProgressBar {...args} />
    </div>
  ),
};

export const Circular: Story = {
  args: { variant: "circular" },
};

export const Progression: Story = {
  render: (args) => (
    <div style={{ display: "flex", flexDirection: "column", gap: 12, width: 280 }}>
      <ProgressBar {...args} value={10} />
      <ProgressBar {...args} value={50} />
      <ProgressBar {...args} value={90} />
      <ProgressBar {...args} value={100} />
    </div>
  ),
};
