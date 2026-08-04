import { useState } from "react";
import type { Meta, StoryObj } from "@storybook/react-vite";
import { Checkbox } from "./Checkbox";
import type { CheckboxCheckedState } from "./Checkbox";

const meta = {
  title: "Components/Checkbox",
  component: Checkbox,
  tags: ["autodocs"],
  args: {
    children: "이용약관에 동의합니다",
  },
} satisfies Meta<typeof Checkbox>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Default: Story = {};

export const Checked: Story = {
  args: { defaultChecked: true },
};

export const Indeterminate: Story = {
  render: function Render(args) {
    const [checked, setChecked] = useState<CheckboxCheckedState>("indeterminate");
    return <Checkbox {...args} checked={checked} onCheckedChange={setChecked} />;
  },
};

export const Disabled: Story = {
  args: { disabled: true },
};

export const DisabledChecked: Story = {
  args: { disabled: true, defaultChecked: true },
};

export const WithoutLabel: Story = {
  args: { children: undefined },
};
