import type { Meta, StoryObj } from "@storybook/react-vite";
import { RadioGroup } from "./RadioGroup";

const meta = {
  title: "Components/RadioGroup",
  component: RadioGroup,
  tags: ["autodocs"],
  args: {
    defaultValue: "card",
  },
} satisfies Meta<typeof RadioGroup>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Default: Story = {
  render: (args) => (
    <RadioGroup {...args}>
      <RadioGroup.Item value="card">카드 결제</RadioGroup.Item>
      <RadioGroup.Item value="bank">계좌 이체</RadioGroup.Item>
      <RadioGroup.Item value="phone">휴대폰 결제</RadioGroup.Item>
    </RadioGroup>
  ),
};

export const Horizontal: Story = {
  args: { orientation: "horizontal" },
  render: (args) => (
    <RadioGroup {...args}>
      <RadioGroup.Item value="card">카드</RadioGroup.Item>
      <RadioGroup.Item value="bank">계좌</RadioGroup.Item>
    </RadioGroup>
  ),
};

export const DisabledItem: Story = {
  render: (args) => (
    <RadioGroup {...args}>
      <RadioGroup.Item value="card">카드 결제</RadioGroup.Item>
      <RadioGroup.Item value="bank" disabled>
        계좌 이체 (준비 중)
      </RadioGroup.Item>
    </RadioGroup>
  ),
};
