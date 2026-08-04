import type { Meta, StoryObj } from "@storybook/react-vite";
import { Stack } from "./Stack";

function Box({ label }: { label: string }) {
  return (
    <div style={{ background: "#e8f3ff", padding: "8px 16px", borderRadius: 8 }}>{label}</div>
  );
}

const meta = {
  title: "Components/Stack",
  component: Stack,
  tags: ["autodocs"],
  argTypes: {
    direction: {
      control: "select",
      options: ["row", "column"],
    },
  },
  args: {
    direction: "column",
    gap: 3,
  },
} satisfies Meta<typeof Stack>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Column: Story = {
  render: (args) => (
    <Stack {...args}>
      <Box label="Item A" />
      <Box label="Item B" />
      <Box label="Item C" />
    </Stack>
  ),
};

export const Row: Story = {
  args: { direction: "row" },
  render: (args) => (
    <Stack {...args}>
      <Box label="Item A" />
      <Box label="Item B" />
      <Box label="Item C" />
    </Stack>
  ),
};

export const Justified: Story = {
  args: { direction: "row", justify: "between" },
  render: (args) => (
    <div style={{ width: 320 }}>
      <Stack {...args}>
        <Box label="Left" />
        <Box label="Right" />
      </Stack>
    </div>
  ),
};
