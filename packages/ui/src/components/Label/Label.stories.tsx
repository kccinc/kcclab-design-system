import type { Meta, StoryObj } from "@storybook/react-vite";
import { Label } from "./Label";
import { Input } from "../Input";

const meta = {
  title: "Components/Label",
  component: Label,
  tags: ["autodocs"],
  argTypes: {
    size: {
      control: "select",
      options: ["sm", "md"],
    },
  },
  args: {
    children: "Email address",
    size: "md",
  },
} satisfies Meta<typeof Label>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Default: Story = {};

export const Required: Story = {
  args: { required: true },
};

export const Disabled: Story = {
  args: { disabled: true },
};

export const Sizes: Story = {
  render: (args) => (
    <div style={{ display: "flex", flexDirection: "column", gap: "8px" }}>
      <Label {...args} size="sm">
        Small label
      </Label>
      <Label {...args} size="md">
        Medium label
      </Label>
    </div>
  ),
};

export const PairedWithInput: Story = {
  render: (args) => (
    <div style={{ display: "flex", flexDirection: "column", gap: "8px", width: 280 }}>
      <Label {...args} htmlFor="story-email" required>
        Email address
      </Label>
      <Input id="story-email" type="email" placeholder="you@example.com" required />
    </div>
  ),
};
