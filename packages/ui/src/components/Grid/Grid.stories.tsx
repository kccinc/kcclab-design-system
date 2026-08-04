import type { Meta, StoryObj } from "@storybook/react-vite";
import { Grid } from "./Grid";

function Box({ label }: { label: string }) {
  return (
    <div style={{ background: "#e8f3ff", padding: 16, borderRadius: 8, textAlign: "center" }}>
      {label}
    </div>
  );
}

const meta = {
  title: "Components/Grid",
  component: Grid,
  tags: ["autodocs"],
  args: {
    columns: 3,
    gap: 4,
  },
} satisfies Meta<typeof Grid>;

export default meta;
type Story = StoryObj<typeof meta>;

export const FixedColumns: Story = {
  render: (args) => (
    <Grid {...args}>
      {Array.from({ length: 6 }, (_, i) => (
        <Box key={i} label={`Item ${i + 1}`} />
      ))}
    </Grid>
  ),
};

export const Responsive: Story = {
  args: { columns: { base: 1, sm: 2, md: 3, lg: 4 } },
  render: (args) => (
    <Grid {...args}>
      {Array.from({ length: 8 }, (_, i) => (
        <Box key={i} label={`Item ${i + 1}`} />
      ))}
    </Grid>
  ),
};
