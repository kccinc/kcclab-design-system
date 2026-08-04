import type { Meta, StoryObj } from "@storybook/react-vite";
import { Select } from "./Select";

const options = [
  { value: "card", label: "카드 결제" },
  { value: "bank", label: "계좌 이체" },
  { value: "phone", label: "휴대폰 결제" },
  { value: "unavailable", label: "간편 결제 (준비 중)", disabled: true },
];

const meta = {
  title: "Patterns/Select",
  component: Select,
  tags: ["autodocs"],
  argTypes: {
    variant: {
      control: "select",
      options: ["outline", "filled"],
    },
    size: {
      control: "select",
      options: ["sm", "md", "lg"],
    },
  },
  args: {
    options,
    variant: "outline",
    size: "md",
  },
} satisfies Meta<typeof Select>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Default: Story = {
  render: (args) => (
    <div style={{ width: 240 }}>
      <Select {...args} />
    </div>
  ),
};

export const Filled: Story = {
  args: { variant: "filled" },
  render: (args) => (
    <div style={{ width: 240 }}>
      <Select {...args} />
    </div>
  ),
};

export const ErrorState: Story = {
  args: { errorMessage: "결제 수단을 선택해주세요." },
  render: (args) => (
    <div style={{ width: 240 }}>
      <Select {...args} />
    </div>
  ),
};

export const Disabled: Story = {
  args: { disabled: true, defaultValue: "card" },
  render: (args) => (
    <div style={{ width: 240 }}>
      <Select {...args} />
    </div>
  ),
};
